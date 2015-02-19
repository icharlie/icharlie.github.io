---
layout: post
title: "Using Publish/Subscribe Pattern to manage related input fields"
description: ""
category: ""
tags: [Javascript, Design Pattern]
---

Recently, I need to implement a mortgage calculator. In the previous design, the calculator required a click event catch to update the result. But is it necessary?

The clicking is an extra step and on mobile browsers, it results in unnecessary scrolling and clicking. So, the convenient way would be to update results when the value of each input field has been changed.

Using jQuery, we can bind `change` event to each input field.
The original implementation triggered the related field's `change` event, when a field would update. In the `change` event handler, it would update it's value and call a re-calculate function.
However, this introduced an infinite loop. Here is why.

- when the home value changed, it would do calculation, then trigger percentage change.
- when the down payment changed, it would do a calculation, then trigger the percentage change event.
- when the percentage changed, it would do a calculation, then trigger the down payment change event.

Do you see that?

The **down payment** change and **percentage** change triggered each other's `change` event. They are two fields representing the **same data** in different ways, so if the home value changed, one of them would keep the same value and just change the other one. In order to avoid the infinite loop, I removed triggering percentage change code from the down payment field, and the triggering down payment change field from percentage field. Both of them just update each other's value directly.

At this point, I felt like it was time to find a way to make code clearer and simpler. Then, I found the **Publish/Subscribe patterns** from Addy Osmani's [Learning JavaScript Design Patterns](http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/).

<blockquote style="font-size: 16pt; font-style: italic; line-height: 1.3em;">
The Observer and Publish/Subscribe patterns encourage us to think hard about the relationships between different parts of our application.
</blockquote>


After re-thinking about the relationships between all the input fields, I used a state object to keep track of the input fields' changes and so when the state object changed, it would update the all input fields. Now, **the input fields only care updating the state object** instead of updating other input fields. The responsibility has been move to the subscriber of the state change.

So, steps have been simplified as following.

- When input field changed, doing calculation and publishing state change topic.
- When the state changes, all fields subscribed to the state will update.

Is this a simpler and clearer way to deal with related input fields?

My answer is **Yes!**.

[Example code](/examples/input-pub-sub/).

---
2015-02-19 edited by [Bau](https://twitter.com/baudotkim)

