---
layout: post
title: "PHP interface"
description: ""
category: ""
tags: php, thought
---
In object-oriented programming, [interface](https://en.wikipedia.org/wiki/Protocol_\(object-oriented_programming\)) is a contract of a class. If a class wants to have this kind interface, it must implement the methods defined in the interface. In my opinion, the idea behind the interface is let users do less work when they need to switch different classes in many places. And interface helps(or forces?) you to think about abstraction layer of the classes.

Here are examples.

### Before: without interface 
{% gist icharlie/2fe23260c3f7f2d623a8 %}

### After: with interface
{% gist icharlie/4338df7c09c813c562a0 %}

In above two examples, if we introduce a C class in a new condition, without interface, we have to change file1, file2, …etc. 

With interface, we **only** need to change `Factory.php`.



