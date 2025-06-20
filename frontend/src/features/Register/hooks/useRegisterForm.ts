// hooks/useRegisterForm.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useRegisterUser } from "../services";
import { RegisterSchema as Schema, RegisterResponseSchema } from "../models";
import type { z } from "zod";

type RegisterFormData = z.infer<typeof Schema>;

export default function useRegisterForm() {
  const { mutateAsync: registerUser, isPending: isRegisterUserLoading } =
    useRegisterUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: useFormHandleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(Schema),
  });

  console.log("Register form watch:", watch());

  const handleSubmit = useFormHandleSubmit(async (formData) => {
    try {
      const result = await registerUser({ body: formData });
      RegisterResponseSchema.parse(result);
      toast.success("Registration successful!, Login with your credentials");
      reset();
      navigate("/auth/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  });

  return {
    register,
    handleSubmit,
    errors,
    isRegisterUserLoading,
    setValue
  };
}
