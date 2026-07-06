/* ======================================================================
   AKADEMI BULAN SABIT - SCRIPT.JS
   File ini berisi SEMUA logika interaktif website:
   - Data & render deck Moments (foto-foto kenangan)
   - Sistem login (verifikasi nama & PIN)
   - Efek animasi teks (typewriter)
   - Generator elemen dekoratif (bintang, konstelasi, awan, pesawat, roket, burung, pohon kelapa)
   - Efek kembang api (loop otomatis & saat klik/tap)
   - Kontrol musik latar
   - Logika peti hadiah (Gift)
   ====================================================================== */

/* ============ KONFIGURASI 5 DECK MOMENTS (KARTU FOTO ALA CLASH ROYALE) ============ */
const DECKS_CONFIG = [
  {
    name: "Awal Cerita",
    cards: [
      { img: "assets/peti-tertutup.png", title: "Pertemuan Pertama", date: "- 2023 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "assets/peti-tertutup.png", title: "Obrolan Pertama", date: "- 2023 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "assets/peti-tertutup.png", title: "Jadian", date: "- 2023 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "assets/peti-tertutup.png", title: "Foto Bareng Pertama", date: "- 2023 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "assets/peti-tertutup.png", title: "Kencan Pertama", date: "- 2023 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "assets/peti-tertutup.png", title: "Pesan Pertama", date: "- 2023 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
    ]
  },
  {
    name: "Hari Spesial",
    cards: [
      { img: "", title: "Ulang Tahun Pertama", date: "- 2024 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Anniversary", date: "- 2024 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Kejutan Kecil", date: "- 2024 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Hari Wisuda", date: "- 2024 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Hari Spesial Keluarga", date: "- 2024 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Perayaan Kecil", date: "- 2024 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
    ]
  },
  {
    name: "Liburan Bersama",
    cards: [
      { img: "", title: "Liburan ke Pantai", date: "- 2024 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Trip ke Gunung", date: "- 2025 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Jalan-Jalan Kota", date: "- 2025 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Staycation", date: "- 2025 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Road Trip", date: "- 2025 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Camping Bareng", date: "- 2025 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
    ]
  },
  {
    name: "Momen Lucu",
    cards: [
      { img: "", title: "Insiden Konyol", date: "- 2025 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Ekspresi Receh", date: "- 2025 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Gagal Foto", date: "- 2025 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Tertawa Bareng", date: "- 2025 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Drama Kecil", date: "- 2025 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Candaan Receh", date: "- 2025 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
    ]
  },
  {
    name: "Sekarang & Selamanya",
    cards: [
      { img: "", title: "Hari Ini", date: "- 2026 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Rencana Masa Depan", date: "- 2026 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Janji Kita", date: "- 2026 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Untuk Selamanya", date: "- ∞ -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Harapan Kita", date: "- 2026 -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
      { img: "", title: "Selalu Bersama", date: "- ∞ -", desc: "Tuliskan cerita singkat tentang momen ini di sini." },
    ]
  },
];

let activeDeckIndex = 0;

function buildDeckTabs() {
  const tabsWrap = document.getElementById('deck-tabs');
  tabsWrap.innerHTML = '';
  DECKS_CONFIG.forEach((deck, idx) => {
    const tab = document.createElement('div');
    tab.className = 'deck-tab' + (idx === activeDeckIndex ? ' active' : '');
    tab.textContent = idx + 1;
    tab.addEventListener('click', () => switchDeck(idx));
    tabsWrap.appendChild(tab);
  });
}

function buildCard(m, idx) {
  const card = document.createElement('div');
  card.className = 'moment-card';

  const front = document.createElement('div');
  front.className = 'moment-front';
  front.innerHTML = `
    <div class="moment-photo" style="${m.img ? `background-image:url('${m.img}')` : ''}"></div>
    <div class="moment-gem">${idx + 1}</div>
    <div class="moment-hint">info</div>
    <div class="moment-ribbon">${m.title}<span class="moment-date">${m.date || ''}</span></div>
  `;

  card.appendChild(front);
  card.addEventListener('click', () => openMomentInfo(m));
  return card;
}

function openMomentInfo(m) {
  const overlay = document.getElementById('moment-info-overlay');
  const photo = document.getElementById('moment-info-photo');
  photo.style.backgroundImage = m.img ? `url('${m.img}')` : 'none';
  document.getElementById('moment-info-title').textContent = m.title;
  document.getElementById('moment-info-date').textContent = m.date || '';
  document.getElementById('moment-info-text').textContent = m.desc;
  overlay.classList.add('show');
}

document.getElementById('moment-info-close').addEventListener('click', () => {
  document.getElementById('moment-info-overlay').classList.remove('show');
});
document.getElementById('moment-info-overlay').addEventListener('click', (e) => {
  if (e.target.id === 'moment-info-overlay') {
    document.getElementById('moment-info-overlay').classList.remove('show');
  }
});

function buildDeckPanels() {
  const panelsWrap = document.getElementById('deck-panels');
  panelsWrap.innerHTML = '';
  DECKS_CONFIG.forEach((deck, dIdx) => {
    const panel = document.createElement('div');
    panel.className = 'deck-panel' + (dIdx === activeDeckIndex ? ' active' : '');
    panel.id = 'deck-panel-' + dIdx;

    const grid = document.createElement('div');
    grid.className = 'moments-grid';
    deck.cards.forEach((m, idx) => grid.appendChild(buildCard(m, idx)));

    panel.appendChild(grid);
    panelsWrap.appendChild(panel);
  });
}

function switchDeck(idx) {
  activeDeckIndex = idx;
  document.querySelectorAll('.deck-tab').forEach((t, i) => t.classList.toggle('active', i === idx));
  document.querySelectorAll('.deck-panel').forEach((p, i) => p.classList.toggle('active', i === idx));
  document.getElementById('deck-title').textContent = '✦ ' + DECKS_CONFIG[idx].name + ' ✦';
}

function buildMomentsGrid() {
  buildDeckTabs();
  buildDeckPanels();
  document.getElementById('deck-title').textContent = '✦ ' + DECKS_CONFIG[activeDeckIndex].name + ' ✦';
}
buildMomentsGrid();

/* ============ KONFIGURASI YANG BISA DIUBAH ============ */
const COPYRIGHT_TEXT = "AKADEMI BULAN SABIT. ALL RIGHTS RESERVED.";
document.getElementById('copyright-text').textContent = COPYRIGHT_TEXT;
document.getElementById('copyright-year').textContent = new Date().getFullYear();

/* ============ FUNGSI LIHAT SANDI ============ */
function togglePassword() {
  const pinInput = document.getElementById("input-pin");
  const eyeIcon = document.getElementById("eye-icon");
  if (pinInput.type === "password") {
    pinInput.type = "text";
    eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
  } else {
    pinInput.type = "password";
    eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
  }
}

/* ============ AUDIO STATE (dideklarasikan lebih awal agar tersedia saat login) ============ */
const bgMusic = document.getElementById('bg-music');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');
let isMusicPlaying = false;
let hasUserInteracted = false;

/* ============ SISTEM LOGIN (TANPA ANIMASI KEMBANG API) ============
   Username & PIN disimpan dalam bentuk base64 (bukan enkripsi asli,
   hanya penyamaran sederhana). Username: "nayra", PIN: "271024". */
const TARGET_NAME_B64 = "bmF5cmE=";  // "nayra"
const TARGET_PIN_B64 = "MjcxMDI0";   // "271024"
let isUnlocked = false;

function verifyLogin() {
  const inputName = document.getElementById('input-name').value.toLowerCase().trim();
  const inputPin = document.getElementById('input-pin').value.trim();
  const errorText = document.getElementById('auth-error');

  if (btoa(inputName) === TARGET_NAME_B64 && btoa(inputPin) === TARGET_PIN_B64) {
    errorText.innerText = "";
    isUnlocked = true;

    const overlay = document.getElementById('auth-overlay');
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 800);

    if (!hasUserInteracted) {
      bgMusic.play().then(() => {
        isMusicPlaying = true;
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
      }).catch(err => console.log("Audio ditahan:", err));
      hasUserInteracted = true;
    }

    document.getElementById('main-nav').classList.add('show');
    setTimeout(startMainTypewriter, 600);
    setTimeout(fireworkLoop, 1200);

  } else {
    errorText.innerText = "Kau siape!!!";
  }
}

document.getElementById('input-pin').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') verifyLogin();
});

/* ============ FUNGSI TYPEWRITER & SCROLL UNLOCK ============ */
function typeWriter(elementId, text, speed, callback) {
  const element = document.getElementById(elementId);
  element.innerHTML = ""; let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor'; cursor.innerHTML = '█';

  function type() {
    if (i < text.length) {
      let char = text.charAt(i);
      if (char === '\n') { element.insertBefore(document.createElement('br'), cursor); }
      else if (char === ',') {
        const span = document.createElement('span'); span.className = 'accent'; span.textContent = ',';
        element.insertBefore(span, cursor);
      }
      else { element.insertBefore(document.createTextNode(char), cursor); }
      i++; setTimeout(type, speed);
    } else {
      cursor.remove(); if (callback) callback();
    }
  }
  element.appendChild(cursor);
  type();
}

function startMainTypewriter() {
  document.getElementById('hero-content').classList.add('show');
  typeWriter('tw-title', "SELAMAT ULANG\nTAHUN,", 110, () => {
    setTimeout(() => {
      typeWriter('personalName', "Sayang", 130, () => {
        const msg = document.getElementById('personalMessage');
        const div = document.getElementById('hero-div');
        msg.style.opacity = '1'; msg.style.transform = 'translateY(0)';
        div.style.opacity = '1'; div.style.transform = 'translateY(0)';

        document.getElementById('scroll-hint').style.opacity = '1';

        setTimeout(() => {
           document.body.style.overflow = "auto";
        }, 1000);

      });
    }, 300);
  });
}

/* ============ GENERATE STARS (sepanjang area langit, makin redup mendekati desa) ============ */
const starsLayer = document.getElementById('stars');
for (let i = 0; i < 300; i++) {
  const star = document.createElement('div');
  const big = Math.random() < 0.15;
  star.className = big ? 'star big' : 'star';
  star.style.left = Math.random() * 100 + '%';
  const topVh = Math.random() * 360;
  star.style.top = topVh + 'vh';
  star.style.animationDelay = (Math.random() * 2.4) + 's';
  const fade = 1 - Math.max(0, (topVh - 240) / 160);
  star.style.setProperty('--star-op', Math.max(0.15, Math.min(1, fade)).toFixed(2));
  starsLayer.appendChild(star);
}

/* ============ GENERATE KONSTELASI ============ */
function buildConstellation(points, lines) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  lines.forEach(([a, b]) => {
    const line = document.createElementNS(ns, "line");
    line.setAttribute("x1", points[a][0]); line.setAttribute("y1", points[a][1]);
    line.setAttribute("x2", points[b][0]); line.setAttribute("y2", points[b][1]);
    svg.appendChild(line);
  });
  points.forEach(([x, y]) => {
    const c = document.createElementNS(ns, "circle");
    c.setAttribute("cx", x); c.setAttribute("cy", y); c.setAttribute("r", 1.6);
    svg.appendChild(c);
  });
  return svg;
}

const skyDecor = document.getElementById('sky-decor');

const ZODIAC = {
  leo: {
    pts: [[8,55],[22,38],[40,18],[58,22],[70,12],[78,30],[62,48],[45,52],[30,68]],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3],[6,7],[7,0],[7,8]]
  },
  scorpius: {
    pts: [[10,15],[22,28],[32,22],[44,30],[56,40],[64,55],[70,68],[62,80],[50,85],[78,72]],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[6,9]]
  },
  aries: {
    pts: [[15,70],[35,50],[55,35],[80,18]],
    lines: [[0,1],[1,2],[2,3]]
  },
  gemini: {
    pts: [[10,85],[18,60],[28,35],[40,15],[55,85],[60,58],[68,32],[78,12]],
    lines: [[0,1],[1,2],[2,3],[4,5],[5,6],[6,7]]
  },
  sagittarius: {
    pts: [[20,20],[45,15],[70,22],[72,40],[48,45],[24,40],[36,65],[58,68]],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[4,6],[3,7]]
  },
  taurus: {
    pts: [[12,30],[30,45],[48,55],[58,35],[70,15],[80,40],[68,60]],
    lines: [[0,1],[1,2],[2,3],[3,4],[3,5],[5,6],[6,2]]
  },
  cancer: {
    pts: [[20,20],[40,40],[60,30],[75,50]],
    lines: [[0,1],[1,2],[2,3]]
  },
  virgo: {
    pts: [[10,75],[28,55],[42,30],[60,40],[55,65],[78,20],[85,45]],
    lines: [[0,1],[1,2],[2,3],[2,5],[5,6]]
  }
};

