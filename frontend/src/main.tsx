import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router";
import router from "./routes/index.tsx";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "./lib/react-query/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <HeroUIProvider>
        <Toaster
          position="top-center"
          visibleToasts={1}
          richColors
        />
        <RouterProvider router={router} />
      </HeroUIProvider>
    </ReactQueryProvider>
  </StrictMode>
);
