const ModelViewer = () => {
  return (
    <model-viewer
      src="Astronaut.glb"
      alt="Astronauta 3D"
      ar
      ar-modes="scene-viewer quick-look webxr"
      camera-controls
      auto-rotate
      shadow-intensity="1"
      className="absolute top-0 left-0 w-full h-full border-1 border-white z-5"
    ></model-viewer>
  );
};

export default ModelViewer;