const constellationConfigs = [
  { name: 'leo',         top: '4vh',   left: '4%',  size: 120, dim: true },
  { name: 'gemini',      top: '12vh',  left: '84%', size: 100, dim: true },
  { name: 'aries',       top: '78vh',  left: '6%',  size: 90,  dim: true },
  { name: 'taurus',      top: '130vh', left: '78%', size: 150 },
  { name: 'cancer',      top: '168vh', left: '8%',  size: 110 },
  { name: 'scorpius',    top: '215vh', left: '74%', size: 170 },
  { name: 'virgo',       top: '262vh', left: '6%',  size: 150 },
  { name: 'sagittarius', top: '308vh', left: '76%', size: 150 },
  { name: 'leo',         top: '352vh', left: '10%', size: 110 },
];
constellationConfigs.forEach(cfg => {
  const data = ZODIAC[cfg.name];
  const wrap = document.createElement('div');
  wrap.className = 'constellation';
  wrap.style.top = cfg.top;
  wrap.style.left = cfg.left;
  wrap.style.width = cfg.size + 'px';
  wrap.style.height = cfg.size + 'px';
  if (cfg.dim) wrap.style.opacity = '0.32';
  wrap.appendChild(buildConstellation(data.pts, data.lines));

  skyDecor.appendChild(wrap);
});

