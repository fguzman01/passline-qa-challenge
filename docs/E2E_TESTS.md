# Documentación de Tests E2E — Book Store QA

## 1. Introducción

Esta suite cubre los flujos principales de la aplicación Book Store desde el punto de vista del usuario, usando un navegador real controlado por Playwright.

El objetivo es validar que los flujos críticos del sistema funcionen de punta a punta: que el usuario pueda autenticarse, navegar el catálogo, agregar libros al carrito y eliminarlo. Estos tests complementan la cobertura de API al verificar también que la interfaz se comporta correctamente.

---

## 2. Flujos automatizados

### 2.1 Login (`tests/e2e/login.spec.ts`)

**Objetivo:** Validar que el sistema de autenticación responde correctamente ante credenciales válidas e inválidas.

**Pasos — Login inválido:**
1. Navegar a `/users/login`
2. Ingresar email y contraseña incorrecta
3. Hacer submit del formulario
4. Validar que se muestra el mensaje "Authentication Error"

**Pasos — Login válido:**
1. Navegar a `/users/login`
2. Ingresar credenciales válidas del DataProvider
3. Hacer submit del formulario
4. Validar que el dashboard cargó con el nombre del usuario autenticado

**Riesgo cubierto:** Un fallo en la autenticación bloquea el acceso a toda la aplicación. Cubrir ambos caminos positivo y negativo garantiza que el sistema acepta lo que debe y rechaza lo que no.

---

### 2.2 Flujo de compra / carrito (`tests/e2e/purchase.spec.ts`)

**Objetivo:** Validar el flujo completo desde el login hasta dejar el carrito vacío después de eliminar un libro.

**Pasos:**
1. Login con usuario válido
2. Desde el catálogo, abrir el detalle del libro "The Pragmatic Programmer"
3. Validar que la página de detalle cargó correctamente
4. Agregar el libro al carrito
5. Validar que el libro aparece en el carrito del dashboard
6. Eliminar el libro del carrito
7. Validar que el carrito quedó vacío

**Riesgo cubierto:** El carrito es el flujo central del negocio. Si algún paso de este flujo está roto, el usuario no puede completar una compra. Este test detecta regresiones en la navegación, el estado del carrito y las acciones de agregar/eliminar.

---

## 3. Justificación de priorización

Dentro del alcance de un MVP de automatización, los flujos priorizados fueron:

- **Autenticación:** Es el punto de entrada a toda la funcionalidad protegida. Sin login no hay acceso al carrito ni al dashboard.
- **Catálogo:** La home de libros es la primera pantalla que ve el usuario y la base de la navegación.
- **Carrito:** Es el flujo de negocio principal de la aplicación. Cubrir el ciclo completo agrega/elimina asegura que el estado se maneja correctamente.

Estos tres flujos representan el camino crítico del sistema y son los primeros que fallarían ante una regresión significativa.

---

## 4. Arquitectura utilizada

La automatización E2E está organizada en capas para mantener el código limpio y fácil de mantener:

| Capa | Rol |
|------|-----|
| **Page Objects** (`pages/`) | Encapsulan locators y acciones sobre la UI. No tienen lógica de negocio. |
| **Flows** (`flows/`) | Orquestan pasos entre páginas para representar flujos de negocio completos. |
| **DataProvider** | Centraliza los datos de prueba. Los tests obtienen datos usando `LoginDataProvider.getByTag(tag)`. |
| **Helpers** (`utils/`) | Funciones reutilizables para clicks, esperas y assertions. |

Los tests llaman a flows, los flows usan páginas, y las páginas usan helpers. Esto mantiene cada capa con una sola responsabilidad.


