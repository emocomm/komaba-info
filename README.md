# komaba-info

駒場情報演習用の教材Webサイトです。GitHub Pagesで静的サイトとして公開する前提のJekyllサイトです。

## 現在の構成

- `index.md`: ルートの案内ページ。現在は `entropy/` に自動移動します。
- `entropy/`: 平均情報量の演習教材一式（旧 `20260511/`）。平均情報量、文字種カウント、スプレッドシート演習を扱います。
- `crypto/`: 公開鍵暗号とディジタル署名の演習教材一式（旧 `20260525/`）。鍵生成、暗号化、署名の演習を扱います。
- `scratch/`: Scratchによるプログラミング入門の教材一式（旧 `20260608/`）。if/else、while、リストを扱います。
- `20260511/`, `20260525/`, `20260608/`: 旧URL用のリダイレクトのみ。中身はそれぞれ新URLへの meta refresh スタブだけです。
- `_data/navigation.yml`: セクションごとのページ順、メニュー、ツール一覧。
- `_layouts/default.html`: 全セクションで共通利用するJekyllレイアウト。
- `assets/`: 共通CSSとJavaScript、各セクションの画像。
- `_config.yml`: Jekyll設定。`docs/` 配下、`README.md`、Bundler関連ファイルなどは公開サイトから除外します。
- `Gemfile`: ローカルでJekyllビルドを確認するための依存関係。

## entropy 教材（旧 20260511）

教材本体は `entropy/` 配下にあります。

- `entropy/index.md`: 入口ページ
- `entropy/entropy-review/` から `entropy/extension/`: レクチャー・演習手順ページ
- `entropy/count/`: 文字種カウントツール
- `entropy/tsv/`: TSV変換ツール
- `entropy/teacher/`: 教師用ページ
- `entropy/docs/`: 元資料。公開サイトには出しません。

公開後の想定URL:

```text
https://<account>.github.io/komaba-info/entropy/
```

旧URL `https://<account>.github.io/komaba-info/20260511/` にアクセスした場合、`20260511/` 配下のスタブが自動で `entropy/` 配下の同名ページへリダイレクトします。

## crypto 教材（旧 20260525）

教材本体は `crypto/` 配下にあります。

- レクチャー・手順ページ
  - `/crypto/`
  - `/crypto/overview/`
  - `/crypto/review/`
  - `/crypto/key-roles/`
  - `/crypto/exam-practice/`
  - `/crypto/encrypt/`
  - `/crypto/sign/`
  - `/crypto/submission/`
- ツールページ
  - `/crypto/keygen/`
  - `/crypto/encrypt-tool/`
  - `/crypto/sign-tool/`
  - `/crypto/teacher/`

`crypto/docs/` は仕様書置き場であり、`_config.yml` の `exclude` に入れているため公開サイトには出ません。旧URL `/20260525/...` は `crypto/` 配下の同名ページへリダイレクトします。

## scratch 教材（旧 20260608）

教材本体は `scratch/` 配下にあります。

- `scratch/index.md`: 入口ページ
- `scratch/about/`, `scratch/start/`, `scratch/practice/`: Scratch入門
- `scratch/if-else/`, `scratch/while-loop/`, `scratch/list/`: プログラミング入門
- `scratch/assignment/`: 課題ページ

画像は `assets/scratch/` 配下にあります。旧URL `/20260608/...` は `scratch/` 配下へリダイレクトします（サブパス名は新旧で異なるためトップにまとめてリダイレクト）。

## 編集方針

既存教材の本文を直す場合は、基本的に対象セクション配下のMarkdownページを編集します。

ページの順番、右上メニューの表示、前後ページの移動先、ツール一覧を直す場合は `_data/navigation.yml` を編集します。各ページのファイル名は内容が分かる英語名にして、並び順はこのデータファイルで管理します。

別の回の教材を追加する場合は、内容に合わせた英語名のフォルダを作り、`_data/navigation.yml` の `sections` に同じキーを追加します。共通レイアウトが、そのセクションのページ一覧と `(現在/全体)` 表示を自動で作ります。

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
http://127.0.0.1:4000/komaba-info/entropy/
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