/* ============ GENERATE AWAN ============ */
function cloudSVG() {
  return `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
    <path d="M30,60 Q10,60 10,45 Q10,30 30,30 Q35,12 60,15 Q85,5 100,25 Q125,18 130,38 Q150,38 150,55 Q150,65 135,65 Z"/>
  </svg>`;
}
const cloudConfigs = [
  { top: '18vh',  left: '-10%', width: 220, dur: '38s', op: 0.10 },
  { top: '38vh',  left: '62%',  width: 240, dur: '46s', op: 0.10 },
  { top: '90vh',  left: '8%',   width: 200, dur: '36s', op: 0.12 },
  { top: '120vh', left: '58%',  width: 280, dur: '44s', op: 0.14 },
  { top: '155vh', left: '-12%', width: 260, dur: '40s', op: 0.15 },
  { top: '195vh', left: '55%',  width: 300, dur: '48s', op: 0.17 },
  { top: '235vh', left: '5%',   width: 280, dur: '42s', op: 0.18 },
  { top: '275vh', left: '60%',  width: 320, dur: '50s', op: 0.2 },
  { top: '292vh', left: '12%',  width: 260, dur: '38s', op: 0.22 },
  { top: '308vh', left: '68%',  width: 290, dur: '44s', op: 0.24 },
  { top: '315vh', left: '0%',   width: 300, dur: '46s', op: 0.22 },
  { top: '328vh', left: '40%',  width: 240, dur: '36s', op: 0.25 },
  { top: '345vh', left: '55%',  width: 280, dur: '40s', op: 0.24 },
];
cloudConfigs.forEach(cfg => {
  const wrap = document.createElement('div');
  wrap.className = 'cloud';
  wrap.style.top = cfg.top;
  wrap.style.left = cfg.left;
  wrap.style.width = cfg.width + 'px';
  wrap.style.height = (cfg.width * 0.4) + 'px';
  wrap.style.opacity = cfg.op;
  wrap.style.animation = `driftCloud ${cfg.dur} ease-in-out infinite alternate`;
  wrap.innerHTML = cloudSVG();
  skyDecor.appendChild(wrap);
});

