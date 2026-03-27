---
name: blog-design-system
description: |
  Genera un conjunto de lineamientos y archivos estándar para un design system de blog orientado a Astro y Daisy UI (Tailwind v4). La skill está diseñada para ser activada por cualquier agente cuando el usuario mencione "design system", "UI kit" o "estándares de UI" para un blog en modo oscuro.
---

# Visión General
Esta skill provee **lineamientos** y **archivos base** (tokens, estilos, componentes y ejemplos) que pueden ser integrados en proyectos Astro 5.0 usando **Tailwind CSS v4** y el plugin **Daisy UI v5**. El objetivo es ofrecer un UI kit coherente, con estética tech-dark, glass-morphism, gradientes radiales y micro-animaciones.

## Prerrequisitos
- Proyecto de **Astro** (v5+ recomendado).
- **Tailwind CSS v4** (`@tailwindcss/vite` y `tailwindcss`) + **Daisy UI v5** instalados.
- Fuente **Geist** o **Inter** (cargada en el HTML o mediante Fontsource).

## Configuración del proyecto Astro
```bash
# Crear proyecto Astro (si aún no existe)
npx create-astro@latest my-blog
cd my-blog
npm install

# Instalar Tailwind v4, su plugin de vite y Daisy UI v5
npm install -D tailwindcss @tailwindcss/vite daisyui
```

### Configurar `astro.config.mjs`
En Tailwind v4, integramos Tailwind a traves del plugin de Vite en Astro.
```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Archivo CSS central (`src/styles/global.css`)
En Tailwind v4 toda la configuración (tokens, colores, plugins) se hace en un único archivo CSS mediante la regla `@theme`.

```css
@import "tailwindcss";
@plugin "daisyui";

/* Tema Oscuro Personalizado en DaisyUI v5 */
@theme {
  --color-primary: hsl(260, 80%, 55%);
  --color-accent: hsl(190, 80%, 55%);
  
  --color-bg-dark: hsl(240, 10%, 5%);
  /* Efecto Glass */
  --color-glass-bg: rgba(255, 255, 255, 0.08);
  --shadow-glow: 0 0 10px rgba(255, 255, 255, 0.2);
  
  --font-sans: "Geist", "Inter", system-ui, sans-serif;
  --font-weight-bold: 800;
}

/* Configuracion de Base */
@layer base {
  @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;700;800&display=swap');
  
  html, body {
    height: 100%;
    margin: 0;
    font-family: var(--font-sans);
    line-height: 1.6;
    /* Gran gradiente de fondo tech-dark */
    background: radial-gradient(circle at 30% 30%, hsl(270, 70%, 30%), hsl(200, 70%, 25%)), var(--color-bg-dark);
    color: #fff;
    scroll-behavior: smooth;
  }
}

/* Componentes Genéricos */
@layer components {
  /* Tarjeta con glass-morphism */
  .card-glass {
    @apply glass backdrop-blur-md border border-white/10 rounded-xl shadow-glow transition-transform duration-200 ease-out;
  }
  .card-glass:hover {
    @apply -translate-y-1 bg-white/5;
  }

  /* Botón primario vibrante */
  .btn-primary-tech {
    @apply btn bg-gradient-to-r from-primary to-accent text-white shadow-glow border-0 hover:brightness-110;
  }

  /* Botón fantasma */
  .btn-ghost-tech {
    @apply btn btn-ghost border border-primary text-primary bg-transparent hover:bg-white/10;
  }

  /* Badges */
  .badge-tech-new { @apply badge bg-primary text-white border-0; }
  .badge-tech-free { @apply badge bg-accent text-white border-0; }
}

/* Animaciones/Utilidades */
@layer utilities {
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.4s ease-out forwards; }

  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 8px rgba(255, 255, 255, 0.2); }
    50% { box-shadow: 0 0 12px rgba(255, 255, 255, 0.4); }
  }
  .pulse-glow:hover { animation: pulseGlow 0.6s infinite; }
}
```

## Importar estilos base (`src/layouts/BaseLayout.astro`)
Toda la página debe absorber el único archivo `global.css`.

```astro
---
import "../styles/global.css";
---
<html lang="es" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <title>Mi Blog</title>
  </head>
  <body class="min-h-screen text-white">
    <slot />
  </body>
