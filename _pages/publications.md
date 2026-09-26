---
layout: page
permalink: /publications/
title: publications
description: Publications in reverse chronological order.
count: papers
nav: true
nav_order: 2
---

{% comment %} The filter and year headings help once the list grows; with a few papers they only add weight. {% endcomment %}
{% capture paper_count %}{% bibliography_count %}{% endcapture %}
{% assign paper_count = paper_count | strip | plus: 0 %}

{% if paper_count >= 5 %}
{% include bib_search.liquid %}
{% endif %}

<div class="publications">

{% if paper_count >= 5 %}
{% bibliography %}
{% else %}
{% bibliography --group_by none %}
{% endif %}

</div>
