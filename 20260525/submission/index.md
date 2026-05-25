---
layout: default
title: "LMS提出直前の確認"
lead: "LMSの1つの提出欄に書く3項目を確認します。"
---

## 提出するもの

UROLには、次の3つを1つのテキスト欄に書いて提出します。

- 暗号文 `CIPHER-...`
- ディジタル署名 `SIG-...`
- 自分の公開鍵 `PUB-...`

<div class="form-field">
  <label for="submission-cipher">暗号文</label>
  <textarea id="submission-cipher" class="result" placeholder="CIPHER-..."></textarea>
</div>

<div class="form-field">
  <label for="submission-signature">ディジタル署名</label>
  <textarea id="submission-signature" class="result" placeholder="SIG-..."></textarea>
</div>

<div class="form-field">
  <label for="submission-public-key">自分の公開鍵</label>
  <textarea id="submission-public-key" class="result" placeholder="PUB-..."></textarea>
</div>

<div class="toolbar">
  <button type="button" id="build-submission">提出テキストを作る</button>
</div>

<div class="form-field">
  <label for="submission-output">LMSに貼るテキスト</label>
  <textarea id="submission-output" class="result" readonly></textarea>
</div>

<div class="toolbar">
  <button type="button" data-copy-textarea="#submission-output">提出テキストをコピー</button>
</div>

<div class="callout warn">
  `SEC-...` から始まる秘密鍵は提出しません。教員の公開鍵の指紋、視覚指紋、学生の公開鍵の指紋も提出項目ではありません。
</div>
