---
layout: default
title: "鍵ペア作成ツール"
lead: "公開鍵と秘密鍵のペアを作ります。教員用の鍵も学生用の鍵も同じ仕組みで作ります。"
---

## 鍵ペアを作る

初回アクセス時には自動生成しません。保存済みの鍵ペアがない場合は下のボタンから作成します。保存済みの場合は、同じボタンで鍵を作り直せます。

<div class="toolbar">
  <button type="button" id="pk-generate">鍵ペアを作る</button>
</div>

<p id="pk-status" class="result-meta">まだ鍵ペアを作っていません。</p>

<section id="pk-output" class="hidden">
  <h2>生成結果</h2>

  <div class="form-field">
    <label for="pk-public-key">私の公開鍵</label>
    <textarea id="pk-public-key" class="result" readonly></textarea>
  </div>

  <div class="toolbar">
    <button type="button" data-copy-textarea="#pk-public-key">公開鍵をコピー</button>
    <button type="button" id="pk-download-public" class="secondary">ダウンロード</button>
  </div>

  <div class="form-field">
    <label for="pk-secret-key">私の秘密鍵</label>
    <textarea id="pk-secret-key" class="result hidden" readonly></textarea>
  </div>

  <div class="toolbar">
    <button type="button" id="pk-toggle-secret" class="secondary">秘密鍵を表示する</button>
    <button type="button" id="pk-copy-secret" class="secondary">秘密鍵をコピー</button>
    <button type="button" id="pk-download-secret" class="secondary">ダウンロード</button>
  </div>

  <div class="form-field">
    <label for="pk-fingerprint">公開鍵の指紋</label>
    <textarea id="pk-fingerprint" class="result compact-result" readonly></textarea>
  </div>

  <div class="form-field">
    <label for="pk-visual">公開鍵の視覚指紋</label>
    <textarea id="pk-visual" class="result visual-fingerprint" readonly></textarea>
  </div>
</section>

<div class="callout warn">
  <strong>秘密鍵は自分だけが持ちます。</strong><br>
  公開鍵は、他の人に渡してもよい情報です。一方で、秘密鍵は自分だけが安全に管理するものです。他の人に渡したり、オンラインサービスに登録・アップロードしたりしてはいけません。
</div>
