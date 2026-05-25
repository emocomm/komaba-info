---
layout: default
title: "署名ツール"
lead: "暗号文に、自分の秘密鍵でディジタル署名を作ります。"
---

## 入力

<div class="form-field">
  <label for="sign-target">署名する対象</label>
  <textarea id="sign-target" class="result" placeholder="暗号化ツールで作った CIPHER-... を貼り付けます"></textarea>
</div>

<div class="form-field">
  <label for="sign-secret-key">署名に使う鍵</label>
  <textarea id="sign-secret-key" class="result" placeholder="自分の秘密鍵 SEC-... を貼り付けます"></textarea>
</div>

<div class="toolbar">
  <button type="button" id="sign-run">署名</button>
  <a id="tool-back-link" class="button-link secondary" href="{{ '/20260525/sign/' | relative_url }}">手順ページに戻る</a>
</div>

## 出力

<p id="sign-meta" class="result-meta">まだ署名していません。</p>

<div class="form-field">
  <label for="signature-output">ディジタル署名</label>
  <textarea id="signature-output" class="result" readonly></textarea>
</div>

<div class="form-field">
  <label for="sign-target-preview">署名した対象の確認</label>
  <textarea id="sign-target-preview" class="result compact-result" readonly></textarea>
</div>

<div class="toolbar">
  <button type="button" data-copy-textarea="#signature-output">署名をコピー</button>
  <a class="button-link secondary" href="{{ '/20260525/submission/' | relative_url }}">提出確認へ進む</a>
</div>
