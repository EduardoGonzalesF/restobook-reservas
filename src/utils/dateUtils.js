export function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatDisplayDate(dateStr) {
  const date = parseDate(dateStr);
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatShortDate(dateStr) {
  const date = parseDate(dateStr);
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  });
}

export function getTodayString() {
  return formatDate(new Date());
}

export function getMaxDateString(maxDays) {
  const date = new Date();
  date.setDate(date.getDate() + maxDays);
  return formatDate(date);
}

export function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];

  const startPadding = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

  for (let i = 0; i < startPadding; i++) {
    days.push(null);
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(formatDate(new Date(year, month, d)));
  }

  return days;
}

export function getMonthName(month) {
  return new Date(2000, month, 1).toLocaleDateString('es-ES', { month: 'long' });
}

export function isPastDate(dateStr) {
  const today = parseDate(getTodayString());
  const target = parseDate(dateStr);
  return target < today;
}

export function isSameMonth(dateStr, year, month) {
  const date = parseDate(dateStr);
  return date.getFullYear() === year && date.getMonth() === month;
}
