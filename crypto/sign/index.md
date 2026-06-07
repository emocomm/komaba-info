---
layout: default
title: "署名の手順"
lead: "暗号化ツールで作った暗号文に、自分の秘密鍵でディジタル署名を作ります。"
---

## このページで行うこと

[暗号化の手順](../encrypt/)で作った暗号文に署名します。署名に使う鍵は、自分の秘密鍵です。署名対象は平文ではなく、`CIPHER-...` から始まる暗号文です。

署名は暗号文を隠すためのものではありません。自分が作ったことを、教員が自分の公開鍵で検証できるようにするためのものです。

## 手順

1. 暗号化ツールで作った `CIPHER-...` から始まる暗号文を用意する
2. 鍵作成ツールで作った自分の秘密鍵 `SEC-...` を用意する
3. 署名ツールを開く
4. 「署名する対象」欄に、暗号文 `CIPHER-...` を入れる
5. 「署名に使う鍵」欄に、自分の秘密鍵 `SEC-...` を入れる
6. 「署名」を実行し、`SIG-...` から始まるディジタル署名をコピーする
7. 秘密鍵 `SEC-...` はUROLには提出しない

<div class="toolbar">
  <a class="button-link" href="{{ '/crypto/sign-tool/' | relative_url }}" target="_blank" rel="noopener">署名ツールを開く</a>
  <!-- <a class="button-link secondary" href="{{ '/crypto/encrypt-tool/' | relative_url }}" target="_blank" rel="noopener">暗号化ツールに戻る</a> -->
</div>
