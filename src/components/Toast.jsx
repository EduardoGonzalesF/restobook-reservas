import { useEffect } from 'react';

/** Toast flotante — feedback inmediato (interacción avanzada UX). */
export default function Toast({ message, variant = 'success', onClose, ms = 3500 }) {
  useEffect(() => {
    if (!message) return undefined;
    const t = setTimeout(onClose, ms);
    return () => clearTimeout(t);
  }, [message, ms, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast--${variant}`} role="status" aria-live="polite">
      <span>{message}</span>
      <button type="button" className="toast__close" onClick={onClose} aria-label="Cerrar">
        ×
      </button>
    </div>
  );
}
