---
layout: default
title: "文字種カウントツール"
lead: "分析したい文章に出てくる文字を、重複なしで一覧化します。"
---

## 入力

この演習では、パターンAとパターンBの両方に出てくる文字をまとめてリストアップします。下の `パターンAとBを読み込む` を使ってください。

<div class="toolbar">
  <button type="button" class="secondary" data-preset="both">パターンAとBを読み込む</button>
  <button type="button" class="secondary" data-preset="a">パターンAだけ</button>
  <button type="button" class="secondary" data-preset="b">パターンBだけ</button>
</div>

<div class="form-field">
  <label for="char-input">文章</label>
  <textarea id="char-input" class="large" placeholder="ここに文章を貼り付けます"></textarea>
</div>

<label class="checkbox-row">
  <input type="checkbox" id="exclude-punct" checked>
  句読点・空白を除外する
</label>

<p class="muted">除外される文字: `、` `。` `?` `!` `？` `！` 半角空白、全角空白、改行、タブ</p>

<div class="toolbar">
  <button type="button" id="generate-chars">文字一覧を生成</button>
</div>

## 生成結果

<p id="char-meta" class="result-meta">まだ生成していません</p>

<div class="form-field">
  <label for="char-result">文字リスト</label>
  <textarea id="char-result" class="result" readonly></textarea>
</div>

<button type="button" data-copy-textarea="#char-result">文字リストをコピー</button>

## 使い方

1. `パターンAとBを読み込む` を押す
2. `文字一覧を生成` を押す
3. 結果をコピーする
4. `カウント`、`確率`、`情報量` の3つのシートすべてで、`A4` セルから下に貼り付ける

<div class="toolbar">
  <a id="tool-back-link" class="button-link secondary" href="{{ '/20260511/texts/' | relative_url }}">元のページに戻る</a>
</div>
