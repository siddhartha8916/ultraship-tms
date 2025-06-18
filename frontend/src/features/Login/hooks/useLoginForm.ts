import { useUserStore } from "@/shared/store";
import type { LoginSchema } from "../models";
import { useLoginUser } from "../services";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function useLoginForm() {
  const { mutateAsync: loginUser, isPending: isLoginUserLoading } =
    useLoginUser();
  const { updateCurrentUser } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const loginData: LoginSchema = {
      email: data.email as string,
      password: data.password as string,
    };
    loginUser({ body: loginData })
      .then((response) => {
        updateCurrentUser(response.user);
        navigate("/");
        toast.success("Login successful!");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return {
    handleSubmit,
    isLoginUserLoading,
  };
}
