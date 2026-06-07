---
layout: default
title: "練習 Pythonで遊んでみよう"
lead: "Pythonの基本的な入出力を、print と input で確かめます。"
---

<div class="callout">
  前回Scratchで作った「<a href="{{ '/scratch/practice/' | relative_url }}">ネコを動かす・喋らせる・話しかけるプログラム</a>」と同じ動作を、今回はPythonの <code>print</code> と <code>input</code> で書き直します。
</div>

まずは、Pythonの基本的な入出力について学びましょう。具体的なステップは以下の通りです。

まずは、出力の練習をします。

Pythonでは、`print()`という関数を使うことで、文字列や数値を表示することができます。これは、Scratchでは「こんにちは！と2秒言う」というブロックに相当します。

例えば、`print("こんにちは")`というコードをGoogle Colabの新しいセルに書いて、「Shift」キーと「Enter」キーを同時に押してください。そうすると、`"こんにちは"`と表示されるはずです。やってみましょう。

<img class="guide-image" src="{{ '/assets/python/print-hello.png' | relative_url }}" alt="print関数の実行例">

「こんにちは」と書かれている部分は、自分で好きなように書き換えることができます。他の文字列も入れて試してみてください。

次に、入力の練習をします。

Pythonでは、`input()`という関数を使うことで、ユーザーからの入力を受け取ることができます。これは、Scratchでは「あなたの名前はなんですか？と聞いて待つ」というブロックに相当します。

例えば、`name = input("あなたの名前はなんですか？")`というコードを新しいセルに書き、「Shift」キーと「Enter」キーを押すと、画面に「あなたの名前はなんですか？」と表示されます。ここで名前を入力して「Enter」キーを押すと、その名前が`name`という変数に保存されます。

<img class="guide-image" src="{{ '/assets/python/input-name.png' | relative_url }}" alt="input関数の実行例">

入力もできるようになったところで、これまでの内容を組み合わせて、入力した内容に応じて出力が変わるプログラムを書いてみます。

<div class="callout">
  <strong>やってみよう</strong>
</div>

練習として、

- あなたの名前はなんですか？と聞く
- 入力したら、「こんにちは（ここにあなたが入力した名前が入る）さん」と表示される。

という動作をするプログラムを書いてください。

なお、`print()`関数の中で、`+`で複数の文字列や変数を繋いで入力すると、複数の文字列や変数をくっつけて表示することができます。これまでのブロックを組み合わせて、正しく動作するプログラムを書いてみてください。

<details>
  <summary>正解はここをクリック</summary>
  <img class="guide-image" src="{{ '/assets/python/practice-answer.png' | relative_url }}" alt="練習の正解">
</details>
