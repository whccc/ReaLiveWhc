import { useEffect, useRef } from "react";

export const CameraBackground = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error al acceder a la cámara:", err));
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      className="absolute top-0 left-0 w-full h-full object-contain z-0"
    />
  );
};
