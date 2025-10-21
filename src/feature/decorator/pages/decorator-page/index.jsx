import { useState } from "react";
import { CameraBackground } from "../../components/CamaraBackground";
import ModelSelector from "../../components/ModelSelector";
import ModelViewer from "../../components/modelViewer";

const DecoratorPage = () => {
  const [selectedModel, setSelectedModel] = useState("/assets/sofa.glb");

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-black">
      <CameraBackground />

      <ModelViewer />
      <div className="absolute top-0 left-0 border-1 border-white text-center p-4 z-10 bg-black bg-opacity-50 rounded-md">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          DecorAR 🛋️
        </h1>

        <ModelSelector onSelect={setSelectedModel} />

        <p className="text-gray-300 mt-6 text-sm md:text-base">
          Visualiza cómo quedaría tu mueble favorito en tu espacio real.
        </p>
      </div>
    </div>
  );
};
export default DecoratorPage;
