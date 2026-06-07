---
layout: default
title: "TSV変換ツール"
lead: "1行に1発話ずつ貼り付けた文章を、スプレッドシートに横方向で貼れるタブ区切りテキストに変換します。"
---

## 入力

1行に1発話ずつ貼り付けてください。変換後は、各行がタブ文字で区切られた1行のテキストになります。

<div class="toolbar">
  <button type="button" class="secondary" data-preset="a">パターンAの文章を入れる</button>
  <button type="button" class="secondary" data-preset="b">パターンBの文章を入れる</button>
</div>

<div class="form-field">
  <label for="tsv-input">変換前の文章</label>
  <textarea id="tsv-input" class="large" placeholder="引っ越し先の物件で迷っていて、ちょっと相談したいんですよね&#10;どんな物件で迷ってるんですか、駅近とか広さとか色々ありますよね&#10;駅から近い物件と、駅から遠いけど広い物件で悩んでいまして"></textarea>
</div>

<label class="checkbox-row">
  <input type="checkbox" id="tsv-skip-empty" checked>
  空行を除外する
</label>

<br>

<label class="checkbox-row">
  <input type="checkbox" id="tsv-strip-number" checked>
  行頭の番号を除外する
</label>

<p class="muted">例: `1. 本文`、`1: 本文`、`1 本文` のような行頭番号を取り除きます。</p>

<div class="toolbar">
  <button type="button" id="convert-tsv">横タブ区切りに変換</button>
</div>

## 変換結果

<p id="tsv-meta" class="result-meta">まだ変換していません</p>

<div class="form-field">
  <label for="tsv-result">横タブ区切りテキスト</label>
  <textarea id="tsv-result" class="result" readonly></textarea>
</div>

<button type="button" data-copy-textarea="#tsv-result">変換結果をコピー</button>

## 使い方

1. 変換前の文章に、1行1発話で文章を貼り付ける
2. `横タブ区切りに変換` を押す
3. 変換結果をコピーする
4. パターンAは `カウント` シートの `B2` セル、パターンBは `O2` セルに貼り付ける

<div class="toolbar">
  <a id="tool-back-link" class="button-link secondary" href="{{ '/entropy/sheet-design/' | relative_url }}">元のページに戻る</a>
</div>
