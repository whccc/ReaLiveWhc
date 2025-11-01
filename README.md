# 🤖 ReaLiveWhc - AI Vision Studio

Una aplicación web moderna con **Inteligencia Artificial** para clasificación de objetos en tiempo real.

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

## 🎮 Uso de la Aplicación

### **AI Vision Studio**

1. **Acceder a la cámara**: Permite el acceso cuando se solicite
2. **Seleccionar área**: Arrastra para crear un rectángulo de análisis
3. **Mover/Redimensionar**: Clic dentro para mover, en bordes para redimensionar
4. **Ver predicciones**: La IA analiza el área seleccionada cada segundo

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
