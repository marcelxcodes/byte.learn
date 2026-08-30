# BIT-8 Binary Bulb Console

A retro-styled binary/decimal trainer. Eight bulbs represent the bits of an 8-bit
number (128 down to 1). Toggle a bit with its circular button, watch the bulb light,
and read the binary string and decimal value on the phosphor screen.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page markup. Loads `styles.css` and `script.js`. No inline CSS or JS. |
| `styles.css` | All styling: chassis, veneer, nameplate, bulbs, screen, controls, circular bit buttons, responsive/reduced-motion rules. |
| `script.js` | All logic: builds the 8 bit units, toggles bits, converts between binary and decimal, wires SET/RANDOM/CLEAR/ALL 1s. |
| `binary-bulbs.html` | Original single-file version, kept as a reference. |

## Running

No build step or dependencies — it's plain HTML/CSS/JS. Open `index.html` directly
in a browser, or serve the folder:

```bash
npx serve .
```

## Usage

- **Toggle a bit** — click the circular button under a bulb. The button label flips between `0` and `1`.
- **SET VALUE** — enter a decimal number (0–255) and press SET (or Enter) to set all bits at once.
- **RANDOM** — set a random value.
- **CLEAR** — all bits off (0).
- **ALL 1s** — all bits on (255).

The binary string and decimal readout update live on the phosphor screen.
