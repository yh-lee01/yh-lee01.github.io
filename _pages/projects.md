---
layout: page
title: projects
permalink: /projects/
description: Research projects and coursework.
count: projects
nav: true
nav_order: 3
---

{% comment %} Projects are ordered by the `importance` field in each file under _projects/. {% endcomment %}
{% assign sorted_projects = site.projects | sort: "importance" %}

<div class="projects">
  <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
</div>
