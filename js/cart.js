const KEY = 'fdgs_cart';
const listeners = new Set();

function read()  { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
function write(c) { localStorage.setItem(KEY, JSON.stringify(c)); listeners.forEach(fn => fn()); }

export const Cart = {
  get:   read,
  count: ()  => read().reduce((s, i) => s + i.qty, 0),
  qty:   (id) => { const i = read().find(c => c.id === id); return i ? i.qty : 0; },

  subtotal(products) {
    return read().reduce((s, i) => {
      const p = products.find(x => x.id === i.id);
      return s + (p ? p.price * i.qty : 0);
    }, 0);
  },

  add(id) {
    const c = read();
    if (!c.find(i => i.id === id)) c.push({ id, qty: 1 });
    write(c);
  },

  inc(id, maxStock) {
    const c = read();
    const i = c.find(x => x.id === id);
    if (i) i.qty = Math.min(i.qty + 1, maxStock);
    write(c);
  },

  dec(id) {
    let c = read();
    const i = c.find(x => x.id === id);
    if (!i) return;
    i.qty--;
    if (i.qty <= 0) c = c.filter(x => x.id !== id);
    write(c);
  },

  changeQty(id, delta, maxStock) {
    const c = read();
    const i = c.find(x => x.id === id);
    if (i) i.qty = Math.max(1, Math.min(i.qty + delta, maxStock));
    write(c);
  },

  remove: (id) => write(read().filter(i => i.id !== id)),
  clear:  ()   => write([]),

  onChange: (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
};
