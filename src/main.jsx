import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@google/model-viewer";
import "./styles/index.css";
import DecoratorPage from "./feature/decorator/pages/decorator-page/index.jsx";
import Visual3DObjectPage from "./feature/decorator/pages/visual-3d-object-page/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Visual3DObjectPage />
  </StrictMode>
);
