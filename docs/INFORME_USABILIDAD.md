# Informe de usabilidad — RestoBook (Evaluación Final)

**Integrante:** Andrés Eduardo Gonzales Farro  
**Fecha:** Agosto 2026

## 1. Objetivo

Evaluar UX de RestoBook (cliente y administrador) y aplicar mejoras iterativas en la evaluación final (culminación).

## 2. Metodología

| Aspecto | Detalle |
|---------|---------|
| Participantes | 5 usuarios (3 clientes, 2 admins) |
| Duración | ~15 min / sesión |
| Herramientas | Figma + app React |

## 3. Primera revisión (base)

Satisfacción: **4.2 / 5**. Tareas de reserva y administración completadas.

## 4. Problemas detectados → solución en la culminación

| # | Problema | Severidad | Solución final |
|---|----------|-----------|----------------|
| P1 | Horario antes de ver mesas | Media | Wizard paso 2 con hint explícito |
| P2 | Leyenda calendario | Baja | Leyenda bajo calendario |
| P3 | Filtros táctiles móvil | Media | Áreas táctiles ampliadas |
| P4 | Borrar sin confirmar | Alta | **Modal de confirmación** |
| P5 | Correo opcional poco claro | Baja | Label “(opcional)” |

## 5. Prueba iterativa de la culminación

Tareas:

- T6: Completar reserva en wizard 4 pasos  
- T7: Eliminar reserva y cancelar en el modal  
- T8: Ver toast de éxito tras confirmar  

Hallazgos:

| # | Hallazgo | Mejora aplicada |
|---|----------|-----------------|
| F1 | Formulario largo abrumaba | Wizard Datos → Fecha → Mesa → Confirmar |
| F2 | Éxito solo en alerta inline | Toast global |
| F3 | Miedo a borrar | Modal + copy claro |

Satisfacción tras mejoras: **4.6 / 5**
