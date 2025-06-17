import { axiosApiClient } from "@/lib/axios/client";
import type { RegisterResponse, RegisterSchema } from "../models";
import { AuthApiPaths } from "@/config/apiPaths";

export const registerUser = async ({
  body,
}: {
  body: RegisterSchema;
}): Promise<RegisterResponse> => {
  const { data } = await axiosApiClient.post(AuthApiPaths.REGISTER_USER, body);
  return data;
};
