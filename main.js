/* Decorative generative artwork: no market data or model outputs. */
(() => {
  const field = document.getElementById('signal-field');
  const group = document.getElementById('field-lines');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches, phase = 0, last = 0, pointer = 0, target = 0;
  const paths = Array.from({length: 47}, (_, i) => {
    const p = document.createElementNS('http://www.w3.org/2000/svg','path');
    p.setAttribute('fill','none');p.setAttribute('stroke',i % 9 === 0 ? '#edb294' : '#b1a1ff');
    p.setAttribute('stroke-width',i % 9 === 0 ? '1.15' : '.85');
    p.setAttribute('opacity',String(.23 + .5 * Math.sin(Math.PI * i / 47)));
    group.append(p);return p;
  });
  function draw(){
    paths.forEach((p,i)=>{
      let d='';const v=(i-23)/23;
      for(let j=0;j<=100;j++){
        const t=j/100*Math.PI*2;
        const radius=155+v*40;
        const wave=Math.sin(t*3+v*2+phase*.32)*22;
        const x=310+(radius+wave)*Math.cos(t)+v*65*Math.sin(t*2+phase*.14)+pointer*12;
        const y=263+(radius*.91+wave)*Math.sin(t)+v*56*Math.cos(t+phase*.19);
        const rx=310+(x-310)*.87-(y-263)*.38;
        const ry=263+(x-310)*.42+(y-263)*.92;
        d+=(j?'L':'M')+rx.toFixed(1)+','+ry.toFixed(1);
      }p.setAttribute('d',d+'Z');
    });
  }
  reduced.addEventListener('change',e=>{paused=e.matches});
  field.addEventListener('pointermove',e=>{target=(e.clientX-field.getBoundingClientRect().left)/field.clientWidth-.5});
  field.addEventListener('pointerleave',()=>target=0);
  let visible=true;new IntersectionObserver(es=>{visible=es[0].isIntersecting}).observe(field);
  function frame(time){if(!paused&&visible&&!document.hidden&&time-last>40){phase+=.022;pointer+=(target-pointer)*.07;draw();last=time}requestAnimationFrame(frame)}
  draw();requestAnimationFrame(frame);
})();
