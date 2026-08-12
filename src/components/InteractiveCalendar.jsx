import { useState, useEffect, useMemo } from 'react';
import { RESTAURANT_CONFIG } from '../utils/constants';
import { getReservationsForDate } from '../utils/conflictDetection';
import {
  getMonthDays,
  getMonthName,
  formatShortDate,
  getTodayString,
  isPastDate,
  parseDate,
} from '../utils/dateUtils';

const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export default function InteractiveCalendar({ reservations, onDateSelect, selectedDate }) {
  const today = parseDate(getTodayString());
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const days = useMemo(() => getMonthDays(year, month), [year, month]);

  const reservationCountByDate = useMemo(() => {
    const counts = {};
    reservations
      .filter((r) => r.status !== 'cancelled')
      .forEach((r) => {
        counts[r.date] = (counts[r.date] || 0) + 1;
      });
    return counts;
  }, [reservations]);

  useEffect(() => {
    if (selectedDate) {
      const d = parseDate(selectedDate);
      setViewDate(new Date(d.getFullYear(), d.getMonth(), 1));
    }
  }, [selectedDate]);

  const goToPrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    onDateSelect?.(getTodayString());
  };

  const selectedDayReservations = selectedDate
    ? getReservationsForDate(reservations, selectedDate)
    : [];

  const getDayIntensity = (count) => {
    if (!count) return '';
    if (count <= 2) return 'calendar__day--low';
    if (count <= 5) return 'calendar__day--medium';
    return 'calendar__day--high';
  };

  return (
    <section className="calendar-section" aria-labelledby="calendar-title">
      <div className="card calendar-card">
        <div className="card__header calendar-card__header">
          <div>
            <h2 id="calendar-title">Calendario de reservas</h2>
            <p>Visualiza la ocupación y selecciona un día para ver detalles.</p>
          </div>
          <div className="calendar-nav">
            <button type="button" className="calendar-nav__btn" onClick={goToPrevMonth} aria-label="Mes anterior">
              ‹
            </button>
            <span className="calendar-nav__label">
              {getMonthName(month)} {year}
            </span>
            <button type="button" className="calendar-nav__btn" onClick={goToNextMonth} aria-label="Mes siguiente">
              ›
            </button>
            <button type="button" className="calendar-nav__today" onClick={goToToday}>
              Hoy
            </button>
          </div>
        </div>

        <div className="calendar" role="grid" aria-label={`Calendario ${getMonthName(month)} ${year}`}>
          <div className="calendar__weekdays" role="row">
            {WEEKDAYS.map((day) => (
              <div key={day} className="calendar__weekday" role="columnheader">{day}</div>
            ))}
          </div>

          <div className="calendar__grid">
            {days.map((dateStr, index) => {
              if (!dateStr) {
                return <div key={`empty-${index}`} className="calendar__day calendar__day--empty" />;
              }

              const count = reservationCountByDate[dateStr] || 0;
              const isSelected = selectedDate === dateStr;
              const isToday = dateStr === getTodayString();
              const isPast = isPastDate(dateStr);

              return (
                <button
                  key={dateStr}
                  type="button"
                  className={[
                    'calendar__day',
                    getDayIntensity(count),
                    isSelected ? 'calendar__day--selected' : '',
                    isToday ? 'calendar__day--today' : '',
                    isPast ? 'calendar__day--past' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => onDateSelect?.(dateStr)}
                  aria-label={`${formatShortDate(dateStr)}, ${count} reservas`}
                  aria-pressed={isSelected}
                >
                  <span className="calendar__day-number">{parseDate(dateStr).getDate()}</span>
                  {count > 0 && (
                    <span className="calendar__day-badge">{count}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="calendar-legend">
          <span><i className="legend-dot legend-dot--low" /> Poca ocupación</span>
          <span><i className="legend-dot legend-dot--medium" /> Media</span>
          <span><i className="legend-dot legend-dot--high" /> Alta demanda</span>
        </div>
      </div>

      {selectedDate && (
        <div className="card calendar-detail">
          <h3>Reservas del {formatShortDate(selectedDate)}</h3>
          {selectedDayReservations.length === 0 ? (
            <p className="empty-state">No hay reservas para este día.</p>
          ) : (
            <ul className="calendar-detail__list">
              {selectedDayReservations.map((r) => {
                const table = RESTAURANT_CONFIG.tables.find((t) => t.id === r.tableId);
                return (
                  <li key={r.id} className="calendar-detail__item">
                    <span className="calendar-detail__time">{r.time}</span>
                    <div>
                      <strong>{r.customerName}</strong>
                      <span>{table?.name} · {r.guests} pax</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
