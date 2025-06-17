import { useMutation } from "@tanstack/react-query";
import { loginUser, logoutUser } from "../api";

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export const useLogoutUser = () => {
 return useMutation({
    mutationFn: logoutUser,
  });
}