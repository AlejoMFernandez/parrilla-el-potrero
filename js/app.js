import { montarParrilla } from './parrilla.js?v=2';
import { letras, estadoAhora, intro } from './comun.js?v=2';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const plata = (n) => n == null ? null : '$' + Number(n).toLocaleString('es-AR');
const celu = () => innerWidth < 1000;

// ---------- títulos que se prenden letra por letra ----------
$$('.tit-brasa').forEach(letras);

// ---------- estado de hoy ----------
const e = estadoAhora();
const est = $('#estado');
est.lastElementChild.textContent = e.abierto ? (innerWidth < 700 ? 'Ahora: abierto' : 'Ahora: ' + e.txt.toLowerCase()) : e.txt;
const est2 = $('#estado2'); est2.classList.toggle('abierto', e.abierto); est2.lastElementChild.textContent = e.abierto ? e.txt : 'Cerrado · ' + e.txt.toLowerCase();

// ---------- intro ----------
intro();

// ---------- la parrilla (WOW) ----------
let PRECIOS = {};
const P = montarParrilla($('.parri'), {
  precio: (id) => (id in PRECIOS ? PRECIOS[id] : undefined),
  onPedir: (p, n, btn) => { if (!window.KIT) return; document.querySelector('.pop [data-cerrar]')?.click(); KIT.carrito.agregar(p.kit, 1, { origen: btn }); setTimeout(() => KIT.carrito.abrir(), 650); },
  onSumar: (id, c, btn) => { window.KIT?.carrito.agregar(id, 1, { origen: btn }); },
});
const parri = $('.sec-parri .parri__grill');
new IntersectionObserver((es, io) => { if (es[0].isIntersecting) { P.encender(); io.disconnect(); } }, { threshold: .3 }).observe(parri);

// ---------- entradas al hacer scroll ----------
const io = new IntersectionObserver((es) => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('visto'); $$('.tit-brasa', x.target).forEach(t => t.classList.add('visto')); io.unobserve(x.target); } }), { threshold: .18 });
$$('.rv, .of').forEach(el => io.observe(el));

