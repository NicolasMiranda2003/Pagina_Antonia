# ECO-DESERT - Plataforma Web Oficial

Sitio web oficial corporativo para **ECO-DESERT**, empresa líder en soluciones medioambientales integrales y valorización de residuos industriales para los sectores de minería, agricultura y energías renovables en Chile. Planta de recepción y acopio en Vallenar, Región de Atacama.

---

## 🚀 Cómo Desplegar en Vercel (Paso a Paso)

Este proyecto está optimizado y listo para ser desplegado en **Vercel** en cuestión de segundos, sin requerir compilaciones complejas.

### Opción 1: Conectar con GitHub (Recomendada y Automática)

Dado que este repositorio ya está enlazado a GitHub (`NicolasMiranda2003/Pagina_Antonia`):

1. **Haz push de tus cambios a GitHub**:
   ```bash
   git add .
   git commit -m "Creación de sitio web oficial ECO-DESERT"
   git push origin main
   ```
2. **Inicia sesión en [Vercel](https://vercel.com/)** con tu cuenta de GitHub.
3. Haz clic en el botón azul **"Add New..."** → **"Project"**.
4. En la lista de repositorios, busca **`Pagina_Antonia`** y haz clic en **"Import"**.
5. En la pantalla de configuración:
   - **Framework Preset**: *Other* (Detectará automáticamente sitio estático).
   - **Root Directory**: `./` (por defecto).
6. Haz clic en **"Deploy"**.
7. ¡Listo! En menos de 20 segundos tendrás tu enlace público oficial tipo `pagina-antonia.vercel.app` (o el nombre que elijas) accesible desde cualquier navegador y celular del mundo. Cada vez que hagas un `git push`, Vercel actualizará la página automáticamente.

---

### Opción 2: Usar Vercel CLI (Desde la consola)

Si prefieres desplegar directamente desde la terminal de tu computador:

1. Ejecuta:
   ```bash
   npx vercel
   ```
2. Responde las preguntas de configuración (presiona Enter para aceptar los valores por defecto).
3. Para publicar en producción:
   ```bash
   npx vercel --prod
   ```

---

## 🛠️ Tecnologías y Características

- **Diseño Responsive Moderno**: Adaptado a celulares, tablets y pantallas de escritorio de alta resolución.
- **Identidad Visual Corporativa**: Integración de las 8 láminas de diseño del proyecto (`inicio`, `quienes_somos`, `mision_y_vision`, `nuestro_enfoque_y_propuesta_de_valor`, `nuestros_servicios`, `industria_y_cobertura`, `soluciones_ambientales`, `quieres_saber_mas`).
- **Visor Interactivo de Láminas**: Galería Lightbox interactiva para explorar las láminas originales en alta resolución.
- **Formulario de Contacto Funcional**: Validación en tiempo real de campos, simulación de despacho y botón directo a WhatsApp.
- **SEO y Open Graph**: Metaetiquetas optimizadas para Google, LinkedIn, WhatsApp y Twitter.
- **Rendimiento**: HTML semántico, CSS puro con variables y animaciones de alta eficiencia, y JavaScript nativo sin dependencias pesadas.
