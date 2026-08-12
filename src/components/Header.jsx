import { RESTAURANT_CONFIG } from '../utils/constants';

export default function Header({ activeView, onViewChange }) {
  const views = [
    { id: 'client', label: 'Reservar' },
    { id: 'calendar', label: 'Calendario' },
    { id: 'admin', label: 'Administración' },
  ];

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <div className="header__mark" aria-hidden>
            <span>LA</span>
          </div>
          <div>
            <p className="header__product">{RESTAURANT_CONFIG.brand}</p>
            <h1 className="header__title font-display">{RESTAURANT_CONFIG.venueName}</h1>
          </div>
        </div>

        <nav className="header__nav" aria-label="Navegación principal">
          {views.map((view) => (
            <button
              key={view.id}
              type="button"
              className={`header__nav-btn ${activeView === view.id ? 'header__nav-btn--active' : ''}`}
              onClick={() => onViewChange(view.id)}
              aria-current={activeView === view.id ? 'page' : undefined}
            >
              {view.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
