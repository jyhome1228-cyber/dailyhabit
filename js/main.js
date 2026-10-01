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



/* About: five full-screen images rolling vertically */
document.querySelectorAll('[data-about-slider]').forEach((slider) => {
  const track = slider.querySelector('.about-slider-track');
  const slides = [...slider.querySelectorAll('.about-slide')];
  const dots = [...slider.querySelectorAll('.about-slider-dots button')];
  if (!track || slides.length < 2) return;

  let index = 0;
  let timer;
  let wheelLocked = false;
  let touchStartY = null;

  const render = () => {
    track.style.transform = `translateY(-${index * 100}%)`;
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

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      go(i);
      start();
    });
  });

  slider.addEventListener('wheel', (event) => {
    if (wheelLocked || Math.abs(event.deltaY) < 16) return;
    wheelLocked = true;
    go(index + (event.deltaY > 0 ? 1 : -1));
    start();
    window.setTimeout(() => { wheelLocked = false; }, 700);
  }, { passive: true });

  slider.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0]?.clientY ?? null;
    stop();
  }, { passive: true });

  slider.addEventListener('touchend', (event) => {
    if (touchStartY === null) return start();
    const endY = event.changedTouches[0]?.clientY ?? touchStartY;
    const distance = touchStartY - endY;
    if (Math.abs(distance) > 40) go(index + (distance > 0 ? 1 : -1));
    touchStartY = null;
    start();
  }, { passive: true });

  render();
  start();
});


