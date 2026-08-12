import { useState, useCallback } from 'react';
import Header from './components/Header';
import VenueHero from './components/VenueHero';
import ReservationForm from './components/ReservationForm';
import InteractiveCalendar from './components/InteractiveCalendar';
import ReservationList from './components/ReservationList';
import AvailabilityGrid from './components/AvailabilityGrid';
import Toast from './components/Toast';
import { useReservations } from './hooks/useReservations';
import { getTodayString } from './utils/dateUtils';
import { RESTAURANT_CONFIG } from './utils/constants';
import './App.css';

export default function App() {
  const [activeView, setActiveView] = useState('client');
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [formDateOverride, setFormDateOverride] = useState(null);
  const [showTips, setShowTips] = useState(true);
  const [toast, setToast] = useState({ message: '', variant: 'success' });

  const {
    reservations,
    addReservation,
    updateReservationStatus,
    cancelReservation,
    deleteReservation,
  } = useReservations();

  const showToast = useCallback((message, variant = 'success') => {
    setToast({ message, variant });
  }, []);

  const handleDateSelect = (date) => setSelectedDate(date);

  const handleReserveFromCalendar = (date) => {
    setFormDateOverride(date);
    setActiveView('client');
  };

  return (
    <div className="app">
      <Header activeView={activeView} onViewChange={setActiveView} />

      {activeView === 'client' ? <VenueHero /> : null}

      <main className="app__main">
        {showTips && (
          <div className="ux-banner" role="note">
            <div>
              <strong>Reserva guiada:</strong> completa 4 pasos. En Administración, eliminar pide
              confirmación.
            </div>
            <button type="button" className="ux-banner__close" onClick={() => setShowTips(false)}>
              Entendido
            </button>
          </div>
        )}

        {activeView === 'client' && (
          <div className="view-grid view-grid--client">
            <ReservationForm
              reservations={reservations}
              onSubmit={addReservation}
              selectedDate={formDateOverride}
              onDateUsed={() => setFormDateOverride(null)}
              onToast={showToast}
            />
            <aside className="view-sidebar">
              <AvailabilityGrid reservations={reservations} date={selectedDate} />
              <InteractiveCalendar
                reservations={reservations}
                onDateSelect={(date) => {
                  handleDateSelect(date);
                  handleReserveFromCalendar(date);
                }}
                selectedDate={selectedDate}
              />
            </aside>
          </div>
        )}

        {activeView === 'calendar' && (
          <div className="view-grid view-grid--calendar">
            <InteractiveCalendar
              reservations={reservations}
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
            />
            <aside className="view-sidebar">
              <AvailabilityGrid reservations={reservations} date={selectedDate} />
              <ReservationForm
                reservations={reservations}
                onSubmit={addReservation}
                selectedDate={selectedDate}
                onToast={showToast}
              />
            </aside>
          </div>
        )}

        {activeView === 'admin' && (
          <ReservationList
            reservations={reservations}
            onConfirm={(id) => updateReservationStatus(id, 'confirmed')}
            onCancel={cancelReservation}
            onDelete={deleteReservation}
            onToast={showToast}
          />
        )}
      </main>

      <footer className="app__footer">
        <div className="app__footer-inner">
          <div>
            <p className="font-display app__footer-venue">{RESTAURANT_CONFIG.venueName}</p>
            <p>
              {RESTAURANT_CONFIG.address} · {RESTAURANT_CONFIG.city}
            </p>
            <p>{RESTAURANT_CONFIG.phone}</p>
          </div>
          <div className="app__footer-meta">
            <p>Powered by {RESTAURANT_CONFIG.brand}</p>
            <p>Andrés Eduardo Gonzales Farro · Evaluación Final UX</p>
          </div>
        </div>
      </footer>

      <Toast
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast({ message: '', variant: 'success' })}
      />
    </div>
  );
}
