// Tiny event bus for visual effects: the terminal, typed spells and hidden
// triggers all call fx('name'); EasterEggs.jsx renders the result.
export const fx = (type, detail = {}) =>
  window.dispatchEvent(new CustomEvent('af-fx', { detail: { type, ...detail } }));

export const onFx = (handler) => {
  const h = (e) => handler(e.detail);
  window.addEventListener('af-fx', h);
  return () => window.removeEventListener('af-fx', h);
};
