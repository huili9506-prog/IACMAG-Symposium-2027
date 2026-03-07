function setActive(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(a=>{
    if(a.getAttribute('href') === path) a.classList.add('active');
  });
}
function toggleMenu(){
  const links = document.querySelector('.navlinks');
  links.classList.toggle('open');
}
document.addEventListener('DOMContentLoaded', ()=>{
  setActive();
  const btn = document.querySelector('.menu-btn');
  if(btn) btn.addEventListener('click', toggleMenu);
});
let lastScroll = 0;

window.addEventListener("scroll", function () {

  const header = document.querySelector(".header");
  const currentScroll = window.pageYOffset;

  if (currentScroll > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (currentScroll > lastScroll && currentScroll > 120) {
    // 向下滚动 → 隐藏
    header.classList.add("hidden");
  } else {
    // 向上滚动 → 显示
    header.classList.remove("hidden");
  }

  lastScroll = currentScroll;

});