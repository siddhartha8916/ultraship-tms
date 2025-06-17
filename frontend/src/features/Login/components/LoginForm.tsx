import { Form, Input, Button } from "@heroui/react";
import useLoginForm from "../hooks/useLoginForm";

export const LoginForm = () => {
  const { handleSubmit } = useLoginForm();

  return (
    <Form
      className="w-full max-w-md flex flex-col gap-6 bg-white p-10 rounded-xl shadow-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Welcome Back
      </h2>

      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
      />

      <Input
        isRequired
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your password"
        type="password"
      />

      <div className="flex gap-3 justify-between">
        <Button color="primary" type="submit" className="w-full">
          Submit
        </Button>
        <Button type="reset" variant="flat" className="w-full">
          Reset
        </Button>
      </div>
    </Form>
  );
};
