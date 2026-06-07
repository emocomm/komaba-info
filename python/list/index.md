---
layout: default
title: "データの集まり（リスト）"
lead: "Pythonのリストで、複数の値をまとめて扱います。"
---

<div class="callout">
  前回Scratchで作った「<a href="{{ '/scratch/list/' | relative_url }}">入力された科目をリストにためるプログラム</a>」と同じ動作を、今回はPythonのリストで書き直します。
</div>

<img class="guide-image" src="{{ '/assets/python/list-concept.svg' | relative_url }}" alt="リストの流れ図（Python版）：空のリストを作り、append('数学')、append('英語') と順に追加していき、'数学' in subjects で含まれているかを確認する4段階">

上の図のように、Pythonのリストも「**複数の値をまとめて入れられる、行が縦に並んだ箱**」のようなものです。Scratchの「リスト」と同じく、`append` で値を追加でき、`in` 演算子で含まれているかを確認できます。

Pythonでリストを作成・処理するには、以下のようなコードを使います。

```python
# リストの例
リスト名 = [値1, 値2, 値3]

# リストに値を追加
リスト名.append(値)

# リスト内の値をチェック
if 値 in リスト名:
    # 値がリストに含まれている場合に実行するコード
else:
    # 値がリストに含まれていない場合に実行するコード
```

<div class="callout">
  <strong>やってみよう</strong>
</div>

Pythonを使って、

1. テストの科目を入力してもらう
2. もし新たに入力された科目が、すでに入力されていたら「もうその科目は入力されているよ」と表示してから再入力を促す
3. もし新たに入力された科目が、まだ入力されていなかったら、その科目をリストに追加してから再入力を促す
4. （以上繰り返し）
5. もしテストの点数を聞かれた時に、あなたが「おわり」と入力したら、これまでに入力されたテストの科目を表示して、処理を終わらせる。

という処理をするプログラムを書いてみましょう。条件分岐と繰り返し処理も使います。

<details>
  <summary>正解はここをクリック</summary>

{% highlight python linenos %}
subjects = []

while True:
    subject = input("テストの科目を入力してください（終了するには 'おわり' と入力）: ")
    if subject == "おわり":
        print("これまでに入力されたテストの科目: ", subjects)
        break
    if subject in subjects:
        print("もうその科目は入力されているよ")
    else:
        subjects.append(subject)
        print("科目をリストに追加しました")
{% endhighlight %}

</details>