/* ============ GENERATE ROKET PIXEL ART (langit malam berbintang, terbang naik 45°) ============ */
function rocketSVG() {
  return `<svg viewBox="0 0 32 44" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
    <g>
      <path d="M11 40h10l-2 3h-6z" fill="#ff8a3d"/>
      <path d="M13 40h6l-1 2h-4z" fill="#ffd35c"/>
    </g>
    <path d="M9 23 L3 31 L3 35 L9 33 Z" fill="#c43b3b"/>
    <path d="M23 23 L29 31 L29 35 L23 33 Z" fill="#c43b3b"/>
    <rect x="3" y="27" width="5" height="9" fill="#e8a229"/>
    <rect x="24" y="27" width="5" height="9" fill="#e8a229"/>
    <rect x="3" y="33" width="5" height="2" fill="#b97a1c"/>
    <rect x="24" y="33" width="5" height="2" fill="#b97a1c"/>
    <path d="M11 38h10V14h-10z" fill="#3f7fc1"/>
    <path d="M11 38h4V14h-4z" fill="#5a98d6"/>
    <rect x="11" y="13" width="10" height="2" fill="#e8c451"/>
    <path d="M16 1 L21 13 L11 13 Z" fill="#c43b3b"/>
    <path d="M16 1 L18.5 13 L11 13 Z" fill="#a82e2e"/>
    <circle cx="16" cy="24" r="4" fill="#a82e2e"/>
    <circle cx="16" cy="24" r="2.6" fill="#bfe7f0"/>
    <rect x="12" y="38" width="8" height="2" fill="#8b93a0"/>
    <polygon points="10,42 22,42 20,40 12,40" fill="#c7cdd6"/>
  </svg>`;
}
const rocketConfigs = [
  { top: '55vh',  size: 46, dur: 13000, delay: 1500  },
  { top: '130vh', size: 38, dur: 11000, delay: 9000  },
  { top: '230vh', size: 42, dur: 12000, delay: 16000 },
];
rocketConfigs.forEach(cfg => {
  const wrap = document.createElement('div');
  wrap.className = 'rocket';
  wrap.style.top = cfg.top;
  wrap.style.width = cfg.size + 'px';
  wrap.style.height = cfg.size + 'px';

  const inner = document.createElement('div');
  inner.className = 'rocket-inner';
  inner.innerHTML = rocketSVG();
  wrap.appendChild(inner);
  skyDecor.appendChild(wrap);

  function flyRocket() {
    wrap.style.transition = 'none';
    wrap.style.left = '-15vw';
    wrap.style.transform = 'translate(0px, 0px)';
    void wrap.offsetWidth;
    wrap.style.transition = `left ${cfg.dur}ms linear, transform ${cfg.dur}ms linear`;
    requestAnimationFrame(() => {
      wrap.style.left = '115vw';
      wrap.style.transform = 'translate(0px, -85vh)';
    });
    setTimeout(flyRocket, cfg.dur + 5000);
  }
  setTimeout(flyRocket, cfg.delay);
});

