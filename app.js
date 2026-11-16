const order=[17,3,21,8,12,1,24,6,15,10,19,4,13,22,7,16,2,20,11,5,23,9,18,14];
const grid=document.querySelector('#grid'),dialog=document.querySelector('#product'),panel=document.querySelector('#product-body');
let published={year:2026,today:null,products:[],preview:false};
function render(){grid.replaceChildren();for(const day of order){const product=published.products.find(p=>p.day===day),today=!!product&&published.today===day;const b=document.createElement('button');b.className='door '+(product?(today?'today':'opened'):'locked');b.innerHTML=`<span class="door-star" aria-hidden="true">✧</span><span class="number">${String(day).padStart(2,'0')}</span><span class="door-label">${product?(today?'✧ Aujourd’hui':'✓ Ouverte'):'◇ À venir'}</span>`;b.setAttribute('aria-label',`Case ${day} — ${product?(today?'Aujourd’hui':'Ouverte'):`À venir, le ${day} décembre ${published.year}`}`);b.onclick=()=>product?showProduct(product):showLocked(day);grid.append(b)}}
function openPanel(){if(!dialog.open)dialog.showModal()}
function showLocked(day){panel.replaceChildren();const title=document.createElement('h2');title.textContent='Encore un peu de magie à attendre…';const p=document.createElement('p');p.className='intro';p.textContent=`La case ${day} s’ouvrira le ${day} décembre ${published.year} à minuit, heure de Paris. Sa publication dépend de la dernière construction du site.`;panel.append(title,p);openPanel()}
function showProduct(p){panel.replaceChildren();const image=document.createElement('img');image.src=p.illustration;image.alt=`Illustration de ${p.nom}`;image.className='product-image';const tag=document.createElement('p');tag.className='eyebrow';tag.textContent=`CASE ${p.day} · COLLECTION DE NOËL`;const title=document.createElement('h2');title.textContent=p.nom;const description=document.createElement('p');description.className='intro';description.textContent=p.description;const offer=document.createElement('p');offer.className='offer';offer.textContent=p.offre;const row=document.createElement('div');row.className='code-row';const code=document.createElement('code');code.textContent=p.code;const copy=document.createElement('button');copy.textContent='Copier';copy.className='copy';copy.onclick=async()=>{try{await navigator.clipboard.writeText(p.code);copy.textContent='✓ Copié';document.querySelector('#toast').textContent='Code copié dans le presse-papiers.'}catch{copy.textContent='Sélectionner';const selection=window.getSelection(),range=document.createRange();range.selectNodeContents(code);selection.removeAllRanges();selection.addRange(range);document.querySelector('#toast').textContent='Copiez le code sélectionné avec le menu de votre appareil.'}};row.append(code,copy);const link=document.createElement('a');link.className='button command';link.textContent='Commander ↗';link.href=p.lien;link.target='_blank';link.rel='noopener noreferrer';const note=document.createElement('p');note.className='caption';note.textContent='PRODUIT ET CODE FICTIFS · LIEN DE DÉMONSTRATION';panel.append(image,tag,title,description,offer,row,link,note);scratchGift();openPanel();if(!motion.matches){const layer=document.createElement('div');layer.className='sparkles';layer.setAttribute('aria-hidden','true');for(let i=0;i<22;i++){const s=document.createElement('span');s.textContent='✦';s.style.left=`${Math.random()*100}%`;s.style.animationDelay=`${Math.random()*.5}s`;s.style.setProperty('--drift',`${Math.random()*120-60}px`);layer.append(s)}dialog.append(layer);setTimeout(()=>layer.remove(),2300)}}
document.querySelector('.close').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
async function load(){try{const response=await fetch('publication.json',{cache:'no-store'});if(!response.ok)throw Error();published=await response.json();document.querySelector('#publication').textContent=published.products.length?`${published.products.length} surprise(s) dévoilée(s)`:'Rendez-vous le 1er décembre';if(published.preview){const p=document.querySelector('#preview');p.hidden=false;p.textContent=`APERÇU LOCAL — Date simulée : ${published.date}. Ne pas publier cet aperçu.`}document.querySelector('#ending').textContent=published.finished?'Les 24 surprises sont à vous. Joyeuses fêtes, et que la magie continue.':'';render()}catch{document.querySelector('#publication').textContent='Les surprises ne sont pas disponibles. Réessayez dans un instant.';render()}}startTest();
function scratchGift(){
  const cover=document.createElement('div'),canvas=document.createElement('canvas'),button=document.createElement('button'),gift=document.createElement('div');
  for(const item of [...panel.children]) gift.append(item);
  gift.hidden=true;
  cover.className='scratch-cover';
  canvas.width=360;canvas.height=220;canvas.setAttribute('aria-hidden','true');
  button.textContent='Révéler sans gratter';button.className='copy';
  const title=document.createElement('h2');title.textContent='Grattez votre cadeau';
  const hint=document.createElement('p');hint.textContent='Frottez la dorure avec le doigt ou la souris.';cover.append(title,hint,canvas,button);panel.append(cover,gift);
  const ctx=canvas.getContext('2d');
  function reveal(){cover.remove();gift.hidden=false;gift.tabIndex=-1;gift.focus()}
  button.onclick=reveal;
  if(!ctx)return;
  const gold=ctx.createLinearGradient(0,0,360,220);gold.addColorStop(0,'#92703b');gold.addColorStop(.45,'#f6dfa0');gold.addColorStop(1,'#ab8341');ctx.fillStyle=gold;ctx.fillRect(0,0,360,220);ctx.fillStyle='#4e3a1b';ctx.font='30px Georgia';ctx.textAlign='center';ctx.fillText('✧   ÉCLAT   ✧',180,120);
  for(let i=0;i<10500;i++){ctx.fillStyle=i%2?'rgba(255,249,204,.22)':'rgba(62,37,4,.17)';ctx.fillRect(Math.random()*360,Math.random()*220,1+Math.random()*2,1)}ctx.globalCompositeOperation='destination-out';ctx.lineCap='round';ctx.lineWidth=44;
  let pointer=null,previous=null;
  function scratch(e){const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*360/r.width,y=(e.clientY-r.top)*220/r.height;ctx.beginPath();ctx.moveTo(previous?.x??x,previous?.y??y);ctx.lineTo(x+.01,y);ctx.stroke();previous={x,y};const pixels=ctx.getImageData(0,0,360,220).data;let clear=0;for(let i=3;i<pixels.length;i+=64)if(pixels[i]<64)clear++;if(clear>pixels.length/64*.32)reveal()}
  canvas.onpointerdown=e=>{if(pointer!==null)return;pointer=e.pointerId;canvas.setPointerCapture(pointer);scratch(e)};
  canvas.onpointermove=e=>{if(e.pointerId===pointer)scratch(e)};
  canvas.onlostpointercapture=()=>{pointer=null;previous=null};
}
async function startTest() {
  await load();
  const live = published;
  const select = document.querySelector('#simulation');
  const names = ['Pinceau éventail','Miroir de poche','Éponge velours','Trousse satin','Pinceau poudre','Ruban de soie'];
  for (let day=1; day<=24; day++) select.add(new Option(day+' décembre',day));
  select.onchange = () => {
    if (!select.value) { location.reload(); return; }
    const day = Number(select.value);
    published = {...live, today:day, products:Array.from({length:day},(_,index)=>{
      const n=index+1;
      return {day:n,nom:names[index%names.length],description:'Accessoire de démonstration de la collection de Noël.',offre:'Exemple pour tester le grattage',code:'ESSAI-'+String(n).padStart(2,'0'),illustration:'cadeau-demo.svg',lien:'https://www.sephora.fr/'};
    })};
    const banner=document.querySelector('#preview');
    banner.hidden=false;
    banner.textContent='Simulation du '+day+' décembre · Cadeaux et codes de démonstration';
    document.querySelector('#publication').textContent=day+' / 24 cases disponibles';
    document.querySelector('#ending').textContent='';
    render();
  };
}
const musicButton=document.querySelector('#music');
let audio, interval;
musicButton.onclick=async()=>{
  if (audio) {
    clearInterval(interval); const previous=audio;audio=null;await previous.close();
    musicButton.textContent='♫ Activer la musique';musicButton.setAttribute('aria-pressed','false');return;
  }
  audio=new AudioContext();await audio.resume();
  const chords=[[50,57,62,65,69],[46,53,58,62,65],[53,60,65,69,72],[48,55,60,64,67]];
  let step=0;
  function play(){
    const chord=chords[Math.floor(step/8)%4], note=chord[[0,2,1,3,2,4,3,1][step%8]];
    const t=audio.currentTime,osc=audio.createOscillator(),gain=audio.createGain();
    osc.type='sine';osc.frequency.value=440*2**((note-69)/12);
    gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(.075,t+.025);gain.gain.exponentialRampToValueAtTime(.0001,t+2.4);
    osc.connect(gain).connect(audio.destination);osc.start();osc.stop(t+2.45);step++;
  }
  play();interval=setInterval(play,470);musicButton.textContent='♫ Couper la musique';musicButton.setAttribute('aria-pressed','true');
};
