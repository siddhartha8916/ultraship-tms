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

  if (error instanceof AxiosError) {
    const errData = error.response?.data as AppSurveyError;

    const nestedMessage = errData?.data?.message;

    const topLevelMessage = errData?.message;

    if (typeof topLevelMessage === "string") {
      errorMessage = topLevelMessage;
    }

    if (Array.isArray(topLevelMessage)) {
      errorMessage = topLevelMessage.join(", ");
    }

    if (Array.isArray(nestedMessage) && nestedMessage.length > 0) {
      errorMessage = nestedMessage.join(", ");
    }

    if (typeof nestedMessage === "string") {
      errorMessage = nestedMessage;
    }
  }

  return errorMessage;
};

export const parseGraphQLApiError = (error: unknown): string => {
  let errorMessage = "An unexpected error occurred";

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
