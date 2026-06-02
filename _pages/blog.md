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

{% assign blog_name_size = site.blog_name | size %}
{% assign blog_description_size = site.blog_description | size %}

{% if blog_name_size > 0 or blog_description_size > 0 %}

  <div class="blog-head">
    <h1 class="post-title">{{ site.blog_name }}</h1>
    <span class="blog-count">{{ site.posts | size }} posts</span>
  </div>
  <p class="post-description">{{ site.blog_description }}</p>
  <hr>
  {% endif %}



{% assign featured_posts = site.posts | where: "featured", "true" %}
{% if featured_posts.size > 0 %}
<br>

<div class="container featured-posts">
{% assign is_even = featured_posts.size | modulo: 2 %}
<div class="row row-cols-{% if featured_posts.size <= 2 or is_even == 0 %}2{% else %}3{% endif %}">
{% for post in featured_posts %}
<div class="col mb-4">
<a href="{{ post.url | relative_url }}">
<div class="card hoverable">
<div class="row g-0">
<div class="col-md-12">
<div class="card-body">
<div class="float-right">
<i class="fa-solid fa-thumbtack fa-xs"></i>
</div>
<h3 class="card-title text-lowercase">{{ post.title }}</h3>
<p class="card-text">{{ post.description }}</p>

                    {% if post.external_source == blank %}
                      {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
                    {% else %}
                      {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
                    {% endif %}
                    {% assign year = post.date | date: "%Y" %}

                    <p class="post-meta">
                      {{ read_time }} min read &nbsp; &middot; &nbsp;
                      <a href="{{ year | prepend: '/blog/' | relative_url }}">
                        <i class="fa-solid fa-calendar fa-sm"></i> {{ year }} </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      {% endfor %}
      </div>
    </div>
    <hr>

{% endif %}

  <ul class="post-list">

    {% if page.pagination.enabled %}
      {% assign postlist = paginator.posts %}
    {% else %}
      {% assign postlist = site.posts %}
    {% endif %}

    {% for post in postlist %}

    {% if post.external_source == blank %}
      {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
    {% else %}
      {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
    {% endif %}
    {% assign year = post.date | date: "%Y" %}
    {% assign tags = post.tags | join: "" %}
    {% assign categories = post.categories | join: "" %}

    {% if post.redirect == blank %}
      {% assign post_url = post.url | relative_url %}
    {% elsif post.redirect contains '://' %}
      {% assign post_url = post.redirect %}
    {% else %}
      {% assign post_url = post.redirect | relative_url %}
    {% endif %}

    <li class="post-card">
      <div class="pc-head">
        {% if categories != "" %}<span class="cat">{{ post.categories.first }}</span>{% endif %}
        <span class="pc-meta">{{ read_time }} min read &middot; {{ post.date | date: "%b %d, %Y" }}{% if post.external_source %} &middot; {{ post.external_source }}{% endif %}</span>
      </div>
      <h3 class="post-card-title"><a class="post-title" href="{{ post_url }}">{{ post.title }}</a></h3>
      <div class="pc-foot">
        <div class="post-tags">
          {% for tag in post.tags limit: 3 %}<a class="tag" href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}">{{ tag }}</a>{% endfor %}
          {% if post.tags.size > 3 %}<span class="pc-more">+{{ post.tags.size | minus: 3 }}</span>{% endif %}
        </div>
        <a class="pc-read" href="{{ post_url }}">Read <span class="arw">&rarr;</span></a>
      </div>
    </li>

    {% endfor %}

  </ul>

{% if page.pagination.enabled %}
{% include pagination.liquid %}
{% endif %}

</div>
