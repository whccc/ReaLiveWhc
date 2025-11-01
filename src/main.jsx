import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import ImageClassifierPage from "./feature/decorator/pages/image-classifier-page/index.jsx";
import Layout from "./feature/layout/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Layout>
      <ImageClassifierPage />
    </Layout>
  </StrictMode>
);
