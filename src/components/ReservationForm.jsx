import { useState, useEffect } from 'react';
import { RESTAURANT_CONFIG } from '../utils/constants';
import { getAvailableTables, getAvailabilityForSlot } from '../utils/conflictDetection';
import { getTodayString, getMaxDateString, formatDisplayDate } from '../utils/dateUtils';
import Button from './Button';

const INITIAL_FORM = {
  customerName: '',
  phone: '',
  email: '',
  date: getTodayString(),
  time: '',
  guests: 2,
  tableId: '',
  notes: '',
};

const STEPS = [
  { id: 1, label: 'Datos' },
  { id: 2, label: 'Fecha y hora' },
  { id: 3, label: 'Mesa' },
  { id: 4, label: 'Confirmar' },
];

/** Formulario en pasos — interacción avanzada (evaluación final). */
export default function ReservationForm({ reservations, onSubmit, selectedDate, onDateUsed, onToast }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    ...INITIAL_FORM,
    date: selectedDate || getTodayString(),
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (selectedDate) {
      setForm((prev) => ({ ...prev, date: selectedDate, time: '', tableId: '' }));
      setStep(2);
      onDateUsed?.();
    }
  }, [selectedDate, onDateUsed]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, tableId: '' }));
  }, [form.date, form.time, form.guests]);

  const availableTables =
    form.date && form.time && form.guests
      ? getAvailableTables(reservations, {
          date: form.date,
          time: form.time,
          guests: Number(form.guests),
        })
      : [];

  const slotAvailability =
    form.date && form.time ? getAvailabilityForSlot(reservations, form.date, form.time) : null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, conflict: undefined }));
    setSuccessMessage('');
  };

  const validateStep = (n) => {
    const next = {};
    if (n === 1) {
      if (!form.customerName.trim()) next.customerName = 'Ingresa tu nombre';
      if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 7) {
        next.phone = 'Teléfono inválido';
      }
    }
    if (n === 2) {
      if (!form.date) next.date = 'Elige una fecha';
      if (!form.time) next.time = 'Elige un horario';
    }
    if (n === 3) {
      if (!form.tableId) next.tableId = 'Selecciona una mesa';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(4, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(3)) {
      setStep(3);
      return;
    }
    const result = onSubmit(form);
    if (result.success) {
      const msg = `¡Reserva registrada! ${form.customerName} — ${formatDisplayDate(form.date)} a las ${form.time}`;
      setSuccessMessage(msg);
      onToast?.(msg, 'success');
      setForm({ ...INITIAL_FORM, date: form.date });
      setErrors({});
      setStep(1);
    } else {
      setErrors(result.errors || {});
      if (result.errors?.conflict) onToast?.(result.errors.conflict, 'error');
      setStep(3);
    }
  };

  return (
    <section className="card reservation-form" aria-labelledby="form-title">
      <div className="card__header">
        <h2 id="form-title">Nueva reserva</h2>
        <p>Flujo guiado en 4 pasos para evitar errores y conflictos de horario.</p>
      </div>

      <ol className="wizard-steps" aria-label="Pasos de la reserva">
        {STEPS.map((s) => (
          <li
            key={s.id}
            className={`wizard-steps__item${step === s.id ? ' is-active' : ''}${step > s.id ? ' is-done' : ''}`}
          >
            <span className="wizard-steps__n">{s.id}</span>
            <span className="wizard-steps__label">{s.label}</span>
          </li>
        ))}
      </ol>

      {successMessage && (
        <div className="alert alert--success" role="status">
          {successMessage}
        </div>
      )}

      {errors.conflict && (
        <div className="alert alert--error" role="alert">
          {errors.conflict}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form" noValidate>
        {step === 1 && (
          <div className="wizard-panel">
            <div className="form__row">
              <div className="form__group">
                <label htmlFor="customerName">Nombre completo *</label>
                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  value={form.customerName}
                  onChange={handleChange}
                  placeholder="Ej: Ana Pérez"
                  aria-invalid={!!errors.customerName}
                />
                {errors.customerName && <span className="form__error">{errors.customerName}</span>}
              </div>
              <div className="form__group">
                <label htmlFor="phone">Teléfono *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="300 123 4567"
                />
                {errors.phone && <span className="form__error">{errors.phone}</span>}
              </div>
            </div>
            <div className="form__group">
              <label htmlFor="email">Correo electrónico (opcional)</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="wizard-panel">
            <p className="form__hint">
              Selecciona fecha, comensales y horario para ver mesas disponibles.
            </p>
            <div className="form__row form__row--3">
              <div className="form__group">
                <label htmlFor="date">Fecha *</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={form.date}
                  min={getTodayString()}
                  max={getMaxDateString(RESTAURANT_CONFIG.maxAdvanceDays)}
                  onChange={handleChange}
                />
                {errors.date && <span className="form__error">{errors.date}</span>}
              </div>
              <div className="form__group">
                <label htmlFor="guests">Comensales *</label>
                <select id="guests" name="guests" value={form.guests} onChange={handleChange}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'persona' : 'personas'}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form__group">
                <label htmlFor="time">Horario *</label>
                <select id="time" name="time" value={form.time} onChange={handleChange}>
                  <option value="">Seleccionar hora</option>
                  {RESTAURANT_CONFIG.timeSlots.map((slot) => {
                    const avail = getAvailabilityForSlot(reservations, form.date, slot);
                    return (
                      <option key={slot} value={slot} disabled={avail.isFull}>
                        {slot}{' '}
                        {avail.isFull ? '(Completo)' : `(${avail.available} mesas libres)`}
                      </option>
                    );
                  })}
                </select>
                {errors.time && <span className="form__error">{errors.time}</span>}
              </div>
            </div>
            {slotAvailability && !slotAvailability.isFull && (
              <p className="form__hint">
                Disponibilidad: {slotAvailability.available} de {slotAvailability.total} mesas libres
                a las {form.time}
              </p>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="wizard-panel">
            <div className="form__group">
              <label htmlFor="tableId">Mesa disponible *</label>
              {availableTables.length > 0 ? (
                <div className="table-grid" role="radiogroup" aria-label="Seleccionar mesa">
                  {availableTables.map((table) => (
                    <label
                      key={table.id}
                      className={`table-option ${Number(form.tableId) === table.id ? 'table-option--selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="tableId"
                        value={table.id}
                        checked={Number(form.tableId) === table.id}
                        onChange={handleChange}
                      />
                      <img
                        className="table-option__photo"
                        src={RESTAURANT_CONFIG.zoneImages[table.zone]}
                        alt=""
                        loading="lazy"
                      />
                      <span className="table-option__body">
                        <span className="table-option__name">{table.name}</span>
                        <span className="table-option__meta">
                          {table.zone} · {table.capacity} pax
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="form__hint form__hint--warning">
                  {form.time
                    ? 'No hay mesas disponibles para este horario y número de comensales.'
                    : 'Vuelve al paso anterior y elige fecha y horario.'}
                </p>
              )}
              {errors.tableId && <span className="form__error">{errors.tableId}</span>}
            </div>
            <div className="form__group">
              <label htmlFor="notes">Notas adicionales</label>
              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Alergias, ocasión especial, preferencia de zona..."
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="wizard-panel wizard-summary">
            <h3>Revisa tu reserva</h3>
            <ul>
              <li>
                <strong>Cliente:</strong> {form.customerName} · {form.phone}
              </li>
              <li>
                <strong>Cuándo:</strong> {formatDisplayDate(form.date)} a las {form.time}
              </li>
              <li>
                <strong>Comensales:</strong> {form.guests}
              </li>
              <li>
                <strong>Mesa:</strong>{' '}
                {RESTAURANT_CONFIG.tables.find((t) => t.id === Number(form.tableId))?.name || '—'}
              </li>
              {form.notes ? (
                <li>
                  <strong>Notas:</strong> {form.notes}
                </li>
              ) : null}
            </ul>
          </div>
        )}

        <div className="wizard-actions">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={goBack}>
              Atrás
            </Button>
          ) : (
            <span />
          )}
          {step < 4 ? (
            <Button type="button" onClick={goNext}>
              Siguiente
            </Button>
          ) : (
            <Button type="submit">Confirmar reserva</Button>
          )}
        </div>
      </form>
    </section>
  );
}
