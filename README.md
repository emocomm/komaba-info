# komaba-info

駒場情報演習用の教材Webサイトです。GitHub Pagesで静的サイトとして公開する前提のJekyllサイトです。

## 現在の構成

- `index.md`: トップページ。`_data/home.yml` に登録された教材の一覧をカードで表示します。
- `vibe/`: バイブコーディングでプロトタイプを作る教材一式。Gemini Canvasを使い、言葉で伝えてAIにプロトタイプを作ってもらう演習です。
- `fitts/`: フィッツの法則とインターフェース設計の教材一式。実験ツール（`fitts/experiment-tool/`）で自分のデータを取り、回帰分析してレポートにまとめます。
- `entropy/`: チャット会話の平均情報量分析の教材一式。Google Sheetsで文字の頻度から平均情報量を計算します。文字種カウント（`entropy/count/`）とTSV変換（`entropy/tsv/`）のツールを含みます。
- `crypto/`: 公開鍵暗号とディジタル署名の教材一式。鍵ペア作成・暗号化・署名の各ツールページを含みます。
- `scratch/`: Scratchによるプログラミング入門の教材一式。条件分岐・繰り返し・リストを扱います。
- `python/`: Pythonによるプログラミング入門の教材一式。Google Colab上でScratch編と同じ概念（条件分岐・繰り返し・リスト）を学びます。
- `404.html`: 旧URL（`/20260511/`, `/20260525/`, `/20260608/`）から新URL（`/entropy/`, `/crypto/`, `/scratch/`）へJavaScriptでリダイレクトします。
- `_data/home.yml`: トップページに表示する教材一覧。表示順と `visible` フラグ（`false` で一覧から非表示）を管理します。
- `_data/navigation.yml`: セクションごとのページ順、右上メニュー、ツール一覧。
- `_layouts/default.html`: 全ページ共通のJekyllレイアウト。ヘッダーのメニュー、前へ/次へのフッター、コピーライト表記を含みます。
- `assets/`: 共通CSS（`styles.css`）とJavaScript（`site.js`）、各セクションの画像。
- `_config.yml`: Jekyll設定。`entropy/docs/`、`crypto/docs/`、`README.md`、Bundler関連ファイルなどは公開サイトから除外します。
- `Gemfile`: ローカルでJekyllビルドを確認するための依存関係。

`entropy/docs/` と `crypto/docs/` は元資料・仕様書置き場であり、公開サイトには出ません。

## 公開URL

公開後の想定URLは次のとおりです。

```text
https://<account>.github.io/komaba-info/
```

各教材はトップページのカードから、または `/vibe/`, `/fitts/`, `/entropy/`, `/crypto/`, `/scratch/`, `/python/` で直接アクセスします。

## 編集方針

既存教材の本文を直す場合は、基本的に対象セクション配下のMarkdownページを編集します。

トップページの教材一覧（表示順・表示/非表示・説明文）を直す場合は `_data/home.yml` を編集します。

ページの順番、右上メニューの表示、前後ページの移動先、ツール一覧を直す場合は `_data/navigation.yml` を編集します。各ページのファイル名は内容が分かる英語名にして、並び順はこのデータファイルで管理します。

別の回の教材を追加する場合は、内容に合わせた英語名のフォルダを作り、`_data/navigation.yml` の `sections` に同じキーを追加し、`_data/home.yml` の `sections` にトップページ用のカードを追加します。共通レイアウトが、そのセクションのページ一覧と `(現在/全体)` 表示を自動で作ります。

共通の見た目を直す場合は `assets/styles.css`、コピー機能やツールの共通処理を直す場合は `assets/site.js` を編集します。

## ローカル確認

RubyとBundlerが使える環境で、次のコマンドを実行します。

```sh
bundle config set path vendor/bundle
bundle install
bundle exec jekyll serve
```

ローカルでは次のURLで確認します。

```text
http://127.0.0.1:4000/komaba-info/
```

ビルドだけ確認する場合は次のコマンドを使います。

```sh
bundle exec jekyll build
```

macOS付属のRuby 2.6を使う場合、`ffi` の最新版がRuby 3以上を要求して失敗することがあります。このリポジトリでは `Gemfile` で `ffi 1.17.2` に固定しています。依存関係の解決で詰まった場合は、次を実行してください。

```sh
bundle update ffi
bundle install
```

## GitHub Pages

GitHub Pagesの公開元はリポジトリルートを想定しています。`_config.yml` の `baseurl` は、リポジトリ名に合わせて次のように設定しています。

```yml
baseurl: "/komaba-info"
```

カスタムドメイン直下で公開する場合だけ、`baseurl: ""` に変更してください。
