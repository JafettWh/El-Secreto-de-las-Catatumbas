# SQL Mage: El Secreto de las Catacumbas

Juego educativo individual para aprender SQL explorando una mazmorra. Construido con React y Vite; las consultas se forman eligiendo bloques, sin necesidad de escribir código.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build y despliegue

```bash
npm run build
npm run preview
```

Para GitHub Pages, publica primero el repositorio y ejecuta `npm run deploy`; el comando construye el sitio y publica `dist` en la rama `gh-pages`. Configura GitHub Pages para servir esa rama. Para Vercel, importa el repositorio y deja que detecte Vite: comando `npm run build`, carpeta de salida `dist`.

## Controles

Muévete con WASD o las flechas. En móvil usa el pad direccional. Acércate a la puerta o pulsa «Hablar con el guardián», completa la consulta seleccionando un bloque para cada cláusula y explora los cofres para inspeccionar las tablas.