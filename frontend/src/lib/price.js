// Locale-aware price formatting for the pricing section.
const LOCALES = { cs: 'cs-CZ', en: 'en-US', ru: 'ru-RU', es: 'es-ES' };

export function formatPrice(value, lang, currency = 'Kč') {
  const locale = LOCALES[lang] || 'cs-CZ';
  return `${new Intl.NumberFormat(locale).format(value)} ${currency}`;
}
