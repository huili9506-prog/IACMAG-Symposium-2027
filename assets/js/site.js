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

/* Nav dropdown (Speakers): hover on desktop, tap on touch screens, keyboard support */
function initDropdowns(){
  const isDesktop = () => window.matchMedia('(min-width: 1200px)').matches;

  document.querySelectorAll('.nav-dropdown').forEach(dd => {
    const toggle = dd.querySelector('.nav-dropdown-toggle');
    const items = () => [...dd.querySelectorAll('.nav-dropdown-menu a')];
    let pointerType = 'mouse';

    const setOpen = open => {
      dd.classList.toggle('open', open);
      dd.classList.remove('suppress');
      toggle.setAttribute('aria-expanded', String(open));
    };

    dd.addEventListener('mouseenter', () => {
      dd.classList.remove('suppress');
      toggle.setAttribute('aria-expanded', 'true');
    });
    dd.addEventListener('mouseleave', () => {
      // A mouse click leaves focus inside the menu, which would keep it open; drop that focus
      const active = document.activeElement;
      if (dd.contains(active) && !active.matches(':focus-visible')) active.blur();
      setOpen(false);
      if (dd.contains(document.activeElement)) toggle.setAttribute('aria-expanded', 'true');
    });
    dd.addEventListener('focusin', () => {
      if (!dd.classList.contains('suppress')) toggle.setAttribute('aria-expanded', 'true');
    });
    dd.addEventListener('focusout', e => {
      if (!dd.contains(e.relatedTarget)) setOpen(false);
    });

    // Touch screens wide enough for the desktop nav: first tap opens, second tap follows the link
    toggle.addEventListener('pointerdown', e => { pointerType = e.pointerType; });
    toggle.addEventListener('click', e => {
      if (isDesktop() && pointerType !== 'mouse' && !dd.classList.contains('open')) {
        e.preventDefault();
        setOpen(true);
      }
    });

    dd.addEventListener('keydown', e => {
      if (!isDesktop()) return;
      const list = items();
      const i = list.indexOf(document.activeElement);
      if (e.key === 'Escape') {
        dd.classList.remove('open');
        dd.classList.add('suppress');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        dd.classList.remove('suppress');
        (list[i + 1] || list[0]).focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        (i > 0 ? list[i - 1] : toggle).focus();
      }
    });

    document.addEventListener('click', e => {
      if (!dd.contains(e.target)) setOpen(false);
    });
  });

  // Close the mobile menu after jumping to a section on the same page
  document.querySelectorAll('.navlinks a[href*="#"]').forEach(a => {
    a.addEventListener('click', () => {
      const links = document.querySelector('.navlinks');
      if (links) links.classList.remove('open');
    });
  });
}
document.addEventListener('DOMContentLoaded', initDropdowns);
