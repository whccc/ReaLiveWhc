import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

export default function Hand3DApp() {
  const videoRef = useRef(null);
  const threeCanvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, cube;

    // 🟢 Inicializa Three.js
    const initThree = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer = new THREE.WebGLRenderer({
        canvas: threeCanvasRef.current,
        alpha: true,
      });
      renderer.setSize(width, height);

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 10;

      const light = new THREE.PointLight(0xffffff, 1);
      light.position.set(2, 2, 5);
      scene.add(light);

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // animación básica
      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.02;
        cube.rotation.y += 0.02;
        renderer.render(scene, camera);
      };
      animate();

      return cube;
    };

    cube = initThree();

    // 🟡 Dibuja landmarks sobre overlayCanvas
    const drawLandmarks = (landmarks) => {
      const ctx = overlayCanvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = "lime";
      landmarks.forEach((point) => {
        const x = (1 - point.x) * ctx.canvas.width; // espejo
        const y = point.y * ctx.canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
      });
    };

    // 🟣 Configura MediaPipe Hands
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
      const ctx = overlayCanvasRef.current.getContext("2d");

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        drawLandmarks(landmarks);

        // 🧠 Tomamos el dedo índice (landmark 8)
        const index = landmarks[8];

        // 🔄 Corrige el eje X (coincide con video espejo)
        const x = -(index.x - 0.5) * 2;
        const y = -(index.y - 0.5) * 2;
        const z = index.z;

        // 🎚 Escala el cubo según profundidad (más cerca → más grande)
        const scale = THREE.MathUtils.clamp(1 - z * 2, 0.3, 2.5);

        cube.position.x = x;
        cube.position.y = y;
        cube.scale.set(scale, scale, scale);
      } else {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }
    });

    // 🔵 Cámara
    const video = videoRef.current;
    const cam = new Camera(video, {
      onFrame: async () => {
        await hands.send({ image: video });
      },
      width: 640,
      height: 480,
    });

    cam.start();
    video.style.transform = "scaleX(-1)";

    return () => {
      cam.stop();
      hands.close();
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "black",
      }}
    >
      {/* 🎥 Video de la cámara */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "scaleX(-1)",
        }}
      />

      {/* 🧊 Canvas de Three.js */}
      <canvas
        ref={threeCanvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* 🟢 Canvas overlay para los puntos */}
      <canvas
        ref={overlayCanvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
