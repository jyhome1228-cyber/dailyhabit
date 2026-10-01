const body = document.body;
const menuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const searchLayer = document.querySelector('.search-layer');
const searchOpenButtons = document.querySelectorAll('.search-open');
const searchCloseButton = document.querySelector('.search-close');
const searchInput = document.querySelector('#siteSearch');

function setBodyLock() {
  const menuOpen = mobileMenu?.classList.contains('is-open');
  const searchOpen = searchLayer?.classList.contains('is-open');
  body.classList.toggle('is-locked', Boolean(menuOpen || searchOpen));
}

function closeMobileMenu() {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  setBodyLock();
}

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.classList.toggle('is-open', !isOpen);
    mobileMenu.setAttribute('aria-hidden', String(isOpen));
    setBodyLock();
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });
}

function openSearch() {
  closeMobileMenu();
  if (!searchLayer) return;
  searchLayer.classList.add('is-open');
  searchLayer.setAttribute('aria-hidden', 'false');
  setBodyLock();
  window.setTimeout(() => searchInput?.focus(), 80);
}

function closeSearch() {
  if (!searchLayer) return;
  searchLayer.classList.remove('is-open');
  searchLayer.setAttribute('aria-hidden', 'true');
  setBodyLock();
}

searchOpenButtons.forEach((button) => button.addEventListener('click', openSearch));
searchCloseButton?.addEventListener('click', closeSearch);

searchLayer?.addEventListener('click', (event) => {
  if (event.target === searchLayer) closeSearch();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeSearch();
    closeMobileMenu();
  }
});

document.querySelector('.search-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  // Cafe24 이전 시 상품검색 action으로 교체
});

document.querySelector('.newsletter-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  // Cafe24 또는 뉴스레터 서비스 연결 예정
});

document.querySelectorAll('.product-filter button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.product-filter button').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
  });
});

/* Brand image rolling */
document.querySelectorAll('[data-brand-slider]').forEach((slider) => {
  const track = slider.querySelector('.brand-slider-track');
  const slides = [...slider.querySelectorAll('.brand-slide')];
  const dots = [...slider.querySelectorAll('.brand-slider-dots button')];
  const prev = slider.querySelector('.brand-slider-prev');
  const next = slider.querySelector('.brand-slider-next');
  if (!track || slides.length < 2) return;

  let index = 0;
  let timer;

  const render = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
  };

  const go = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    render();
  };

  const stop = () => window.clearInterval(timer);
  const start = () => {
    stop();
    timer = window.setInterval(() => go(index + 1), 5000);
  };

  prev?.addEventListener('click', () => { go(index - 1); start(); });
  next?.addEventListener('click', () => { go(index + 1); start(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { go(i); start(); }));

  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);

  render();
  start();
});
