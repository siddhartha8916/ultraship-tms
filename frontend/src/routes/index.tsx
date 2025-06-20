import EmployeesPage from "@/pages/app/employees";
import { HomePage } from "@/pages/app/home";
import UsersPage from "@/pages/app/users";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import AuthLayout from "@/shared/components/layout/auth-layout";
import DashboardLayout from "@/shared/components/layout/dashboard-layout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Authentication Routes*/}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      {/* ====================== Application Routes ====================== */}

      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Route>

      {/* If no matching route is found, redirect to the dashboard */}
      <Route path="*" element={<Navigate to="/" />} />
    </>
  )
);

export default router;
