(function(){
  const PLACE_VALUES = [128,64,32,16,8,4,2,1];
  const bulbRow = document.getElementById('bulbRow');
  const binaryStringEl = document.getElementById('binaryString');
  const decimalValueEl = document.getElementById('decimalValue');
  const numInput = document.getElementById('numInput');

  let bits = new Array(8).fill(0);

  function bulbSVG(){
    return `
      <svg viewBox="0 0 60 70">
        <g class="bulb-rays">
          <line x1="30" y1="2" x2="30" y2="-6"></line>
          <line x1="14" y1="8" x2="8" y2="0"></line>
          <line x1="46" y1="8" x2="52" y2="0"></line>
          <line x1="4" y1="24" x2="-5" y2="22"></line>
          <line x1="56" y1="24" x2="65" y2="22"></line>
        </g>
        <circle class="bulb-glass" cx="30" cy="26" r="21"></circle>
        <path class="filament" d="M22 20 L26 34 L30 20 L34 34 L38 20"></path>
        <g class="bulb-base">
          <rect x="23" y="45" width="14" height="12" rx="1.5"></rect>
          <line x1="23" y1="49" x2="37" y2="49"></line>
          <line x1="23" y1="53" x2="37" y2="53"></line>
        </g>
      </svg>`;
  }

  function buildUnits(){
    bulbRow.innerHTML = '';
    PLACE_VALUES.forEach((val, i) => {
      const unit = document.createElement('div');
      unit.className = 'bit-unit';
      unit.dataset.index = i;
      unit.innerHTML = `
        <span class="place-value">${val}</span>
        <div class="bulb-wrap">${bulbSVG()}</div>
        <button type="button" class="bit-button" aria-pressed="false" aria-label="Toggle bit worth ${val}">0</button>
      `;
      bulbRow.appendChild(unit);

      unit.querySelector('.bit-button').addEventListener('click', () => toggleBit(i));
    });
  }

  function toggleBit(i){
    bits[i] = bits[i] ? 0 : 1;
    render();
  }

  function setFromDecimal(n){
    n = Math.max(0, Math.min(255, Math.round(n) || 0));
    bits = PLACE_VALUES.map(v => (n & v) ? 1 : 0);
    render();
  }

  function render(){
    const units = bulbRow.children;
    let decimal = 0;
    let binary = '';
    for (let i = 0; i < 8; i++){
      const on = bits[i] === 1;
      units[i].classList.toggle('on', on);
      const btn = units[i].querySelector('.bit-button');
      btn.setAttribute('aria-pressed', on);
      btn.textContent = on ? '1' : '0';
      if (on) decimal += PLACE_VALUES[i];
      binary += on ? '<b>1</b>' : '0';
    }
    binaryStringEl.innerHTML = binary;
    decimalValueEl.textContent = decimal;
    numInput.value = '';
  }

  document.getElementById('setBtn').addEventListener('click', () => {
    if (numInput.value !== '') setFromDecimal(Number(numInput.value));
  });
  numInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && numInput.value !== '') setFromDecimal(Number(numInput.value));
  });
  document.getElementById('randomBtn').addEventListener('click', () => {
    setFromDecimal(Math.floor(Math.random() * 256));
  });
  document.getElementById('clearBtn').addEventListener('click', () => setFromDecimal(0));
  document.getElementById('maxBtn').addEventListener('click', () => setFromDecimal(255));

  /* ---------- Field Guide: why bits matter ---------- */
  const CARDS = [
    {
      tag: 'TEXT',
      title: 'ASCII — letters as numbers',
      body: 'Every letter in this message is secretly a number: "A" is 65. LOAD shows 01000001 — exactly what your computer stores when you type "A".',
      value: 65,
      dyk: 'Your entire name exists in RAM only as a sequence of such numbers.'
    },
    {
      tag: 'COLOR',
      title: 'RGB — colors from bits',
      body: 'Every screen pixel mixes Red, Green and Blue. Each channel has 8 bits = 256 brightness levels. LOAD shows 11111111 = 255: red at full power.',
      value: 255,
      dyk: '16.7 million colors = 256 × 256 × 256 — all from bits.'
    },
    {
      tag: 'NETWORK',
      title: 'IP addresses — house numbers made of bits',
      body: 'The address 127.0.0.1 ("localhost", your own machine) is four numbers of 8 bits each. LOAD shows 01111111 = 127 — the first part of this famous address.',
      value: 127,
      dyk: 'No binary, no internet — every address is bit arithmetic.'
    },
    {
      tag: 'EVERYDAY',
      title: 'Switches — 8 switches, 256 worlds',
      body: 'Picture 8 light switches in a room. Every on/off combination is a different lighting: 2 to the power of 8 = 256 possibilities. LOAD shows 10101010 — switches alternating on/off.',
      value: 170,
      dyk: 'With just 8 yes/no decisions you can encode 256 different states.'
    },
    {
      tag: 'IMAGES',
      title: 'Photos — grayscale from bits',
      body: 'A black-and-white photo stores a brightness value per pixel from 0 (black) to 255 (white) — exactly one byte. LOAD shows 10000000 = 128: exact middle gray.',
      value: 128,
      dyk: 'A single phone photo contains millions of such bytes.'
    },
    {
      tag: 'SOUND',
      title: 'Music — waves as numbers',
      body: 'A CD samples the sound wave 44,100 times per second and stores each sample as a 16-bit number. Music is just a very long sequence of bits.',
      value: 200,
      dyk: 'Your favorite song is, at heart, a giant table of numbers.'
    },
    {
      tag: 'CS',
      title: '1 byte = 8 bits — the base unit',
      body: 'Computers count in bytes (8 bits together), not single bits. 1 KB = 1024 bytes, 1 MB = 1024 KB. LOAD shows 00001000 = 8 — the birth of a byte.',
      value: 8,
      dyk: 'Why 1024? Because it is a power of two (2^10) — the binary system at work.'
    },
    {
      tag: 'SECURITY',
      title: 'Passwords — hashes, not text',
      body: 'Systems never store your password itself, only its hash — a number. LOAD shows 42, the famous "answer to everything": 00101010.',
      value: 42,
      dyk: 'The more bits a hash has, the harder it is to reverse.'
    }
  ];

  function buildFieldGuide(){
    const deck = document.getElementById('cardDeck');
    const dyk = document.getElementById('fgDyk');
    if (!deck) return;
    CARDS.forEach((card) => {
      const el = document.createElement('div');
      el.className = 'punch-card';
      el.innerHTML = `
        <span class="pc-tag">${card.tag}</span>
        <h3 class="pc-title">${card.title}</h3>
        <p class="pc-body">${card.body}</p>
        <button type="button" class="chunky pc-load">LOAD → ${card.value}</button>
      `;
      el.querySelector('.pc-load').addEventListener('click', () => {
        setFromDecimal(card.value);
        if (dyk) dyk.textContent = '💡 ' + card.dyk;
        deck.querySelectorAll('.punch-card').forEach(c => c.classList.remove('loaded'));
        el.classList.add('loaded');
      });
      deck.appendChild(el);
    });
  }

  buildFieldGuide();
  buildUnits();
  render();
})();
