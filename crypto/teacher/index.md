---
layout: default
title: "教師用確認ページ"
lead: "LMS提出テキストを復号し、署名と穴埋め回答を確認します。学生には共有しないページです。"
---

## 入力

<div class="form-field">
  <label for="teacher-submission-input">LMS提出テキスト</label>
  <textarea id="teacher-submission-input" class="large" placeholder="暗号文:&#10;CIPHER-...&#10;&#10;ディジタル署名:&#10;SIG-...&#10;&#10;自分の公開鍵:&#10;PUB-..."></textarea>
</div>

<div class="form-field">
  <label for="teacher-secret-key">教員の秘密鍵</label>
  <textarea id="teacher-secret-key" class="result" placeholder="教員の秘密鍵 SEC-... を貼り付けます"></textarea>
</div>

<div class="toolbar">
  <button type="button" id="teacher-check">復号・検証する</button>
</div>

## 解析結果

<div id="teacher-parse-result" class="callout">
  まだ確認していません。
</div>

<div class="form-field">
  <label for="teacher-parsed-cipher">読み取った暗号文</label>
  <textarea id="teacher-parsed-cipher" class="result" readonly></textarea>
</div>

<div class="form-field">
  <label for="teacher-parsed-signature">読み取ったディジタル署名</label>
  <textarea id="teacher-parsed-signature" class="result" readonly></textarea>
</div>

<div class="form-field">
  <label for="teacher-parsed-public-key">読み取った学生の公開鍵</label>
  <textarea id="teacher-parsed-public-key" class="result" readonly></textarea>
</div>

<div class="two-column">
  <div class="form-field">
    <label for="teacher-student-fingerprint">学生の公開鍵の指紋</label>
    <textarea id="teacher-student-fingerprint" class="result compact-result" readonly></textarea>
  </div>

  <div class="form-field">
    <label for="teacher-student-visual">学生の公開鍵の視覚指紋</label>
    <textarea id="teacher-student-visual" class="result visual-fingerprint" readonly></textarea>
  </div>
</div>

<h2>復号結果</h2>

<p id="teacher-decrypt-meta" class="result-meta">まだ復号していません。</p>

<div class="form-field">
  <label for="teacher-plaintext">復号した文章</label>
  <textarea id="teacher-plaintext" class="large" readonly></textarea>
</div>

<h2>署名検証</h2>

<div id="teacher-signature-result" class="callout">
  まだ検証していません。
</div>

<h2>穴埋め回答の確認</h2>

<div id="teacher-answer-result" class="table-wrap"></div>

<h2>よくある誤り</h2>

<div id="teacher-diagnostics" class="callout">
  まだ診断していません。
</div>
