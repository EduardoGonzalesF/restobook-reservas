import { RESTAURANT_CONFIG } from '../utils/constants';

export default function VenueHero() {
  const { venueName, tagline, address, city, heroImage, gallery } = RESTAURANT_CONFIG;

  return (
    <section className="venue-hero" aria-label="Presentación del restaurante">
      <div className="venue-hero__media">
        <img src={heroImage} alt={`Ambiente de ${venueName}`} className="venue-hero__img" />
        <div className="venue-hero__shade" aria-hidden />
        <div className="venue-hero__copy">
          <p className="venue-hero__eyebrow">Reservas · {city}</p>
          <h2 className="venue-hero__title font-display">{venueName}</h2>
          <p className="venue-hero__tag">{tagline}</p>
          <p className="venue-hero__meta">{address}</p>
        </div>
      </div>

      <div className="venue-gallery" aria-label="Galería del local">
        {gallery.map((shot) => (
          <figure key={shot.src} className="venue-gallery__item">
            <img src={shot.src} alt={shot.alt} loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  );
}