/* ============ GENERATE PESAWAT (pixel-art, dengan burung-burung kecil di senja) ============ */
function planeSVG() {
  return `<svg viewBox="0 0 64 28" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
    <path d="M6 14 L10 10 L16 10 L18 6 L22 6 L21 10 L46 10 L52 6 L56 6 L52 11 L58 12 L58 14 L52 15 L46 15 L21 15 L22 19 L18 19 L16 15 L10 15 Z" fill="#dcd2bd"/>
    <path d="M16 10 L22 6 L18 6 L12 10 Z" fill="#b34a3a"/>
    <path d="M16 15 L22 19 L18 19 L12 15 Z" fill="#9fa3a8"/>
    <rect x="24" y="11" width="2" height="2" fill="#1a120f"/>
    <rect x="28" y="11" width="2" height="2" fill="#1a120f"/>
    <rect x="32" y="11" width="2" height="2" fill="#1a120f"/>
    <rect x="36" y="11" width="2" height="2" fill="#1a120f"/>
    <rect x="40" y="11" width="2" height="2" fill="#1a120f"/>
    <path d="M44 13 L52 12 L52 15 L44 14 Z" fill="#5c5650"/>
    <path d="M6 14 L2 13 L2 15 L6 15 Z" fill="#9fa3a8"/>
  </svg>`;
}
function birdSVG() {
  return `<svg viewBox="0 0 40 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#1a120f" stroke-width="2" stroke-linecap="round">
    <path d="M2,10 Q10,0 20,8 Q30,0 38,10"/>
  </svg>`;
}
const planeConfigs = [
  { top: '295vh', width: 76, dir: 1 },
  { top: '320vh', width: 60, dir: -1 },
];
planeConfigs.forEach((cfg, idx) => {
  const wrap = document.createElement('div');
  wrap.className = 'plane';
  wrap.style.top = cfg.top;
  wrap.style.width = cfg.width + 'px';
  wrap.style.height = (cfg.width * 0.44) + 'px';
  if (cfg.dir > 0) wrap.style.transform = 'scaleX(-1) rotate(2deg)';
  else wrap.style.transform = 'rotate(-2deg)';
  wrap.innerHTML = planeSVG();
  skyDecor.appendChild(wrap);

  const trail = document.createElement('div');
  trail.className = 'plane-trail';
  trail.style.top = `calc(${cfg.top} + ${cfg.width * 0.2}px)`;
  trail.style.width = '140px';
  if (cfg.dir > 0) trail.style.transform = 'scaleX(-1)';
  skyDecor.appendChild(trail);

  for (let b = 0; b < 3; b++) {
    const bird = document.createElement('div');
    bird.className = 'bird';
    bird.style.top = `calc(${cfg.top} + ${(b - 1) * 18 + (cfg.dir > 0 ? -28 : 30)}px)`;
    bird.style.width = '16px';
    bird.style.height = '7px';
    if (cfg.dir < 0) bird.style.transform = 'scaleX(-1)';
    bird.innerHTML = birdSVG();
    skyDecor.appendChild(bird);

    const bStart = cfg.dir > 0 ? '-40px' : '108%';
    const bEnd = cfg.dir > 0 ? '108%' : '-40px';
    (function flyDecorBird(birdEl, start, end) {
      function go() {
        const dur = 18000 + Math.random() * 16000;
        const pause = 3000 + Math.random() * 9000;
        birdEl.style.transition = 'none';
        birdEl.style.left = start;
        void birdEl.offsetWidth;
        birdEl.style.transition = `left ${dur}ms linear`;
        requestAnimationFrame(() => birdEl.style.left = end);
        setTimeout(go, dur + pause);
      }
      setTimeout(go, Math.random() * 8000);
    })(bird, bStart, bEnd);
  }

  const startLeft = cfg.dir > 0 ? '-80px' : '108%';
  const endLeft = cfg.dir > 0 ? '108%' : '-80px';
  const trailStartLeft = cfg.dir > 0 ? '-220px' : '108%';
  const trailEndLeft = cfg.dir > 0 ? '108%' : '-220px';

  function flyPlane() {
    const duration = 26000 + Math.random() * 18000;
    const pause = 4000 + Math.random() * 10000;
    wrap.style.transition = 'none';
    wrap.style.left = startLeft;
    trail.style.transition = 'none';
    trail.style.left = trailStartLeft;
    void wrap.offsetWidth;
    wrap.style.transition = `left ${duration}ms linear`;
    trail.style.transition = `left ${duration}ms linear`;
    requestAnimationFrame(() => {
      wrap.style.left = endLeft;
      trail.style.left = trailEndLeft;
    });
    setTimeout(flyPlane, duration + pause);
  }
  setTimeout(flyPlane, Math.random() * 6000 + idx * 2000);
});

/* ============ KEMBANG API LOOP (HALAMAN UTAMA, AREA HERO) ============ */
function burst(x, y, container) {
  const colors = ['#00e5ff', '#d4af37', '#ff7fb0', '#f0e6d2'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'fw-pixel';
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.background = color;
    p.style.boxShadow = `0 0 6px ${color}`;
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    container.appendChild(p);

    const angle = (Math.PI * 2 * i) / 18;
    const dist = 40 + Math.random() * 60;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    p.style.transition = 'transform 0.9s ease-out, opacity 0.9s ease-out';
    requestAnimationFrame(() => {
      p.style.transform = `translate(${dx}px, ${dy}px)`;
      p.style.opacity = '0';
    });
    setTimeout(() => p.remove(), 900);
  }
}

