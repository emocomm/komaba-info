# komaba-info

駒場情報演習用の教材Webサイトです。GitHub Pagesで静的サイトとして公開する前提のJekyllサイトです。

## 現在の構成

- `index.md`: ルートの案内ページ。現在は `20260511/` に自動移動します。
- `20260511/`: 2026年5月11日用の教材ページ一式。平均情報量、文字種カウント、スプレッドシート演習を扱います。
- `20260525/docs/curriculum.md`: 2026年5月25日用教材の授業案・仕様書。公開鍵暗号、秘密鍵、ディジタル署名を扱う予定です。
- `_data/navigation.yml`: 日付ごとのページ順、メニュー、ツール一覧。
- `_layouts/default.html`: 全日付で共通利用するJekyllレイアウト。
- `assets/`: 共通CSSとJavaScript。
- `_config.yml`: Jekyll設定。`docs/` 配下、`README.md`、Bundler関連ファイルなどは公開サイトから除外します。
- `Gemfile`: ローカルでJekyllビルドを確認するための依存関係。

## 20260511 教材

教材本体は `20260511/` 配下にあります。

- `20260511/index.md`: 入口ページ
- `20260511/entropy-review/` から `20260511/extension/`: レクチャー・演習手順ページ
- `20260511/count/`: 文字種カウントツール
- `20260511/tsv/`: TSV変換ツール
- `20260511/teacher/`: 教師用ページ
- `20260511/docs/`: 元資料。公開サイトには出しません。

公開後の想定URL:

```text
https://<account>.github.io/komaba-info/20260511/
```

## 20260525 教材

`20260525/` は、公開鍵暗号とディジタル署名の演習教材として準備中です。現時点では実装ページはまだなく、授業案とWebページ仕様を `20260525/docs/curriculum.md` にまとめています。

予定しているページ構成:

- レクチャー・手順ページ
  - `/20260525/`
  - `/20260525/overview/`
  - `/20260525/review/`
  - `/20260525/key-roles/`
  - `/20260525/exam-practice/`
  - `/20260525/encrypt/`
  - `/20260525/sign/`
  - `/20260525/submission/`
- ツールページ
  - `/20260525/keygen/`
  - `/20260525/encrypt-tool/`
  - `/20260525/sign-tool/`
  - `/20260525/teacher/`

`20260525/docs/` は仕様書置き場であり、`_config.yml` の `exclude` に入れているため公開サイトには出ません。

## 編集方針

既存教材の本文を直す場合は、基本的に対象日付配下のMarkdownページを編集します。

ページの順番、右上メニューの表示、前後ページの移動先、ツール一覧を直す場合は `_data/navigation.yml` を編集します。各ページのファイル名は内容が分かる英語名にして、並び順はこのデータファイルで管理します。

別の日付の教材を追加する場合は、`YYYYMMDD/` 配下へMarkdownページを作り、`_data/navigation.yml` の `sections` に同じ日付キーを追加します。共通レイアウトが、その日付のページ一覧と `(現在/全体)` 表示を自動で作ります。

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
http://127.0.0.1:4000/komaba-info/20260511/
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
