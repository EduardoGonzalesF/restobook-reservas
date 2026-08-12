import { useMemo } from 'react';
import { RESTAURANT_CONFIG } from '../utils/constants';
import { getAvailabilityForSlot } from '../utils/conflictDetection';
import { formatDisplayDate } from '../utils/dateUtils';

export default function AvailabilityGrid({ reservations, date }) {
  const slots = useMemo(() => {
    return RESTAURANT_CONFIG.timeSlots.map((time) => ({
      time,
      ...getAvailabilityForSlot(reservations, date, time),
    }));
  }, [reservations, date]);

  const totalAvailable = slots.reduce((sum, s) => sum + s.available, 0);

  return (
    <section className="card availability-grid" aria-labelledby="availability-title">
      <div className="card__header">
        <h2 id="availability-title">Disponibilidad del día</h2>
        <p>{formatDisplayDate(date)} — {totalAvailable} espacios libres en total</p>
      </div>

      <div className="slots-grid">
        {slots.map((slot) => {
          const percentage = (slot.occupied / slot.total) * 100;
          let level = 'available';
          if (slot.isFull) level = 'full';
          else if (percentage >= 50) level = 'limited';

          return (
            <div key={slot.time} className={`slot-card slot-card--${level}`}>
              <span className="slot-card__time">{slot.time}</span>
              <span className="slot-card__count">
                {slot.isFull ? 'Completo' : `${slot.available} mesas`}
              </span>
              <div className="slot-card__bar">
                <div
                  className="slot-card__fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
