import { EditorFile } from '../types/editor';

const HTML = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zephyr Manual</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="min-h-screen">
        <header>
            <div class="container">
                <h1>Zephyr Manual</h1>
                <p>Tu editor de código en tiempo real</p>
            </div>
        </header>

        <main class="container">
            <section class="content">
                <!-- Introducción -->
                <div class="card">
                    <h2>Bienvenido a Zephyr</h2>
                    <p>
                        Zephyr es tu plataforma ideal para crear, experimentar y compartir código web en tiempo real.
                        Ya sea que empieces desde cero o te inspires en la comunidad, aquí encontrarás todas las herramientas
                        necesarias para dar vida a tus ideas.
                    </p>
                </div>

                <!-- Características Principales -->
                <div class="features-grid">
                    <!-- Editor -->
                    <div class="feature-card">
                        <div class="feature-header">
                            <div class="icon editor-icon"></div>
                            <h3>Editor de Código</h3>
                        </div>
                        <p>
                            Comienza desde cero con HTML, CSS y JavaScript. El editor te permite
                            ver los cambios en tiempo real mientras escribes tu código.
                        </p>
                    </div>

                    <!-- Comunidad -->
                    <div class="feature-card">
                        <div class="feature-header">
                            <div class="icon community-icon"></div>
                            <h3>Comunidad</h3>
                        </div>
                        <p>
                            Explora diseños creados por otros desarrolladores, úsalos como base
                            y personalízalos según tus necesidades.
                        </p>
                    </div>

                    <!-- Guardar -->
                    <div class="feature-card">
                        <div class="feature-header">
                            <div class="icon save-icon"></div>
                            <h3>Guardar Proyectos</h3>
                        </div>
                        <p>
                            Guarda tus creaciones y compártelas con la comunidad. Tus diseños
                            pueden inspirar a otros desarrolladores.
                        </p>
                    </div>

                    <!-- Historial -->
                    <div class="feature-card">
                        <div class="feature-header">
                            <div class="icon history-icon"></div>
                            <h3>Historial</h3>
                        </div>
                        <p>
                            Accede a tus diseños guardados, modifícalos o elimínalos cuando
                            lo necesites.
                        </p>
                    </div>
                </div>

                <!-- Flujo de Trabajo -->
                <div class="card">
                    <h3>Flujo de Trabajo</h3>
                    <div class="workflow">
                        <div class="workflow-step">
                            <div class="arrow"></div>
                            <p><strong>Paso 1:</strong> Comienza un nuevo proyecto o explora la comunidad</p>
                        </div>
                        <div class="workflow-step">
                            <div class="arrow"></div>
                            <p><strong>Paso 2:</strong> Edita el código en tiempo real</p>
                        </div>
                        <div class="workflow-step">
                            <div class="arrow"></div>
                            <p><strong>Paso 3:</strong> Previsualiza tu diseño a pantalla completa</p>
                        </div>
                        <div class="workflow-step">
                            <div class="arrow"></div>
                            <p><strong>Paso 4:</strong> Guarda tu trabajo y compártelo</p>
                        </div>
                    </div>
                </div>

                <!-- Barra de Herramientas -->
                <div class="card">
                    <h3>Barra de Herramientas</h3>
                    <div class="tools-grid">
                        <div class="tool-card">
                            <div class="icon clear-icon"></div>
                            <div>
                                <h4>Clear</h4>
                                <p>Limpia el editor para comenzar desde cero</p>
                            </div>
                        </div>
                        <div class="tool-card">
                            <div class="icon preview-icon"></div>
                            <div>
                                <h4>Preview</h4>
                                <p>Vista previa a pantalla completa</p>
                            </div>
                        </div>
                        <div class="tool-card">
                            <div class="icon community-icon"></div>
                            <div>
                                <h4>Community</h4>
                                <p>Explora diseños de la comunidad</p>
                            </div>
                        </div>
                        <div class="tool-card">
                            <div class="icon save-icon"></div>
                            <div>
                                <h4>Save</h4>
                                <p>Guarda tu trabajo actual</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer>
            <div class="container">
                <p>Zephyr - Tu editor de código en tiempo real</p>
            </div>
        </footer>
    </div>
</body>
</html>

`;

const CSS = `
/* Base styles */
:root {
    --primary: #4f46e5;
    --success: #22c55e;
    --info: #3b82f6;
    --warning: #f59e0b;
    --danger: #ef4444;
    --dark: #1e293b;
    --light: #f8fafc;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: system-ui, -apple-system, sans-serif;
    line-height: 1.5;
    color: #334155;
    background: linear-gradient(to bottom right, #f8fafc, #f1f5f9);
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

/* Header */
header {
    background-color: var(--dark);
    color: white;
    padding: 2rem 0;
    text-align: center;
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

header p {
    color: #cbd5e1;
}

/* Main content */
main {
    padding: 3rem 0;
}

.content {
    max-width: 64rem;
    margin: 0 auto;
}

/* Cards */
.card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    margin-bottom: 4rem;
    margin-top: 2rem;
}

.card h2, .card h3 {
    color: var(--dark);
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

/* Features grid */
.features-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin-bottom: 4rem;
}

.feature-card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    transition: transform 0.3s ease;
}

.feature-card:hover {
    transform: scale(1.02);
}

.feature-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

/* Icons */
.icon {
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.editor-icon::before {
    content: "⌨️";
    font-size: 1.5rem;
}

.community-icon::before {
    content: "👥";
    font-size: 1.5rem;
}

.save-icon::before {
    content: "💾";
    font-size: 1.5rem;
}

.history-icon::before {
    content: "⏱";
    font-size: 1.5rem;
}

.clear-icon::before {
    content: "🗑";
    font-size: 1.5rem;
}

.preview-icon::before {
    content: "🔍";
    font-size: 1.5rem;
}

/* Workflow */
.workflow {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.workflow-step {
    display: flex;
    align-items: center;
}

.arrow {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
    position: relative;
}

.arrow::before {
    content: "→";
    color: var(--primary);
    font-size: 1.5rem;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
}

/* Tools grid */
.tools-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
}

.tool-card {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 0.5rem;
}

.tool-card h4 {
    color: var(--dark);
    margin-bottom: 0.25rem;
}

.tool-card p {
    font-size: 0.875rem;
}

/* Footer */
footer {
    background-color: var(--dark);
    color: #cbd5e1;
    padding: 1.5rem 0;
    text-align: center;
    margin-top: 3rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .features-grid,
    .tools-grid {
        grid-template-columns: 1fr;
    }

    .card {
        padding: 1.5rem;
    }
}
`;
export const manual: EditorFile[] = [
  {
    id: '1',
    name: 'index.html',
    language: 'html',
    content: HTML,
  },
  {
    id: '2',
    name: 'styles.css',
    language: 'css',
    content: CSS,
  },
  {
    id: '3',
    name: 'script.js',
    language: 'javascript',
    content: 'console.log("Hello from JavaScript!");',
  },
  {
    id: '4',
    name: 'images',
    language: 'images',
    content: '',
    images: [],
  },
  {
    id: '5',
    name: 'Manual Zephyr',
    language: 'html',
    content: 'html',
    tags: ['manual', 'zephyr'],
    favorite: false,
  },
];
