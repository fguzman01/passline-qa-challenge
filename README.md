# passline-qa-challenge

Repositorio: [https://github.com/fguzman01/passline-qa-challenge](https://github.com/fguzman01/passline-qa-challenge.git)

---

## Stack y herramientas

| Herramienta | Versión | Rol |
|---|---|---|
| [Playwright](https://playwright.dev/) | ^1.58 | Framework de automatización E2E |
| TypeScript | ^5.9 | Lenguaje principal |
| allure-playwright | ^3.6 | Reporter de resultados |
| allure-commandline | ^2.38 | Servidor local de reportes |
| dotenv | ^17.3 | Gestión de variables de entorno |
| Node.js / npm | ≥18 | Runtime y gestión de paquetes |

---

## Setup e instrucciones de ejecución

### Requisitos previos
- Node.js ≥ 18
- MongoDB corriendo (usado por la app Book Store)
- Java ≥ 11 (requerido por Allure CLI)
- La app debe estar corriendo en `http://localhost:5050`

### Instalación

```bash
npm install
npx playwright install chromium
```

### Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
BASE_URL=http://localhost:5050
```

### Ejecutar tests

```bash
# Todos los tests
npm test

# Por nivel
npm run test:api       # Solo tests de API
npm run test:e2e       # Solo tests E2E
npm run test:smoke     # Solo tests Smoke

# Ver reporte HTML de Playwright
npm run test:report

# Generar y abrir reporte Allure
npm run test:allure
```

---

## Resumen de decisiones principales

Se adoptó una arquitectura en tres capas: **Page Object Model (POM)** para encapsular los selectores y acciones de cada pantalla, una **capa de Flows** que orquesta los pasos de negocio de cada caso de uso, y un **DataProvider** que centraliza los datos de prueba desde archivos JSON. Esta separación garantiza que los tests sean declarativos y legibles, y que los cambios de UI impacten solo en las pages, no en los tests.

Los tests se organizaron en tres niveles: **Smoke** (validaciones críticas rápidas), **E2E** (flujos completos de usuario) y **API** (contratos de endpoints usando `request` de Playwright sin levantar browser). Para el reporte se integró **Allure** con steps nombrados por método de flow y un screenshot adjunto al final de cada step, de modo que el reporte permite reconstruir visualmente la ejecución sin necesidad de video.

---

## Qué prioricé

- **Cobertura de los flujos de mayor riesgo**: login válido/inválido y flujo de carrito (agregar + eliminar).
- **Arquitectura limpia y extensible**: que un QA nuevo pueda agregar un test sin tocar las pages ni los flows existentes.
- **Reporte accionable**: steps con screenshots dentro de Allure para que un fallo sea auto-explicativo.
- **Tests de API independientes**: validan los endpoints directamente sin depender del browser, lo que los hace rápidos y estables.

---

## Qué haría con más tiempo

- Agregar **autenticación con estado persistente** (`storageState`) para evitar el login en cada test E2E y reducir tiempos.
- Implementar **test de regresión visual** con comparación de screenshots mediante `expect(page).toHaveScreenshot()`.
- Cubrir más flujos: búsqueda de libros, paginación, compra completa con checkout.
- Configurar **CI/CD** (GitHub Actions) para ejecutar los tests en cada pull request y publicar el reporte Allure como artefacto.
- Agregar **datos de prueba dinámicos** con factories para no depender de un usuario fijo en la base de datos.
- Implementar **linting** (ESLint) y **formateo** (Prettier) para estandarizar el código del framework.

---

## Dónde revisar resultados y evidencias

### Reporte Allure (recomendado)
```bash
npx allure serve allure-results
```
Muestra tests agrupados, steps expandibles y screenshots adjuntos por step.

### Reporte HTML de Playwright
```bash
npx playwright show-report
```
Disponible en `playwright-report/index.html`. Incluye trazas detalladas y capturas de los tests fallidos.

### Carpeta `allure-results/`
Contiene los archivos JSON de resultados y los screenshots `.png` generados por la última ejecución. Está incluida en el repositorio como evidencia de la corrida.

### Documentación
La carpeta `docs/` contiene la estrategia de testing completa y la descripción de cada suite:

| Archivo | Contenido |
|---|---|
| `docs/TEST_STRATEGY.md` | Estrategia general, niveles y criterios de cobertura |
| `docs/E2E_TESTS.md` | Detalle de los tests E2E |
| `docs/SMOKE_TESTS.md` | Detalle de los tests Smoke |
| `docs/API_TESTS.md` | Detalle de los tests de API |
| `docs/RUN_TESTS.md` | Guía completa de ejecución |
| `docs/AI_USAGE.md` | Declaración de uso de IA (GitHub Copilot) |
