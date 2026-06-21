---
layout: default
title: "フィッツの法則 実験ツール"
lead: "学生証でキャリブレーションし、距離（D）と大きさ（W）を変えながらクリック時間を測る実験ツールです。"
---

<div class="callout">
  進め方は「<a href="{{ '/fitts/experiment/' | relative_url }}">実験の手順</a>」を見ながら行ってください。ステップ1のキャリブレーションは最初に一度だけ行えば、あとは条件を変えて何度でも実験できます。
</div>

<div id="fitts-tool">

  <section class="fitts-step">
    <h2><span class="fitts-step-num">1</span>学生証でキャリブレーション</h2>
    <p>手元の<strong>学生証を画面に当てて</strong>、下のスライダーで四角の大きさを学生証（縦54mm×横85.6mm）にぴったり合わせてください。合わせたら「この大きさで確定」を押します。縦横比は固定されています。</p>

    <div class="fitts-card-stage">
      <div id="cal-card" class="fitts-card">
        <span class="fitts-card-chip"></span>
        <span>
          <span class="fitts-card-label">学生証と同じ大きさに</span><br>
          <span class="fitts-card-sub">54mm × 85.6mm</span>
        </span>
      </div>
    </div>

    <label class="form-field" for="cal-slider">
      <span>四角の大きさを調整</span>
      <input type="range" id="cal-slider" class="fitts-slider" min="180" max="1100" value="323" step="1">
    </label>

    <p id="cal-readout" class="result-meta"></p>

    <div class="toolbar">
      <button type="button" id="cal-confirm">この大きさで確定</button>
    </div>

    <p id="cal-status" class="fitts-cal-status"></p>
  </section>

  <section class="fitts-step">
    <h2><span class="fitts-step-num">2</span>条件を決める</h2>
    <p>ターゲットの大きさ（直径 W）と、ターゲット間の距離（D）を<strong>ミリメートル（mm）</strong>で入力します。まずは下のプリセットから試してください。</p>

    <div class="fitts-presets">
      <button type="button" class="secondary small" data-preset-w="15" data-preset-d="80">W=15mm / D=80mm</button>
      <button type="button" class="secondary small" data-preset-w="6" data-preset-d="120">W=6mm / D=120mm</button>
      <button type="button" class="secondary small" data-preset-w="20" data-preset-d="60">W=20mm / D=60mm</button>
      <button type="button" class="secondary small" data-preset-w="10" data-preset-d="100">W=10mm / D=100mm</button>
      <button type="button" class="secondary small" data-preset-w="5" data-preset-d="160">W=5mm / D=160mm</button>
    </div>

    <div class="two-column">
      <div class="form-field">
        <label for="fitts-w">ターゲットの大きさ（直径 W, mm）</label>
        <input type="number" id="fitts-w" min="1" step="1" value="15" inputmode="decimal">
      </div>
      <div class="form-field">
        <label for="fitts-d">ターゲット間の距離（D, mm）</label>
        <input type="number" id="fitts-d" min="1" step="1" value="80" inputmode="decimal">
      </div>
    </div>

    <p id="fitts-param-info" class="result-meta"></p>

    <div class="toolbar">
      <button type="button" id="fitts-start" disabled>全画面で実験を開始</button>
    </div>
    <p class="muted">10往復（20回の移動）で1回の実験です。途中でやめるには <code>Esc</code> キーを押します。</p>
  </section>

  <section class="fitts-step">
    <h2><span class="fitts-step-num">3</span>結果を記録する</h2>
    <p id="fitts-result-meta" class="result-meta">まだ実験していません。</p>

    <div class="table-wrap">
      <table class="compact-table">
        <thead>
          <tr><th>#</th><th>距離 D (mm)</th><th>大きさ W (mm)</th><th>クリック時間 T (ms)</th></tr>
        </thead>
        <tbody id="fitts-result-body"></tbody>
      </table>
    </div>

    <p class="muted">困難指数（ID）はツールでは計算しません。あとで「分析の手順」で、自分で表計算ソフトを使って求めます。</p>

    <div class="form-field">
      <label for="fitts-rows">表計算ソフト貼り付け用（D / W / T の順・タブ区切り）</label>
      <textarea id="fitts-rows" class="result compact-result" readonly></textarea>
    </div>

    <div class="toolbar">
      <button type="button" data-copy-textarea="#fitts-rows">すべての行をコピー</button>
      <button type="button" id="fitts-clear" class="secondary">記録を消去</button>
    </div>
  </section>

  <div id="fitts-overlay" class="fitts-overlay hidden">
    <div class="fitts-hud">
      <span id="fitts-hud-remaining"></span>
      <button type="button" id="fitts-cancel" class="fitts-cancel">中止 (Esc)</button>
    </div>
    <button type="button" id="fitts-target-a" class="fitts-target inactive" aria-label="ターゲットA"></button>
    <button type="button" id="fitts-target-b" class="fitts-target inactive" aria-label="ターゲットB"></button>
    <p id="fitts-instruction" class="fitts-instruction"></p>
  </div>

</div>

<script src="{{ '/assets/fitts/experiment.js' | relative_url }}"></script>
