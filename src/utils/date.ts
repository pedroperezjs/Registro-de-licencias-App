export const formatCLDateTime = (date: string | number | Date) => {
  // Acepta ISO (ej: "2025-10-21T14:30:00Z"), epoch o Date
  const d = new Date(date);
  return new Intl.DateTimeFormat('es-CL', {
    timeZone: 'America/Santiago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit', // si lo necesitas
    hour12: false,
  }).format(d);
};

export const formatCLDate = (date: string | number | Date) => {
  const d = new Date(date);
  return new Intl.DateTimeFormat('es-CL', {
    timeZone: 'America/Santiago',
    year: 'numeric',
    month: 'long', // "octubre"
    day: '2-digit',
  }).format(d);
};
