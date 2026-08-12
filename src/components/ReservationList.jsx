import { useState, useMemo } from 'react';
import { RESTAURANT_CONFIG, RESERVATION_STATUS } from '../utils/constants';
import { formatDisplayDate } from '../utils/dateUtils';
import Button from './Button';
import ConfirmModal from './ConfirmModal';

export default function ReservationList({
  reservations,
  onConfirm,
  onCancel,
  onDelete,
  onToast,
  showActions = true,
}) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [pendingDelete, setPendingDelete] = useState(null);

  const filtered = useMemo(() => {
    return reservations
      .filter((r) => {
        if (filter === 'active') return r.status !== 'cancelled';
        if (filter !== 'all') return r.status === filter;
        return true;
      })
      .filter((r) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          r.customerName.toLowerCase().includes(q) ||
          r.phone.includes(q) ||
          r.date.includes(q)
        );
      })
      .sort((a, b) => {
        const dateCompare = b.date.localeCompare(a.date);
        if (dateCompare !== 0) return dateCompare;
        return a.time.localeCompare(b.time);
      });
  }, [reservations, filter, search]);

  const stats = useMemo(
    () => ({
      total: reservations.filter((r) => r.status !== 'cancelled').length,
      pending: reservations.filter((r) => r.status === 'pending').length,
      confirmed: reservations.filter((r) => r.status === 'confirmed').length,
    }),
    [reservations],
  );

  return (
    <section className="card reservation-list" aria-labelledby="list-title">
      <div className="card__header">
        <h2 id="list-title">Lista de reservas</h2>
        <p>Gestiona todas las reservas registradas en el sistema.</p>
      </div>

      <div className="reservation-list__stats">
        <div className="stat-card">
          <span className="stat-card__value">{stats.total}</span>
          <span className="stat-card__label">Activas</span>
        </div>
        <div className="stat-card stat-card--pending">
          <span className="stat-card__value">{stats.pending}</span>
          <span className="stat-card__label">Pendientes</span>
        </div>
        <div className="stat-card stat-card--confirmed">
          <span className="stat-card__value">{stats.confirmed}</span>
          <span className="stat-card__label">Confirmadas</span>
        </div>
      </div>

      <div className="reservation-list__toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Buscar por nombre, teléfono o fecha..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Buscar reservas"
        />
        <div className="filter-tabs" role="tablist" aria-label="Filtrar reservas">
          {[
            { id: 'all', label: 'Todas' },
            { id: 'active', label: 'Activas' },
            { id: 'pending', label: 'Pendientes' },
            { id: 'confirmed', label: 'Confirmadas' },
            { id: 'cancelled', label: 'Canceladas' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={filter === tab.id}
              className={`filter-tab ${filter === tab.id ? 'filter-tab--active' : ''}`}
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No se encontraron reservas con los filtros actuales.</p>
      ) : (
        <div className="reservation-list__items">
          {filtered.map((reservation) => {
            const table = RESTAURANT_CONFIG.tables.find((t) => t.id === reservation.tableId);
            const statusInfo = RESERVATION_STATUS[reservation.status];

            return (
              <article
                key={reservation.id}
                className={`reservation-item reservation-item--${reservation.status}`}
              >
                <div className="reservation-item__main">
                  <div className="reservation-item__header">
                    <h3>{reservation.customerName}</h3>
                    <span className="status-badge" style={{ '--status-color': statusInfo.color }}>
                      {statusInfo.label}
                    </span>
                  </div>

                  <div className="reservation-item__details">
                    <span>📅 {formatDisplayDate(reservation.date)}</span>
                    <span>🕐 {reservation.time}</span>
                    <span>
                      🪑 {table?.name || 'Mesa'} ({table?.zone})
                    </span>
                    <span>👥 {reservation.guests} comensales</span>
                    <span>📞 {reservation.phone}</span>
                  </div>

                  {reservation.notes && (
                    <p className="reservation-item__notes">📝 {reservation.notes}</p>
                  )}
                </div>

                {showActions && reservation.status !== 'cancelled' && (
                  <div className="reservation-item__actions">
                    {reservation.status === 'pending' && (
                      <Button
                        variant="success"
                        onClick={() => {
                          onConfirm(reservation.id);
                          onToast?.(`Reserva de ${reservation.customerName} confirmada`, 'success');
                        }}
                      >
                        Confirmar
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => {
                        onCancel(reservation.id);
                        onToast?.(`Reserva de ${reservation.customerName} cancelada`, 'success');
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button variant="danger" onClick={() => setPendingDelete(reservation)}>
                      Eliminar
                    </Button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      <ConfirmModal
        open={Boolean(pendingDelete)}
        title="¿Eliminar reserva?"
        message={
          pendingDelete
            ? `Se eliminará la reserva de ${pendingDelete.customerName} (${formatDisplayDate(pendingDelete.date)} ${pendingDelete.time}). Esta acción no se puede deshacer.`
            : ''
        }
        confirmLabel="Sí, eliminar"
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            onDelete(pendingDelete.id);
            onToast?.(`Reserva de ${pendingDelete.customerName} eliminada`, 'success');
          }
          setPendingDelete(null);
        }}
      />
    </section>
  );
}
