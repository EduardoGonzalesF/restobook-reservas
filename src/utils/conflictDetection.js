import { RESTAURANT_CONFIG } from './constants';

export function findConflict(reservations, { date, time, tableId, excludeId = null }) {
  return reservations.find(
    (r) =>
      r.id !== excludeId &&
      r.status !== 'cancelled' &&
      r.date === date &&
      r.time === time &&
      r.tableId === tableId
  );
}

export function getAvailableTables(reservations, { date, time, guests }) {
  const occupiedTableIds = reservations
    .filter(
      (r) =>
        r.status !== 'cancelled' &&
        r.date === date &&
        r.time === time
    )
    .map((r) => r.tableId);

  return RESTAURANT_CONFIG.tables.filter(
    (table) =>
      !occupiedTableIds.includes(table.id) &&
      table.capacity >= guests
  );
}

export function getOccupiedSlotsForDate(reservations, date) {
  return reservations
    .filter((r) => r.status !== 'cancelled' && r.date === date)
    .map((r) => ({ time: r.time, tableId: r.tableId }));
}

export function getAvailabilityForSlot(reservations, date, time) {
  const occupied = reservations.filter(
    (r) => r.status !== 'cancelled' && r.date === date && r.time === time
  ).length;

  const total = RESTAURANT_CONFIG.tables.length;
  return {
    occupied,
    available: total - occupied,
    total,
    isFull: occupied >= total,
  };
}

export function getReservationsForDate(reservations, date) {
  return reservations
    .filter((r) => r.date === date && r.status !== 'cancelled')
    .sort((a, b) => a.time.localeCompare(b.time));
}

export function validateReservation(formData) {
  const errors = {};

  if (!formData.customerName?.trim()) {
    errors.customerName = 'El nombre es obligatorio';
  }

  if (!formData.phone?.trim()) {
    errors.phone = 'El teléfono es obligatorio';
  } else if (!/^[\d\s+\-()]{7,15}$/.test(formData.phone.trim())) {
    errors.phone = 'Ingresa un teléfono válido';
  }

  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Ingresa un correo válido';
  }

  if (!formData.date) {
    errors.date = 'Selecciona una fecha';
  }

  if (!formData.time) {
    errors.time = 'Selecciona un horario';
  }

  if (!formData.guests || formData.guests < 1) {
    errors.guests = 'Indica el número de comensales';
  } else if (formData.guests > 8) {
    errors.guests = 'Máximo 8 comensales por reserva';
  }

  if (!formData.tableId) {
    errors.tableId = 'Selecciona una mesa disponible';
  }

  return errors;
}

export function generateId() {
  return `res_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
