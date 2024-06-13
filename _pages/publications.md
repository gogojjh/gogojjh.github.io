---
layout: page
permalink: /publications/
title: Publications
description: 
years: [2024, 2023, 2022, 2021, 2020, 2019]
nav: true
nav_order: 2
---
<!-- _pages/publications.md -->
<div class="publications">

*: Equal Contribution; +: Corresponding Author.

{%- for y in page.years %}
  <h1 class="year">{{y}}</h1>
  {% bibliography -f {{ site.scholar.bibliography }} -q @*[year={{y}}]* %}
{% endfor %}

</div>
