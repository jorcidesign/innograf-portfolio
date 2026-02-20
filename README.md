# 🚀 Innograf - Interactive SPA Portfolio

<p align="center">
  <em>Una Single Page Application (SPA) de diseño premium, ultrarrápida y construida 100% desde cero (Zero-Dependencies) enfocada en el alto rendimiento visual y animaciones estilo Awwwards.</em>
</p>

## 🛠️ Stack Tecnológico

Este proyecto se destaca por **no depender de grandes frameworks** (React, Vue, Angular) ni de pesadas librerías de animación (GSAP, Framer Motion). Todo está creado a mano para un control milimétrico:

- **Vanilla JavaScript (ES6+)**
- **TypeScript** para un tipado estricto y código predecible.
- **CSS3 Puro** (Sin frameworks como Tailwind o Bootstrap).
- **Vite** como empaquetador ultrarrápido (Build Tool).

## 🏗️ Arquitectura (Atomic Design)

Seguimos una metodología estricta basada en **Atomic Design** en nuestro directorio `src/`, lo que garantiza escalabilidad y máxima reutilización. Cada componente encapsula su propia lógica (`index.ts`) y sus estilos (`style.css`).

```text
src/
├── components/
│   ├── atoms/       # Elementos mínimos indivisibles (Botones, CustomCursor, Logos)
│   ├── molecules/   # Agrupación de átomos simples
│   ├── organisms/   # Bloques complejos e interactivos (Sliders, Footers, Headers)
├── templates/       # Estructuras maestras de layouts (MainLayout)
├── pages/           # Vistas enrutables que nutren a los templates
├── core/            # El sistema base abstracto (Component, Router, Animaciones)
└── data/            # Fuente de la verdad descentralizada (Contenidos locales)
```

**Ejemplo - Cómo se usa un Componente internamente:**
```typescript
import { Button } from '../../components/atoms/Button';

// Instanciar el botón pasándole props
const myButton = new Button({
    text: 'Contáctanos',
    variant: 'solid',
    color: 'dark'
});

// Nuestro helper lo inyecta directamente dentro de un selector local y guarda la referencia para el Garbage Collector
this.mountChild('#btn-container', myButton);
```

## 🗺️ Core & Enrutamiento (El Motor SPA)

Hemos construido nuestro propio sistema de Routing capaz de orquestar navegación entre páginas sin recargar el navegador web, garantizando transiciones cinematográficas completas:

- **Router Base (`src/core/Router.ts`)**: Secuestra clics en enlaces globales interrumpiendo su comportamiento por defecto, manipula el API local de **History (`pushState`)** y controla qué `Página` construir y montar en el root.
- **Intercepción y Congelamiento**: Al cambiar de vista, el enrutador congela obligatoriamente el `<body>` y bloquea el reseteo de scroll local para evitar saltos o pestañeos visuales mientras se procesa la descarga de la nueva pantalla.
- **`TransitionManager`**: Entidad que orquesta "telones" multicapas (paneles CSS). Aplica asincronía (Promise-based) para efectuar la limpieza e instancia DOM en "backstage" mientras la vista del visitante está enteramente tapada. Luego rebela el nuevo DOM.

## ⚡ Rendimiento y Principios (El Diferenciador Clave)

Para lograr que los componentes y las iteraciones espaciales fluyan a 60FPS limpios sin ahogar el consumo de memoria o de batería (móviles), la plataforma se basa en los siguientes principios:

### 1. Garbage Collection Manual (Cero Fugas de Memoria)
Al ser una SPA manual, el HTML de un nodo puede eliminarse, pero los oyentes globales (`window.addEventListener`) persisten zombificados generando *leaks*. Nuestra clase abstracta base `Component` demanda ciclos de vida explícitos (`onDestroy()`) y control en la jerarquía:

```typescript
// Component.ts gestiona la caída en dominó de los "Sub-componentes"
onDestroy(): void {
    // 1. Limpieza de Listeners y observers. Cancelaciones a variables requestAnimationFrame.
    // 2. Destruimos los hijos en cascada
    this.children.forEach(child => child.onDestroy());
    this.children = [];
}
```

### 2. Optimizaciones de GPU (Hardware Acceleration)
Redireccionamos las delegaciones matemáticas fuera del hilo principal del procesador. Funciones como el **Custom Cursor** o los arrastres de **Sliders** delegan procesos geométricos a la gráfica:
- Uso mandatorio de `transform: translate3d(x, y, z)` para forzar que el navegador genere su propia capa (render layer).
- Anunciamiento predictivo mediante la clase `will-change: transform`.
- Interpolaciones Lineales fluidas (LERP) impulsadas bajo estrictos ciclos `requestAnimationFrame()`.

### 3. Prevención de Layout Thrashing y Forced Reflows
Es un pecado mortal pedirle información de tamaño al DOM durante animaciones contínuas.
- Las dimensiones computadas (e.j posiciones asíncronas) se **cachean** dinámicamente escuchando instanciadores pasivos mediante la API de `ResizeObserver`.
- Las ecuaciones vectoriales calculan posiciones sumando diferencias entre lecturas pasivas sobre variables como `window.scrollX` y offset previamente guardados o cacheados, impidiendo llamadas atascantes tipo `element.getBoundingClientRect().top` incrustadas en el paint path.

## 🗄️ Gestión de Datos Centralizada

Toda el volúmen gramatical, la estructura copys, logotipos URL y diccionarios de la arquitectura visual vive aislado permanentemente de los archivos `.ts`. La información se reparte en objetos inyectados desde variables centralizadas bajo el directorio estructural `src/data/` (ej. rutas estáticas, `content.ts` y taxonomía semántica en `projects.ts`).
Esto permite actualizar un texto legal o agregar seis casos de éxito mutando un único JSON literal y garantizando inmutabilidad directa de las lógicas estructurales.

## 🚀 Instalación y Uso Local

Instrucciones para correr de inmediato nuestro entorno corporativo (Vite). Recomendamos **Node.js 18+**.

1. **Clonar e instalar las dependencias locales:**
```bash
npm install
```

2. **Servidor HMR instantáneo local:**
```bash
npm run dev
```

3. **Verificaciones de TS Tipado Fuerte y Build a Producción Minificada:**
```bash
npm run build
```
*(El hook de script fallará previniendo salida de compilación final ante vulnerabilidades no procesadas de TypeScript).*