const JOURNAL_ARTICLES = {"product-choice":{"category":"GUIDE","title":"좋은 제품을 고를 때 먼저 확인해야 할 것","image":"https://nineworksdatabase.planus253.workers.dev/cdn/uncategorized/20261001-224628-7ece0c21-b0fe-463b-a157-8bea96d25e57-d4e4e1cd.webp","lead":"좋아 보이는 제품을 발견했을 때 가장 먼저 볼 것은 광고 문구보다 실제 제품 정보입니다. 내가 왜 필요한지, 무엇이 들어 있는지, 어떻게 챙길 수 있는지를 순서대로 확인하면 선택이 훨씬 단순해집니다.","body":"<h3>1. 목적을 먼저 한 문장으로 정리하기</h3><p>제품을 보기 전에 지금 내가 챙기고 싶은 이유를 한 문장으로 정리해보세요. 목적이 분명하면 비슷한 제품 사이에서도 필요 없는 기능과 과한 구성을 걸러내기 쉽습니다.</p><h3>2. 제품 정보에서 기본 항목 확인하기</h3><ul><li>주요 원재료와 1회 또는 1일 섭취량</li><li>섭취 또는 사용 방법과 주의사항</li><li>제조원, 소비기한, 보관 방법</li><li>내 생활에서 꾸준히 챙길 수 있는 형태인지</li></ul><h3>3. 비교할 때는 기준을 줄이기</h3><p>가격, 성분 수, 후기 개수를 모두 비교하기보다 내 목적과 직접 관련된 두세 가지 기준만 남기는 것이 좋습니다.</p>"},"ingredient-label":{"category":"GUIDE","title":"성분표를 읽는 가장 쉬운 방법","image":"https://nineworksdatabase.planus253.workers.dev/cdn/uncategorized/20261001-224628-742863e1-08d5-482a-93b8-26f1a4dd308d-e44382c3.webp","lead":"성분표는 어렵게 보이지만 보는 순서를 정하면 훨씬 간단합니다. 제품 전면의 강조 문구보다 원재료명, 1일 섭취량, 실제 함량부터 차근차근 확인해보세요.","body":"<h3>1. 무엇이 들어 있는지부터 보기</h3><p>제품명보다 원재료명과 영양·기능정보를 먼저 확인합니다. 핵심으로 보고 있는 성분이 실제로 포함되어 있는지 살펴보는 것이 첫 단계입니다.</p><h3>2. 함량은 기준 단위와 함께 보기</h3><p>숫자가 크다고 무조건 많은 것은 아닙니다. 1정, 1캡슐, 1포 또는 1일 섭취량 중 어떤 기준으로 표시된 값인지 함께 확인해야 합니다.</p><h3>3. 부가 정보도 확인하기</h3><ul><li>원재료의 원산지나 제조 관련 정보</li><li>알레르기 또는 섭취 시 주의사항</li><li>보관 방법과 소비기한</li></ul>"},"long-habit":{"category":"HABIT","title":"건강한 습관은 어떻게 오래 유지될까?","image":"https://nineworksdatabase.planus253.workers.dev/cdn/uncategorized/20261001-224629-a-chosen-soul-olxlgzwwgtw-unsplash-f40b0780.webp","lead":"좋은 습관은 의지가 강해서 오래가는 것이 아니라 반복하기 쉬운 구조가 있어서 오래갑니다. 처음부터 완벽하게 하기보다 작고 분명한 행동 하나를 생활에 붙여보세요.","body":"<h3>1. 이미 하고 있는 행동 뒤에 붙이기</h3><p>아침 식사, 양치, 출근 준비처럼 매일 반복되는 행동 뒤에 새로운 습관을 연결하면 기억하기가 쉬워집니다.</p><h3>2. 기준을 낮추고 반복 횟수를 늘리기</h3><p>한 번에 크게 하는 것보다 매일 할 수 있는 최소 단위를 정하는 편이 지속하기 쉽습니다.</p><h3>3. 놓친 날보다 다시 시작하는 날을 보기</h3><p>하루 놓쳤다고 루틴 전체가 실패한 것은 아닙니다. 다음 행동에서 다시 이어가는 것을 기본 규칙으로 두세요.</p>"},"alpha-cd":{"category":"PRODUCT","title":"알파 CD를 데일리 루틴에 더한다면","image":"https://nineworksdatabase.planus253.workers.dev/cdn/uncategorized/20261001-224630-andrej-lisakov-lfoestfybii-unsplash-1e489cdb.webp","lead":"새로운 제품을 루틴에 넣을 때는 효과를 과하게 기대하기보다 언제, 어디서, 어떻게 챙길지를 먼저 정하는 것이 좋습니다. 알파 CD도 기존 생활 흐름 안에 간단히 연결해보세요.","body":"<h3>1. 제품 표시사항을 먼저 확인하기</h3><p>실제 섭취량과 섭취 방법은 제품 포장 또는 상세페이지의 표시사항을 우선으로 확인하세요.</p><h3>2. 기억하기 쉬운 시점을 고르기</h3><p>아침 준비, 식사 후, 책상에 앉는 시간처럼 이미 반복되는 시점과 연결하면 루틴이 단순해집니다.</p><h3>3. 여러 제품을 함께 챙긴다면</h3><p>복용 중인 의약품이나 다른 건강기능식품이 있다면 성분과 섭취 방법을 확인하고, 필요한 경우 전문가와 상담하는 것이 좋습니다.</p>"},"dailyhabit-standard":{"category":"BRAND","title":"데일리해빗이 제품을 고르는 네 가지 기준","image":"https://nineworksdatabase.planus253.workers.dev/cdn/uncategorized/20261001-224631-andrej-lisakov-p0u4u4bwjow-unsplash-5bd71832.webp","lead":"데일리해빗은 제품 수를 많이 늘리는 것보다 소개할 이유가 분명한 제품을 고르는 데 더 집중합니다. 그 과정은 네 가지 기준으로 정리됩니다.","body":"<h3>01 EXPERIENCE — 직접 경험하기</h3><p>제품의 사용 방식과 생활 속에서 챙기기 쉬운지를 직접 살펴봅니다.</p><h3>02 UNDERSTAND — 이해하기</h3><p>제품 정보와 핵심 내용을 고객에게 어렵지 않게 설명할 수 있는지 확인합니다.</p><h3>03 SELECT — 선택하기</h3><p>비슷한 선택지 가운데 실제로 소개할 이유가 있는지 비교합니다.</p><h3>04 CURATE — 일상에 연결하기</h3><p>단일 제품만 보여주기보다 언제, 어떤 루틴에서 활용하면 자연스러운지 함께 제안합니다.</p>"},"olive-oil":{"category":"PRODUCT","title":"올리브오일 캡슐, 무엇을 봐야 할까?","image":"https://nineworksdatabase.planus253.workers.dev/cdn/uncategorized/20261001-224632-d6a0ecd5-3c98-4805-8860-8b89e6f7a7b5-74baa53e.webp","lead":"올리브오일이라는 이름만으로 제품을 판단하기보다 원료, 1회 섭취량, 캡슐 형태와 보관 방법을 함께 확인하는 것이 좋습니다.","body":"<h3>1. 원료 정보부터 보기</h3><p>어떤 올리브오일 원료를 사용했는지, 원료의 출처와 제품에 표시된 기본 정보를 먼저 확인합니다.</p><h3>2. 몇 캡슐보다 실제 섭취량 확인하기</h3><p>캡슐 개수만 비교하지 말고 1회 또는 1일 섭취 기준이 어떻게 안내되어 있는지 확인하세요.</p><h3>3. 보관 방법도 체크하기</h3><p>직사광선과 고온다습한 환경을 피하는 등 제품에 안내된 보관 방법을 따르는 것이 기본입니다.</p>"},"little-everyday":{"category":"ROUTINE","title":"한 번에 많이보다 매일 조금씩","image":"https://nineworksdatabase.planus253.workers.dev/cdn/uncategorized/20261001-224633-joshua-earle-s8vwyoi0exc-unsplash-c49270aa.webp","lead":"루틴을 오래 가져가고 싶다면 얼마나 많이 했는가보다 다시 반복할 수 있는가를 기준으로 보는 편이 좋습니다.","body":"<h3>1. 가장 작은 단위부터 시작하기</h3><p>운동, 기록, 제품 챙기기 모두 시작 단위를 작게 잡으면 진입 장벽이 낮아집니다.</p><h3>2. 눈에 보이게 만들기</h3><p>캘린더에 체크하거나 제품을 정해진 장소에 두는 것처럼 다음 행동을 자연스럽게 떠올릴 수 있는 장치를 만드세요.</p><h3>3. 루틴은 수정할 수 있어야 합니다</h3><p>생활 패턴이 바뀌면 루틴도 함께 바뀌어야 합니다. 반복 가능한 방식으로 다시 조정해보세요.</p>"},"rest-routine":{"category":"HABIT","title":"쉼도 루틴이 되는 회복의 시간","image":"https://nineworksdatabase.planus253.workers.dev/cdn/uncategorized/20261001-224634-polina-kuzovkova-c8wwl9na14w-unsplash-3c776ca8.webp","lead":"무언가를 더 하는 것만이 좋은 습관은 아닙니다. 잠시 멈추고 쉬는 시간도 하루의 컨디션을 정돈하는 중요한 루틴이 될 수 있습니다.","body":"<h3>1. 쉬는 시간도 미리 정해두기</h3><p>일이 끝난 뒤, 잠들기 전처럼 하루 중 쉬는 시점을 정해두면 남는 시간에 쉬기보다 꾸준히 지키기 쉽습니다.</p><h3>2. 자극을 줄이는 작은 행동 만들기</h3><p>조명을 낮추거나 휴대폰에서 잠시 떨어지는 등 몸과 마음에 이제 쉬는 시간이라는 신호를 만들어보세요.</p><h3>3. 완벽한 휴식보다 회복 가능한 리듬</h3><p>매일 같은 방식으로 쉬지 않아도 괜찮습니다. 중요한 것은 바쁜 시기에도 다시 회복할 수 있는 리듬을 갖는 것입니다.</p>"}};
const journalModal = document.querySelector('#journalModal');
const journalModalImage = document.querySelector('#journalModalImage');
const journalModalCategory = document.querySelector('#journalModalCategory');
const journalModalTitle = document.querySelector('#journalModalTitle');
const journalModalLead = document.querySelector('#journalModalLead');
const journalModalBody = document.querySelector('#journalModalBody');
let journalLastTrigger = null;

