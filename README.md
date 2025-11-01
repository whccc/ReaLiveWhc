# 🤖 ReaLiveWhc - AI Vision Studio

Una aplicación web moderna que combina **Realidad Aumentada** con **Inteligencia Artificial** para clasificación de objetos en tiempo real y visualización de modelos 3D.

![AI Vision Studio](https://img.shields.io/badge/AI-Vision%20Studio-blueviolet?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite)
![TensorFlow](https://img.shields.io/badge/TensorFlow.js-FF6F00?style=for-the-badge&logo=tensorflow)

## ✨ Características Principales

### 🎯 **AI Vision Studio**
- **Clasificación en tiempo real** con MobileNet v2
- **Selección de área inteligente** con interfaz drag & drop
- **Análisis de confianza** con métricas visuales
- **Interfaz profesional** con gradientes y animaciones

### 🌐 **Model Viewer AR**
- **Visualización 3D** con @google/model-viewer
- **Realidad Aumentada** WebXR compatible
- **Controles de cámara** interactivos
- **Carga optimizada** de modelos .glb

### 🎨 **Diseño Moderno**
- **UI/UX profesional** con Tailwind CSS
- **Gradientes dinámicos** y efectos de transparencia
- **Responsive design** para múltiples dispositivos
- **Feedback visual** inmediato

## 🚀 Instalación Rápida

### Prerrequisitos
- **Node.js** v16+ 
- **npm** o **yarn**
- **Cámara web** (para funciones AI)
- **Navegador moderno** con soporte WebGL

### 1. Clonar el repositorio
```bash
git clone https://github.com/whccc/ReaLiveWhc.git
cd ReaLiveWhc
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar dependencias (si hay conflictos)
```bash
npm install --legacy-peer-deps
```

### 4. Ejecutar en desarrollo
```bash
npm run dev
```

### 5. Abrir en el navegador
```
http://localhost:5174
```

## 📦 Tecnologías Utilizadas

### **Frontend Core**
- **React 19.1.1** - Biblioteca de UI moderna
- **Vite 7.1.7** - Build tool ultrarrápido
- **Tailwind CSS 4.1.15** - Framework CSS utility-first

### **Inteligencia Artificial**
- **@tensorflow/tfjs** - Machine Learning en el navegador
- **@tensorflow-models/mobilenet** - Modelo de clasificación optimizado

### **Realidad Aumentada**
- **@google/model-viewer 4.1.0** - Visualización 3D y AR
- **Three.js 0.172.0** - Biblioteca 3D para web

### **Computer Vision**
- **@mediapipe/hands** - Detección de gestos
- **@mediapipe/camera_utils** - Utilidades de cámara
- **@mediapipe/drawing_utils** - Herramientas de dibujo

## 🎮 Uso de la Aplicación

### **AI Vision Studio**
1. **Acceder a la cámara**: Permite el acceso cuando se solicite
2. **Seleccionar área**: Arrastra para crear un rectángulo de análisis
3. **Mover/Redimensionar**: Clic dentro para mover, en bordes para redimensionar
4. **Ver predicciones**: La IA analiza el área seleccionada cada segundo

### **Model Viewer AR**
1. **Visualizar modelo**: El astronauta 3D se carga automáticamente
2. **Controles de cámara**: Rotar, zoom, panorámica
3. **Modo AR**: Usar botón AR en dispositivos compatibles
4. **Auto-rotación**: El modelo gira automáticamente

## 🛠️ Scripts Disponibles

```bash
# Desarrollo con hot reload
npm run dev

# Desarrollo con acceso de red (para móviles)
npm run dev -- --host

# Build de producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 📁 Estructura del Proyecto

```
ReaLiveWhc/
├── public/
│   ├── Astronaut.glb          # Modelo 3D principal
│   └── vite.svg               # Favicon
├── src/
│   ├── feature/
│   │   └── decorator/
│   │       ├── components/
│   │       │   ├── 3dPaint/   # AI Vision Studio
│   │       │   └── modelViewer/ # Visualizador 3D
│   │       └── pages/
│   │           └── decorator-page/ # Página principal
│   ├── styles/
│   │   └── index.css          # Estilos globales
│   └── main.jsx               # Punto de entrada
├── .npmrc                     # Configuración npm
├── eslint.config.js           # Configuración ESLint
├── tailwind.config.js         # Configuración Tailwind
├── vite.config.js             # Configuración Vite
└── package.json               # Dependencias y scripts
```

## 🔧 Configuración de Desarrollo

### **Variables de Entorno**
Crea un archivo `.env.local`:
```env
VITE_APP_TITLE=AI Vision Studio
VITE_MODEL_PATH=/Astronaut.glb
```

### **Configuración de Cámara**
La aplicación solicita permisos de cámara automáticamente. Para desarrollo local:
- **Chrome**: Permite cámara en localhost
- **HTTPS requerido** para dominios externos
- **Dispositivos móviles**: Usar `--host` para acceso de red

### **Optimización de Modelos**
- Modelos `.glb` en carpeta `public/`
- Tamaño recomendado: < 10MB
- Formato optimizado con Blender o herramientas similares

## 🚀 Despliegue

### **Vercel (Recomendado)**
1. Conectar repositorio de GitHub
2. Configurar build command: `npm run build`
3. Output directory: `dist`
4. Variables de entorno según necesidad

### **Netlify**
```bash
npm run build
# Subir carpeta dist/
```

### **Configuración de Producción**
```bash
# Build optimizado
npm run build

# Verificar build localmente
npm run preview
```

## 🤝 Contribuir

1. **Fork** el proyecto
2. **Crear rama** para nueva funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Abrir Pull Request**

## 📋 Roadmap

- [ ] **Detección de múltiples objetos** simultáneos
- [ ] **Clasificación personalizada** con modelos propios
- [ ] **Grabación de sesiones** AR
- [ ] **Compartir en redes sociales**
- [ ] **Modo offline** con Service Workers
- [ ] **Soporte para más formatos** 3D (.usdz, .obj)

## 🐛 Problemas Conocidos

### **Conflictos de Dependencias**
Si encuentras errores con `three.js`:
```bash
npm install --legacy-peer-deps
```

### **Problemas de Cámara**
- **Firefox**: Verificar permisos en configuración
- **Safari**: Requiere HTTPS para getUserMedia
- **Chrome móvil**: Usar `--host` para testing

### **Rendimiento**
- **Modelos grandes**: Optimizar archivos .glb
- **Dispositivos lentos**: Reducir frecuencia de análisis IA

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**whccc** - [GitHub](https://github.com/whccc)

---

⭐ **¡Dale una estrella si te gusta el proyecto!** ⭐
