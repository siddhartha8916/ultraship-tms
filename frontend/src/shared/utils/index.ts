/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { AppSurveyError } from "../schema";
import type { ServerError } from "@apollo/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseApiError = (error: unknown): string => {
  let errorMessage = "An unexpected error occurred";
  console.error("Error :>>", error);
  // Handle Axios errors
  if (error instanceof AxiosError) {
    const errData = error.response?.data as AppSurveyError;
    console.error("Axios API Error :>> ", errData);

    if (errData?.message) {
      errorMessage = Array.isArray(errData.message)
        ? errData.message.join(", ")
        : errData.message;
    }

    return errorMessage;
  }

  // Handle Apollo GraphQL ServerError
  if (
    typeof error === "object" &&
    error !== null &&
    "result" in error &&
    "statusCode" in error
  ) {
    const serverErr = error as ServerError;

    const result = serverErr.result as any;
    if (result?.data?.message) {
      const msg = result.data.message;
      errorMessage = Array.isArray(msg) ? msg.join(", ") : String(msg);
    } else if (result?.message) {
      errorMessage = result.message;
    }

    console.error("GraphQL ServerError :>>", serverErr);
    return errorMessage;
  }

  return errorMessage;
};
