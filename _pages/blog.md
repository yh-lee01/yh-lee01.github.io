---
layout: default
permalink: /blog/
title: blog
nav: true
nav_order: 1
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 5
  sort_field: date
  sort_reverse: true
  trail:
    before: 1
    after: 3
---

<div class="post">
  {% include page_header.liquid title=site.blog_name description=site.blog_description count="posts" %}

  {% if page.pagination.enabled %}
    {% assign postlist = paginator.posts %}
  {% else %}
    {% assign postlist = site.posts %}
  {% endif %}

  <ul class="post-list">
    {% for post in postlist %}
      {% if post.external_source == blank %}
        {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
      {% else %}
        {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
      {% endif %}

      {% if post.redirect == blank %}
        {% assign post_url = post.url | relative_url %}
      {% elsif post.redirect contains '://' %}
        {% assign post_url = post.redirect %}
      {% else %}
        {% assign post_url = post.redirect | relative_url %}
      {% endif %}

      <li class="post-card">
        <div class="pc-head">
          {% if post.categories.size > 0 %}
            <a class="cat" href="{{ post.categories.first | slugify | prepend: '/blog/category/' | relative_url }}">{{ post.categories.first | replace: '-', ' ' | capitalize }}</a>
          {% endif %}
          <span class="pc-meta">
            {{- post.date | date: '%b %-d, %Y' }} &middot; {{ read_time }} min read
            {%- if post.external_source %} &middot; {{ post.external_source }}{% endif -%}
          </span>
        </div>
        <h2 class="post-card-title"><a href="{{ post_url }}">{{ post.title }}</a></h2>
        {% if post.description %}
          <p class="post-card-description">{{ post.description }}</p>
        {% endif %}
        <div class="pc-foot">
          <div class="post-tags">
            {% for tag in post.tags limit: 3 %}
              <a class="tag" href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}">#{{ tag }}</a>
            {% endfor %}
            {% if post.tags.size > 3 %}<span class="pc-more">+{{ post.tags.size | minus: 3 }}</span>{% endif %}
          </div>
          <a class="pc-read" href="{{ post_url }}" aria-label="Read {{ post.title | escape }}">Read <span aria-hidden="true">&rarr;</span></a>
        </div>
      </li>
    {% endfor %}
  </ul>

  {% if page.pagination.enabled %}
    {% include pagination.liquid %}
  {% endif %}
</div>
