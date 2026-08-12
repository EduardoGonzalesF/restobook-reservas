export const RESTAURANT_CONFIG = {
  brand: 'RestoBook',
  venueName: 'La Mesa Aurora',
  tagline: 'Cocina de temporada · Reservas en línea',
  city: 'Lima',
  phone: '+51 1 555 0198',
  address: 'Av. Larco 845, Miraflores',
  heroImage:
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
  gallery: [
    {
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
      alt: 'Plato principal de temporada',
    },
    {
      src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
      alt: 'Salón principal del restaurante',
    },
    {
      src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80',
      alt: 'Terraza iluminada',
    },
    {
      src: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800&q=80',
      alt: 'Detalle de mesa servida',
    },
  ],
  zoneImages: {
    Terraza:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=400&q=70',
    Salón:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=70',
    Privado:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=70',
    Barra:
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=70',
  },
  tables: [
    { id: 1, name: 'Mesa 1', capacity: 2, zone: 'Terraza' },
    { id: 2, name: 'Mesa 2', capacity: 2, zone: 'Terraza' },
    { id: 3, name: 'Mesa 3', capacity: 4, zone: 'Salón' },
    { id: 4, name: 'Mesa 4', capacity: 4, zone: 'Salón' },
    { id: 5, name: 'Mesa 5', capacity: 6, zone: 'Salón' },
    { id: 6, name: 'Mesa 6', capacity: 6, zone: 'Salón' },
    { id: 7, name: 'Mesa 7', capacity: 8, zone: 'Privado' },
    { id: 8, name: 'Mesa 8', capacity: 2, zone: 'Barra' },
  ],
  timeSlots: [
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
  ],
  maxAdvanceDays: 30,
};

export const RESERVATION_STATUS = {
  pending: { label: 'Pendiente', color: '#d4a017' },
  confirmed: { label: 'Confirmada', color: '#2f9e6b' },
  cancelled: { label: 'Cancelada', color: '#c45c4a' },
};

export const STORAGE_KEY = 'restobook_reservations_v2';
