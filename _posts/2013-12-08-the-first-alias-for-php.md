---
layout: post
title: "The first alias for PHP"
description: ""
category: ""
tags: [php]
---

Recently, I joined a web service company and the language we use is PHP. I am not so familiar with PHP, and I want to have the same experience as Ruby, using `irb` to play with some functions. The PHP does give developers having the same interactive environment. My first guess war using `php -i` to get into the interactive environment, but it was wrong, this shows tons of PHP information. After using man to figure out, the correct flag is `-a` or `--interactive`. Since, I already use `irb` all the time, so I make a similar command, `iphp`, to easily get into interactive environment.

		alias iphp='php -a'
