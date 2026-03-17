# react-desktop

Entorno de escritorio estilo Windows 98 construido con React.

## ⚠️ Reglas de Contribución

**NO hacer push a git a menos que el usuario lo exprese directamente en el chat.**

## Overview

Entorno de escritorio estilo Windows 98 construido con React. Simula un sistema de ventanas con barra de tareas, menú Start, explorador de archivos y visor de markdown.

## Tecnologías

- **React 19** - Framework principal
- **Vite** - Build tool
- **98.css** - Librería de estilos para Windows 98
- **react-markdown** - Renderizado de archivos markdown

## Estructura del Proyecto

```
src/
├── apps/                    # Aplicaciones del sistema
│   ├── apps.js              # Registro de aplicaciones
│   ├── WelcomeApp.jsx       # App de bienvenida
│   ├── NotepadApp.jsx       # Bloc de notas
│   ├── FileExplorerApp.jsx  # Explorador de archivos
│   └── FileViewerApp.jsx    # Visor de archivos con tabs
├── components/              # Componentes (Diseño Atómico)
│   ├── ErrorBoundary.jsx    # Error boundary global
│   ├── ErrorWindow.jsx      # Ventana de error
│   ├── molecules/
│   │   ├── TitleBar/        # Barra de título
│   │   └── WindowControls/  # Botones minimizar/maximizar/cerrar
│   └── organisms/
│       ├── Window/           # Ventana con drag, resize, minimize, maximize
│       ├── TaskBar/         # Barra de tareas
│       └── StartMenu/       # Menú inicio
├── context/
│   └── DesktopContext.jsx   # Estado global de ventanas
├── hooks/
│   ├── useFileSystem.js     # Lógica de sistema de archivos
│   └── useWindow.js         # Hook para manejo de ventanas
├── data/files/              # Archivos markdown
│   ├── YouTube/
│   ├── Sistemas/
│   └── Paginas/
├── App.jsx                  # Componente principal
├── index.css                # Estilos globales
└── main.jsx                 # Entry point
```

## Patrones y Principios

### Diseño Atómico

- **Átomos**: Elementos base simples
- **Moléculas**: Composición simple de átomos (TitleBar, WindowControls)
- **Organismos**: Componentes complejos (Window, TaskBar, StartMenu)

### Responsabilidad Única

- Cada componente tiene una única responsabilidad
- La lógica de negocio se extrae a hooks
- El estado global se maneja en Context

### Context (DesktopContext)

Gestiona el estado global de todas las ventanas:

- `windows` - Lista de ventanas abiertas
- `activeWindowId` - Ventana activa
- `openApp(appId, data)` - Abre una aplicación
- `handleWindowFocus(id)` - Enfoca una ventana
- `handleMinimize(id)` - Minimiza ventana
- `handleMaximize(id)` - Maximiza/restaurar ventana
- `handleClose(id)` - Cierra ventana
- `handleWindowMove(id, position)` - Actualiza posición
- `handleResize(id, size)` - Actualiza tamaño

### Hooks Personalizados

- **useFileSystem**: Lee archivos markdown de `data/files/`, extrae fechas del contenido
- **useWindow**: Lógica de manejo de ventanas (integrado en Window)

### Aplicaciones

| App | Descripción | Instancia única |
|-----|-------------|-----------------|
| Welcome | Pantalla de bienvenida | Sí |
| Notepad | Bloc de notas | Sí |
| FileExplorer | Explorador de archivos con tabs (Tabla/Arbol) | Sí |
| FileViewer | Visor markdown con tabs (Preview/Source) | No (por archivo) |

### Explorador de Archivos

- **Tab Tabla**: Muestra todos los archivos en formato tabla con columnas Nombre, Ubicación, Fecha
- **Tab Arbol**: Muestra estructura de carpetas expandible estilo Windows 98
- Las fechas se leen directamente del archivo markdown (línea `Fecha: DD/MM/AAAA`)

### Características de las Ventanas

- **Drag**: Arrastrar desde la barra de título
- **Resize**: Arrastrar desde la esquina inferior derecha
- **Minimize**: Minimiza a la barra de tareas
- **Maximize**: Ocupa toda el área de trabajo
- **Close**: Cierra la ventana
- **Enfoque**: Al hacer clic se trae al frente (z-index)
- **Centrado**: Se abren centradas en pantalla

### Barra de Tareas

- Muestra botón Start y lista de ventanas abiertas
- Reloj en tiempo real con hora, minutos y segundos
- Click en ventana minimizada la restaura

### Prevención de Ventanas Duplicadas

- Cada archivo tiene un `windowKey` único (`folder/filename`)
- Al abrir un archivo ya existente, se enfoca esa ventana
- FileViewer permite múltiples instancias (por archivo)

## Comandos

```bash
npm install    # Instalar dependencias
npm run dev    # Iniciar servidor de desarrollo
npm run build  # Build de producción
npm run lint   # Linting
```

## Estado Actual

- Ventanas funcionales con drag, resize, minimize, maximize
- Explorador de archivos con dos vistas: Tabla y Arbol
- Vista Tabla: muestra archivos con columnas Nombre, Ubicación, Fecha
- Vista Arbol: estructura de carpetas expandible
- Visor de markdown con tabs (Preview / Source)
- Menú Start y barra de tareas
- Reloj en tiempo real en la barra de tareas
- Prevención de ventanas duplicadas por archivo
- Archivos markdown con fecha de creación en formato `Fecha: DD/MM/AAAA`
