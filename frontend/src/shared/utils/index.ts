import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { AppSurveyError } from "../schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseApiError = (error: unknown): string => {
  let errorMessage = "An unexpected error occurred";

  if (error instanceof AxiosError) {
    const err = error.response?.data as AppSurveyError;

    console.error("API Error :>> ", err);

    if (err && err.message) {
      // Check if error code exists in the predefined messages
      errorMessage = err.message;
    }
  }

  return errorMessage;
};
