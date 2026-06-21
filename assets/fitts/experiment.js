(function () {
  "use strict";

  const root = document.querySelector("#fitts-tool");
  if (!root) return;

  // 日本の学生証のサイズ（mm）。縦横比はここから変えない。
  const CARD_W_MM = 85.6;
  const CARD_H_MM = 54;
  // 1回の実験で測定する移動回数（10往復 = 20移動）。
  const MOVEMENTS = 20;
  const STORE_KEY = "fitts-px-per-mm-v1";

  const $ = (selector) => document.querySelector(selector);

  // --- 要素 ---
  const slider = $("#cal-slider");
  const card = $("#cal-card");
  const calReadout = $("#cal-readout");
  const calStatus = $("#cal-status");
  const calConfirm = $("#cal-confirm");

  const inputW = $("#fitts-w");
  const inputD = $("#fitts-d");
  const paramInfo = $("#fitts-param-info");
  const startBtn = $("#fitts-start");

  const overlay = $("#fitts-overlay");
  const targetA = $("#fitts-target-a");
  const targetB = $("#fitts-target-b");
  const hudRemaining = $("#fitts-hud-remaining");
  const instruction = $("#fitts-instruction");
  const cancelBtn = $("#fitts-cancel");

  const resultMeta = $("#fitts-result-meta");
  const resultBody = $("#fitts-result-body");
  const rowOutput = $("#fitts-rows");
  const clearBtn = $("#fitts-clear");

  let pxPerMm = null;
  let state = null;
  const log = [];

  // ===== ステップ1：キャリブレーション =====
  function updateCard() {
    const widthPx = Number(slider.value);
    const heightPx = widthPx * (CARD_H_MM / CARD_W_MM);
    card.style.width = widthPx + "px";
    card.style.height = heightPx + "px";
    const ppm = widthPx / CARD_W_MM;
    calReadout.textContent =
      "いまの四角：幅 " +
      Math.round(widthPx) +
      "px（高さ " +
      Math.round(heightPx) +
      "px）／ 1mm ≈ " +
      ppm.toFixed(2) +
      "px";
  }

  function reflectCalibration() {
    if (pxPerMm && pxPerMm > 0) {
      calStatus.textContent =
        "✓ キャリブレーション完了：1mm ≈ " +
        pxPerMm.toFixed(2) +
        "px（このまま実験に進めます）";
      calStatus.classList.add("done");
      startBtn.disabled = false;
    } else {
      calStatus.textContent =
        "まだ確定していません。四角を学生証に合わせて「この大きさで確定」を押してください。";
      calStatus.classList.remove("done");
      startBtn.disabled = true;
    }
    updateParamInfo();
  }

  slider.addEventListener("input", updateCard);

  calConfirm.addEventListener("click", () => {
    pxPerMm = Number(slider.value) / CARD_W_MM;
    try {
      localStorage.setItem(STORE_KEY, String(pxPerMm));
    } catch (error) {
      // localStorage が使えない環境でも、その場の実験は続けられる。
    }
    reflectCalibration();
  });

  // ===== ステップ2：条件 =====
  function updateParamInfo() {
    const wMm = Number(inputW.value);
    const dMm = Number(inputD.value);
    if (!(wMm > 0) || !(dMm > 0)) {
      paramInfo.textContent =
        "ターゲットの大きさ（W）と距離（D）を mm で入力してください。";
      return;
    }
    if (pxPerMm) {
      paramInfo.textContent =
        "画面上での大きさ：W ≈ " +
        Math.round(wMm * pxPerMm) +
        "px、D ≈ " +
        Math.round(dMm * pxPerMm) +
        "px";
    } else {
      paramInfo.textContent =
        "先にステップ1のキャリブレーションを済ませてください。";
    }
  }

  inputW.addEventListener("input", updateParamInfo);
  inputD.addEventListener("input", updateParamInfo);

  root.querySelectorAll("[data-preset-w]").forEach((button) => {
    button.addEventListener("click", () => {
      inputW.value = button.getAttribute("data-preset-w");
      inputD.value = button.getAttribute("data-preset-d");
      updateParamInfo();
    });
  });

  // ===== ステップ3：実験本体 =====
  function placeTarget(el, x, y, sizePx) {
    el.style.width = sizePx + "px";
    el.style.height = sizePx + "px";
    el.style.left = x + "px";
    el.style.top = y + "px";
  }

  function setActive(index) {
    state.active = index;
    targetA.classList.toggle("active", index === 0);
    targetA.classList.toggle("inactive", index !== 0);
    targetB.classList.toggle("active", index === 1);
    targetB.classList.toggle("inactive", index !== 1);
  }

  function renderProgress() {
    if (!state.started) {
      hudRemaining.textContent = "ハイライトされた丸をクリックすると測定開始";
      instruction.textContent =
        "光っている丸をクリックしてください。そこから測定が始まります。";
    } else {
      hudRemaining.textContent = "残り " + (MOVEMENTS - state.movements) + " 回";
      instruction.textContent = "光っている方の丸を、できるだけ速く正確にクリック";
    }
  }

  function layoutTargets() {
    const rect = overlay.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    placeTarget(targetA, cx - state.dPx / 2, cy, state.wPx);
    placeTarget(targetB, cx + state.dPx / 2, cy, state.wPx);
    setActive(0);
  }

  function onTargetClick(index) {
    if (!state || state.done) return;
    if (index !== state.active) return; // 反対側（暗い丸）の誤クリックは無視
    if (!state.started) {
      state.started = true;
      state.startTime = performance.now();
      state.movements = 0;
    } else {
      state.movements += 1;
    }
    if (state.movements >= MOVEMENTS) {
      finish();
      return;
    }
    setActive(1 - state.active);
    renderProgress();
  }

  targetA.addEventListener("click", () => onTargetClick(0));
  targetB.addEventListener("click", () => onTargetClick(1));

  function startExperiment() {
    const wMm = Number(inputW.value);
    const dMm = Number(inputD.value);
    if (!pxPerMm || pxPerMm <= 0) {
      alert("先にステップ1のキャリブレーションを完了してください。");
      return;
    }
    if (!(wMm > 0) || !(dMm > 0)) {
      alert("ターゲットの大きさ（W）と距離（D）を正しく入力してください。");
      return;
    }
    if (dMm <= wMm) {
      alert(
        "距離（D）はターゲットの大きさ（W）より大きくしてください。\n2つの丸が重なってしまいます。",
      );
      return;
    }

    const wPx = wMm * pxPerMm;
    const dPx = dMm * pxPerMm;
    const maxWidth = window.screen.width * 0.92;
    const maxHeight = window.screen.height * 0.82;
    if (dPx + wPx > maxWidth || wPx > maxHeight) {
      const maxDmm = Math.floor((maxWidth - wPx) / pxPerMm);
      alert(
        "この条件は画面に収まりません。\nW=" +
          wMm +
          "mm のとき、距離 D は約 " +
          maxDmm +
          "mm 以下にしてください。",
      );
      return;
    }

    state = {
      wMm: wMm,
      dMm: dMm,
      wPx: wPx,
      dPx: dPx,
      movements: 0,
      started: false,
      done: false,
      startTime: 0,
    };

    overlay.classList.remove("hidden");
    if (overlay.requestFullscreen) {
      overlay.requestFullscreen().catch(() => {
        // 全画面が拒否されても、オーバーレイ表示のまま実験できる。
      });
    }
    // 全画面遷移後にサイズが確定するため、少し待ってから配置する。
    window.setTimeout(() => {
      layoutTargets();
      renderProgress();
    }, 120);
  }

  function finish() {
    if (!state || state.done) return;
    state.done = true;
    const total = performance.now() - state.startTime;
    const perMove = total / MOVEMENTS;

    log.push({
      d: state.dMm,
      w: state.wMm,
      t: Math.round(perMove),
      total: Math.round(total),
    });

    hideOverlay();
    renderResults();
  }

  function cancelExperiment() {
    if (!state || state.done) {
      hideOverlay();
      return;
    }
    state.done = true;
    hideOverlay();
    resultMeta.textContent = "実験を中止しました。もう一度やり直してください。";
  }

  function hideOverlay() {
    overlay.classList.add("hidden");
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }

  function renderResults() {
    const latest = log[log.length - 1];
    resultMeta.textContent =
      "完了：合計 " +
      latest.total +
      "ms ／ " +
      MOVEMENTS +
      "回移動 ／ 1回あたり T = " +
      latest.t +
      "ms";

    resultBody.innerHTML = log
      .map((row, index) => {
        return (
          "<tr><td>" +
          (index + 1) +
          "</td><td>" +
          row.d +
          "</td><td>" +
          row.w +
          "</td><td>" +
          row.t +
          "</td></tr>"
        );
      })
      .join("");

    rowOutput.value = log
      .map((row) => [row.d, row.w, row.t].join("\t"))
      .join("\n");
  }

  startBtn.addEventListener("click", startExperiment);
  cancelBtn.addEventListener("click", cancelExperiment);

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      log.length = 0;
      resultBody.innerHTML = "";
      rowOutput.value = "";
      resultMeta.textContent = "記録を消去しました。";
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state && !state.done) {
      cancelExperiment();
    }
  });

  document.addEventListener("fullscreenchange", () => {
    // 実験中にユーザーが Esc で全画面を抜けたら中止扱いにする。
    if (!document.fullscreenElement && state && !state.done && !overlay.classList.contains("hidden")) {
      cancelExperiment();
    }
  });

  // ===== 初期化 =====
  let stored = 0;
  try {
    stored = Number(localStorage.getItem(STORE_KEY));
  } catch (error) {
    stored = 0;
  }
  if (stored > 0) {
    pxPerMm = stored;
    slider.value = String(Math.round(stored * CARD_W_MM));
  }
  updateCard();
  reflectCalibration();
  updateParamInfo();
})();
