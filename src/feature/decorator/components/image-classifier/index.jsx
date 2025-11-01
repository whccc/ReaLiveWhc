import { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

const ImageClassifier = () => {
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const hiddenCanvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cameraReady, setCameraReady] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [rect, setRect] = useState({ x: 100, y: 100, width: 200, height: 200 });
  const startPoint = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const loadModel = async () => {
      try {
        const m = await mobilenet.load();
        setModel(m);
        setIsLoading(false);
        console.log("Modelo MobileNet cargado ✅");
      } catch (error) {
        console.error("Error cargando modelo:", error);
        setIsLoading(false);
      }
    };
    loadModel();

    const initCamera = async () => {
      const video = videoRef.current;
      if (!video) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false,
        });
        video.srcObject = stream;
        await video.play();
        setCameraReady(true);
      } catch (err) {
        console.error("Error accediendo a la cámara:", err);
      }
    };
    initCamera();
  }, []);

  useEffect(() => {
    const canvas = overlayRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 0, 0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.clearRect(rect.x, rect.y, rect.width, rect.height);

      ctx.strokeStyle = "#00ff88";
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 5]);
      ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

      const cornerSize = 8;
      ctx.fillStyle = "#00ff88";
      ctx.setLineDash([]);
      ctx.fillRect(
        rect.x - cornerSize / 2,
        rect.y - cornerSize / 2,
        cornerSize,
        cornerSize
      );

      ctx.fillRect(
        rect.x + rect.width - cornerSize / 2,
        rect.y - cornerSize / 2,
        cornerSize,
        cornerSize
      );

      ctx.fillRect(
        rect.x - cornerSize / 2,
        rect.y + rect.height - cornerSize / 2,
        cornerSize,
        cornerSize
      );

      ctx.fillRect(
        rect.x + rect.width - cornerSize / 2,
        rect.y + rect.height - cornerSize / 2,
        cornerSize,
        cornerSize
      );

      requestAnimationFrame(draw);
    };
    draw();
  }, [rect]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rectCanvas = overlayRef.current.getBoundingClientRect();
    const x = rectCanvas.width - (e.clientX - rectCanvas.left);
    const y = e.clientY - rectCanvas.top;

    startPoint.current = { x, y };
    setRect({
      x: startPoint.current.x,
      y: startPoint.current.y,
      width: 0,
      height: 0,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rectCanvas = overlayRef.current.getBoundingClientRect();
    const x = rectCanvas.width - (e.clientX - rectCanvas.left);
    const y = e.clientY - rectCanvas.top;

    const current = { x, y };
    setRect({
      x: Math.min(startPoint.current.x, current.x),
      y: Math.min(startPoint.current.y, current.y),
      width: Math.abs(current.x - startPoint.current.x),
      height: Math.abs(current.y - startPoint.current.y),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!model || !videoRef.current || !hiddenCanvasRef.current) return;
    const interval = setInterval(async () => {
      try {
        const video = videoRef.current;
        const hiddenCanvas = hiddenCanvasRef.current;
        const ctx = hiddenCanvas.getContext("2d");

        ctx.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.height);
        ctx.drawImage(
          video,
          rect.x * (video.videoWidth / overlayRef.current.width),
          rect.y * (video.videoHeight / overlayRef.current.height),
          rect.width * (video.videoWidth / overlayRef.current.width),
          rect.height * (video.videoHeight / overlayRef.current.height),
          0,
          0,
          224,
          224
        );

        const img = tf.browser.fromPixels(hiddenCanvas);
        const predictions = await model.classify(img);
        setPrediction(predictions[0]);
        img.dispose();
      } catch (err) {
        console.error("Error clasificando imagen:", err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [model, rect]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="absolute top-0 left-0 w-full z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            RealiveWhc
          </h1>
          <p className="text-slate-300 mt-2 text-lg">
            Clasificación inteligente de objetos en tiempo real
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 z-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold mb-2">Cargando AI Model</h2>
            <p className="text-slate-400">
              Preparando MobileNet para clasificación...
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center min-h-screen pt-24 pb-8 px-6">
        <div className="max-w-6xl w-full">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-cyan-400">
                    Cámara en Vivo
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        cameraReady ? "bg-green-400" : "bg-red-400"
                      }`}
                    ></div>
                    <span className="text-sm text-slate-300">
                      {cameraReady ? "Conectado" : "Desconectado"}
                    </span>
                  </div>
                </div>

                <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
                  <video
                    ref={videoRef}
                    width={640}
                    height={480}
                    className="w-full h-auto border-2 border-slate-600 rounded-xl"
                    style={{ transform: "scaleX(-1)" }}
                    autoPlay
                    muted
                    playsInline
                  />

                  <canvas
                    ref={overlayRef}
                    width={640}
                    height={480}
                    className="absolute top-0 left-0 w-full h-full cursor-crosshair"
                    style={{ transform: "scaleX(-1)" }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                  />

                  <div className="absolute bottom-4 left-4 bg-black/70 rounded-lg px-3 py-2">
                    <p className="text-sm text-cyan-400">
                      📷 Arrastra para seleccionar área de análisis
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center">
                  <span className="mr-2">🤖</span>
                  Predicción AI
                </h3>

                {prediction ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl p-4 border border-cyan-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">🎯</span>
                        <span className="text-sm text-slate-400">
                          Detectado
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-1">
                        {prediction.className}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">
                          Confianza:
                        </span>
                        <span className="text-lg font-semibold text-cyan-400">
                          {(prediction.probability * 100).toFixed(1)}%
                        </span>
                      </div>

                      <div className="mt-3 bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${prediction.probability * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="animate-pulse">
                      <div className="text-4xl mb-2">👁️</div>
                      <p className="text-slate-400">
                        {cameraReady
                          ? "Analizando imagen..."
                          : "Esperando cámara..."}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center">
                  <span className="mr-2">📊</span>
                  Estadísticas
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Modelo:</span>
                    <span className="text-white font-medium">MobileNet v2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Resolución:</span>
                    <span className="text-white font-medium">640x480</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Estado:</span>
                    <span
                      className={`font-medium ${
                        model ? "text-green-400" : "text-yellow-400"
                      }`}
                    >
                      {model ? "Activo" : "Cargando..."}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Área seleccionada:</span>
                    <span className="text-white font-medium">
                      {rect.width}x{rect.height}px
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-6 border border-blue-500/30">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">
                  💡 Instrucciones
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">1.</span>
                    Arrastra en la cámara para seleccionar un área
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">2.</span>
                    La IA analizará solo esa región
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">3.</span>
                    Obtén predicciones en tiempo real
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <canvas
        ref={hiddenCanvasRef}
        width={224}
        height={224}
        className="hidden"
        style={{ transform: "scaleX(-1)" }}
      />
    </div>
  );
};

export default ImageClassifier;