// ---------- barra de desktop + barra inferior ----------
const barra = $('#barra'), hero = $('#inicio');
new IntersectionObserver(([x]) => { barra.classList.toggle('ver', !x.isIntersecting); }, { rootMargin: '-80px 0px 0px 0px' }).observe(hero);
const secs = ['parrilla', 'carta', 'pedidos', 'salon', 'llegar'].map(id => document.getElementById(id));
const navIO = new IntersectionObserver((es) => es.forEach(x => {
  if (!x.isIntersecting) return;
  $$('.barra__nav a, .navapp a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + x.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
secs.forEach(s => s && navIO.observe(s));

// píldora "Probá el panel": oculta en el hero y en la parrilla en el celu
const vistos = new Set();
const pillIO = new IntersectionObserver((es) => { es.forEach(x => x.isIntersecting ? vistos.add(x.target) : vistos.delete(x.target)); document.body.classList.toggle('sin-pill', vistos.size > 0); }, { threshold: .15 });
pillIO.observe(hero); pillIO.observe($('#parrilla')); pillIO.observe($('#carta'));

// ---------- filas que se arrastran con el mouse ----------
function arrastrable(fila) {
  let x, sl, mov = false, abajo = false;
  fila.addEventListener('pointerdown', ev => { if (ev.pointerType !== 'mouse' || ev.button !== 0 || getComputedStyle(fila).overflowX === 'visible') return; abajo = true; mov = false; x = ev.clientX; sl = fila.scrollLeft; fila.classList.add('agarrando'); });
  addEventListener('pointermove', ev => { if (!abajo) return; const d = ev.clientX - x; if (Math.abs(d) > 4) mov = true; if (mov) { fila.scrollLeft = sl - d; ev.preventDefault(); } });
  addEventListener('pointerup', () => { if (!abajo) return; abajo = false; fila.classList.remove('agarrando'); });
  fila.addEventListener('click', ev => { if (mov) { ev.preventDefault(); ev.stopPropagation(); mov = false; } }, true);
  fila.addEventListener('dragstart', ev => ev.preventDefault());
}
$$('[data-arrastre]').forEach(arrastrable);
const LANDING = ['parrilladas', 'achuras', 'cortes', 'pollo', 'milanesas'];

// ---------- la carta: comanda ----------
let CATS = [], PRODS = [], act = 0;
const lista = $('#lista'), tabs = $('#tabs'), fImg = $('#cfoto-img'), fTxt = $('#cfoto-txt');
const qty = (p) => p.precio != null && p.disponible !== false ? `<span data-kit-qty="${esc(p.id)}"></span>` : '<span class="sin-qty" aria-hidden="true"></span>';
function pintarCarta() {
  const grupos = CATS.filter(c => LANDING.includes(c.id)).map(c => ({ c, it: PRODS.filter(p => p.categoria === c.id) })).filter(g => g.it.length);
  if (act >= grupos.length) act = 0;
  tabs.innerHTML = grupos.map((g, i) => `<button class="tab${i === act ? ' on' : ''}" role="tab" aria-selected="${i === act}" data-i="${i}">${esc(g.c.nombre)}</button>`).join('');
  lista.innerHTML = grupos.map((g, i) => `<div class="cat${i === act ? ' on' : ''}" role="tabpanel" data-i="${i}">
    <div class="cat__cab"><h3>${esc(g.c.nombre)}</h3><span>${g.it.length} ${g.it.length === 1 ? 'opción' : 'opciones'}</span></div>
    ${g.it.map(p => `<div class="it${p.foto ? ' con-foto' : ''}" data-foto="${esc(p.foto || '')}" data-nom="${esc(p.nombre)}">
      ${p.foto ? `<div class="it__th"><img src="${esc(p.foto)}" alt="" width="56" height="56" loading="lazy"></div>` : ''}
      <div class="it__t"><b>${esc(p.nombre)}${(p.etiquetas || []).includes('casa') ? '<span class="casa">de la casa</span>' : ''}</b>${p.descripcion ? `<span>${esc(p.descripcion)}</span>` : ''}</div>
      <div class="it__p${p.precio == null ? ' consultar' : ''}">${p.precio == null ? 'Consultar' : plata(p.precio)}</div>${qty(p)}</div>`).join('')}
  </div>`).join('');
  $$('.cat', lista).forEach((c, i) => { c.inert = i !== act; });
  flechas(grupos.length); fotoDe(grupos[act]?.it.find(p => p.foto));
  fijarAlto();
}
function ir(i) {
  const n = $$('.cat', lista).length; if (i < 0 || i >= n) return; act = i;
  $$('.tab', tabs).forEach((t, k) => { t.classList.toggle('on', k === act); t.setAttribute('aria-selected', k === act); });
  $$('.cat', lista).forEach((c, k) => { c.classList.toggle('on', k === act); c.inert = k !== act; });
  $$('.tab', tabs)[act]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  flechas(n);
  const g = CATS.filter(c => LANDING.includes(c.id) && PRODS.some(p => p.categoria === c.id))[act];
  fotoDe(PRODS.find(p => p.categoria === g?.id && p.foto));
}
function flechas(n) { $('#ant').disabled = act === 0; $('#sig').disabled = act >= n - 1; }
tabs.addEventListener('click', ev => { const b = ev.target.closest('.tab'); if (b) ir(+b.dataset.i); });
$('#ant').addEventListener('click', () => ir(act - 1));
$('#sig').addEventListener('click', () => ir(act + 1));
// foto al costado (desktop)
let fotoAct = '';
function fotoDe(p) {
  if (!p) { fImg.classList.remove('ok'); fImg.removeAttribute('src'); fTxt.textContent = ''; fotoAct = ''; return; }
  if (fotoAct === p.foto) return; fotoAct = p.foto;
  fImg.classList.remove('ok'); fImg.onload = () => fImg.classList.add('ok'); fImg.src = p.foto; fTxt.textContent = p.nombre;
}
lista.addEventListener('pointerover', ev => {
  if (celu()) return; const it = ev.target.closest('.it.con-foto'); if (!it) return;
  fotoDe({ foto: it.dataset.foto, nombre: it.dataset.nom });
});
// alto fijo: el de la sección más larga, así cambiar de pestaña no mueve nada
let anchoFijado = 0;
function fijarAlto() {
  lista.style.minHeight = '';
  const cats = $$('.cat', lista); if (!cats.length) return;
  let max = 0;
  cats.forEach(c => { const on = c.classList.contains('on'); c.style.display = 'block'; max = Math.max(max, c.offsetHeight); c.style.display = on ? '' : ''; });
  cats.forEach(c => c.style.display = '');
  lista.style.minHeight = Math.ceil(max) + 'px'; anchoFijado = innerWidth;
}
addEventListener('resize', () => { if (innerWidth !== anchoFijado) fijarAlto(); });
document.fonts?.ready.then(fijarAlto);

document.addEventListener('kit:carta', (ev) => {
  if (ev.detail.el.id !== 'carta-datos') return;
  CATS = ev.detail.visibles || ev.detail.categorias || []; PRODS = ev.detail.productos || [];
  PRECIOS = Object.fromEntries(PRODS.filter(p => p.disponible !== false).map(p => [p.id, p.precio]));
  pintarCarta(); P.refrescar?.();
  window.KIT?.carrito?.sync(document);
});

// ---------- contador de la comanda ----------
function contar() {
  const n = (window.KIT?.carrito?.lineas || []).reduce((a, l) => a + (l.cant || 0), 0);
  $$('[data-cuenta]').forEach(b => { b.textContent = n; b.dataset.n = n; });
}
document.addEventListener('kit:carrito', contar);

// ---------- popups del kit: esconder la barra inferior ----------
new MutationObserver(() => {
  const abierto = !!document.querySelector('.kit-modal.open, .kit-sheet.open, .kit-overlay.open, [data-kit-modal][open], dialog[open]');
  document.body.classList.toggle('pop-abierto', abierto);
}).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class', 'open'], childList: true });

// ---------- kit ----------
const { initKit } = await import('../kit/kit.js?v=1');
window.KIT = await initKit({ config: 'cliente.json', imagenes: { lqip: 'img/lqip.json' }, carrito: { label: 'Tu comanda', fab: false } });
window.KIT?.carrito?.sync(document); contar();
