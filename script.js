const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const calm=matchMedia('(prefers-reduced-motion: reduce)').matches,m={x:-999,y:-999};

// 1. Split headings into letters that flip in
$$('.split').forEach(h=>{let k=0;h.setAttribute('aria-label',h.textContent.trim().replace(/\s+/g,' '));
 [...h.childNodes].forEach(n=>{if(n.nodeType!==3)return;const f=document.createDocumentFragment(),ws=n.textContent.split(' ').filter(Boolean);
  ws.forEach((w,j)=>{const s=document.createElement('span');s.className='w';s.setAttribute('aria-hidden','true');
   [...w].forEach(c=>{const e=document.createElement('span');e.className='ch';e.style.setProperty('--i',k++);e.textContent=c;s.appendChild(e)});
   f.appendChild(s);if(j<ws.length-1)f.appendChild(document.createTextNode(' '))});n.replaceWith(f)})});

// 2. Typewriter role line
const tw=$('#tw');if(tw){const words=tw.dataset.words.split('|');let wi=0,ci=0,del=false;
 (function t(){const w=words[wi];ci+=del?-1:1;tw.textContent=w.slice(0,ci);let d=del?35:70;
  if(!del&&ci===w.length){del=true;d=1400}else if(del&&ci===0){del=false;wi=(wi+1)%words.length;d=300}setTimeout(t,d)})()}

// 3. Marquee: duplicate the track for a seamless loop
const mq=$('.mq');if(mq)mq.innerHTML+=mq.innerHTML;

// 4. Scroll reveal + count-up numbers
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach((e,i)=>{if(e.matches('.tl'))e.style.transitionDelay=(i%4)*80+'ms';io.observe(e)});
$$('[data-to]').forEach(el=>{const to=+el.dataset.to,dec=(el.dataset.to.split('.')[1]||'').length;
 new IntersectionObserver((es,o)=>{if(!es[0].isIntersecting)return;o.disconnect();const t0=performance.now();
  (function up(t){const p=Math.min((t-t0)/1600,1);el.textContent=(to*(1-Math.pow(1-p,3))).toFixed(dec);if(p<1)requestAnimationFrame(up)})(t0)},{threshold:.6}).observe(el)});

// 5. Project filter tabs
$$('#tabs button').forEach(b=>b.onclick=()=>{$$('#tabs button').forEach(x=>x.classList.toggle('on',x===b));
 $$('#grid .pn').forEach((c,i)=>{const show=b.dataset.f==='All'||c.dataset.cat===b.dataset.f;c.hidden=!show;
  c.style.animation='none';c.offsetWidth;c.style.animation='';c.style.setProperty('--i',i)})});

// 6. Mouse effects: hero parallax, card tilt + spotlight, magnetic buttons
const h1=$('h1.split');
addEventListener('pointermove',e=>{m.x=e.clientX;m.y=e.clientY;
 if(h1&&!calm)h1.style.transform=`translate3d(${(e.clientX/innerWidth-.5)*-16}px,${(e.clientY/innerHeight-.5)*-10}px,0)`;
 const c=e.target.closest&&e.target.closest('.pn');if(!c)return;const r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
 c.style.setProperty('--ry',(px-.5)*10+'deg');c.style.setProperty('--rx',(.5-py)*10+'deg');c.style.setProperty('--mx',px*100+'%');c.style.setProperty('--my',py*100+'%')});
document.addEventListener('pointerout',e=>{const c=e.target.closest&&e.target.closest('.pn');if(c&&!c.contains(e.relatedTarget)){c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')}});
$$('.btn').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')});

// 7. Scroll progress bar + cursor ring
const pg=document.body.appendChild(Object.assign(document.createElement('div'),{id:'pg'}));
addEventListener('scroll',()=>{pg.style.width=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)*100+'%'},{passive:true});
const ring=document.body.appendChild(Object.assign(document.createElement('div'),{id:'ring'}));let rx=0,ry=0,rs=1;
document.addEventListener('pointerover',e=>{rs=e.target.closest('a,button,.pn,input,textarea')?1.8:1});
(function f(){rx+=(m.x-rx)*.18;ry+=(m.y-ry)*.18;ring.style.transform=`translate(${rx-17}px,${ry-17}px) scale(${rs})`;requestAnimationFrame(f)})();

// 8. Neural-network background that links to the cursor
const cv=document.body.prepend(Object.assign(document.createElement('canvas'),{id:'fx'}))||$('#fx'),x=cv.getContext('2d');let W,H,N=[];
function fit(){W=cv.width=innerWidth;H=cv.height=innerHeight;N=Array.from({length:Math.min(70,Math.floor(W*H/22000))},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35}))}
fit();addEventListener('resize',fit);
(function loop(){x.clearRect(0,0,W,H);
 N.forEach(a=>{if(!calm){a.x+=a.vx;a.y+=a.vy}if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;
  x.fillStyle='rgba(229,56,59,.55)';x.fillRect(a.x,a.y,2,2);
  N.forEach(b=>{const d=Math.hypot(a.x-b.x,a.y-b.y);if(d<120){x.strokeStyle=`rgba(154,159,176,${.14*(1-d/120)})`;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}});
  const dm=Math.hypot(a.x-m.x,a.y-m.y);if(dm<170){x.strokeStyle=`rgba(229,56,59,${.6*(1-dm/170)})`;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(m.x,m.y);x.stroke()}});
 requestAnimationFrame(loop)})();

// 9. Contact form: sends the message straight to your email (FormSubmit)
const cf=$('#cform');if(cf){const st=$('#status'),btn=$('button[type=submit]',cf);
 cf.addEventListener('submit',async e=>{e.preventDefault();st.textContent='Sending…';btn.disabled=true;
  try{const r=await fetch('https://formsubmit.co/ajax/kanth100mallick@gmail.com',{method:'POST',headers:{Accept:'application/json'},body:new FormData(cf)});
   const d=await r.json();if(!r.ok||String(d.success)!=='true')throw new Error(d.message||'failed');
   st.textContent='Thanks! Your message was sent. I will reply soon.';cf.reset()}
  catch(err){const local=location.protocol==='file:';
   st.innerHTML=(local?'This form only works once the website is online (it cannot send from a file on your computer). ':'Could not send: '+err.message+'. ')+'You can email me directly at <a href="mailto:kanth100mallick@gmail.com">kanth100mallick@gmail.com</a>.'}
  btn.disabled=false})}
