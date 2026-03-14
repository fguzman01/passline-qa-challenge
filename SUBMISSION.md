# Entrega — Passline QA Challenge

## 1. Repositorio

[https://github.com/fguzman01/passline-qa-challenge](https://github.com/fguzman01/passline-qa-challenge.git)

---

## 2. Stack y herramientas utilizadas

| Herramienta | Rol |
|---|---|
| Playwright | Automatización E2E y tests de API |
| TypeScript | Lenguaje principal del framework |
| Node.js | Runtime y gestión de dependencias |
| Allure Report | Reporte con steps y screenshots por paso |
| Playwright HTML Report | Reporte nativo con trazas detalladas |
| GitHub Copilot | Asistencia en desarrollo del framework |

---

## 3. Setup y ejecución

```bash
# Instalar dependencias
npm install

# Levantar la aplicación (debe estar corriendo en localhost:5050)
npm run dev

# Ejecutar todos los tests
npx playwright test
```

Para instrucciones detalladas (MongoDB, seed de datos, usuario de prueba) ver [`docs/RUN_TESTS.md`](docs/RUN_TESTS.md).

---

## 4. Decisiones principales de diseño

- **Page + Flow + DataProvider**: páginas encapsulan selectores, flows orquestan pasos de negocio y los providers centralizan datos de prueba — los tests quedan declarativos y fáciles de mantener.
- **Tres suites separadas**: `api/`, `e2e/` y `smoke/` permiten ejecutar por nivel de riesgo y velocidad de feedback.
- **Helpers reutilizables**: `uiHelpers`, `waitHelpers` y `assertHelpers` evitan repetición y unifican el manejo de esperas y validaciones.
- **Reportes con contexto visual**: cada método de flow está envuelto en un `allure.step()` con screenshot adjunto al final del paso, haciendo el reporte auto-explicativo.

---

## 5. Qué se priorizó

- Flujo de **login** (credenciales válidas e inválidas)
- **Catálogo de libros** (carga correcta, libros visibles)
- **Flujo de carrito** completo (agregar y eliminar libro)
- **Endpoints críticos** de API (autenticación, listado de libros, operaciones de carrito)

---

## 6. Qué haría con más tiempo

- Ampliar cobertura de API (validaciones de esquema, casos de borde)
- Automatizar el flujo completo de checkout
- Agregar validaciones de UI adicionales (paginación, búsqueda, mensajes de error)
- Configurar pipeline CI/CD en GitHub Actions con publicación automática del reporte Allure

---

## 7. Evidencias y resultados

| Evidencia | Cómo acceder |
|---|---|
| Reporte Allure (steps + screenshots) | `npx allure serve allure-results` |
| Reporte HTML de Playwright | `npx playwright show-report` |
| Resultados JSON de la última ejecución | Carpeta `allure-results/` en el repositorio |
| Logs de consola | Salida estándar al ejecutar `npx playwright test` |
