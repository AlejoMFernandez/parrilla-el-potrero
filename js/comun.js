export const LLAMA = `<svg viewBox="0 0 60 72" aria-hidden="true"><defs><clipPath id="llc"><path d="M30 2C41 17 47 26 45 38C44 47 37 53 30 53C22 53 15 47 15 38C15 28 23 23 25 12C29 21 32 22 30 2Z"/></clipPath></defs><path d="M30 2C41 17 47 26 45 38C44 47 37 53 30 53C22 53 15 47 15 38C15 28 23 23 25 12C29 21 32 22 30 2Z" fill="#E3B04B"/><g clip-path="url(#llc)" stroke="#14100C" stroke-width="3.2"><path d="M8 40 L52 22M8 48 L52 30M8 56 L52 38"/></g><path d="M6 47V64H54V47" fill="none" stroke="#E3B04B" stroke-width="4.5"/><path d="M0 57H6M54 57H60" stroke="#E3B04B" stroke-width="3"/></svg>`;
export function letras(el){ const t=el.textContent; el.setAttribute('aria-label',t); let i=0; el.innerHTML=t.split(' ').map(w=>`<span class="pal">${[...w].map(c=>`<span class="l" aria-hidden="true" style="--i:${i++}">${c}</span>`).join('')}</span>`).join(' '); }
export function toast(msg){ document.querySelector('.toast')?.remove(); const t=document.createElement('div'); t.className='toast'; t.setAttribute('role','status'); t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(),2600); }
// horario real (ficha de Google Maps): todos los días 19:00 a 00:00; sáb y dom también 12:00 a 16:30
const TURNOS={0:[[12,16.5],[19,24]],6:[[12,16.5],[19,24]]}; const NOCHE=[[19,24]];
export function estadoAhora(){ const d=new Date(new Date().toLocaleString('en-US',{timeZone:'America/Argentina/Buenos_Aires'})); const h=d.getHours()+d.getMinutes()/60; const t=TURNOS[d.getDay()]||NOCHE;
  const ab=t.find(([a,b])=>h>=a&&h<b); if(ab) return {abierto:true,txt:`Abierto hasta las ${fmt(ab[1])} hs`,corto:'Abierto ahora'};
  const prox=t.find(([a])=>h<a); return {abierto:false,txt: prox?`Hoy abre a las ${fmt(prox[0])} hs`:'Mañana desde las 19:00 hs',corto: prox?`Abre ${fmt(prox[0])} hs`:'Abre 19:00 hs'}; }
const fmt=h=>{const H=String(Math.floor(h)%24).padStart(2,'0'),M=Math.round((h%1)*60);return `${H}:${String(M).padStart(2,'0')}`};
export function intro(onFin){
  const html=document.documentElement; const ov=document.querySelector('.intro');
  const celu=innerWidth<700; const dur=celu?1150:1500;
  const listo=()=>{ html.classList.remove('con-intro'); document.body.classList.add('listo'); onFin&&onFin(); };
  if(!html.classList.contains('con-intro')||!ov){ listo(); return; }
  const fuentes=document.fonts?document.fonts.ready:Promise.resolve();
  const t0=performance.now();
  Promise.race([fuentes,new Promise(r=>setTimeout(r,1400))]).then(()=>{
    const espera=Math.max(0,dur-(performance.now()-t0));
    setTimeout(()=>{
      const ll=ov.querySelector('.intro__llama'), dest=document.querySelector('[data-llama-destino]');
      if(dest){ const a=ll.getBoundingClientRect(), b=dest.getBoundingClientRect();
        ll.style.transition='transform .55s cubic-bezier(.6,0,.2,1)';
        ll.style.transform=`translate(${b.left+b.width/2-(a.left+a.width/2)}px,${b.top+b.height/2-(a.top+a.height/2)}px) scale(${b.width/a.width})`; }
      ov.classList.add('sale'); document.body.classList.add('listo');
      setTimeout(()=>{ ov.remove(); html.classList.remove('con-intro'); onFin&&onFin(); },560);
    },espera);
  });
}
