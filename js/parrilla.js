// La parrilla de El Potrero: "¿Cuántos son?" llena la parrilla con la parrillada que corresponde.
// Cortes dibujados con marcas de parrilla; tocar un corte abre su ficha (tamaño fijo) sobre la propia parrilla.

const MARCAS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<pattern id="marcas" width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)">
<rect x="0" y="0" width="7" height="34" fill="#1d0b05" opacity=".62"/></pattern>
<linearGradient id="brilloV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient>
</defs></svg>`;

const salchicha = (c1, c2, atado) => {
  const sil = `<rect x="10" y="12" width="200" height="56" rx="28"/>`;
  return { vb: '0 0 220 80', svg:
    `<path d="M12 40 l-9 -7 M12 40 l-9 7 M208 40 l9 -7 M208 40 l9 7" stroke="${atado}" stroke-width="3" stroke-linecap="round"/>
     <g fill="${c1}">${sil}</g><rect x="22" y="18" width="176" height="20" rx="10" fill="${c2}" opacity=".55"/>
     <g fill="url(#marcas)">${sil}</g><g fill="url(#brilloV)">${sil}</g>` };
};
const CORTES = {
  chorizo: { kit: 'chorizo', aparte: 'Chorizo aparte', nom: 'Chorizo puro cerdo', desc: 'Chorizo 100 % cerdo, a la parrilla hasta que la piel cruje.', foto: 'chorizo', ancho: 270, ...salchicha('#A8432A', '#E0855A', '#e9d3b0') },
  morcilla: { kit: 'morcilla', aparte: 'Morcilla aparte', nom: 'Morcilla', desc: 'Morcilla vacuna: crocante por fuera, cremosa por dentro.', foto: 'morcilla', ancho: 256, ...salchicha('#3B1715', '#7a3a30', '#c9b79a') },
  chinchu: { kit: 'chinchulin', aparte: 'Porción aparte', nom: 'Chinchulines', desc: 'Crocantes, para compartir. Con limón y sal.', foto: 'chinchulin', ancho: 189, vb: '0 0 140 140', svg:
    `<path d="M70 70 m-8 0 a8 8 0 1 1 16 0 a16 16 0 1 1 -32 0 a24 24 0 1 1 48 0 a32 32 0 1 1 -64 0 a40 40 0 1 1 80 0 a48 48 0 1 1 -96 0" fill="none" stroke="#B9783A" stroke-width="15" stroke-linecap="round"/>
     <path d="M70 70 m-8 0 a8 8 0 1 1 16 0 a16 16 0 1 1 -32 0 a24 24 0 1 1 48 0 a32 32 0 1 1 -64 0 a40 40 0 1 1 80 0 a48 48 0 1 1 -96 0" fill="none" stroke="#E6B06A" stroke-width="5" stroke-linecap="round" opacity=".7" transform="translate(-2 -3)"/>
     <path d="M70 70 m-8 0 a8 8 0 1 1 16 0 a16 16 0 1 1 -32 0 a24 24 0 1 1 48 0 a32 32 0 1 1 -64 0 a40 40 0 1 1 80 0 a48 48 0 1 1 -96 0" fill="none" stroke="#3a1a0a" stroke-width="15" stroke-dasharray="5 19" opacity=".55"/>` },
  rinon: { kit: 'rinon', aparte: 'Porción aparte', nom: 'Riñón', desc: 'Para los que saben: jugoso, a la parrilla y con limón.', foto: null, ancho: 162, vb: '0 0 120 100', svg:
    `<g fill="#7B2A1F"><circle cx="34" cy="38" r="22"/><circle cx="64" cy="30" r="22"/><circle cx="90" cy="46" r="20"/><circle cx="46" cy="66" r="21"/><circle cx="78" cy="70" r="19"/></g>
     <g fill="#B5523B" opacity=".75"><circle cx="30" cy="32" r="8"/><circle cx="60" cy="24" r="8"/><circle cx="86" cy="40" r="7"/><circle cx="42" cy="60" r="7"/><circle cx="74" cy="64" r="7"/></g>
     <g fill="url(#marcas)"><circle cx="34" cy="38" r="22"/><circle cx="64" cy="30" r="22"/><circle cx="90" cy="46" r="20"/><circle cx="46" cy="66" r="21"/><circle cx="78" cy="70" r="19"/></g>` },
  pollo: { kit: 'medio-pollo', aparte: 'Medio pollo aparte', nom: 'Pollo de granja', desc: 'De Granja Las Camelias, sin hormonas.', foto: 'pollo', ancho: 284, vb: '0 0 220 180', svg:
    `<path d="M168 128 l34 22 a10 10 0 1 1 -8 12 l-34 -22z" fill="#F1E2C6"/>
     <path d="M30 70 C34 30 90 14 132 26 C176 38 194 80 182 114 C170 150 120 168 76 156 C36 146 26 106 30 70Z" fill="#C7782F"/>
     <path d="M52 64 C60 40 104 30 136 44" stroke="#EDB066" stroke-width="16" stroke-linecap="round" fill="none" opacity=".6"/>
     <path d="M30 70 C34 30 90 14 132 26 C176 38 194 80 182 114 C170 150 120 168 76 156 C36 146 26 106 30 70Z" fill="url(#marcas)"/>
     <path d="M118 112 C140 112 168 122 176 134 C166 146 140 146 120 136Z" fill="#B0652A"/>` },
  asado: { kit: 'asado', aparte: 'Porción aparte', nom: 'Asado banderita', desc: 'La tira con el hueso y la grasita justa.', foto: 'asado', ancho: 405, vb: '0 0 320 90', svg:
    `<rect x="6" y="10" width="308" height="70" rx="14" fill="#8E3522"/>
     <path d="M14 30 H306 M14 60 H306" stroke="#E9C7A0" stroke-width="5" opacity=".55"/>
     <rect x="6" y="10" width="308" height="70" rx="14" fill="url(#marcas)"/>
     <g fill="#EFE0C4"><ellipse cx="72" cy="45" rx="18" ry="24"/><ellipse cx="160" cy="45" rx="18" ry="24"/><ellipse cx="248" cy="45" rx="18" ry="24"/></g>
     <g fill="#CDB48E"><ellipse cx="72" cy="45" rx="8" ry="12"/><ellipse cx="160" cy="45" rx="8" ry="12"/><ellipse cx="248" cy="45" rx="8" ry="12"/></g>` },
  bondiola: { kit: 'bondiola', aparte: 'Porción aparte', nom: 'Bondiola', desc: 'De cerdo, tierna, dorada a la parrilla.', foto: 'bondiola', ancho: 256, vb: '0 0 200 130', svg:
    `<path d="M14 64 C14 22 60 10 104 12 C152 14 188 34 186 70 C184 108 140 120 96 118 C48 116 14 104 14 64Z" fill="#B05A33"/>
     <path d="M40 50 C70 40 100 58 130 46 M46 82 C80 72 110 92 150 78" stroke="#E2A77E" stroke-width="5" fill="none" opacity=".7"/>
     <path d="M14 64 C14 22 60 10 104 12 C152 14 188 34 186 70 C184 108 140 120 96 118 C48 116 14 104 14 64Z" fill="url(#marcas)"/>` },
};
// 1000 x 800 unidades
// orden en que se acomodan los cortes: se reparten en filas sin pisarse (grilla 1000 × 800)
const ORDEN = {
  2: ['asado', 'pollo', 'chinchu', 'chorizo', 'morcilla', 'rinon', 'bondiola'],
  3: ['asado', 'pollo', 'chinchu', 'chorizo', 'morcilla', 'rinon', 'bondiola', 'chorizo', 'chinchu', 'morcilla'],
  4: ['asado', 'pollo', 'chinchu', 'asado', 'chorizo', 'rinon', 'morcilla', 'chorizo', 'bondiola', 'chinchu', 'pollo', 'morcilla', 'bondiola', 'chorizo'],
};
const ROT = [-4, 3, 0, 5, -3, 2, -5, 4, -2, 3, -4, 2, 5, -3];
function acomodar(lista) {
  const W = 940, H = 740, GX = 22, GY = 26;
  const dims = (s) => lista.map(t => { const c = CORTES[t]; const [, , vw, vh] = c.vb.split(' ').map(Number); const w = c.ancho * s; return { t, w, h: w * vh / vw }; });
  let s = 1.15, filas;
  for (; s > .4; s -= .02) {
    const d = dims(s); filas = []; let f = [], ancho = 0;
    d.forEach(p => { if (f.length && ancho + GX + p.w > W) { filas.push(f); f = []; ancho = 0; } ancho += (f.length ? GX : 0) + p.w; f.push(p); });
    if (f.length) filas.push(f);
    const alto = filas.reduce((a, r) => a + Math.max(...r.map(p => p.h)), 0) + GY * (filas.length - 1);
    if (alto <= H) break;
  }
  const altos = filas.map(r => Math.max(...r.map(p => p.h)));
  const total = altos.reduce((a, b) => a + b, 0);
  const gapY = filas.length > 1 ? Math.min(60, (H - total) / (filas.length - 1)) : 0;
  let y = 30 + (H - total - gapY * (filas.length - 1)) / 2, k = 0;
  const out = [];
  filas.forEach((r, i) => {
    const libre = W - r.reduce((a, p) => a + p.w, 0), gap = libre / (r.length + 1);
    let x = 30 + gap;
    r.forEach(p => { out.push({ t: p.t, x: x + p.w / 2, y: y + altos[i] / 2, w: p.w, h: p.h, r: ROT[k++ % ROT.length] }); x += p.w + gap; });
    y += altos[i] + gapY;
  });
  return out;
}
const PARRILLADAS = { 2: { kit: 'parrillada-2', nom: 'Parrillada para 2', precio: 59990, comen: 3 }, 3: { kit: 'parrillada-3', nom: 'Parrillada para 3', precio: 79990, comen: 4 }, 4: { kit: 'parrillada-4', nom: 'Parrillada para 4', precio: 99990, comen: 5 } };
const FRASES = { 1: 'Sos uno: te sobra para mañana', 2: 'Para dos, y sobra', 3: 'Comen 3, lo dice la carta', 4: 'Comen 4, y nadie se pelea', 5: 'Comen 5: mesa larga' };
const QUE = n => n <= 3 ? 2 : n === 4 ? 3 : 4;
const MAX = 5;
const $p = n => '$' + n.toLocaleString('es-AR');

export function montarParrilla(raiz, { onPedir, onSumar, precio = () => undefined } = {}) {
  const pr = (id, def) => { const v = precio(id); return v === undefined ? def : v; };
  if (!document.getElementById('marcas')) document.body.insertAdjacentHTML('afterbegin', MARCAS);
  const grill = raiz.querySelector('.parri__grill');
  const capa = raiz.querySelector('.piezas');
  const pop = raiz.querySelector('.pop');
  const nEl = raiz.querySelector('[data-n]');
  const menos = raiz.querySelector('[data-menos]'), mas = raiz.querySelector('[data-mas]');
  const tNom = raiz.querySelector('.ticket__nom'), tFrase = raiz.querySelector('.ticket__frase'), tPrecio = raiz.querySelector('[data-precio]');
  let n = +(raiz.dataset.n || 3), actual = 0, activa = null, turno = 0;

  const pinta = (tipo) => { const c = CORTES[tipo]; return `<svg viewBox="${c.vb}" aria-hidden="true">${c.svg}</svg>`; };
  function armar(cual, primera) {
    const yo = ++turno;
    const viejas = [...capa.querySelectorAll('.pieza:not(.sale)')];
    viejas.forEach(p => { p.classList.add('sale'); setTimeout(() => p.remove(), 340); });
    const lista = acomodar(ORDEN[cual]);
    setTimeout(() => {
      if (yo !== turno) return;
      lista.forEach(({ t: tipo, x, y, w, h, r }, k) => {
        const c = CORTES[tipo];
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'pieza cae'; b.dataset.tipo = tipo;
        b.setAttribute('aria-label', c.nom);
        Object.assign(b.style, { left: (x - w / 2) / 10 + '%', top: (y - h / 2) / 8 + '%', width: w / 10 + '%' });
        b.style.setProperty('--r', r + 'deg'); b.style.setProperty('--k', k);
        b.innerHTML = pinta(tipo);
        capa.appendChild(b);
        setTimeout(() => { b.classList.remove('cae'); if (!primera || k % 2 === 0) humo(x, y); }, 600 + k * 70);
      });
    }, viejas.length ? 300 : 0);
  }
  function humo(x, y) {
    const s = document.createElement('span'); s.className = 'humo';
    s.style.left = `calc(${x / 10}% - 15px)`; s.style.top = `calc(${y / 8}% - 15px)`;
    capa.appendChild(s); setTimeout(() => s.remove(), 1700);
  }
  const mesa = raiz.querySelector('.mesa');
  function pintarMesa() { if (!mesa) return; const ya = mesa.children.length; for (let i = ya; i < n; i++) { const p = document.createElement('span'); p.className = 'plato'; p.innerHTML = '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="#F3EADB"/><circle cx="20" cy="20" r="11" fill="none" stroke="#CBB89A" stroke-width="2"/></svg>'; mesa.appendChild(p); } while (mesa.children.length > n) mesa.lastElementChild.remove(); mesa.setAttribute('aria-label', n + (n === 1 ? ' plato' : ' platos')); }
  function pintarN(primera) {
    pintarMesa();
    nEl.firstChild.textContent = n;
    nEl.querySelector('small').textContent = n === 1 ? 'persona' : 'personas';
    menos.disabled = n <= 1; mas.disabled = n >= MAX;
    const q = QUE(n), p = PARRILLADAS[q];
    tNom.textContent = p.nom; tFrase.textContent = FRASES[n];
    const v = pr(p.kit, p.precio); tPrecio.textContent = v ? $p(v) : 'Consultar';
    if (q !== actual) { cerrar(); actual = q; armar(q, primera); }
  }
  menos.addEventListener('click', () => { if (n > 1) { n--; pintarN(); } });
  mas.addEventListener('click', () => { if (n < MAX) { n++; pintarN(); } });

  function abrir(btn) {
    const c = CORTES[btn.dataset.tipo];
    activa?.classList.remove('activa'); activa = btn; btn.classList.add('activa');
    raiz.querySelector('.pista')?.remove();
    const foto = c.foto
      ? `<div class="pop__foto"><img src="img/${c.foto}-800.webp" alt="${c.nom}" width="96" height="96"></div>`
      : `<div class="pop__foto ilus">${pinta(btn.dataset.tipo)}</div>`;
    const v = pr(c.kit, null);
    const pie = v
      ? `<div class="pop__precio">${c.aparte}<b>${$p(v)}</b></div><button class="pop__mas" type="button" aria-label="Sumar ${c.nom} a la comanda" data-sumar>+</button>`
      : `<div class="pop__nota">Viene en todas las parrilladas.<br>Aparte: consultar.</div>`;
    pop.innerHTML = `${foto}<div><div class="pop__nom">${c.nom}</div><p class="pop__desc">${c.desc}</p></div><div class="pop__pie">${pie}</div><button class="pop__x" type="button" aria-label="Cerrar" data-cerrar>×</button>`;
    pop.hidden = false; document.body.classList.add('ficha-abierta');
    pop.querySelector('[data-cerrar]').addEventListener('click', cerrar);
    pop.querySelector('[data-sumar]')?.addEventListener('click', (e) => onSumar?.(c.kit, c, e.currentTarget));
  }
  function cerrar() { pop.hidden = true; document.body.classList.remove('ficha-abierta'); activa?.classList.remove('activa'); activa = null; }
  capa.addEventListener('click', e => { const b = e.target.closest('.pieza'); if (b) { e.stopPropagation(); abrir(b); } });
  grill.addEventListener('click', e => { if (!pop.hidden && !e.target.closest('.pop')) cerrar(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !pop.hidden) cerrar(); });
  raiz.querySelector('[data-pedir]')?.addEventListener('click', (e) => onPedir?.(PARRILLADAS[QUE(n)], n, e.currentTarget));

  return { encender() { pintarN(true); }, refrescar() { const q = PARRILLADAS[QUE(n)]; const v = pr(q.kit, q.precio); tPrecio.textContent = v ? $p(v) : 'Consultar'; } };
}
