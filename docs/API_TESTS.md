# Documentación de Tests API — Book Store QA

## 1. Introducción

Esta suite valida el comportamiento de los endpoints del backend de Book Store a nivel HTTP, sin usar el navegador. Los tests se implementaron con el `APIRequestContext` de Playwright, que permite hacer requests HTTP y validar las respuestas directamente.

El objetivo es detectar problemas en el backend de forma más rápida y aislada que los tests E2E: errores de autenticación, respuestas incorrectas o flujos rotos antes de que lleguen a la UI.

---

## 2. Alcance

La aplicación Book Store está construida con Node.js, Express y EJS. No expone una API REST con respuestas JSON, sino que todos los endpoints devuelven HTML server-rendered.

Por eso, las validaciones en esta suite están orientadas a:

- verificar el status HTTP de cada respuesta
- verificar que el HTML devuelto contenga los textos o elementos esperados según el escenario

Esto es suficiente para detectar errores críticos del backend sin depender del navegador.

---

## 3. Casos implementados

### 3.1 `GET /books` — Disponibilidad del catálogo

| Campo | Detalle |
|-------|---------|
| Endpoint | `GET /books` |
| Validación | Status 200, HTML contiene `"Book Store App"` y `"Book Details"` |
| Riesgo cubierto | El catálogo no carga o el servidor no responde |

---

### 3.2 `POST /users/login` — Credenciales inválidas

| Campo | Detalle |
|-------|---------|
| Endpoint | `POST /users/login` |
| Validación | Status no es 302, HTML contiene `"Authentication Error"` |


---

### 3.3 `POST /users/login` — Credenciales válidas

| Campo | Detalle |
|-------|---------|
| Endpoint | `POST /users/login` |
| Validación | Status 200, HTML contiene el nombre de usuario autenticado |
| Datos | Obtenidos desde `LoginDataProvider.getByTag("valid")` |


---

### 3.4 Flujo completo del carrito vía API

| Campo | Detalle |
|-------|---------|
| Endpoints | `POST /users/login`, `GET /books`, `POST /users/cart/{id}?_method=PUT`, `GET /users/dashboard`, `POST /users/cart/{id}/delete?_method=DELETE` |
| Validación | Carrito contiene el libro después de agregarlo; carrito vacío después de eliminarlo |


El `bookId` se extrae dinámicamente del HTML de `/books` usando una expresión regular sobre los `href` de los botones "Book Details". Esto permite que el test funcione aunque el ID cambie entre entornos.

---

## 4. Poque de la selección

Estos endpoints fueron priorizados porque representan los flujos críticos del sistema:

- **`/books`** es la página principal; si falla, no se puede avanzar a funcionalidad cr´tica de la app
- **`/users/login`** es la puerta de entrada para cualquier acción autenticada.
- El **flujo del carrito** es el core del negocio de la aplicación.

Validarlos a nivel API permite detectar regresiones en el backend antes de correr los tests E2E más lentos, y también sirve como cobertura adicional independiente del navegador.


