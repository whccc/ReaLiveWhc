import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import ImageClassifierPage from "./feature/decorator/pages/image-classifier-page/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ImageClassifierPage />
  </StrictMode>
);
