import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@google/model-viewer";
import "./index.css";
import DecoratorPage from "./feature/decorator/pages/decorator-page";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DecoratorPage />
  </StrictMode>
);