function openJournal(id, trigger) {
  const article = JOURNAL_ARTICLES[id];
  if (!article || !journalModal) return;
  journalLastTrigger = trigger || null;
  journalModalImage.src = article.image;
  journalModalImage.alt = article.title;
  journalModalCategory.textContent = article.category;
  journalModalTitle.textContent = article.title;
  journalModalLead.textContent = article.lead;
  journalModalBody.innerHTML = article.body;
  journalModal.classList.add('is-open');
  journalModal.setAttribute('aria-hidden', 'false');
  body.classList.add('is-locked');
  journalModal.querySelector('.journal-modal-close')?.focus();
}

function closeJournal() {
  if (!journalModal) return;
  journalModal.classList.remove('is-open');
  journalModal.setAttribute('aria-hidden', 'true');
  journalModalImage.src = '';
  setBodyLock();
  journalLastTrigger?.focus?.();
}

document.querySelectorAll('.journal-open').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    openJournal(trigger.dataset.journalId, trigger);
  });
});

document.querySelectorAll('[data-journal-close]').forEach((button) => {
  button.addEventListener('click', closeJournal);
});

document.querySelectorAll('[data-journal-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.journalFilter;
    document.querySelectorAll('[data-journal-filter]').forEach((item) => {
      item.classList.toggle('is-active', item === button);
    });
    document.querySelectorAll('.article-card[data-category]').forEach((card) => {
      card.classList.toggle('is-hidden', filter !== 'ALL' && card.dataset.category !== filter);
    });
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && journalModal?.classList.contains('is-open')) closeJournal();
});

const hashJournalId = window.location.hash.replace('#', '');
if (hashJournalId && JOURNAL_ARTICLES[hashJournalId] && journalModal) {
  window.setTimeout(() => openJournal(hashJournalId, null), 120);
}
