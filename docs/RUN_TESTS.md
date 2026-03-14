# Cómo ejecutar los tests — Book Store QA

Este documento describe paso a paso cómo preparar el entorno y ejecutar la suite de pruebas automatizadas del proyecto.

La solución tiene dos partes:

1. **Aplicación bajo prueba** — Book Store App (Node.js + Express + MongoDB)
2. **Framework QA** — proyecto Playwright + TypeScript con los tests automatizados

---

## 1. Requisitos

- **Node.js** v18 o superior
- **npm**
- **Docker** (recomendado para levantar MongoDB sin instalar nada extra)

---

## 2. Levantar MongoDB con Docker

Ejecutá este comando para iniciar un contenedor de MongoDB:

```bash
docker run -d --name passline-mongo -p 27017:27017 mongo:6
```

Para verificar que está corriendo:

```bash
docker ps
```

Deberías ver el contenedor `passline-mongo` en la lista con estado `Up`.

---

## 3. Configuración de variables de entorno

Dentro del proyecto de la aplicación, creá un archivo `.env` con el siguiente contenido:

```env
PORT=5050
NODE_ENV=development
SESSION_SECRET=passline_local_secret
MONGO_URI=mongodb://127.0.0.1:27017/book-store
```

---

## 4. Instalación de dependencias de la aplicación

Dentro de la carpeta del proyecto de la aplicación:

```bash
npm install
```

---

## 5. Cargar datos iniciales (seed de libros)

Los tests dependen de que existan libros cargados en la base de datos. Para insertarlos, ejecutá el script de seed:

```bash
node seed-books.js
```

Este script:
- limpia la colección de libros existente
- inserta los libros de ejemplo
- imprime los IDs generados en consola

Libros que se cargan:
- Clean Code
- The Pragmatic Programmer
- You Don't Know JS
- Designing Data-Intensive Applications

---

## 6. Levantar la aplicación

```bash
npm run dev
```

La aplicación quedará disponible en `http://localhost:5050`. Dejá esta terminal abierta mientras ejecutás los tests.

---

## 7. Instalación del framework QA

Dentro del proyecto de automatización:

```bash
npm install
```

Si es la primera vez que usás Playwright en esta máquina, instalá también los navegadores:

```bash
npx playwright install
```

---

## 8. Ejecutar los tests

Abrí una nueva terminal y usá los siguientes comandos:

**Todos los tests:**
```bash
npx playwright test
```

**Solo tests de API:**
```bash
npx playwright test tests/api
```

**Tests E2E:**
```bash
npx playwright test tests/e2e
```

**Smoke tests:**
```bash
npx playwright test tests/smoke
```

---

## 9. Ejecutar tests con interfaz visual

Para correr los tests con la UI interactiva de Playwright:

```bash
npx playwright test --ui
```

---

## 10. Ver el reporte de resultados

### Reporte HTML de Playwright

Después de cada ejecución, Playwright genera un reporte HTML. Para abrirlo:

```bash
npx playwright show-report
```

Se abre en el navegador con el detalle de cada test: estado, duración, capturas en caso de error y trazas de ejecución.

### Reporte Allure

Cada ejecución genera automáticamente los archivos de resultado en la carpeta `allure-results/`. Para visualizarlos:

```bash
npx allure serve allure-results
```

Este comando genera el reporte y abre un servidor local en el navegador. El reporte Allure muestra:

- **Tests ejecutados** con estado (passed / failed / broken)
- **Steps** nombrados por cada método de flow (ej. `Navegar a página de login`, `Ingresar credenciales`, etc.)
- **Screenshots adjuntos** al final de cada step para reconstruir visualmente la ejecución
- **Duración** por test y por step

> **Requisito:** Allure CLI requiere Java 11 o superior instalado en el sistema.

---

## 11. Usuario de prueba

Las credenciales usadas en los tests automatizados son:

| Campo | Valor |
|-------|-------|
| Email | testbook@yopmail.com |
| Password | 123456 |

Este usuario debe existir en la base de datos. Si no existe, registralo manualmente desde la app en `/users/register`.
