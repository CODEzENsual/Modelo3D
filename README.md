# Visor 3D Interactivo


---

## Resumen rápido
Proyecto: Visor 3D basado en `model-viewer`(https://modelviewer.dev/) con UI moderna, loader con progreso, controles de rotación y una página exclusiva para ver el modelo (`modelo.html` dentro de la carpeta `/modelo`). El `index.html` conserva su CSS y JS principales sin cambios; desde su barra superior se enlaza a `modelo.html`.

---

## Estructura de carpetas (actual)
- visor3d/
  - index.html
  - style.css
  - script.js
  - assets/
    - blue_miyu.glb (o tu `.glb` preferido)
  - modelo/
    - modelo.html
    - modelo.css
    - modelo.js

Notas
- No es necesario agregar `textures/*` si tu `.glb` ya incorpora (embed) las texturas o si usas un `.glb` que no requiere texturas externas.
- Si tu `.glb` referencia texturas externas y quieres usarlas, coloca la carpeta `textures/` dentro de `assets/` y asegúrate de que las rutas dentro del glTF coincidan.

---

## ¿Qué contiene la carpeta `/modelo`?
- `modelo.html` — Página dedicada a la vista del modelo. Incluye su propio `model-viewer` con loader y controles (rotación, fullscreen).
- `modelo.css` — Estilos independientes para la página del modelo; responsive y optimizados para móvil.
- `modelo.js` — Lógica de la página: gestión de loader (eventos `progress`, `load`, `error`), toggling de rotación con la API de `model-viewer`, detección de interacción (para pausar/reanudar auto-rotate) y fullscreen.

---

## Comportamiento principal (explicado)
- Desde `index.html` hay un enlace en la barra superior que abre `modelo.html`. No se modificaron `style.css` ni `script.js` del índice global.
- En `modelo.html`:
  - Se muestra el modelo (`assets/modelo.glb` por defecto; cámbialo si usas otro nombre).
  - Loader con porcentaje real basado en `model-viewer` (`progress` event).
  - Botón de rotación que usa la propiedad `viewer.autoRotate` y mantiene el atributo `auto-rotate` sincronizado.
  - Interacción del usuario desactiva la rotación temporalmente; si la rotación estaba activada, se reanuda al terminar la interacción.
  - Fullscreen activo sobre el contenedor del visor.

---

## Comprobaciones y correcciones aplicadas (resumen, sin código)
- Sincronización correcta entre atributo HTML `auto-rotate` y la propiedad JS `viewer.autoRotate` para fiabilidad en todas las versiones.
- Implementación de reanudación automática de rotación tras interacción del usuario (manejo de `pointer` y `touch`).
- Loader conectado a `progress` / `load` / `error` de `model-viewer` para mostrar porcentaje y fallos de carga.
- Añadido `crossorigin="anonymous"` y `preload` del `.glb` para mejorar carga y evitar problemas de CORS cuando corresponda.
- No se cambiaron los archivos globales `style.css` y `script.js` del índice, tal como pediste.

---

## Requisitos y buenas prácticas para pruebas
- Servir el proyecto mediante servidor local (recomendado): `npx serve`, Live Server, `http-server`, etc.
- Para AR y algunas funcionalidades (en iOS Quick Look o WebXR) necesitas HTTPS y un dispositivo compatible.
- MIME types: el servidor debe servir `.glb` como `model/gltf-binary` y las imágenes con sus tipos (`image/jpeg`, `image/png`).
- Si usas texturas externas desde otro dominio, habilita cabeceras CORS en ese dominio o sirve assets desde el mismo origen.

---

## Cómo abrir la vista exclusiva del modelo (pasos)
1. Ejecuta un servidor local en la carpeta del proyecto.
2. Abre `index.html` en el navegador.
3. Haz click en el icono/enlace de la barra superior (dentro de `.top-actions`) para ir a `modelo/modelo.html` (o `modelo.html` en raíz si lo colocaste así).
4. En la vista del modelo, espera que el loader llegue al 100% o revisa la consola para errores.

---

## Checklist rápido antes del despliegue
- [ ] Confirmar nombre del `.glb` en `assets/` y en `modelo.html`.
- [ ] Probar en Chrome, Safari (iOS) y Android.
- [ ] Habilitar HTTPS si vas a usar AR.
- [ ] Verificar CORS si los recursos vienen de otro origen.
- [ ] Optimizar modelo (si procede): reducir polígonos, texturas y usar compresión.

---

## Problemas comunes y soluciones
- Loader se queda en 0%: versión antigua de `model-viewer` sin `totalProgress` — actualizar `model-viewer` o detectar progreso por otros medios.
- Rotación no se actualiza: ocurre si solo se cambia el atributo HTML; ahora la implementación usa `viewer.autoRotate` y mantiene el atributo sincronizado.
- Fullscreen fallando en iOS: Fullscreen API limitada; usar UI alternativa si es crítico.
- Texturas faltantes: rutas internas del glTF no coinciden con la estructura `assets/` — abrir `.gltf` y comprobar rutas o empaquetar texturas en `.glb`.

---

## Optimización y siguientes mejoras recomendadas
- Comprimir geometría con Draco para reducir tamaño.
- Convertir texturas a KTX2/Basis para mejor compresión y SSTC.
- Empaquetar texturas dentro del `.glb` para evitar dependencias externas.
- Añadir snapshot/captura (exportar canvas) si necesitas compartir imágenes del modelo.
- Implementar una galería de modelos con lazy-loading.

---

## Accesibilidad y móvil
- Botones con `aria-label` y `aria-pressed` para estado de toggle.
- Tamaños y paddings pensados para interacción táctil.
- Detectar `prefers-reduced-motion` y reducir/pausar animaciones si aplica.

---

## Lista rápida de archivos a revisar (ubicación y propósito)
- `index.html` — Página principal con enlace a la vista del modelo.
- `style.css` — Estilos globales del proyecto (no modificados).
- `script.js` — Lógica general del índice (no modificada).
- `assets/blue_miyu.glb` (o `assets/modelo.glb`) — Modelo 3D principal.
- `modelo/modelo.html` — Vista dedicada para el modelo.
- `modelo/modelo.css` — Estilos exclusivos para `modelo.html`.
- `modelo/modelo.js` — Lógica exclusiva para la página del modelo.

---
