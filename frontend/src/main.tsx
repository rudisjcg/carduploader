import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryProvider } from "./context/ReactQuery.tsx";

createRoot(document.getElementById("root")!).render(
  <ReactQueryProvider>
    <BrowserRouter>
      <StrictMode>
        <ChakraProvider>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </ChakraProvider>
      </StrictMode>
    </BrowserRouter>
  </ReactQueryProvider>
);
