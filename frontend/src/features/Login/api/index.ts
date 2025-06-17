import { axiosApiClient } from "@/lib/axios/client";
import type { LoginResponse, LoginSchema } from "../models";
import { AuthApiPaths } from "@/config/apiPaths";

export const loginUser = async ({
  body,
}: {
  body: LoginSchema;
}): Promise<LoginResponse> => {
  const { data } = await axiosApiClient.post(AuthApiPaths.LOGIN_USER, body);
  return data;
};


export const logoutUser = async (): Promise<void> => {
  const { data } = await axiosApiClient.post(AuthApiPaths.LOGOUT_USER);
  return data;
};