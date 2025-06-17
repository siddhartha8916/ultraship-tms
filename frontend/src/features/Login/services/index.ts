import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api";

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};