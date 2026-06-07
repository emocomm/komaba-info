---
layout: default
title: "繰り返し処理（Whileループ）"
lead: "Pythonの while で、条件が真である間、同じ処理を繰り返します。"
---

<div class="callout">
  前回Scratchで作った「<a href="{{ '/scratch/while-loop/' | relative_url }}">テストの点数を繰り返し聞くプログラム</a>」と同じ動作を、今回はPythonの <code>while</code> で書き直します。
</div>

<img class="guide-image" src="{{ '/assets/python/while-loop-flow.svg' | relative_url }}" alt="繰り返し処理の流れ図（Python版）：input() で点数を受け取り、「おわり」なら break で終了、そうでなければ print('頑張ったね！') を実行して入力に戻る">

上の図のように、Pythonの繰り返し処理も「**ある条件を満たさないあいだ、同じ処理をぐるぐる回す**」構造です。Scratchの「ずっと」ブロックに当たるのが Pythonの `while` 文で、Scratchの「すべてを止める」に当たるのが `break` 文です。

Pythonで繰り返し処理をするには、以下のようなコードを使います。

```python
# Whileループの例
while True:
    # 条件が真の間繰り返し実行するコード
    
    if Whileループを終わる条件:
        break
        # Whileを終わらせるコード
```

<div class="callout">
  <strong>やってみよう</strong>
</div>

Pythonを使って、

1. テストの点数を入力してもらう
2. 「頑張ったね！」と表示する
3. その後、またテストの点数を入力してもらう
4. （以上繰り返し）
5. もしテストの点数を聞かれた時に、あなたが「おわり」と入力したら、繰り返しをやめて「プログラムを終了します」と表示する。

という処理をするプログラムを書いてみましょう。条件分岐も使います。

<details>
  <summary>正解はここをクリック</summary>

{% highlight python linenos %}
while True:
    score = input("テストの点数を入力してください（終了するには 'おわり' と入力）: ")
    if score == "おわり":
        print("プログラムを終了します。")
        break
    print("頑張ったね！")
{% endhighlight %}

</details>
