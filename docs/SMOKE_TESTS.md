# Documentación de Smoke Tests — Book Store QA

## 1. Introducción

La smoke suite es el conjunto de tests más básico y crítico del proyecto. Su objetivo es responder una sola pregunta después de un deploy o reinicio del entorno:

> **¿El sistema está funcionando?**

No busca cubrir todos los escenarios, sino confirmar rápidamente que los puntos de entrada más importantes de la aplicación responden bien. Si algún smoke test falla, no tiene sentido seguir corriendo el resto de la suite.

---

## 2. Criterio de selección

Los casos elegidos para smoke cumplen con estas condiciones:

- **Rápidos:** se ejecutan en pocos segundos sin flujos largos ni dependencias complejas
- **Estables:** no dependen de estado externo variable, datos dinámicos ni integraciones frágiles
- **Críticos:** si fallan, el sistema no es usable para ningún usuario
- **Feedback temprano:** permiten detectar problemas de infraestructura o configuración antes de correr los tests más completos

---

## 3. Casos implementados

### 3.1 Carga del catálogo (`/books`)

**Objetivo:** Confirmar que la página principal de la aplicación carga y muestra contenido.

**Validaciones:**
- El título `"Book Store App"` está visible
- El subtítulo descriptivo está visible
- El botón de login está visible
- Al menos una tarjeta de libro está visible

**Riesgo cubierto:** Si la home no carga, el usuario no puede ver el catálogo ni iniciar ningún flujo. Este test detecta problemas de servidor, rutas caídas o base de datos sin datos.

---

### 3.2 Login válido

**Objetivo:** Confirmar que el sistema de autenticación funciona y el usuario puede acceder al dashboard.

**Validaciones:**
- El formulario de login carga correctamente
- Al ingresar credenciales válidas, el login redirige al dashboard
- El nombre del usuario autenticado es visible en la pantalla

**Riesgo cubierto:** Si la autenticación falla, ningún flujo de usuario autenticado puede ejecutarse. Este test es el indicador más directo de que el sistema de sesiones y la base de datos están operativos.

---

## 4. Relación con otras suites

| Suite | Propósito | Velocidad | Alcance |
|-------|-----------|-----------|---------|
| **Smoke** | Verificar que el sistema está vivo y los puntos críticos responden | Muy rápida | Mínimo viable |
| **E2E** | Validar flujos completos de negocio desde el navegador | Media | Flujos principales |
| **API** | Validar endpoints del backend a nivel HTTP sin browser | Rápida | Backend / HTTP |

Los smoke tests no reemplazan a los E2E ni a los API tests. Son el primer filtro: si pasan, tiene sentido correr el resto.

---

## 5. Alcance no cubierto por smoke

Los siguientes flujos quedan deliberadamente fuera de la smoke suite porque son más largos, tienen más pasos y pertenecen a la cobertura E2E:

| Funcionalidad | Suite que la cubre |
|---------------|--------------------|
| Flujo completo del carrito | E2E |
| Detalle de libro | E2E |
| Checkout con Stripe | No cubierto (fuera de alcance) |
| Notificaciones por email | No cubierto (fuera de alcance) |
| Integraciones externas | No cubierto (fuera de alcance) |

La smoke suite debe mantenerse mínima. Agregarle flujos complejos le quita velocidad y estabilidad, que son sus principales ventajas.

---

## 6. Conclusión

Con solo dos tests, la smoke suite cubre los dos puntos de falla más críticos del sistema: que la app cargue y que el login funcione. Es el primer check que debería correr después de cualquier deploy o cambio de entorno, y su resultado define si tiene sentido continuar con la suite completa.

Dentro del MVP de automatización, esta suite aporta valor inmediato con un costo de mantenimiento muy bajo.
