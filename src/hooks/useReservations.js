import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEY } from '../utils/constants';
import {
  findConflict,
  generateId,
  validateReservation,
} from '../utils/conflictDetection';

const SAMPLE_RESERVATIONS = [
  {
    id: 'sample_1',
    customerName: 'María González',
    phone: '3001234567',
    email: 'maria@email.com',
    date: new Date().toISOString().slice(0, 10),
    time: '19:30',
    tableId: 3,
    guests: 4,
    status: 'confirmed',
    notes: '',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample_2',
    customerName: 'Carlos Ruiz',
    phone: '3109876543',
    email: '',
    date: new Date().toISOString().slice(0, 10),
    time: '20:00',
    tableId: 7,
    guests: 6,
    status: 'pending',
    notes: 'Celebración de cumpleaños',
    createdAt: new Date().toISOString(),
  },
];

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    /* usar datos de ejemplo */
  }
  return SAMPLE_RESERVATIONS;
}

export function useReservations() {
  const [reservations, setReservations] = useState(loadFromStorage);
  const [lastConflict, setLastConflict] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
  }, [reservations]);

  const addReservation = useCallback((formData) => {
    const errors = validateReservation(formData);
    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const conflict = findConflict(reservations, formData);
    if (conflict) {
      setLastConflict(conflict);
      return {
        success: false,
        errors: {
          conflict: `Conflicto: la mesa ya está reservada a las ${formData.time} por ${conflict.customerName}`,
        },
      };
    }

    const newReservation = {
      ...formData,
      id: generateId(),
      tableId: Number(formData.tableId),
      guests: Number(formData.guests),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setReservations((prev) => [...prev, newReservation]);
    setLastConflict(null);
    return { success: true, reservation: newReservation };
  }, [reservations]);

  const updateReservationStatus = useCallback((id, status) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  }, []);

  const cancelReservation = useCallback((id) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'cancelled' } : r))
    );
  }, []);

  const deleteReservation = useCallback((id) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const resetToSample = useCallback(() => {
    setReservations(SAMPLE_RESERVATIONS);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    reservations,
    lastConflict,
    addReservation,
    updateReservationStatus,
    cancelReservation,
    deleteReservation,
    resetToSample,
  };
}
