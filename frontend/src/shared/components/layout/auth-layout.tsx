import { useUserStore } from "@/shared/store";
import { cn } from "@/shared/utils";
import { Navigate, useOutlet } from "react-router";
import AppNavbar from "../ui/Navbar";

// The layout component for authentication-related pages.
const AuthLayout = () => {
  // Get the user object from the AuthContext using the useUser hook.
  const { currentUser } = useUserStore();

  // Get the nested child elements from the matched route using useOutlet.
  const outlet = useOutlet();

  // If the user is already authenticated, redirect to the main dashboard.
  if (currentUser?.id) {
    return <Navigate to="/" />;
  }

  // Render the layout for authentication-related pages.
  return (
    <div className={cn("h-screen flex flex-col p-0 m-0")}>
      <div className="flex-none">
        <AppNavbar />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="relative h-full w-screen">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{ backgroundImage: "url('/assets/login-bg.webp')" }}
          />

          <div className="absolute inset-0 bg-black opacity-40" />
        {outlet}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
