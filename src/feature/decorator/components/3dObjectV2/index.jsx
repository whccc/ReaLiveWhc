import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

const ThreeDObjectV2 = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef();
  const objectRef = useRef();
  const prevZ = useRef(null);

  useEffect(() => {
    // 🟣 1. Crear escena 3D
    const scene = new THREE.Scene();
    const camera3D = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    // Luz y objeto
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff88 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    objectRef.current = cube;

    camera3D.position.z = 3;

    const animate = () => {
      cube.rotation.x += 0.01;
     cube.rotation.y += 0.02;
      requestAnimationFrame(animate);
      renderer.render(scene, camera3D);
    };
    animate();

    // 🟢 2. Configurar MediaPipe Hands
    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    hands.onResults((results) => {
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        console.log(landmarks);
        const wristZ = landmarks[0].z; // profundidad de la muñeca
        const cube = objectRef.current;
        if (cube) {
          if (prevZ.current !== null) {
            const delta = prevZ.current - wristZ;
            const scale = 1 + delta * 5; // sensibilidad
            cube.scale.multiplyScalar(scale);
          }
          prevZ.current = wristZ;
        }
      }
    });

    // 🟡 3. Configurar cámara del navegador
    const video = videoRef.current;
    const cam = new Camera(video, {
      onFrame: async () => {
        await hands.send({ image: video });
      },
      width: 640,
      height: 480,
    });
    cam.start();

    return () => {
      hands.close();
      cam.stop();
    };
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <video ref={videoRef} className="hidden" />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ThreeDObjectV2;
