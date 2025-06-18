// components/RegisterForm.tsx
import { Form, Input, Button, RadioGroup, Radio } from "@heroui/react";
import useRegisterForm from "../hooks/useRegisterForm";

export const RegisterForm = () => {
  const { handleSubmit, register, errors, isRegisterUserLoading, setValue } =
    useRegisterForm();

  return (
    <Form
      className="w-full max-w-xl flex flex-col gap-6 bg-white p-10 rounded-xl shadow-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Create an Account
      </h2>

      <div className="flex items-center justify-between gap-3 w-full">
        <Input
          {...register("first_name")}
          isRequired
          label="First Name"
          labelPlacement="outside"
          placeholder="Enter your first name"
          errorMessage={errors.first_name?.message}
          isInvalid={!!errors.first_name?.message}
        />

        <Input
          {...register("middle_name")}
          label="Middle Name"
          labelPlacement="outside"
          placeholder="Enter your middle name"
          errorMessage={errors.middle_name?.message}
          isInvalid={!!errors.middle_name?.message}
        />
      </div>
      <div className="flex items-center justify-between gap-3 w-full">
        <Input
          {...register("last_name")}
          isRequired
          label="Last Name"
          className="w-1/2"
          labelPlacement="outside"
          placeholder="Enter your last name"
          errorMessage={errors.last_name?.message}
          isInvalid={!!errors.last_name?.message}
        />
        <RadioGroup
          isRequired
          label="Role"
          className="space-y-2 w-1/2"
          orientation="horizontal"
          errorMessage={errors.role?.message}
          defaultValue="employee"
          isInvalid={!!errors.role?.message}
          onValueChange={(value) => setValue("role", value)}
        >
          <Radio value="employee">Employee</Radio>
          <Radio value="admin">Admin</Radio>
        </RadioGroup>
      </div>

      <Input
        {...register("email")}
        isRequired
        label="Email"
        labelPlacement="outside"
        placeholder="Enter your email"
        type="email"
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email?.message}
      />

      <Input
        {...register("password")}
        isRequired
        label="Password"
        labelPlacement="outside"
        placeholder="Enter your password"
        type="password"
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password?.message}
      />

      <div className="flex gap-3 justify-between">
        <Button
          color="primary"
          type="submit"
          className="w-full"
          isLoading={isRegisterUserLoading}
          disabled={isRegisterUserLoading}
        >
          Register
        </Button>
        <Button type="reset" variant="flat" className="w-full">
          Reset
        </Button>
      </div>
    </Form>
  );
};
