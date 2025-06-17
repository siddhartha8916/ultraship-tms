// hooks/useRegisterForm.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/shared/store";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useRegisterUser } from "../services";
import { RegisterSchema as Schema, RegisterResponseSchema } from "../models";
import type { z } from "zod";

type RegisterFormData = z.infer<typeof Schema>;

export default function useRegisterForm() {
  const { mutateAsync: registerUser, isPaused: isRegisterUserLoading } = useRegisterUser();
  const updateCurrentUser = useUserStore((state) => state.updateCurrentUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: useFormHandleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(Schema),
  });

  const handleSubmit = useFormHandleSubmit(async (formData) => {
    try {
      const result = await registerUser({ body: formData });
      const validated = RegisterResponseSchema.parse(result);
      updateCurrentUser(validated.user);
      toast.success("Registration successful!");
      reset();
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
  });

  return {
    register,
    handleSubmit,
    errors,
    isRegisterUserLoading,
  };
}
