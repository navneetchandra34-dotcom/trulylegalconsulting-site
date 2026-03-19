
// theme toggle
const toggle = document.getElementById('themeToggle');
toggle?.addEventListener('click',()=>{
  const html=document.documentElement;
  if(html.getAttribute('data-theme')==='dark'){
    html.removeAttribute('data-theme');
  }else{
    html.setAttribute('data-theme','dark');
  }
});

// loader
window.addEventListener('load',()=>{
  const loader=document.getElementById('loader');
  if(loader) loader.style.display='none';
});
