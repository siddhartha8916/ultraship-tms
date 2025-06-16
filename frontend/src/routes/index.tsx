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
        <Route path="login" element={<>Login Page</>} />
        <Route path="register" element={<>Register Page</>} />
      </Route>
      {/* ====================== Application Routes ====================== */}

      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<>?Home Page</>} />
        <Route path="employee" element={<>Employee Page</>} />
      </Route>

      {/* If no matching route is found, redirect to the dashboard */}
      <Route path="*" element={<Navigate to="/" />} />
    </>
  )
);

export default router;
