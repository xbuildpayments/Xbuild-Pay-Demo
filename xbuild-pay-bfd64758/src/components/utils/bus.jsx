export const Bus = {
  _handlers: {},
  on(evt, fn) {
    (this._handlers[evt] = this._handlers[evt] || []).push(fn);
  },
  emit(evt, payload) {
    (this._handlers[evt] || []).forEach(fn => fn(payload));
  },
  off(evt, fn) {
    if (!this._handlers[evt]) return;
    this._handlers[evt] = this._handlers[evt].filter(handler => handler !== fn);
  }
};

// Dev tools exposure
if (typeof window !== 'undefined') {
  window.__xbpDemo = window.__xbpDemo || {};
  window.__xbpDemo.Bus = Bus;
}