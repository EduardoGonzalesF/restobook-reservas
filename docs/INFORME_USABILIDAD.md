# Informe de usabilidad — RestoBook (parcial + final)

**Integrante:** Andrés Eduardo Gonzales Farro  
**Fecha:** Agosto 2026 (evaluación final)

## 1. Objetivo

Evaluar UX de RestoBook (cliente y administrador) y aplicar mejoras iterativas exigidas en la evaluación final.

## 2. Metodología

| Aspecto | Detalle |
|---------|---------|
| Participantes | 5 usuarios simulados (3 clientes, 2 admins) |
| Duración | ~15 min / sesión |
| Herramientas | Figma + app React |

## 3. Resultados (parcial)

Satisfacción: **4.2 / 5**. Tareas T1–T5 completadas al 100%.

## 4. Problemas (parcial) → estado en el final

| # | Problema | Severidad | Solución final |
|---|----------|-----------|----------------|
| P1 | Horario antes de ver mesas | Media | Wizard paso 2 con hint explícito |
| P2 | Leyenda calendario | Baja | Leyenda bajo calendario (parcial) |
| P3 | Filtros táctiles móvil | Media | Áreas táctiles ampliadas |
| P4 | Borrar sin confirmar | Alta | **Modal de confirmación** |
| P5 | Correo opcional poco claro | Baja | Label “(opcional)” |

## 5. Prueba iterativa del final (ciclo 2)

Tareas nuevas:

- T6: Completar reserva en wizard 4 pasos  
- T7: Eliminar reserva y cancelar en el modal  
- T8: Ver toast de éxito tras confirmar  

Hallazgos ciclo 2:

| # | Hallazgo | Mejora aplicada |
|---|----------|-----------------|
| F1 | Formulario largo abrumaba | Wizard Datos → Fecha → Mesa → Confirmar |
| F2 | Éxito solo en alerta inline | Toast global |
| F3 | Miedo a borrar | Modal + copy claro |

Satisfacción ciclo 2 (simulada): **4.6 / 5**
