import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
  Checkbox,
} from "@heroui/react";
import { DatePicker } from "@heroui/date-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateEmployeeModalStore from "../state";
import { useEffect } from "react";
import { useConvertToEmployee } from "../services";
import useUpdateEmployeeModalStore from "@/features/Employees/state";
import useEmployees from "@/features/Employees/hooks/useEmployee";
import type { EmployeeUpdateInput } from "@/features/Employees/models";

const employeeSchema = z.object({
  user_id: z.string().uuid("Invalid UUID"),
  job_title: z.string().min(1, "Job title is required"),
  department: z.string().min(1, "Department is required"),
  hire_date: z.coerce.date(),
  employment_type: z.enum(["Full_time", "Part_time", "Contract", "Intern"]),
  employee_status: z.enum(["Active", "Terminated", "On_leave"]),
  work_location: z.string().min(1, "Work location is required"),
  salary: z
    .number()
    .min(0, "Salary must be positive")
    .max(100000, "Salary cannot exceed 1,00,000"),
  bonus: z.number().min(0).max(10000).optional(),
  bank_account: z
    .string()
    .min(5, "Bank account is required")
    .max(20, "Bank account cannot exceed 20 characters"),
  benefits_eligible: z.boolean(),
  leave_balance: z.number().min(0),
  work_shift: z.enum(["Morning", "Evening", "Night"]),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;

export default function ConvertUserToEmployee() {
  const {
    isOpen: isCreateEmployeeModalOpen,
    closeModal,
    selectedUserId,
  } = useCreateEmployeeModalStore();
  const {
    isOpen: isUpdateEmployeeModalOpen,
    closeModal: closeUpdateModal,
    selectedEmployee,
  } = useUpdateEmployeeModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    mode: "onBlur",
    defaultValues: {
      user_id: selectedUserId || "",
      leave_balance: 30,
      benefits_eligible: true,
    },
  });
  const [convertToEmployee, result] = useConvertToEmployee();
  const { updateEmployeeHandler, isUpdateEmployeeLoading } = useEmployees();

  useEffect(() => {
    if (selectedUserId) {
      setValue("user_id", selectedUserId);
    }
    return () => {
      reset();
    };
  }, [selectedUserId, setValue, reset]);

  useEffect(() => {
    if (isUpdateEmployeeModalOpen && selectedEmployee) {
      setValue("user_id", selectedEmployee.user.id);
      setValue("job_title", selectedEmployee.job_title);
      setValue("department", selectedEmployee.department);
      setValue("hire_date", new Date(selectedEmployee.hire_date));
      setValue("employment_type", selectedEmployee.employment_type);
      setValue(
        "employee_status",
        selectedEmployee.employee_status as "Active" | "Terminated" | "On_leave"
      );
      setValue("work_location", selectedEmployee.work_location);
      setValue("salary", selectedEmployee.salary);
      setValue("bonus", selectedEmployee.bonus);
      setValue("bank_account", selectedEmployee.bank_account);
      setValue("benefits_eligible", selectedEmployee.benefits_eligible);
      setValue("leave_balance", selectedEmployee.leave_balance);
      setValue(
        "work_shift",
        selectedEmployee.work_shift as "Morning" | "Evening" | "Night"
      );
    }
    return () => {
      reset();
    };
  }, [isUpdateEmployeeModalOpen, selectedEmployee, setValue, reset]);

  const onSubmit = async (data: EmployeeFormData) => {
    console.log("Create employee data:", data);
    if (isUpdateEmployeeModalOpen) {
      await updateEmployee(data);
      console.log("Update employee result:", result);
    } else {
      await convertToEmployee({ input: data });
      console.log("Create employee result:", result);
    }
    closeModal();
  };

  const updateEmployee = async (data: EmployeeFormData) => {
    const updateData: EmployeeUpdateInput = {
      job_title: data.job_title,
      department: data.department,
      hire_date: data.hire_date.toISOString(),
      employment_type: data.employment_type,
      employee_status: data.employee_status,
      work_location: data.work_location,
      salary: data.salary,
      bonus: data.bonus,
      bank_account: data.bank_account,
      benefits_eligible: data.benefits_eligible,
      leave_balance: data.leave_balance,
      work_shift: data.work_shift,
    };
    await updateEmployeeHandler(data.user_id, updateData);

    console.log("Update employee data:", data);
    // Call the update employee service here
    // await updateEmployeeService({ input: data });
    console.log("Update employee result:", result);
    closeUpdateModal();
  };

  const employmentTypes = [
    { key: "Full_time", label: "Full Time" },
    { key: "Part_time", label: "Part Time" },
    { key: "Contract", label: "Contract" },
    { key: "Intern", label: "Intern" },
  ];

  const employmentStatus = [
    { key: "Active", label: "Active" },
    { key: "Terminated", label: "Terminated" },
    { key: "On_leave", label: "On Leave" },
  ];

  return (
    <Modal
      isOpen={isCreateEmployeeModalOpen || isUpdateEmployeeModalOpen}
      size={"4xl"}
      onClose={closeModal}
      aria-label="Create Employee Modal"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create Employee
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Job Title */}

                <div className="flex items-center justify-between gap-3 w-full">
                  <Input
                    isRequired
                    id="job_title"
                    {...register("job_title")}
                    label="Job Title"
                    name="job_title"
                    placeholder="Enter job title"
                    type="text"
                    errorMessage={errors.job_title?.message}
                    isInvalid={!!errors.job_title?.message}
                  />

                  {/* Department */}
                  <Input
                    isRequired
                    id="department"
                    {...register("department")}
                    label="Department"
                    name="department"
                    placeholder="Enter department"
                    type="text"
                    errorMessage={errors.department?.message}
                    isInvalid={!!errors.department?.message}
                  />
                  {/* Hire Date - @heroui DatePicker */}
                  <DatePicker
                    label="Hire date"
                    id="hire_date"
                    {...register("hire_date", {
                      valueAsDate: true,
                    })}
                    onChange={(date) => {
                      if (date) {
                        setValue("hire_date", new Date(date.toString()));
                      }
                    }}
                    errorMessage={errors.hire_date?.message}
                    isInvalid={!!errors.hire_date?.message}
                  />
                </div>

                <div className="flex items-center justify-between gap-3 w-full">
                  {/* Employment Type */}
                  <Select
                    label="Employment Type"
                    placeholder="Select an employment type"
                    {...register("employment_type")}
                  >
                    {employmentTypes.map((type) => (
                      <SelectItem key={type.key}>{type.label}</SelectItem>
                    ))}
                  </Select>

                  {/* Employee Status */}
                  <Select
                    label="Employee Status"
                    placeholder="Select employee status"
                    {...register("employee_status")}
                  >
                    {employmentStatus.map((type) => (
                      <SelectItem key={type.key}>{type.label}</SelectItem>
                    ))}
                  </Select>
                </div>

                {/* Work Location */}
                <Input
                  id="work_location"
                  {...register("work_location")}
                  label="Work Location"
                  placeholder="Enter work location"
                  type="text"
                  errorMessage={errors.work_location?.message}
                  isInvalid={!!errors.work_location?.message}
                />

                <div className="flex items-center justify-between gap-3 w-full">
                  {/* Salary */}
                  <Input
                    id="salary"
                    type="number"
                    step={100}
                    {...register("salary", { valueAsNumber: true })}
                    label="Salary"
                    placeholder="Enter salary"
                    errorMessage={errors.salary?.message}
                    isInvalid={!!errors.salary?.message}
                  />

                  {/* Bonus */}
                  <Input
                    id="bonus"
                    type="number"
                    step={100}
                    {...register("bonus", { valueAsNumber: true })}
                    label="Bonus (optional)"
                    placeholder="Enter bonus"
                    errorMessage={errors.bonus?.message}
                    isInvalid={!!errors.bonus?.message}
                  />
                  {/* Bank Account */}
                  <Input
                    id="bank_account"
                    {...register("bank_account")}
                    label="Bank Account"
                    placeholder="Enter bank account"
                    type="text"
                    errorMessage={errors.bank_account?.message}
                    isInvalid={!!errors.bank_account?.message}
                  />
                </div>

                {/* Benefits Eligible */}
                <Checkbox
                  defaultSelected
                  {...register("benefits_eligible")}
                  className="flex items-center"
                >
                  Benefits Eligible
                </Checkbox>

                {/* Work Shift - radio buttons */}
                <RadioGroup
                  {...register("work_shift")}
                  isRequired
                  label="Work Shift"
                  className="space-y-2 w-1/2"
                  orientation="horizontal"
                  errorMessage={errors.work_shift?.message}
                  defaultValue="Morning"
                >
                  <Radio value="Morning">Morning</Radio>
                  <Radio value="Evening">Evening</Radio>
                  <Radio value="Night">Night</Radio>
                </RadioGroup>

                {/* Submit button */}
                <Button
                  type="submit"
                  color="primary"
                  className="w-full"
                  isLoading={result?.loading || isUpdateEmployeeLoading}
                >
                  {isUpdateEmployeeModalOpen
                    ? "Update Employee"
                    : "Create Employee"}
                </Button>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
