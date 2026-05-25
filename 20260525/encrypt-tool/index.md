---
layout: default
title: "暗号化ツール"
lead: "教員の公開鍵で、穴埋め済み文章を暗号文にします。"
---

## 入力

<div class="form-field">
  <label for="encrypt-plaintext">暗号化する本文</label>
  <textarea id="encrypt-plaintext" class="large" placeholder="期末試験型の穴埋め問題で作った、言葉を埋めた文章を貼り付けます"></textarea>
</div>

<div class="form-field">
  <label for="encrypt-public-key">暗号化に使う鍵</label>
  <textarea id="encrypt-public-key" class="result" placeholder="教員の公開鍵 PUB-... を貼り付けます"></textarea>
</div>

<div class="two-column">
  <div class="form-field">
    <label for="encrypt-key-fingerprint">貼り付けた公開鍵の指紋</label>
    <textarea id="encrypt-key-fingerprint" class="result compact-result" readonly></textarea>
  </div>

  <div class="form-field">
    <label for="encrypt-key-visual">貼り付けた公開鍵の視覚指紋</label>
    <textarea id="encrypt-key-visual" class="result visual-fingerprint" readonly></textarea>
  </div>
</div>

<label class="checkbox-row block-row">
  <input type="checkbox" id="teacher-key-confirmed">
  スライドの指紋と見た目を確認しました
</label>

<div class="toolbar">
  <button type="button" id="encrypt-run">暗号化</button>
  <a id="tool-back-link" class="button-link secondary" href="{{ '/20260525/encrypt/' | relative_url }}">手順ページに戻る</a>
</div>

## 出力

<p id="encrypt-meta" class="result-meta">まだ暗号化していません。</p>

<div class="form-field">
  <label for="cipher-output">暗号文</label>
  <textarea id="cipher-output" class="result" readonly></textarea>
</div>

<div class="toolbar">
  <button type="button" data-copy-textarea="#cipher-output">暗号文をコピー</button>
  <a class="button-link secondary" href="{{ '/20260525/sign/' | relative_url }}">署名の手順へ進む</a>
</div>
