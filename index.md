---
layout: default
title: "駒場情報演習教材"
lead: "駒場情報（担当: Hautasaari Ari先生）で使う演習用の教材です。取り組む課題を選んでください。"
---

<div class="card-grid home-grid">
  {% for section in site.data.home.sections %}
    {% if section.visible %}
      <a class="card home-card" href="{{ section.url | relative_url }}">
        <h3>{{ section.title }}</h3>
        <p>{{ section.description }}</p>
      </a>
    {% endif %}
  {% endfor %}
</div>
