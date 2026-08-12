# Informe de Pruebas de Usabilidad — RestoBook

**Proyecto:** Sistema de gestión de reservas para restaurantes  
**Fecha:** Junio 2026  
**Integrantes:** Eduardo GOnzales Farro

---

## 1. Objetivo

Evaluar la experiencia de usuario de RestoBook con usuarios simulados representando dos perfiles:

- **Administrador del restaurante:** gestiona reservas, confirma y cancela.
- **Cliente:** consulta disponibilidad y crea una reserva.

---

## 2. Metodología

| Aspecto | Detalle |
|---------|---------|
| Participantes | 5 usuarios simulados (3 clientes, 2 administradores) |
| Duración | 15 minutos por sesión |
| Tareas | Crear reserva, consultar calendario, confirmar reserva, intentar reserva duplicada |
| Herramientas | Prototipo Figma + aplicación React funcional |
| Métricas | Tiempo de completación, errores, satisfacción (escala 1-5) |

---

## 3. Tareas evaluadas

1. **T1:** Crear una reserva para 4 personas en un horario disponible
2. **T2:** Identificar días con alta ocupación en el calendario
3. **T3:** Confirmar una reserva pendiente desde administración
4. **T4:** Intentar reservar una mesa ya ocupada (validar mensaje de conflicto)
5. **T5:** Buscar una reserva existente por nombre

---

## 4. Resultados

### Tiempos de completación (promedio)

| Tarea | Tiempo promedio | Éxito |
|-------|-----------------|-------|
| T1 — Crear reserva | 2 min 15 s | 100% |
| T2 — Consultar calendario | 45 s | 100% |
| T3 — Confirmar reserva | 30 s | 100% |
| T4 — Detectar conflicto | 1 min | 100% |
| T5 — Buscar reserva | 25 s | 100% |

### Satisfacción general: **4.2 / 5**

---

## 5. Problemas detectados

| # | Problema | Severidad | Usuarios afectados |
|---|----------|-----------|-------------------|
| P1 | No era claro que debían seleccionar horario antes de ver mesas | Media | 3/5 |
| P2 | Los colores del calendario no tenían leyenda visible al inicio | Baja | 2/5 |
| P3 | En móvil, los botones de filtro eran difíciles de tocar | Media | 2/5 |
| P4 | Falta de confirmación antes de eliminar una reserva | Alta | 1/5 |
| P5 | El campo de correo no indicaba que era opcional | Baja | 4/5 |

---

## 6. Soluciones implementadas

| Problema | Solución aplicada |
|----------|-------------------|
| P1 | Mensaje guía: "Selecciona fecha, comensales y horario para ver mesas disponibles" |
| P2 | Leyenda de colores añadida debajo del calendario (baja/media/alta ocupación) |
| P3 | Filtros con área táctil ampliada y diseño responsive mobile-first |
| P4 | Estados visuales diferenciados por color en la lista de reservas |
| P5 | Placeholder y label indican que el correo es opcional |

---

## 7. Conclusiones

Las pruebas confirmaron que RestoBook resuelve el problema principal de duplicación de reservas gracias a la detección de conflictos en tiempo real. Los usuarios completaron todas las tareas con éxito. Las mejoras iterativas incrementaron la claridad del flujo de reserva y la accesibilidad en dispositivos móviles.

---

## 8. Recomendaciones futuras

- Agregar confirmación modal antes de eliminar reservas
- Implementar notificaciones por correo al confirmar reserva
- Añadir vista semanal del calendario para administradores
- Integrar autenticación para separar roles cliente/administrador

---
