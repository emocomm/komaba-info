---
layout: default
title: "Gemini Canvasの使い方"
lead: "GeminiのCanvas機能を使って、言葉で指示するだけでWebアプリを作る手順です。この流れを頭に入れてから、次のページの課題に取り組みましょう。"
---

## 全体の流れ

Gemini の Canvas では、次のように進みます。**コードは1行も書きません。** 作りたいものを言葉で伝え、出てきたものを見て、直したいところを伝える。これを満足できるまで繰り返すだけです。

<div class="fitts-step">
  <h3><span class="fitts-step-num">1</span>Gemini にアクセスする</h3>
  <p><a href="https://gemini.google.com" target="_blank" rel="noopener">https://gemini.google.com</a> をブラウザで開きます。</p>
</div>

<div class="fitts-step">
  <h3><span class="fitts-step-num">2</span>Google アカウントでログインする</h3>
  <p>右上などから、自分の Google アカウントでログインします。</p>
</div>

<div class="fitts-step">
  <h3><span class="fitts-step-num">3</span>「ツール」から「Canvas」を選ぶ</h3>
  <p>入力欄の下にある <strong>「ツール」</strong> と書かれたボタンを押すと、メニューが開きます。その中から <strong>「Canvas」</strong> を選びます。</p>
  <img class="guide-image" src="{{ '/assets/vibe/canvas-menu.svg' | relative_url }}" alt="Geminiの入力欄の下にある「ツール」ボタンを押すと、Deep Research・動画を作成・画像を作成・Canvas・ガイド付き学習のメニューが開く。その中からCanvasを選ぶ。">
</div>

<div class="fitts-step">
  <h3><span class="fitts-step-num">4</span>作りたいものを文章で入力する</h3>
  <p><strong>「Gemini 3 に相談」</strong> と書かれた入力欄に、作りたいものを文章で入力して送信します。「何を・誰のために・どんな画面で・どう動くか」を書くと、イメージに近いものが出てきます。</p>
</div>

<div class="fitts-step">
  <h3><span class="fitts-step-num">5</span>コードの生成を待つ</h3>
  <p>そのまま待っていると、画面右側の <strong>「コード」欄</strong> に自動的にプログラムがどんどん書かれていきます。生成が完了すると、<strong>プレビュー画面</strong>（実際に動く画面）が表示されます。</p>
</div>

<div class="fitts-step">
  <h3><span class="fitts-step-num">6</span>プレビューを見て、直したいところを伝える</h3>
  <p>プレビューを見て、もっと直したいところがあれば、それをチャットに入力して送信します。<strong>これを満足できるまで繰り返します。</strong>「ボタンの色を青にして」「文字を大きく」「入力欄をもう1つ増やして」のように、具体的に伝えるほど、思い通りに近づきます。</p>
</div>

## 指示（プロンプト）を書くコツ

最初から完璧を目指さず、まずざっくり作ってもらい、少しずつ直していくのがコツです。

- **誰のための、何をするツールか** を最初に伝える（例：「目の不自由な人が〜するためのWebアプリ」）
- **画面に何があってほしいか** を具体的に（例：「大きなボタン」「読み上げボタン」「文字を入力する欄」）
- 一度にたくさん頼まず、**1回につき1〜2か所** を直してもらう
- うまくいかないときは、**どうなってほしいか** をもう一度言い換えて伝える

<div class="callout">
  <strong>失敗しても大丈夫。</strong><br>
  思ったものが出てこなくても、やり直したり言い直したりを何度でも繰り返せます。むしろ、その「直す→見る」の往復こそがバイブコーディングの中心です。
</div>
