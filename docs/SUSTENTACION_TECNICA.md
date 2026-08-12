# Sustentación Técnica — RestoBook

**Asignatura:** Desarrollo de Interfaces  
**Entrega:** EPD — Trabajo Parcial Definitivo  
**Fecha:** 20 de junio de 2026

---

## Integrantes

Eduardo Gonzales Farro

---

## 1. Descripción del proyecto

**RestoBook** es una aplicación web para la gestión centralizada de reservas de mesas en restaurantes. Fue desarrollada como respuesta a los problemas identificados en restaurantes que gestionan reservas por teléfono: duplicaciones, confusión en horarios pico y falta de visibilidad de la ocupación.

### Usuarios del sistema

| Perfil | Necesidades |
|--------|-------------|
| **Cliente** | Reservar mesa fácilmente, ver disponibilidad, recibir confirmación |
| **Administrador** | Ver todas las reservas, confirmar/cancelar, evitar conflictos |

---

## 2. Enlaces del proyecto

| Recurso | URL |
|---------|-----|
| Prototipo interactivo (Figma) |  |
| Repositorio GitHub |  |
| Aplicación en vivo  |  |

---

## 3. Proceso de diseño

### 3.1 Wireframes (Figma)

Se diseñaron las siguientes pantallas:

1. **Inicio / Reservar mesa** — Formulario principal del cliente
2. **Calendario** — Vista mensual con reservas
3. **Administración** — Lista de reservas con acciones
4. **Disponibilidad** — Grid de horarios libres/ocupados
5. **Confirmación** — Estado de reserva exitosa
6. **Error de conflicto** — Mensaje cuando la mesa ya está reservada

### 3.2 Prototipo interactivo

El prototipo en Figma simula:

- Flujo completo de reserva (cliente)
- Navegación entre vistas
- Transiciones al seleccionar fechas en el calendario
- Estados de error por conflicto de horario

---

## 4. Decisiones de diseño (Usabilidad)

| Principio | Aplicación en RestoBook |
|-----------|-------------------------|
| **Visibilidad del estado** | Colores en calendario indican nivel de ocupación; badges de estado en reservas |
| **Prevención de errores** | Horarios completos deshabilitados; detección de conflictos antes de guardar |
| **Consistencia** | Misma paleta y componentes en las 3 vistas |
| **Feedback inmediato** | Mensajes de éxito/error tras cada acción |
| **Accesibilidad** | Labels en formularios, roles ARIA, contraste adecuado, diseño responsive |

---

## 5. Desarrollo con React

### 5.1 Configuración del entorno

- **Bundler:** Vite 5
- **Framework:** React 18
- **Lenguaje:** JavaScript (JSX)

### 5.2 Componentes reutilizables

```jsx
// Ejemplo: Hook useReservations con useState y useEffect
const [reservations, setReservations] = useState(loadFromStorage);

useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
}, [reservations]);
```

| Componente | Responsabilidad |
|------------|-----------------|
| `ReservationForm` | Captura datos y valida reservas |
| `InteractiveCalendar` | Muestra ocupación y permite seleccionar fechas |
| `ReservationList` | Administra reservas existentes |
| `AvailabilityGrid` | Muestra mesas libres por horario |
| `Button` | Botón reutilizable con variantes |

### 5.3 Detección de conflictos

El sistema verifica que no exista otra reserva activa con la misma **fecha + hora + mesa** antes de registrar:

```javascript
function findConflict(reservations, { date, time, tableId }) {
  return reservations.find(
    (r) => r.status !== 'cancelled' &&
           r.date === date &&
           r.time === time &&
           r.tableId === tableId
  );
}
```

---

## 6. Pruebas de usabilidad

### Resultados resumidos

- **5 usuarios simulados**, 5 tareas, **100% de éxito**
- Satisfacción promedio: **4.2/5**

### Problemas y soluciones

| Problema | Solución |
|----------|----------|
| Orden confuso al seleccionar mesa | Mensajes guía en el formulario |
| Calendario sin leyenda | Leyenda de colores añadida |
| Filtros pequeños en móvil | Diseño responsive con áreas táctiles ampliadas |

*(Ver informe completo en `docs/INFORME_USABILIDAD.md`)*

---

## 7. Demostración de funcionalidades

Durante la sustentación se demostrará:

1. Creación de reserva sin conflictos
2. Intento de reserva duplicada (mensaje de error)
3. Navegación del calendario interactivo
4. Confirmación de reserva desde administración
5. Diseño responsive en móvil

---

## 8. Conclusiones

RestoBook demuestra cómo React, con componentes reutilizables y hooks (`useState`, `useEffect`), permite construir una interfaz funcional que resuelve problemas reales de gestión en restaurantes. El proceso iterativo de diseño en Figma, pruebas de usabilidad y desarrollo garantizó una experiencia clara tanto para clientes como para administradores.

---

## 9. Referencias técnicas

- React Documentation — https://react.dev
- Vite Documentation — https://vitejs.dev
- Nielsen Norman Group — Heurísticas de usabilidad

---