</html>
```

## Ejemplo de Uso en Componente o Página (`src/pages/index.astro`)
```astro
---
import Layout from "../layouts/BaseLayout.astro";
---
<Layout>
  <section class="p-8 fade-up">
    <!-- Navbar Glass -->
    <nav class="navbar glass mb-8 rounded-xl shadow-glow">
      <div class="flex-1">
        <a class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Mi Blog Tech</a>
      </div>
    </nav>

    <!-- Grid de Tarjetas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <!-- Card 1 -->
      <div class="card-glass p-6">
        <h2 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Artículo 1</h2>
        <p class="text-gray-300 mt-2">Resumen breve del contenido relacionado con Astro 5 y v4 CSS.</p>
        <div class="mt-4">
          <button class="btn-primary-tech">Leer más</button>
          <span class="badge-tech-new ml-2">Nuevo</span>
        </div>
      </div>
      
      <!-- Card 2 -->
      <div class="card-glass p-6">
        <h2 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Actualiza DaisyUI</h2>
        <p class="text-gray-300 mt-2">Nuevos tokens y colores espectaculares para la interfaz.</p>
        <div class="mt-4">
          <button class="btn-primary-tech">Probar</button>
          <span class="badge-tech-free ml-2">Gratis</span>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="card-glass p-6">
        <h2 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Diseño Sostenible</h2>
        <p class="text-gray-300 mt-2">Botones ghosts con la marca de la casa.</p>
        <button class="btn-ghost-tech mt-4 pulse-glow">Compartir</button>
      </div>

    </div>
  </section>
</Layout>
```

## Lineamientos de uso para *Cualquier Agente* que lea esto:
1. **Configuración del Proyecto:** Al crear componentes Astro debes agregar la importación del `global.css` que contiene **Tailwind v4** y **Daisy UI v5**.
2. **Uso Exclusivo del `global.css`:** En Tailwind v4, NO se emplea `tailwind.config.js` ni `postcss.config.js`. Todo pasa por la directiva `@theme` en el archivo CSS general (`@import "tailwindcss"; @plugin "daisyui";`).
3. **Clases Personalizadas:**  Utiliza los siguientes nombres base combinando lo mejor de Daisy UI con diseño custom:
    - Tarjetas: `.card-glass`
    - Botones Primarios: `.btn-primary-tech`
    - Botones Secundarios: `.btn-ghost-tech`
    - Badges UI: `.badge-tech-new`, `.badge-tech-free`
4. **Modo Oscuro Predeterminado:** Activa siempre el `data-theme="dark"` (o predeterminado de Daisy) en la etiqueta HTML base. No utilices estilos light. El background base es un radial gradient púrpura oscuro brillante incluido en `@layer base`.
5. **Animaciones Visuales:** Al añadir entradas o iteraciones en cards o layouts, se incentiva usar la clase utilitaria personalizable: `.fade-up` o `.pulse-glow`.

## Prompts de prueba y validación (Evaluación)
1. "Soy un desarrollador con Astro 5. Dame un UI Kit de Tailwind v4 y Daisy UI estilo tech-dark."
2. "Muestra cómo integrar Tailwind CSS v4 con el plugin Daisy UI sin usar tailwind.config.js, para un blog oscuro."
3. "Necesito aplicar el estilo de 'botón vibrante tech' y 'glass card' en mis artículos de mi blog usando mi design system global."

## Guía de Evaluación
- **Confirmar `@tailwindcss/vite`:** ¿Se instalo correctamente el Vite plugin en `astro.config.mjs`?
- **CSS-First (Tailwind 4):** ¿El archivo global contiene las sentencias correctas (`@import "tailwindcss"; @plugin "daisyui";`)?
- **Aspecto Visual:** ¿El index del sitio cuenta con el background gradient? Daisy UI v5 se apoya del `data-theme` correctamente y sobrescribe de ser necesario.
---
*Esta skill está diseñada con una narrativa directa para instruir a CUALQUIER IA/agente asistente cuando un desarrollador pida usar Tailwind v4, DaisyUI v5, Astro 5 o pida generar un blog design system oscuro en estas tecnologías modernas.*