function fireworkLoop() {
  const layer = document.getElementById('fireworks-layer');
  function shoot() {
    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight * (0.2 + Math.random() * 0.3);
    const trail = document.createElement('div');
    trail.className = 'fw-trail';
    trail.style.left = x + 'px';
    trail.style.top = window.innerHeight + 'px';
    trail.style.background = '#d4af37';
    trail.style.boxShadow = '0 0 8px #d4af37';
    trail.style.transition = 'top 0.7s ease-out';
    layer.appendChild(trail);
    requestAnimationFrame(() => trail.style.top = y + 'px');
    setTimeout(() => {
      trail.remove();
      burst(x, y, layer);
    }, 700);
    setTimeout(shoot, 2500 + Math.random() * 2500);
  }
  shoot();
}

/* ============ KEMBANG API BENTUK LOVE (KETUKAN DI HERO) ============ */
function heartBurst(x, y, container) {
  const colors = ['#ff7fb0', '#ff4f8b', '#d4af37', '#00e5ff', '#f0e6d2'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const scale = 0.7 + Math.random() * 0.9;
  const rotate = (Math.random() - 0.5) * 50;
  const particleCount = 26;

  for (let i = 0; i < particleCount; i++) {
    const t = (Math.PI * 2 * i) / particleCount;
    let hx = 16 * Math.pow(Math.sin(t), 3);
    let hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

    const rad = (rotate * Math.PI) / 180;
    const rx = hx * Math.cos(rad) - hy * Math.sin(rad);
    const ry = hx * Math.sin(rad) + hy * Math.cos(rad);

    const dx = rx * 5 * scale;
    const dy = ry * 5 * scale;

    const p = document.createElement('div');
    p.className = 'fw-pixel';
    const c = colors[Math.floor(Math.random() * colors.length)];
    p.style.background = c;
    p.style.boxShadow = `0 0 6px ${c}`;
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.borderRadius = '50%';
    container.appendChild(p);

    p.style.transition = `transform ${0.7 + Math.random() * 0.4}s cubic-bezier(0.2,0.8,0.3,1), opacity 1.1s ease-out`;
    requestAnimationFrame(() => {
      p.style.transform = `translate(${dx}px, ${dy}px) scale(${0.8 + Math.random() * 0.6})`;
      p.style.opacity = '0';
    });
    setTimeout(() => p.remove(), 1200);
  }

  burst(x, y, container);
}

document.addEventListener('click', (e) => {
  if (!isUnlocked) return;
  if (e.target.closest('#floating-widgets, .nav-list a, #auth-overlay, .moment-card, .deck-tab, #chest-stage, #gift-popup')) return;

  const x = e.clientX;
  const y = e.clientY;
  const layer = document.getElementById('click-fireworks-layer');

  heartBurst(x, y, layer);

  const extra = Math.random() < 0.6 ? 1 : 2;
  for (let i = 0; i < extra; i++) {
    const ox = x + (Math.random() - 0.5) * 160;
    const oy = y + (Math.random() - 0.5) * 120;
    setTimeout(() => heartBurst(ox, oy, layer), 150 + i * 200);
  }
});

/* ============ BURUNG-BURUNG PULANG ============ */
const homeBirdConfigs = [
  { top: '150vh', size: 14, dur: 34000, delay: 2000,  dir: 1  },
  { top: '195vh', size: 16, dur: 30000, delay: 9000,  dir: -1 },
  { top: '230vh', size: 15, dur: 32000, delay: 15000, dir: 1  },
  { top: '270vh', size: 18, dur: 28000, delay: 4000,  dir: -1 },
  { top: '285vh', size: 17, dur: 27000, delay: 7000,  dir: 1  },
  { top: '300vh', size: 20, dur: 26000, delay: 12000, dir: 1  },
  { top: '305vh', size: 19, dur: 25000, delay: 1000,  dir: -1 },
  { top: '318vh', size: 22, dur: 24000, delay: 18000, dir: -1 },
  { top: '335vh', size: 24, dur: 24000, delay: 6000,  dir: -1 },
  { top: '365vh', size: 28, dur: 22000, delay: 16000, dir: 1  },
];
homeBirdConfigs.forEach(cfg => {
  const bird = document.createElement('div');
  bird.className = 'bird';
  bird.style.top = cfg.top;
  bird.style.width = cfg.size + 'px';
  bird.style.height = (cfg.size * 0.4) + 'px';
  if (cfg.dir < 0) bird.style.transform = 'scaleX(-1)';
  bird.innerHTML = birdSVG();
  skyDecor.appendChild(bird);

  const startLeft = cfg.dir > 0 ? '-30px' : '108%';
  const endLeft = cfg.dir > 0 ? '108%' : '-30px';

  function flyHomeBird() {
    const dur = cfg.dur * (0.7 + Math.random() * 0.6);
    const pause = 4000 + Math.random() * 9000;
    bird.style.transition = 'none';
    bird.style.left = startLeft;
    void bird.offsetWidth;
    bird.style.transition = `left ${dur}ms linear`;
    requestAnimationFrame(() => bird.style.left = endLeft);
    setTimeout(flyHomeBird, dur + pause);
  }
  setTimeout(flyHomeBird, cfg.delay + Math.random() * 3000);
});

/* ============ POHON KELAPA DI DESA ============ */
function palmSVG(color) {
  return `<svg viewBox="0 0 60 140" xmlns="http://www.w3.org/2000/svg">
    <path d="M30,140 C28,110 34,90 26,60 C20,40 30,25 34,18" stroke="${color}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <g fill="${color}">
      <path d="M34,18 C18,10 4,16 0,26 C14,24 26,22 34,18 Z"/>
      <path d="M34,18 C24,4 12,2 8,10 C18,14 28,18 34,18 Z"/>
      <path d="M34,18 C32,4 30,0 26,2 C28,8 31,14 34,18 Z"/>
      <path d="M34,18 C44,4 56,2 60,10 C50,14 40,18 34,18 Z"/>
      <path d="M34,18 C48,10 60,14 60,24 C48,22 38,20 34,18 Z"/>
    </g>
  </svg>`;
}

const palmTrees = document.getElementById('palm-trees');
const palmConfigs = [
  { left: '4%',  height: 95,  layer: 'behind', color: '#241a13', swayDur: '6.5s' },
  { left: '23%', height: 150, layer: 'front',  color: '#0d0805', swayDur: '5.5s' },
  { left: '40%', height: 80,  layer: 'behind', color: '#241a13', swayDur: '7s'   },
  { left: '58%', height: 165, layer: 'front',  color: '#0c0704', swayDur: '6s'   },
  { left: '74%', height: 90,  layer: 'behind', color: '#241a13', swayDur: '6.8s' },
  { left: '88%', height: 145, layer: 'front',  color: '#0d0805', swayDur: '5.8s' },
  { left: '10%', height: 130, layer: 'front',  color: '#0e0906', swayDur: '6.2s' },
];
palmConfigs.forEach((cfg, idx) => {
  const wrap = document.createElement('div');
  wrap.className = `palm ${cfg.layer}`;
  wrap.style.left = cfg.left;
  wrap.style.width = (cfg.height * 0.43) + 'px';
  wrap.style.height = cfg.height + 'px';
  wrap.style.animationDuration = cfg.swayDur;
  wrap.style.animationDelay = (idx * 0.4) + 's';
  wrap.innerHTML = palmSVG(cfg.color);
  palmTrees.appendChild(wrap);
});

/* ============ DETAIL KECIL DI BAGIAN BAWAH ============ */
const bottomDecor = document.getElementById('bottom-decor');

const birdFlocks = [
  { top: '8%',  size: 22, dur: 22000, delay: 0 },
  { top: '14%', size: 16, dur: 26000, delay: 4000 },
  { top: '6%',  size: 14, dur: 30000, delay: 9000 },
];
birdFlocks.forEach(cfg => {
  const bird = document.createElement('div');
  bird.className = 'bird';
  bird.style.top = cfg.top;
  bird.style.width = cfg.size + 'px';
  bird.style.height = (cfg.size * 0.4) + 'px';
  bird.innerHTML = birdSVG();
  bottomDecor.appendChild(bird);

  function flyBird() {
    const dur = cfg.dur * (0.7 + Math.random() * 0.6);
    const pause = 3000 + Math.random() * 8000;
    bird.style.transition = 'none';
    bird.style.left = '-40px';
    void bird.offsetWidth;
    bird.style.transition = `left ${dur}ms linear`;
    requestAnimationFrame(() => bird.style.left = '110%');
    setTimeout(flyBird, dur + pause);
  }
  setTimeout(flyBird, cfg.delay + Math.random() * 3000);
});

for (let i = 0; i < 16; i++) {
  const fly = document.createElement('div');
  fly.className = 'firefly';
  fly.style.left = Math.random() * 100 + '%';
  fly.style.top = (40 + Math.random() * 55) + '%';
  fly.style.animationDelay = (Math.random() * 3) + 's';
  bottomDecor.appendChild(fly);
}

const villageCloudConfigs = [
  { top: '2%', left: '-10%', width: 220, dur: '40s' },
  { top: '10%', left: '65%', width: 180, dur: '34s' },
];
villageCloudConfigs.forEach(cfg => {
  const wrap = document.createElement('div');
  wrap.className = 'village-cloud';
  wrap.style.top = cfg.top;
  wrap.style.left = cfg.left;
  wrap.style.width = cfg.width + 'px';
  wrap.style.height = (cfg.width * 0.4) + 'px';
  wrap.style.animation = `driftCloud ${cfg.dur} ease-in-out infinite alternate`;
  wrap.innerHTML = cloudSVG();
  bottomDecor.appendChild(wrap);
});

/* ============ SCROLL HINT ============ */
const scrollHintEl = document.getElementById('scroll-hint');
let scrollHintHidden = false;
function hideScrollHint() {
  if (scrollHintHidden) return;
  scrollHintHidden = true;
  scrollHintEl.style.opacity = '0';
  scrollHintEl.style.pointerEvents = 'none';
}
scrollHintEl.addEventListener('click', () => {
  document.getElementById('words').scrollIntoView({ behavior: 'smooth' });
  hideScrollHint();
});
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) hideScrollHint();
}, { passive: true });

