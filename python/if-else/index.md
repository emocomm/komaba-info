---
layout: default
title: "条件分岐（If else文）"
lead: "Pythonの if / else で、条件によって処理を分けます。"
---

<div class="callout">
  前回Scratchで作った「<a href="{{ '/scratch/if-else/' | relative_url }}">点数によって合格／不合格を分けるプログラム</a>」と同じ動作を、今回はPythonの <code>if</code> / <code>else</code> で書き直します。
</div>

ここからは、前回Scratchで学んだアルゴリズムの基礎（条件分岐・繰り返し・リスト）を、Pythonで書き直していきます。Scratchのブロックの並べ方と、Pythonのコードの書き方の対応関係を意識しながら進めてください。

<img class="guide-image" src="{{ '/assets/python/if-else-flow.svg' | relative_url }}" alt="条件分岐の流れ図（Python版）：input() で点数を受け取り、点数が50未満なら print('不合格！')、そうでなければ print('合格！')">

上の図のように、Pythonの条件分岐も「**ある条件を満たすかどうかで、進む道が枝分かれする**」構造です。Scratchの「もし　なら　でなければ」ブロックに当たるのが、Pythonの `if` / `else` 文です。

Pythonで条件分岐をするためには、以下のようなコードを使います。

```python
# 条件分岐の例
if 条件:
    # 条件が真の場合に実行するコード
else:
    # 条件が偽の場合に実行するコード
```

<div class="callout">
  <strong>やってみよう</strong>
</div>

Pythonで以下のようなプログラムを実装してみます。

1. テストの点数を入力してもらう
2. 点数が50点未満なら「不合格！」と表示する
3. 点数が50点以上なら「合格！」と表示する

上記の例を参考にプログラムを書いてみましょう。

<details>
  <summary>正解はここをクリック</summary>

{% highlight python linenos %}
# テストの点数を入力する
score = int(input("テストの点数を入力してください: "))

# 条件分岐
if score < 50:
    print("不合格！")
else:
    print("合格！")
{% endhighlight %}

</details>
