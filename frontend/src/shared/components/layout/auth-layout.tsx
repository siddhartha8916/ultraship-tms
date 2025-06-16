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
    <div className={cn("h-screen flex flex-col flex-1 p-0 m-0")}>
      <div className="grid">
        <AppNavbar />
        {outlet}
      </div>
    </div>
  );
};

export default AuthLayout;
