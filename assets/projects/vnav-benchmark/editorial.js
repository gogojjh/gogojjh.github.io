
(()=>{const buttons=[...document.querySelectorAll('[data-env]')];
function select(env){buttons.forEach(b=>b.setAttribute('aria-selected',String(b.dataset.env===env)));document.querySelectorAll('[data-envpanel]').forEach(p=>{p.hidden=p.dataset.envpanel!==env;if(p.hidden)p.querySelectorAll('video').forEach(v=>v.pause());});}
buttons.forEach((b,i)=>{b.addEventListener('click',()=>select(b.dataset.env));b.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();let j=e.key==='Home'?0:e.key==='End'?buttons.length-1:(i+(e.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;buttons[j].focus();buttons[j].click();}});});
function reveal(){let id=decodeURIComponent(location.hash.slice(1));let target=document.getElementById(id);if(target){let p=target.closest('[data-envpanel]');if(p)select(p.dataset.envpanel);requestAnimationFrame(()=>target.scrollIntoView());}}
window.addEventListener('hashchange',reveal);reveal();})();