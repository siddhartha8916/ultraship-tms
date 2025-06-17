// src/components/ErrorBoundary.tsx
import React from "react";

interface State {
  hasError: boolean;
  error: Error | null;
}

export class EmployeeErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full flex items-center justify-center bg-gray-100 p-6 w-full">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
            <div className="text-6xl mb-4">💥</div>
            <h2 className="text-2xl font-semibold text-red-600 mb-2">
              Oops! Something went wrong.
            </h2>
            <p className="text-gray-700">{this.state.error?.message}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