/* ============ NAV ACTIVE STATE ============ */
document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-list a').forEach(l => l.classList.remove('nav-active'));
    link.classList.add('nav-active');
  });
});

/* ============ MUSIK TOGGLE ============ */
document.getElementById('music-btn').addEventListener('click', () => {
  if (isMusicPlaying) {
    bgMusic.pause();
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
  } else {
    bgMusic.play().catch(() => {});
    iconPlay.style.display = 'none';
    iconPause.style.display = 'block';
  }
  isMusicPlaying = !isMusicPlaying;
});

/* ============ GIFT: LOGIKA PETI HADIAH ============ */
const TOTAL_ITEMS = 5;
const GIFT_ICONS = ['💎', '❤️', '💰', '🧿', '✨'];
const ASSET_CLOSED = 'assets/peti-tertutup.png';
const ASSET_OPEN = 'assets/peti-terbuka.png';

let chestState = 'closed'; // closed -> playing -> opened
let itemsLeft = TOTAL_ITEMS;
const collectedIcons = [];

const chestStage = document.getElementById('chest-stage');
const chestImg = document.getElementById('chest-img'); 
const chestVideo = document.getElementById('chest-video');
const chestCanvas = document.getElementById('chest-canvas');
const chestCtx = chestCanvas.getContext('2d');
let chromaFrameId = null;

