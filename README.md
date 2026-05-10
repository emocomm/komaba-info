# komaba-info

駒場情報演習用の教材Webサイトです。GitHub Pagesで静的サイトとして公開する前提で作っています。

## 構成

- `index.md`: ルートの案内ページ。現在は `20260511/` に移動します。
- `20260511/`: 2026年5月11日用の教材本文。
- `_data/navigation.yml`: 日付ごとのページ順、メニュー、ツール一覧。
- `_layouts/default.html`: 全日付で共通利用するJekyllレイアウト。
- `assets/`: 全日付で共通利用するCSS、JavaScript、画像。
- `Gemfile`: ローカルでJekyllビルドを確認するための依存関係。

## 20260511 教材

教材本体は `20260511/` 配下にあります。

- `20260511/index.md`: 入口ページ
- `20260511/entropy-review/` など: 演習の各ステップ
- `20260511/count/`: 文字種カウントツール
- `20260511/tsv/`: TSV変換ツール
- `20260511/teacher/`: 教師用ページ
- `20260511/docs/`: 元資料

公開後の想定URLは次の形です。

```text
https://<account>.github.io/komaba-info/20260511/
```

## 編集方法

本文を直す場合は、基本的に `20260511/**/*.md` を編集します。

ページの順番、右上メニューの表示、前後ページの移動先、ツール一覧を直す場合は `_data/navigation.yml` を編集します。各ページのファイル名は内容が分かる英語名にして、並び順はこのデータファイルで管理します。

別の日付の教材を追加する場合は、`20260511/` と同じように `YYYYMMDD/` 配下へMarkdownページを作り、`_data/navigation.yml` の `sections` に同じ日付キーを追加します。共通レイアウトが、その日付のページ一覧と `(現在/全体)` 表示を自動で作ります。

共通の見た目を直す場合は `assets/styles.css`、コピー機能や文字種カウントツールを直す場合は `assets/site.js` を編集します。

画像を差し替える場合は、`assets/images/` に同じファイル名で保存すると、Markdown側を直さず差し替えられます。

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
