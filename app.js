(() => {
  // Exchange rate: units per 1 USD ($)
  const FX_TO_USD = {
    "$": 1,
    "€": 0.92,
    "₽": 95,
    "֏": 390,
  };

  // Baseline presets in USD ($)
  const PRESETS = {
    valuebet: {
      bankroll: 1000,
      iterations: 1000,
      outcomes: [
        { label: "Win (2.30)", prob: 46, payout: 65 },
        { label: "Push / Void", prob: 6, payout: 0 },
        { label: "Loss (-1u)", prob: 48, payout: -50 },
      ],
    },
    coin: {
      bankroll: 500,
      iterations: 1000,
      outcomes: [
        { label: "Heads (+25)", prob: 50, payout: 25 },
        { label: "Tails (-20)", prob: 50, payout: -20 },
      ],
    },
    roulette: {
      bankroll: 1000,
      iterations: 1000,
      outcomes: [
        { label: "Red (18/37)", prob: 48.65, payout: 20 },
        { label: "Black / 0", prob: 51.35, payout: -20 },
      ],
    },
  };

  const I18N = {
    en: {
      locale: "en-US",
      appTitle: "Probability & EV Simulator",
      appSubtitle: "Monte Carlo simulator for Expected Value, variance, bankroll path, and Theory vs. Practice",
      presetValueBet: "Value Bet",
      presetCoin: "Coin +EV",
      presetRoulette: "Roulette (-EV)",
      fxRateLabel: "Rate to $:",
      fxAutoLabel: "Auto",
      infoBtnText: "Info",
      paramsTitle: "Outcomes & Simulation",
      resetBtn: "Reset",
      secOutcomes: "1. Outcomes (pᵢ & Payout xᵢ)",
      addOutcomeBtn: "+ Outcome",
      colLabel: "Label",
      colProb: "Prob %",
      colPayout: "Net xᵢ",
      probSumLbl: "Total Probability:",
      normalizeBtn: "Normalize 100%",
      secSimSettings: "2. Simulation Setup",
      lblBankroll: "Starting Bankroll",
      lblIterations: "Iterations (Trials)",
      unitSteps: "steps",
      lblSpeed: "Animation Speed",
      speedSlow: "Slow (Visual)",
      speedFast: "Fast (Smooth)",
      speedTurbo: "Turbo",
      btnInstant: "⚡ Instant Run",
      btnAnimate: "▶ Animate",
      btnStop: "⏸ Stop",
      btnStep: "+1 Step",
      btnClear: "Clear",
      btnCopy: "Copy Report",
      kpiEvTitle: "Theoretical EV (Σ pᵢ·xᵢ)",
      kpiActualTitle: "Actual Avg Result (Simulated)",
      kpiStdTitle: "Std. Deviation (σ) & Variance",
      kpiBankrollTitle: "Current Bankroll",
      kpiProgressTitle: "Simulation Progress",
      kpiSharpeTitle: "EV / σ Ratio & Win Rate",
      chartBankrollTitle: "Bankroll Path: Actual vs. Theoretical EV",
      chartBankrollBadge: "Cumulative Balance",
      chartConvTitle: "Convergence: Sample Mean vs. Theoretical EV",
      chartConvBadge: "Law of Large Numbers",
      tableTitle: "Outcome Breakdown: Theory vs. Practice",
      tableBadge: "Frequency & Contribution",
      thOutcome: "Outcome",
      thTheoProb: "Theory Prob",
      thActualProb: "Actual Freq",
      thHits: "Hits",
      thPayout: "Payout (xᵢ)",
      thEvContrib: "EV Contribution (pᵢ·xᵢ)",
      modalTitle: "Probability & Expected Value (EV) Guide",
      modalCloseBtn: "Got it",
      theoProfitLbl: (n) => `Expected Profit (${n} trials)`,
      devLbl: "Deviation vs Theory",
      varLbl: "Variance (σ²)",
      netPnlLbl: "Simulated Net P&L",
      minMaxLbl: (min, max) => `Min: ${min} • Max: ${max}`,
      winRateLbl: (act, theo) => `Positive Hits: ${act}% (Theo: ${theo}%)`,
      healthGoodTitle: "Positive Expected Value (+EV)",
      healthGoodDesc: (ev) => `Theoretical EV = ${ev} per trial. Long-run expectation is profitable.`,
      healthWarnTitle: "Zero Expected Value (Fair Game)",
      healthWarnDesc: "Theoretical EV = 0. Results fluctuate purely due to variance.",
      healthBadTitle: "Negative Expected Value (-EV)",
      healthBadDesc: (ev) => `Theoretical EV = ${ev} per trial. Over many trials, balance trends downward.`,
      healthProbWarnTitle: "Warning: Probabilities Do Not Sum to 100%",
      healthProbWarnDesc: (sum) => `Current probability sum is ${sum}%. Click "Normalize 100%" or adjust weights.`,
      dsActualBankroll: "Actual Bankroll",
      dsTheoBankroll: "Theoretical EV Line",
      dsSampleMean: "Actual Sample Mean",
      dsTheoEv: "Theoretical EV",
      stepLabel: "Step",
      newOutcomeName: "Outcome",
      toastReset: "Scenario reset to preset",
      toastNormalized: "Probabilities normalized to 100%",
      toastCopied: "Simulation report copied to clipboard",
      toastCopyErr: "Failed to copy report",
      toastCsv: "ev-simulation.csv downloaded",
      toastJson: "ev-simulation.json downloaded",
      repHeader: "EV Simulation Report",
      infoHowTitle: "How to Use This Simulator",
      infoSteps: [
        "Pick a scenario preset (Value Bet, Coin +EV, Roulette -EV) or customize outcomes with probabilities pᵢ and net payouts xᵢ.",
        "Ensure Total Probability equals 100% (or click Normalize 100% to auto-scale).",
        "Set Starting Bankroll and number of iterations (100 to 50,000).",
        "Run Instant simulation, watch Animated convergence in real time, or click +1 Step to advance trial by trial.",
        "Compare the Actual Bankroll & Sample Mean against the Theoretical EV line."
      ],
      infoTermsTitle: "Key Formulas & Concepts",
      glossary: [
        { term: "Expected Value (EV)", desc: "Weighted average of all possible outcomes: EV = Σ (pᵢ × xᵢ)." },
        { term: "Variance (σ²) & Std. Dev (σ)", desc: "Measures dispersion/swing size around EV: σ² = Σ pᵢ·(xᵢ − EV)²." },
        { term: "Law of Large Numbers", desc: "As the number of trials increases, the actual average result converges toward Theoretical EV." },
        { term: "EV / σ Ratio", desc: "Edge-to-volatility ratio per trial; higher values mean smoother upward equity curves." }
      ]
    },

    ru: {
      locale: "ru-RU",
      appTitle: "Симулятор вероятностей и EV",
      appSubtitle: "Монте-Карло симулятор мат. ожидания, дисперсии, графика баланса и сравнения «Теория vs Практика»",
      presetValueBet: "Value Bet",
      presetCoin: "Монетка +EV",
      presetRoulette: "Рулетка (-EV)",
      fxRateLabel: "Курс к $:",
      fxAutoLabel: "Авто",
      infoBtnText: "Инфо",
      paramsTitle: "Исходы и симуляция",
      resetBtn: "Сбросить",
      secOutcomes: "1. Исходы (вероятность pᵢ и выплата xᵢ)",
      addOutcomeBtn: "+ Исход",
      colLabel: "Название",
      colProb: "Вер-ть %",
      colPayout: "Итог xᵢ",
      probSumLbl: "Сумма вероятностей:",
      normalizeBtn: "Нормировать 100%",
      secSimSettings: "2. Настройки симуляции",
      lblBankroll: "Начальный баланс",
      lblIterations: "Число итераций",
      unitSteps: "ходов",
      lblSpeed: "Скорость анимации",
      speedSlow: "Медленно",
      speedFast: "Быстро",
      speedTurbo: "Турбо",
      btnInstant: "⚡ Мгновенный прогон",
      btnAnimate: "▶ Анимация",
      btnStop: "⏸ Пауза",
      btnStep: "+1 Шаг",
      btnClear: "Очистить",
      btnCopy: "Копировать отчет",
      kpiEvTitle: "Теоретическое EV (Σ pᵢ·xᵢ)",
      kpiActualTitle: "Фактический средний итог",
      kpiStdTitle: "Ст. отклонение (σ) и дисперсия",
      kpiBankrollTitle: "Текущий баланс",
      kpiProgressTitle: "Прогресс симуляции",
      kpiSharpeTitle: "Отношение EV / σ и Win Rate",
      chartBankrollTitle: "График баланса: Факт vs Теория EV",
      chartBankrollBadge: "Динамика банкролла",
      chartConvTitle: "Сходимость: Среднее выборки vs EV",
      chartConvBadge: "Закон больших чисел",
      tableTitle: "Детализация исходов: Теория vs Практика",
      tableBadge: "Частота и вклад в EV",
      thOutcome: "Исход",
      thTheoProb: "Теор. вер-ть",
      thActualProb: "Факт. частота",
      thHits: "Выпало",
      thPayout: "Выплата (xᵢ)",
      thEvContrib: "Вклад в EV (pᵢ·xᵢ)",
      modalTitle: "Справка по мат. ожиданию (EV) и симуляции",
      modalCloseBtn: "Понятно",
      theoProfitLbl: (n) => `Ожидаемый профит (${n} ходов)`,
      devLbl: "Отклонение от теории",
      varLbl: "Дисперсия (σ²)",
      netPnlLbl: "Фактический P&L",
      minMaxLbl: (min, max) => `Мин: ${min} • Макс: ${max}`,
      winRateLbl: (act, theo) => `Плюсовых исходов: ${act}% (Теор: ${theo}%)`,
      healthGoodTitle: "Положительное мат. ожидание (+EV)",
      healthGoodDesc: (ev) => `Теоретическое EV = ${ev} за ход. На дистанции стратегия математически плюсовая.`,
      healthWarnTitle: "Нулевое мат. ожидание (EV = 0)",
      healthWarnDesc: "Игра без преимущества: колебания баланса вызваны только дисперсией.",
      healthBadTitle: "Отрицательное мат. ожидание (-EV)",
      healthBadDesc: (ev) => `Теоретическое EV = ${ev} за ход. На большой дистанции баланс стремится вниз.`,
      healthProbWarnTitle: "Внимание: сумма вероятностей не равна 100%",
      healthProbWarnDesc: (sum) => `Текущая сумма равна ${sum}%. Нажмите «Нормировать 100%» или скорректируйте доли.`,
      dsActualBankroll: "Фактический баланс",
      dsTheoBankroll: "Линия теоретического EV",
      dsSampleMean: "Фактическое среднее за ход",
      dsTheoEv: "Теоретическое EV",
      stepLabel: "Ход",
      newOutcomeName: "Исход",
      toastReset: "Сценарий сброшен к пресету",
      toastNormalized: "Вероятности приведены к 100%",
      toastCopied: "Отчет скопирован в буфер обмена",
      toastCopyErr: "Не удалось скопировать отчет",
      toastCsv: "Файл ev-simulation.csv скачан",
      toastJson: "Файл ev-simulation.json скачан",
      repHeader: "Отчет симуляции EV",
      infoHowTitle: "Как пользоваться симулятором",
      infoSteps: [
        "Выберите готовый пресет (Value Bet, Монетка +EV, Рулетка -EV) или задайте свои исходы с вероятностью pᵢ и выплатой xᵢ.",
        "Убедитесь, что сумма вероятностей равна 100% (или нажмите «Нормировать 100%»).",
        "Задайте начальный баланс и количество итераций (100, 1 000, 10 000, 50 000).",
        "Запустите мгновенный прогон, плавную анимацию или нажимайте «+1 Шаг» для пошагового анализа.",
        "Сравните фактический график баланса и выборочное среднее с линией теоретического EV."
      ],
      infoTermsTitle: "Формулы и понятия",
      glossary: [
        { term: "Мат. ожидание (EV)", desc: "Средневзвешенный результат одного испытания: EV = Σ (pᵢ × xᵢ)." },
        { term: "Дисперсия (σ²) и отклонение (σ)", desc: "Мера разброса результатов вокруг EV: σ² = Σ pᵢ·(xᵢ − EV)²." },
        { term: "Закон больших чисел", desc: "Чем больше итераций проведено, тем ближе фактический средний результат к теоретическому EV." },
        { term: "Отношение EV / σ", desc: "Отношение преимущества к волатильности на один ход; определяет плавность роста кривой." }
      ]
    },

    hy: {
      locale: "hy-AM",
      appTitle: "Հավանականությունների և EV սիմուլյատոր",
      appSubtitle: "Մոնտե-Կառլո սիմուլյատոր՝ մաթեմատիկական սպասման (EV), դիսպերսիայի և բալանսի գրաֆիկի համար",
      presetValueBet: "Value Bet",
      presetCoin: "Մետաղադրամ +EV",
      presetRoulette: "Ռուլետկա (-EV)",
      fxRateLabel: "Կուրսը $-ով:",
      fxAutoLabel: "Ավտո",
      infoBtnText: "Ինֆո",
      paramsTitle: "Ելքեր և սիմուլյացիա",
      resetBtn: "Վերականգնել",
      secOutcomes: "1. Ելքեր (հավանականություն pᵢ և վճարում xᵢ)",
      addOutcomeBtn: "+ Ելք",
      colLabel: "Անվանում",
      colProb: "Հավ. %",
      colPayout: "Արդյունք xᵢ",
      probSumLbl: "Ընդհանուր հավանականություն.",
      normalizeBtn: "Նորմավորել 100%",
      secSimSettings: "2. Սիմուլյացիայի կարգավորումներ",
      lblBankroll: "Սկզբնական բալանս",
      lblIterations: "Իտերացիաների քանակ",
      unitSteps: "քայլ",
      lblSpeed: "Անիմացիայի արագություն",
      speedSlow: "Դանդաղ",
      speedFast: "Արագ",
      speedTurbo: "Տուրբո",
      btnInstant: "⚡ Ակնթարթային",
      btnAnimate: "▶ Անիմացիա",
      btnStop: "⏸ Դադար",
      btnStep: "+1 Քայլ",
      btnClear: "Մաքրել",
      btnCopy: "Պատճենել հաշվետվությունը",
      kpiEvTitle: "Տեսական EV (Σ pᵢ·xᵢ)",
      kpiActualTitle: "Փաստացի միջին արդյունք",
      kpiStdTitle: "Ստանդարտ շեղում (σ) և դիսպերսիա",
      kpiBankrollTitle: "Ընթացիկ բալանս",
      kpiProgressTitle: "Սիմուլյացիայի ընթացք",
      kpiSharpeTitle: "EV / σ հարաբերակցություն",
      chartBankrollTitle: "Բալանսի գրաֆիկ. Փաստացի vs Տեսական EV",
      chartBankrollBadge: "Բալանսի դինամիկա",
      chartConvTitle: "Զուգամիտություն. Միջին արժեք vs EV",
      chartConvBadge: "Մեծ թվերի օրենք",
      tableTitle: "Ելքերի վերլուծություն. Տեսություն vs Պրակտիկա",
      tableBadge: "Հաճախականություն և EV",
      thOutcome: "Ելք",
      thTheoProb: "Տես. հավ.",
      thActualProb: "Փաստ. հաճ.",
      thHits: "Քանակ",
      thPayout: "Վճարում (xᵢ)",
      thEvContrib: "Ներդրում EV-ում",
      modalTitle: "Հավանականությունների և EV ուղեցույց",
      modalCloseBtn: "Հասկանալի է",
      theoProfitLbl: (n) => `Սպասվող շահույթ (${n} քայլ)`,
      devLbl: "Շեղում տեսությունից",
      varLbl: "Դիսպերսիա (σ²)",
      netPnlLbl: "Փաստացի P&L",
      minMaxLbl: (min, max) => `Մին. ${min} • Մաքս. ${max}`,
      winRateLbl: (act, theo) => `Դրական ելքեր. ${act}% (Տես. ${theo}%)`,
      healthGoodTitle: "Դրական մաթեմատիկական սպասում (+EV)",
      healthGoodDesc: (ev) => `Տեսական EV = ${ev} մեկ քայլի համար։ Երկարաժամկետ հեռանկարում ռազմավարությունը շահութաբեր է։`,
      healthWarnTitle: "Զրոյական մաթեմատիկական սպասում (EV = 0)",
      healthWarnDesc: "Առավելություն չկա. տատանումները պայմանավորված են միայն դիսպերսիայով։",
      healthBadTitle: "Բացասական մաթեմատիկական սպասում (-EV)",
      healthBadDesc: (ev) => `Տեսական EV = ${ev} մեկ քայլի համար։ Մեծ քանակությամբ քայլերի դեպքում բալանսը կնվազի։`,
      healthProbWarnTitle: "Ուշադրություն. հավանականությունների գումարը 100% չէ",
      healthProbWarnDesc: (sum) => `Ընթացիկ գումարը ${sum}% է։ Սեղմեք «Նորմավորել 100%» կոճակը։`,
      dsActualBankroll: "Փաստացի բալանս",
      dsTheoBankroll: "Տեսական EV գիծ",
      dsSampleMean: "Փաստացի միջին արդյունք",
      dsTheoEv: "Տեսական EV",
      stepLabel: "Քայլ",
      newOutcomeName: "Ելք",
      toastReset: "Սցենարը վերականգնված է",
      toastNormalized: "Հավանականությունները բերված են 100%-ի",
      toastCopied: "Հաշվետվությունը պատճենված է",
      toastCopyErr: "Չհաջողվեց պատճենել հաշվետվությունը",
      toastCsv: "ev-simulation.csv ֆայլը ներբեռնվեց",
      toastJson: "ev-simulation.json ֆայլը ներբեռնվեց",
      repHeader: "EV սիմուլյացիայի հաշվետվություն",
      infoHowTitle: "Ինչպես օգտվել սիմուլյատորից",
      infoSteps: [
        "Ընտրեք պատրաստի սցենար (Value Bet, Մետաղադրամ +EV, Ռուլետկա -EV) կամ ավելացրեք Ձեր ելքերը (pᵢ և xᵢ)։",
        "Համոզվեք, որ հավանականությունների գումարը 100% է (կամ սեղմեք «Նորմավորել 100%»)։",
        "Նշեք սկզբնական բալանսը և իտերացիաների քանակը (100-ից մինչև 50,000)։",
        "Գործարկեք ակնթարթային սիմուլյացիա, անիմացիա կամ քայլ առ քայլ («+1 Քայլ») ռեժիմը։",
        "Համեմատեք փաստացի բալանսի գրաֆիկը տեսական EV գծի հետ։"
      ],
      infoTermsTitle: "Հիմնական բանաձևեր",
      glossary: [
        { term: "Մաթ. սպասում (EV)", desc: "Բոլոր հնարավոր ելքերի կշռված միջինը. EV = Σ (pᵢ × xᵢ)։" },
        { term: "Դիսպերսիա (σ²) և շեղում (σ)", desc: "Արդյունքների ցրվածության չափը EV-ի շուրջ. σ² = Σ pᵢ·(xᵢ − EV)²։" },
        { term: "Մեծ թվերի օրենք", desc: "Որքան շատ են փորձերը, այնքան փաստացի միջին արդյունքը մոտենում է տեսական EV-ին։" },
        { term: "EV / σ հարաբերակցություն", desc: "Առավելության և վոլատիլության հարաբերակցությունը մեկ քայլի համար։" }
      ]
    }
  };

  let currentLang = "en";
  let currentCurrency = "$";
  let rates = { ...FX_TO_USD };
  let activePreset = "valuebet";

  // State in current currency
  let outcomes = [];
  let simState = {
    stepsDone: 0,
    targetSteps: 1000,
    bankroll: 1000,
    minBankroll: 1000,
    maxBankroll: 1000,
    sumPnl: 0,
    positiveHits: 0,
    hitsPerOutcome: [],
    historySteps: [0],
    historyActualBankroll: [1000],
    historyTheoBankroll: [1000],
    historySampleMean: [0],
  };

  let animFrameId = null;
  let isAnimating = false;
  let bankrollChart = null;
  let convergenceChart = null;

  const $ = (id) => document.getElementById(id);
  const t = () => I18N[currentLang];

  function getRate() {
    const r = parseFloat($("fxRateInput").value);
    return Number.isFinite(r) && r > 0 ? r : rates[currentCurrency] || 1;
  }

  function formatMoney(value, showPlus = false) {
    if (!Number.isFinite(value)) return `${currentCurrency}0`;
    const absVal = Math.abs(value);
    const digits = absVal > 0 && absVal < 100 ? 2 : 0;
    const formatted = absVal.toLocaleString(t().locale, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
    const sign = value < 0 ? "-" : showPlus && value > 0 ? "+" : "";
    return currentCurrency === "$" ? `${sign}$${formatted}` : `${sign}${formatted} ${currentCurrency}`;
  }

  function formatNum(value, digits = 2) {
    if (!Number.isFinite(value)) return "0";
    return value.toLocaleString(t().locale, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  }

  function showToast(message) {
    const toast = $("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  function stopAnimation() {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    isAnimating = false;
    $("runAnimBtn").textContent = t().btnAnimate;
  }

  function renderModalContent() {
    const dict = t();
    const stepsHtml = dict.infoSteps.map((step) => `<li>${step}</li>`).join("");
    const glossaryHtml = dict.glossary
      .map(
        (item) => `
        <div class="glossary-item">
          <strong>${item.term}</strong>
          <p>${item.desc}</p>
        </div>`
      )
      .join("");

    $("modalBody").innerHTML = `
      <div class="info-section">
        <h3>${dict.infoHowTitle}</h3>
        <ol class="info-steps">${stepsHtml}</ol>
      </div>
      <div class="info-section">
        <h3>${dict.infoTermsTitle}</h3>
        <div class="glossary-grid">${glossaryHtml}</div>
      </div>
    `;
  }

  function applyLanguage(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    document.documentElement.lang = lang;

    const dict = t();
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
    if (isAnimating) $("runAnimBtn").textContent = dict.btnStop;

    renderModalContent();
    recalculateAll();
  }

  function renderOutcomesList() {
    const container = $("outcomesList");
    container.innerHTML = outcomes
      .map(
        (o, idx) => `
        <div class="outcome-row" data-idx="${idx}">
          <input type="text" class="out-label" value="${o.label.replace(/"/g, "&quot;")}" />
          <input type="number" class="out-prob" min="0" max="100" step="0.1" value="${o.prob}" />
          <input type="number" class="out-payout" step="1" value="${o.payout}" />
          <button type="button" class="remove-outcome-btn" title="Remove" ${outcomes.length <= 2 ? "disabled" : ""}>✕</button>
        </div>`
      )
      .join("");

    container.querySelectorAll(".outcome-row").forEach((row) => {
      const idx = parseInt(row.dataset.idx, 10);
      row.querySelector(".out-label").addEventListener("input", (e) => {
        outcomes[idx].label = e.target.value;
        recalculateAll();
      });
      row.querySelector(".out-prob").addEventListener("input", (e) => {
        outcomes[idx].prob = Math.max(0, parseFloat(e.target.value) || 0);
        recalculateAll();
      });
      row.querySelector(".out-payout").addEventListener("input", (e) => {
        outcomes[idx].payout = parseFloat(e.target.value) || 0;
        recalculateAll();
      });
      row.querySelector(".remove-outcome-btn").addEventListener("click", () => {
        if (outcomes.length > 2) {
          outcomes.splice(idx, 1);
          renderOutcomesList();
          resetSimulationState();
          recalculateAll();
        }
      });
    });
  }

  function computeTheory() {
    const probSum = outcomes.reduce((acc, o) => acc + (o.prob || 0), 0);
    const normFactor = probSum > 0 ? 100 / probSum : 0;

    let ev = 0;
    let positiveProb = 0;
    outcomes.forEach((o) => {
      const p = (o.prob * normFactor) / 100;
      ev += p * o.payout;
      if (o.payout > 0) positiveProb += p * 100;
    });

    let variance = 0;
    outcomes.forEach((o) => {
      const p = (o.prob * normFactor) / 100;
      variance += p * Math.pow(o.payout - ev, 2);
    });

    const stdDev = Math.sqrt(variance);
    return { probSum, normFactor, ev, variance, stdDev, positiveProb };
  }

  function resetSimulationState() {
    stopAnimation();
    const startBankroll = Math.max(0, parseFloat($("initialBankroll").value) || 0);
    const targetSteps = Math.max(1, Math.min(100000, Math.round(parseFloat($("iterationsInput").value) || 1000)));
    simState = {
      stepsDone: 0,
      targetSteps,
      bankroll: startBankroll,
      minBankroll: startBankroll,
      maxBankroll: startBankroll,
      sumPnl: 0,
      positiveHits: 0,
      hitsPerOutcome: outcomes.map(() => 0),
      historySteps: [0],
      historyActualBankroll: [startBankroll],
      historyTheoBankroll: [startBankroll],
      historySampleMean: [0],
    };
  }

  function executeSteps(count, theoEv) {
    const probSum = outcomes.reduce((acc, o) => acc + (o.prob || 0), 0);
    if (probSum <= 0) return;

    // Build cumulative distribution thresholds
    const cdf = [];
    let cum = 0;
    outcomes.forEach((o) => {
      cum += o.prob / probSum;
      cdf.push(cum);
    });
    cdf[cdf.length - 1] = 1;

    const totalTarget = simState.targetSteps;
    const recordStride = Math.max(1, Math.floor(totalTarget / 250));

    for (let i = 0; i < count; i++) {
      const r = Math.random();
      let chosenIdx = 0;
      for (let j = 0; j < cdf.length; j++) {
        if (r <= cdf[j]) {
          chosenIdx = j;
          break;
        }
      }

      const payout = outcomes[chosenIdx].payout;
      simState.stepsDone += 1;
      simState.bankroll += payout;
      simState.sumPnl += payout;
      if (payout > 0) simState.positiveHits += 1;
      simState.hitsPerOutcome[chosenIdx] = (simState.hitsPerOutcome[chosenIdx] || 0) + 1;

      if (simState.bankroll < simState.minBankroll) simState.minBankroll = simState.bankroll;
      if (simState.bankroll > simState.maxBankroll) simState.maxBankroll = simState.bankroll;

      if (simState.stepsDone % recordStride === 0 || simState.stepsDone === totalTarget || simState.stepsDone <= 25) {
        const startB = simState.historyActualBankroll[0];
        simState.historySteps.push(simState.stepsDone);
        simState.historyActualBankroll.push(simState.bankroll);
        simState.historyTheoBankroll.push(startB + theoEv * simState.stepsDone);
        simState.historySampleMean.push(simState.sumPnl / simState.stepsDone);
      }
    }
  }

  function runInstant() {
    const theo = computeTheory();
    resetSimulationState();
    executeSteps(simState.targetSteps, theo.ev);
    recalculateAll();
  }

  function startAnimation() {
    if (isAnimating) {
      stopAnimation();
      return;
    }

    const theo = computeTheory();
    const target = Math.max(1, Math.min(100000, Math.round(parseFloat($("iterationsInput").value) || 1000)));
    if (simState.stepsDone >= target || simState.targetSteps !== target) {
      resetSimulationState();
    }

    isAnimating = true;
    $("runAnimBtn").textContent = t().btnStop;

    const tick = () => {
      if (!isAnimating) return;
      const speed = $("animSpeed").value;
      const divisor = speed === "slow" ? 180 : speed === "fast" ? 55 : 18;
      const batchSize = Math.max(1, Math.ceil(simState.targetSteps / divisor));
      const remaining = simState.targetSteps - simState.stepsDone;

      if (remaining <= 0) {
        stopAnimation();
        recalculateAll();
        return;
      }

      executeSteps(Math.min(batchSize, remaining), theo.ev);
      recalculateAll();

      if (simState.stepsDone >= simState.targetSteps) {
        stopAnimation();
      } else {
        animFrameId = requestAnimationFrame(tick);
      }
    };

    animFrameId = requestAnimationFrame(tick);
  }

  function stepOnce() {
    stopAnimation();
    const theo = computeTheory();
    const target = Math.max(1, Math.min(100000, Math.round(parseFloat($("iterationsInput").value) || 1000)));
    if (simState.targetSteps !== target) {
      resetSimulationState();
    }
    simState.targetSteps = Math.max(simState.targetSteps, simState.stepsDone + 1);
    executeSteps(1, theo.ev);
    recalculateAll();
  }

  function recalculateAll() {
    const dict = t();
    const theo = computeTheory();
    const startBankroll = Math.max(0, parseFloat($("initialBankroll").value) || 0);
    const targetSteps = Math.max(1, Math.min(100000, Math.round(parseFloat($("iterationsInput").value) || 1000)));

    // Probability sum badge
    const probEl = $("probSumValue");
    probEl.textContent = `${formatNum(theo.probSum, 1)}%`;
    probEl.className = Math.abs(theo.probSum - 100) < 0.05 ? "text-good" : "text-warn";

    // Theoretical EV
    const evEl = $("kpiTheoEv");
    evEl.textContent = formatMoney(theo.ev, true);
    evEl.className = "kpi-value " + (theo.ev > 0 ? "text-good" : theo.ev < 0 ? "text-bad" : "");
    $("kpiTheoTotal").textContent = `${dict.theoProfitLbl(targetSteps.toLocaleString(dict.locale))}: ${formatMoney(theo.ev * targetSteps, true)}`;

    // Actual Avg
    const actualMean = simState.stepsDone > 0 ? simState.sumPnl / simState.stepsDone : 0;
    const actEl = $("kpiActualEv");
    actEl.textContent = simState.stepsDone > 0 ? formatMoney(actualMean, true) : "—";
    actEl.className = "kpi-value " + (simState.stepsDone === 0 ? "" : actualMean >= 0 ? "text-good" : "text-bad");
    const dev = simState.stepsDone > 0 ? actualMean - theo.ev : 0;
    $("kpiDiffEv").textContent = `${dict.devLbl}: ${simState.stepsDone > 0 ? formatMoney(dev, true) : "—"}`;

    // Std Dev & Variance
    $("kpiStdDev").textContent = formatMoney(theo.stdDev);
    $("kpiVariance").textContent = `${dict.varLbl}: ${formatNum(theo.variance, 1)}`;

    // Bankroll
    const bankrollEl = $("kpiBankroll");
    bankrollEl.textContent = formatMoney(simState.bankroll);
    bankrollEl.className = "kpi-value " + (simState.bankroll >= startBankroll ? "text-good" : "text-bad");
    $("kpiNetPnL").textContent = `${dict.netPnlLbl}: ${formatMoney(simState.sumPnl, true)}`;

    // Progress
    $("kpiProgress").textContent = `${simState.stepsDone.toLocaleString(dict.locale)} / ${simState.targetSteps.toLocaleString(dict.locale)}`;
    $("kpiMinMax").textContent = dict.minMaxLbl(formatMoney(simState.minBankroll), formatMoney(simState.maxBankroll));

    // EV / Sigma & Win Rate
    const evSigma = theo.stdDev > 0 ? theo.ev / theo.stdDev : 0;
    $("kpiEvSigma").textContent = formatNum(evSigma, 3);
    const actualWinPct = simState.stepsDone > 0 ? (simState.positiveHits / simState.stepsDone) * 100 : 0;
    $("kpiWinRate").textContent = dict.winRateLbl(formatNum(actualWinPct, 1), formatNum(theo.positiveProb, 1));

    // Health Banner
    const banner = $("healthBanner");
    const title = $("healthTitle");
    const desc = $("healthDesc");
    banner.classList.remove("status-good", "status-warn", "status-bad");

    if (Math.abs(theo.probSum - 100) >= 0.05) {
      banner.classList.add("status-warn");
      title.textContent = dict.healthProbWarnTitle;
      desc.textContent = dict.healthProbWarnDesc(formatNum(theo.probSum, 1));
    } else if (theo.ev > 0) {
      banner.classList.add("status-good");
      title.textContent = dict.healthGoodTitle;
      desc.textContent = dict.healthGoodDesc(formatMoney(theo.ev, true));
    } else if (theo.ev === 0) {
      banner.classList.add("status-warn");
      title.textContent = dict.healthWarnTitle;
      desc.textContent = dict.healthWarnDesc;
    } else {
      banner.classList.add("status-bad");
      title.textContent = dict.healthBadTitle;
      desc.textContent = dict.healthBadDesc(formatMoney(theo.ev, true));
    }

    // Breakdown Table
    $("outcomesTableBody").innerHTML = outcomes
      .map((o, idx) => {
        const normProb = theo.probSum > 0 ? (o.prob / theo.probSum) * 100 : 0;
        const hits = simState.hitsPerOutcome[idx] || 0;
        const actualFreq = simState.stepsDone > 0 ? (hits / simState.stepsDone) * 100 : 0;
        const contrib = (normProb / 100) * o.payout;
        return `
          <tr>
            <td><strong>${o.label}</strong></td>
            <td>${formatNum(normProb, 2)}%</td>
            <td>${simState.stepsDone > 0 ? formatNum(actualFreq, 2) + "%" : "—"}</td>
            <td>${hits.toLocaleString(dict.locale)}</td>
            <td class="${o.payout >= 0 ? "text-good" : "text-bad"}">${formatMoney(o.payout, true)}</td>
            <td><strong>${formatMoney(contrib, true)}</strong></td>
          </tr>`;
      })
      .join("");

    updateCharts(theo);
  }

  function getChartColors() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    return {
      text: isLight ? "#475569" : "#94a3b8",
      grid: isLight ? "rgba(15, 23, 42, 0.08)" : "rgba(148, 163, 184, 0.12)",
    };
  }

  function updateCharts(theo) {
    if (typeof Chart === "undefined") return;
    const colors = getChartColors();
    const dict = t();

    const labels = simState.historySteps.map((s) => `${dict.stepLabel} ${s}`);

    if (bankrollChart) bankrollChart.destroy();
    bankrollChart = new Chart($("bankrollChart"), {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: `${dict.dsActualBankroll} (${currentCurrency})`,
            data: simState.historyActualBankroll,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.14)",
            borderWidth: 2,
            pointRadius: simState.historySteps.length <= 30 ? 3 : 0,
            fill: true,
            tension: 0.1,
          },
          {
            label: `${dict.dsTheoBankroll} (${currentCurrency})`,
            data: simState.historyTheoBankroll,
            borderColor: "#10b981",
            borderDash: [6, 4],
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { labels: { color: colors.text, boxWidth: 12 } },
        },
        scales: {
          x: { ticks: { color: colors.text, maxTicksLimit: 8 }, grid: { color: colors.grid } },
          y: { ticks: { color: colors.text }, grid: { color: colors.grid } },
        },
      },
    });

    const convLabels = simState.historySteps.slice(1).map((s) => `${dict.stepLabel} ${s}`);
    const sampleSeries = simState.historySampleMean.slice(1);
    const theoEvSeries = convLabels.map(() => theo.ev);

    if (convergenceChart) convergenceChart.destroy();
    convergenceChart = new Chart($("convergenceChart"), {
      type: "line",
      data: {
        labels: convLabels,
        datasets: [
          {
            label: `${dict.dsSampleMean} (${currentCurrency})`,
            data: sampleSeries,
            borderColor: "#f59e0b",
            borderWidth: 2,
            pointRadius: convLabels.length <= 30 ? 3 : 0,
            fill: false,
            tension: 0.15,
          },
          {
            label: `${dict.dsTheoEv} (${currentCurrency})`,
            data: theoEvSeries,
            borderColor: "#10b981",
            borderDash: [6, 4],
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { labels: { color: colors.text, boxWidth: 12 } },
        },
        scales: {
          x: { ticks: { color: colors.text, maxTicksLimit: 8 }, grid: { color: colors.grid } },
          y: { ticks: { color: colors.text }, grid: { color: colors.grid } },
        },
      },
    });
  }

  function applyPreset(presetKey) {
    const preset = PRESETS[presetKey];
    if (!preset) return;
    activePreset = presetKey;
    stopAnimation();

    document.querySelectorAll(".btn-preset").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.preset === presetKey);
    });

    const rate = getRate();
    const convBankroll = Math.round(preset.bankroll * rate);
    $("initialBankroll").value = convBankroll;
    if (convBankroll > parseFloat($("initialBankrollRange").max)) {
      $("initialBankrollRange").max = Math.ceil(convBankroll * 1.5);
    }
    $("initialBankrollRange").value = convBankroll;

    $("iterationsInput").value = preset.iterations;
    document.querySelectorAll(".pill-btn").forEach((b) => {
      b.classList.toggle("active", parseInt(b.dataset.iter, 10) === preset.iterations);
    });

    outcomes = preset.outcomes.map((o) => {
      const scaled = o.payout * rate;
      const rounded = scaled !== 0 && Math.abs(scaled) < 10 ? Number(scaled.toFixed(2)) : Math.round(scaled);
      return { label: o.label, prob: o.prob, payout: rounded };
    });

    renderOutcomesList();
    runInstant();
  }

  function convertCurrencyValues(oldRate, newRate) {
    if (!oldRate || !newRate || oldRate === newRate) return;
    const factor = newRate / oldRate;

    const bEl = $("initialBankroll");
    const newB = Math.round((parseFloat(bEl.value) || 0) * factor);
    bEl.value = newB;
    if (newB > parseFloat($("initialBankrollRange").max)) {
      $("initialBankrollRange").max = Math.ceil(newB * 1.5);
    }
    $("initialBankrollRange").value = newB;

    outcomes.forEach((o) => {
      const scaled = o.payout * factor;
      o.payout = scaled !== 0 && Math.abs(scaled) < 10 ? Number(scaled.toFixed(2)) : Math.round(scaled);
    });

    renderOutcomesList();
    runInstant();
  }

  function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function bindEvents() {
    $("initialBankroll").addEventListener("input", () => {
      const val = Math.max(0, parseFloat($("initialBankroll").value) || 0);
      if (val > parseFloat($("initialBankrollRange").max)) {
        $("initialBankrollRange").max = Math.ceil(val * 1.5);
      }
      $("initialBankrollRange").value = val;
      resetSimulationState();
      recalculateAll();
    });

    $("initialBankrollRange").addEventListener("input", () => {
      $("initialBankroll").value = $("initialBankrollRange").value;
      resetSimulationState();
      recalculateAll();
    });

    $("iterationsInput").addEventListener("input", () => {
      const val = Math.max(1, Math.min(100000, Math.round(parseFloat($("iterationsInput").value) || 100)));
      document.querySelectorAll(".pill-btn").forEach((b) => {
        b.classList.toggle("active", parseInt(b.dataset.iter, 10) === val);
      });
      resetSimulationState();
      recalculateAll();
    });

    document.querySelectorAll(".pill-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const val = parseInt(btn.dataset.iter, 10);
        $("iterationsInput").value = val;
        document.querySelectorAll(".pill-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        runInstant();
      });
    });

    $("addOutcomeBtn").addEventListener("click", () => {
      outcomes.push({
        label: `${t().newOutcomeName} ${outcomes.length + 1}`,
        prob: 10,
        payout: 0,
      });
      renderOutcomesList();
      resetSimulationState();
      recalculateAll();
    });

    $("normalizeBtn").addEventListener("click", () => {
      const sum = outcomes.reduce((acc, o) => acc + (o.prob || 0), 0);
      if (sum <= 0) return;
      outcomes.forEach((o) => {
        o.prob = Number(((o.prob / sum) * 100).toFixed(2));
      });
      renderOutcomesList();
      recalculateAll();
      showToast(t().toastNormalized);
    });

    $("runInstantBtn").addEventListener("click", runInstant);
    $("runAnimBtn").addEventListener("click", startAnimation);
    $("stepBtn").addEventListener("click", stepOnce);
    $("clearSimBtn").addEventListener("click", () => {
      resetSimulationState();
      recalculateAll();
    });

    document.querySelectorAll(".btn-preset").forEach((btn) => {
      btn.addEventListener("click", () => applyPreset(btn.dataset.preset));
    });

    $("resetBtn").addEventListener("click", () => {
      applyPreset(activePreset);
      showToast(t().toastReset);
    });

    $("langSelect").addEventListener("change", (e) => {
      applyLanguage(e.target.value);
    });

    $("currencySelect").addEventListener("change", (e) => {
      const prevRate = getRate();
      currentCurrency = e.target.value;
      const nextRate = rates[currentCurrency] || 1;
      $("fxRateInput").value = nextRate;

      document.querySelectorAll("[data-currency]").forEach((el) => {
        el.textContent = currentCurrency;
      });

      if ($("autoConvertFx").checked) {
        convertCurrencyValues(prevRate, nextRate);
      } else {
        recalculateAll();
      }
    });

    $("fxRateInput").addEventListener("input", () => {
      const val = parseFloat($("fxRateInput").value);
      if (Number.isFinite(val) && val > 0) {
        rates[currentCurrency] = val;
        recalculateAll();
      }
    });

    $("themeToggle").addEventListener("click", () => {
      const html = document.documentElement;
      const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
      html.setAttribute("data-theme", next);
      $("themeIcon").textContent = next === "light" ? "🌙" : "☀️";
      recalculateAll();
    });

    $("infoBtn").addEventListener("click", () => { $("infoModal").hidden = false; });
    $("closeModalBtn").addEventListener("click", () => { $("infoModal").hidden = true; });
    $("modalOkBtn").addEventListener("click", () => { $("infoModal").hidden = true; });
    $("infoModal").addEventListener("click", (e) => {
      if (e.target === $("infoModal")) $("infoModal").hidden = true;
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !$("infoModal").hidden) $("infoModal").hidden = true;
    });

    $("copyReportBtn").addEventListener("click", async () => {
      const theo = computeTheory();
      const actualMean = simState.stepsDone > 0 ? simState.sumPnl / simState.stepsDone : 0;
      const dict = t();
      const text = [
        `${dict.repHeader} (${activePreset.toUpperCase()}, ${simState.stepsDone} ${dict.unitSteps})`,
        `${dict.kpiEvTitle}: ${formatMoney(theo.ev, true)} | σ: ${formatMoney(theo.stdDev)}`,
        `${dict.kpiActualTitle}: ${formatMoney(actualMean, true)}`,
        `${dict.kpiBankrollTitle}: ${formatMoney(simState.bankroll)} (${formatMoney(simState.sumPnl, true)})`,
      ].join("\n");

      try {
        await navigator.clipboard.writeText(text);
        showToast(dict.toastCopied);
      } catch {
        showToast(dict.toastCopyErr);
      }
    });

    $("exportCsvBtn").addEventListener("click", () => {
      const dict = t();
      const csvRows = [
        [dict.stepLabel, dict.dsActualBankroll, dict.dsTheoBankroll, dict.dsSampleMean],
        ...simState.historySteps.map((step, i) => [
          step,
          simState.historyActualBankroll[i].toFixed(2),
          simState.historyTheoBankroll[i].toFixed(2),
          simState.historySampleMean[i].toFixed(4),
        ]),
      ];
      const csv = "\uFEFF" + csvRows.map((r) => r.join(";")).join("\n");
      downloadFile("ev-simulation.csv", csv, "text/csv;charset=utf-8;");
      showToast(dict.toastCsv);
    });

    $("exportJsonBtn").addEventListener("click", () => {
      const theo = computeTheory();
      downloadFile(
        "ev-simulation.json",
        JSON.stringify(
          {
            language: currentLang,
            currency: currentCurrency,
            fxRateToUsd: getRate(),
            outcomes,
            theory: theo,
            simulation: simState,
          },
          null,
          2
        ),
        "application/json"
      );
      showToast(t().toastJson);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindEvents();
    $("langSelect").value = "en";
    $("currencySelect").value = "$";
    $("fxRateInput").value = rates["$"];
    document.querySelectorAll("[data-currency]").forEach((el) => {
      el.textContent = "$";
    });
    renderModalContent();
    applyLanguage("en");
    applyPreset("valuebet");
  });
})();