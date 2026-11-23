# Probability & Expected Value (EV) Simulator

Interactive Monte Carlo simulator and Expected Value (EV) calculator for modeling probabilistic outcomes ($p_i, x_i$), variance/standard deviation, bankroll trajectories, and **Theory vs. Practice** convergence over distance.

Built with vanilla **HTML5**, **CSS3**, **JavaScript (ES6+)**, and **Chart.js** with zero build steps or external dependencies required.

---

## Key Features

- **Custom Outcome Builder ($p_i, x_i$):** Add, edit, or remove custom outcomes with probability (`%`) and net payout ($x_i$), plus automatic sum tracking and one-click **100% probability normalization**.
- **Scenario Presets:** Quick templates for **Value Bet (+EV)**, **Coin Flip (+EV)**, and **Roulette (-EV)**.
- **Three Simulation Modes:**
  - **Instant Run:** Immediately simulates up to `100,000` trials (with quick presets for `100`, `1k`, `10k`, and `50k`).
  - **Animated Run:** Real-time progressive animation with **Slow**, **Fast**, and **Turbo** speeds.
  - **Step-by-Step (`+1 Step`):** Advance one trial at a time to observe individual outcome hits and sample mean shifts.
- **Theory vs. Practice Analytics & Charts:**
  - **KPI Cards:** Theoretical EV ($\sum p_i x_i$) and expected profit over $N$ trials, actual average result and deviation vs. theory, standard deviation ($\sigma$) and variance ($\sigma^2$), current bankroll and net P&L, simulation progress (`Min` / `Max` bankroll), and `EV / \sigma` ratio with win rate.
  - **Bankroll Path Chart:** Compares actual simulated bankroll against the theoretical expectation line ($\text{Start} + \text{EV} \cdot n$).
  - **Convergence Chart:** Tracks sample mean convergence toward Theoretical EV (Law of Large Numbers).
  - **Outcome Breakdown Table:** Compares theoretical probability, actual hit frequency, hit count, payout, and EV contribution per outcome.
- **Multi-Language & Multi-Currency FX:** Interface in **English (`EN`)**, **Russian (`RU`)**, and **Armenian (`HY`)** (default `EN`), plus **$ USD**, **€ EUR**, **₽ RUB**, and **֏ AMD** with customizable USD exchange rates and an **Auto** conversion toggle.
- **Guide Modal, Themes & Export:** Built-in `Info` modal with instructions and formula glossary, dark/light theme toggle, clipboard report copy, and **CSV** / **JSON** exports.

---

## Project Structure

```text
├── index.html   # Layout, outcome editor, simulation controls, KPI cards, charts, table, and Info modal
├── styles.css   # CSS variables, dark/light themes, responsive grid, outcome rows, and modal styling
├── app.js       # EV & variance calculations, Monte Carlo simulation engine, animation loop, i18n, Chart.js, and exports
└── README.md    # Project documentation
```

---

## Core Formulas

| Metric | Formula |
| :--- | :--- |
| **Normalized Probability** | $\tilde{p}_i = \frac{p_i}{\sum_j p_j}$ |
| **Theoretical Expected Value (EV)** | $\text{EV} = \sum_i \tilde{p}_i \cdot x_i$ |
| **Variance ($\sigma^2$)** | $\sigma^2 = \sum_i \tilde{p}_i \cdot (x_i - \text{EV})^2$ |
| **Standard Deviation ($\sigma$)** | $\sigma = \sqrt{\sigma^2}$ |
| **Actual Sample Mean** | $\bar{X}_n = \frac{1}{n} \sum_{k=1}^{n} X_k$ |
| **Theoretical Bankroll at Step $n$** | $B_{\text{theo}}(n) = B_0 + n \cdot \text{EV}$ |

---

## Getting Started

1. Place `index.html`, `styles.css`, and `app.js` in the same directory.
2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari) — no server or build step is needed.

---

## License

(C) Karlos Hakobyan
