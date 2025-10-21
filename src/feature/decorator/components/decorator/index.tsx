

const Decorator = () => {
  return (
    <div>
      <model-viewer
        src="/path/to/your/model.glb"
        alt="A 3D model"
        camera-controls
        auto-rotate
        exposure={1.5}
      ></model-viewer>
    </div>
  );
};

export default Decorator;
