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

  buildUnits();
  render();
})();
