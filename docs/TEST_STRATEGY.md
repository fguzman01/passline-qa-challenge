# Estrategia de Testing — Book Store QA

## 1. Contexto general

Este documento explica cómo está organizada la automatización de pruebas para la aplicación **Book Store**, una app web hecha con Node.js, Express y EJS.

La idea fue cubrir los flujos principales del sistema —login, catálogo y carrito— usando tres niveles de prueba: Smoke, E2E y API. El framework está construido con **Playwright** y **TypeScript**.

---

## 2. Niveles de prueba

### Smoke (`tests/smoke/`)
Son los tests más rápidos y básicos. Sirven para confirmar que la app arranca bien y que las rutas críticas responden.

| Test | Qué valida |
|------|------------|
| Home carga correctamente | `/books` renderiza el catálogo y los elementos principales |
| Login válido funciona | El flujo de autenticación completo termina en el dashboard |

### E2E (`tests/e2e/`)
Pruebas completas en el navegador que simulan lo que haría un usuario real.

| Test | Qué valida |
|------|------------|
| Login inválido | Se muestra el mensaje de error de autenticación |
| Login válido | El usuario llega al dashboard correctamente |
| Flujo de compra | Login → detalle de libro → agregar al carrito → eliminar → carrito vacío |

### API (`tests/api/`)
Tests a nivel HTTP usando el contexto `request` de Playwright, sin abrir el navegador. Como la app devuelve HTML y no JSON, las validaciones se hacen contra el body de la respuesta.

| Archivo | Qué valida |
|---------|------------|
| `auth.api.spec.ts` | Login con credenciales válidas e inválidas |
| `books.api.spec.ts` | GET /books retorna el HTML del catálogo |
| `cart.api.spec.ts` | Flujo completo del carrito: agregar, validar, eliminar y vaciar |

---

## 3. Cobertura de funcionalidades

| Funcionalidad | Smoke | E2E | API |
|---------------|-------|-----|-----|
| Home / Catálogo | ✅ | — | ✅ |
| Login válido | ✅ | ✅ | ✅ |
| Login inválido | — | ✅ | ✅ |
| Detalle de libro | — | ✅ | — |
| Agregar al carrito | — | ✅ | ✅ |
| Eliminar del carrito | — | ✅ | ✅ |
| Carrito vacío | — | ✅ | ✅ |

---

## 4. Arquitectura del framework

### Page Object Model
Cada pantalla tiene su propia clase en `pages/`. Ahí se definen los locators y las acciones sobre la UI. Las páginas no tienen lógica de negocio ni assertions.

### Capa de Flows
En `flows/` están las clases que orquestan pasos entre varias páginas, representando flujos de negocio completos como `LoginFlow` o `PurchaseFlow`. Los tests hablan con los flows, no con las páginas directamente.

### Data Providers
Los datos de prueba están en `tests/fixtures/data/loginData.json` y se accede a ellos a través de `LoginDataProvider`. Esto evita hardcodear emails, contraseñas o valores esperados dentro de los tests.

### Helpers reutilizables

| Helper | Para qué sirve |
|--------|----------------|
| `uiHelpers` | Click, fill, navegación, obtener texto |
| `waitHelpers` | Esperar elementos visibles, esperar carga de página |
| `assertHelpers` | Validar visibilidad, texto, cantidad, URL |
| `envConfig` | Manejo de variables de entorno con dotenv |

---

## 5. Manejo de datos de prueba

Los datos se guardan en un JSON con entradas etiquetadas:

```json
{ "tag": "valid", "email": "...", "password": "...", "username": "...", "expectedResult": "success" }
{ "tag": "invalid", "email": "...", "password": "...", "username": "", "expectedResult": "error" }
```

`LoginDataProvider.getByTag(tag)` devuelve el set que corresponde según el escenario. Si hay que cambiar un dato, se toca solo el JSON y todos los tests se actualizan solos.

---

## 6. Qué no se automatizó

| Funcionalidad | Por qué no se cubre |
|---------------|---------------------|
| Checkout con Stripe | Requiere credenciales reales de pago y un sandbox externo configurado |
| Notificaciones por email | No hay infraestructura para capturar emails en el entorno local |
| API de portadas (OpenLibrary) | Es un servicio externo que está fuera del control del proyecto |
| Responsive / mobile | El framework apunta a viewport de escritorio, no se configuró mobile |



