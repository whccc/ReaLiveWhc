const ModelSelector = ({ onSelect }) => {
  const models = [
    { name: "Sofá", src: "/Astronaut.glb" },
    { name: "Silla", src: "/Astronaut.glb" },
    { name: "Planta", src: "/Astronaut.glb" },
  ];

  return (
    <div className="flex justify-center gap-4 mt-4 flex-wrap">
      {models.map((m) => (
        <button
          key={m.name}
          onClick={() => onSelect(m.src)}
          className="px-4 py-2 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition text-sm md:text-base"
        >
          {m.name}
        </button>
      ))}
    </div>
  );
};
export default ModelSelector;
