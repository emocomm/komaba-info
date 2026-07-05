---
layout: default
title: "バイブコーディングとは"
lead: "プログラミングをせず、作りたいシステムの内容を自然言語で指示することで、AIにプログラムを生成させる新しい開発アプローチです。"
---

## バイブコーディングとは

**バイブコーディング（Vibe Coding）** とは、

- プログラミング・コーディングをすることなく
- 作りたいシステムの内容を **自然言語（ふつうの言葉）** で指示することで
- **AIにプログラムを生成させる**

という、新しい開発アプローチのことです。「こういうものを作りたい」とAIに話しかけると、AIが実際に動くプログラムを書いてくれます。人間はコードそのものを書くのではなく、「何を作りたいか」を伝え、出てきたものを見て「ここを直して」とやりとりを繰り返します。

## これまでの「作り方」と何が違う？

これまで、動くシステムを作るには、複数の専門家が役割を分担し、順番に手渡していく必要がありました。

<img class="guide-image" src="{{ '/assets/vibe/vibe-coding-flow.svg' | relative_url }}" alt="今までの作り方は、企画者が仕様書を書き、デザイナーが画面のイメージを作り、エンジニアがコーディングをする3ステップ。バイブコーディングでは、企画者が仕様書を書いてAIと一緒に作る1ステップになる。">

**今までの作り方**

| 役割 | やること |
| --- | --- |
| 企画者 | 仕様書を書く |
| デザイナー | 画面のイメージを作る |
| エンジニア | コーディングをする |

企画者のアイデアが、デザイナー・エンジニアへと順番に渡っていくため、形になるまでに時間がかかり、途中で「思っていたものと違う」というズレも起きがちでした。

**バイブコーディングの作り方**

| 役割 | やること |
| --- | --- |
| 企画者 | 仕様書を書いて、**AIと一緒に作る** |

バイブコーディングでは、アイデアを持っている人が、AIと対話しながら **その場で動くもの** を作れます。デザインもコーディングもAIが引き受けてくれるので、思いついたことをすぐ試し、見て、直せるのが大きな違いです。

<div class="callout">
  <strong>「見て判断できる」のが強み。</strong><br>
  文章の企画書だけでは伝わりにくいことも、実際に触れる形にすれば一目で伝わります。だからこそ、企画の段階からプロトタイプを作る動きが広がっています。
</div>

## 言葉の生みの親：Andrej Karpathy

「バイブコーディング」という言葉は、AI研究者の **Andrej Karpathy**（OpenAIの共同創業メンバーの一人）が2025年2月に投稿したツイートから広まりました。

<blockquote class="tweet-card" cite="https://x.com/karpathy/status/1886192184808149383">
  <div class="tweet-card-head">
    <span class="tweet-card-avatar" aria-hidden="true"></span>
    <span>
      <span class="tweet-card-name">Andrej Karpathy</span><br>
      <span class="tweet-card-handle">@karpathy</span>
    </span>
  </div>
  <p class="tweet-card-body" lang="en">There's a new kind of coding I call “vibe coding”, where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. […] I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works.</p>
  <p class="tweet-card-foot">2025年2月2日 · <a href="https://x.com/karpathy/status/1886192184808149383" target="_blank" rel="noopener">Xで元のツイートを見る →</a></p>
</blockquote>

<div class="callout">
  <strong>ざっくり訳すと：</strong> 「コードの存在すら忘れて、ノリ（vibe）に身を任せる新しいコーディングだ。ただ見て、言って、動かして、貼り付けるだけで、だいたい動く」。AIが十分に賢くなったからこそ成り立つ、という指摘です。
</div>

## いま、いろいろな現場で使われ始めている

バイブコーディングは一部の技術者だけのものではなく、企業の企画づくりや、専門家ではない人の道具づくりにも広がっています。

<a class="article-card" href="https://www.itmedia.co.jp/aiplus/articles/2507/04/news070.html" target="_blank" rel="noopener">
  <span class="article-card-source">ITmedia AI＋ ／ 2025年7月4日</span>
  <span class="article-card-title">企画を通すなら「生成AIで作ったプロトタイプ」付きで——DeNAが一部部署で “書類だけ”はNGに</span>
  <span class="article-card-excerpt">新規プロダクトの企画時は、まず生成AIなどで開発したプロトタイプを持ってくること。「企画書を書くより実装の方が早く、現物を見て判断した方が良い判断ができる」という考えに基づく制度だといいます。</span>
  <span class="article-card-link">itmedia.co.jp の記事を読む →</span>
</a>

<a class="article-card" href="https://www.itmedia.co.jp/aiplus/articles/2512/15/news121.html" target="_blank" rel="noopener">
  <span class="article-card-source">ITmedia AI＋ ／ 2025年12月15日</span>
  <span class="article-card-title">藤井聡太名人「今年一番ハマったのはバイブコーディング」 生成AIでツール開発にトライ</span>
  <span class="article-card-excerpt">将棋棋士の藤井聡太竜王・名人が、2025年に一番ハマったものとして「バイブコーディング」を挙げました。プログラミングの知識はないものの、AIに指示し、テストを重ねて思い通りの動作を目指しているといいます。</span>
  <span class="article-card-link">itmedia.co.jp の記事を読む →</span>
</a>

<p class="image-note">※ 上のカードは記事の内容を要約したものです。詳しくは各リンク先の元記事をご覧ください。</p>

<div class="callout warn">
  専門家でなくても、アイデアさえあれば「動くもの」を自分の手で作れる時代になってきました。次のページでは、そのための道具（ツール）の選び方を見ていきます。
</div>