function drawChromaFrame() {
  if (chestVideo.paused || chestVideo.ended) return;
  chestCanvas.width = chestVideo.videoWidth;
  chestCanvas.height = chestVideo.videoHeight;
  chestCtx.drawImage(chestVideo, 0, 0, chestCanvas.width, chestCanvas.height);

  const frame = chestCtx.getImageData(0, 0, chestCanvas.width, chestCanvas.height);
  const data = frame.data;
  const threshold = 235; // makin kecil = makin ketat mendeteksi "putih"
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] > threshold && data[i + 1] > threshold && data[i + 2] > threshold) {
      data[i + 3] = 0; // buat transparan
    }
  }
  chestCtx.putImageData(frame, 0, 0);
  chromaFrameId = requestAnimationFrame(drawChromaFrame);
}

chestVideo.addEventListener('play', () => {
  chestCanvas.style.display = 'block';
  drawChromaFrame();
});
chestVideo.addEventListener('pause', () => cancelAnimationFrame(chromaFrameId));
const itemCounter = document.getElementById('item-counter');
const chestHint = document.getElementById('chest-hint');
const chestOverlay = document.getElementById('chest-overlay');
const giftPopup = document.getElementById('gift-popup');
const giftLineup = document.getElementById('gift-lineup');

chestStage.addEventListener('click', () => {
  if (chestState === 'closed') {
    openChest();
  } else if (chestState === 'opened' && itemsLeft > 0) {
    collectItem();
  }
});

function openChest() {
  chestState = 'playing';
  chestHint.style.display = 'none';
  chestOverlay.classList.add('active');

  chestImg.style.display = 'none';
  chestCanvas.style.display = 'block';
  chestVideo.currentTime = 0;
  chestVideo.play().catch(() => {
    finishOpening();
  });
}

chestVideo.addEventListener('ended', finishOpening);

function finishOpening() {
  chestState = 'opened';
  chestCanvas.style.display = 'none';
  chestImg.src = ASSET_OPEN;
  chestImg.style.display = 'block';
  itemCounter.style.display = 'block';
  itemCounter.innerText = itemsLeft;
}

function collectItem() {
  itemsLeft--;
  itemCounter.innerText = itemsLeft;

  const icon = GIFT_ICONS[collectedIcons.length % GIFT_ICONS.length];
  collectedIcons.push(icon);
  spawnFloatingItem(icon);

  chestStage.classList.add('bump');
  setTimeout(() => chestStage.classList.remove('bump'), 150);

  if (itemsLeft === 0) {
    itemCounter.style.display = 'none';
    setTimeout(showFinalGifts, 700);
  }
}

function spawnFloatingItem(icon) {
  const rect = chestImg.getBoundingClientRect();
  const el = document.createElement('div');
  el.className = 'floating-item';
  el.textContent = icon;
  el.style.left = (rect.left + rect.width / 2) + 'px';
  el.style.top = (rect.top + rect.height / 2) + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

function showFinalGifts() {
  giftLineup.innerHTML = '';
  collectedIcons.forEach((icon, i) => {
    const box = document.createElement('div');
    box.className = 'gift-item-box';
    box.style.animationDelay = (i * 0.08) + 's';
    box.textContent = icon;
    giftLineup.appendChild(box);
  });
  giftPopup.classList.add('show');
}

function closeGiftPopup() {
  giftPopup.classList.remove('show');
  chestOverlay.classList.remove('active');
}

function resetChest() {
  closeGiftPopup();
  chestState = 'closed';
  itemsLeft = TOTAL_ITEMS;
  collectedIcons.length = 0;
  chestImg.src = ASSET_CLOSED;
  chestImg.style.display = 'block';
  chestVideo.style.display = 'none';
  itemCounter.style.display = 'none';
  chestHint.style.display = 'block';
}
