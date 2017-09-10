---
title:  "Jinj2 with Handlebars"
date:   2013-10-09T18:36:24-07:00
categories: tempalte javascript
draft: false
---

Jinja2 and Handlebar use the same delimiters for **expressions**. <del>In order to avoid parsing errors, you have to do as follow.</del>

{% gist icharlie/360dacf4b6b6bcff7d9e %}


ps: jekyll uses the same....

Update: 2013-11-11<br/>
You can put the code into {{ "{% raw " }}%} and {{ "{% endraw " }}%} block; then jinja2 will escape this block.
