---
layout: post
title: "Using Publish/Subscribe Pattern to manage related input fields"
description: ""
category: ""
tags: [Javascript, Design Pattern]
---

Recently, I need to implement a mortgage calculator and in the previous design, the calculator will require a clicking to update result. But is it necessary? 

The clicking is an extra step and this step takes a long time on mobile browsers, scrolling and clicking. So, the convenient way is updating result when the value of each input field has been changed. 

In jQuery, we can bind `change` event to each input field. 
The original implementation is when one field update, it would trigger the related field's `change` event. In the `change` event handler, it would update itself value and call re-calculate function.
However, I accidentally introduce an infinite loop. Here is how  it come.
- when home's value change, doing calculation and triggering percentage's change event.
- when down payment change, doing calculation and triggering percentage's change event.
- when percentage change, doing calculation and triggering down payment's change event.

Do you see that?


**Down payment and Down payment percentage** trigger each other's `change` event. They are two fields representing the **same data** in different ways, so if home value changed, there should be one of them keeping the same value and just change the other one. In order to avoid the infinite loop, I removed triggering percentage change code from down payment field, and triggering down payment change field from percentage field. Both of them just update each other's value directly.

At this point, I feel like it is time to find a way to make code clear and simple. Then, I find the **Publish/Subscribe patterns** from Addy Osmani's [Learning JavaScript Design Patterns](http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/).

<blockquote style="font-size: 16pt; font-style: italic; line-height: 1.3em;">
The Observer and Publish/Subscribe patterns encourage us to think hard about the relationships between different parts of our application.
</blockquote>


After re-thinking about the relationships of all these input fields, I use a state object to keep tracking the input fields' changes and then when this state object has been changed, it will update the all input fields. **All input fields only care how it will going to update the state object** and they don't need to update other input fields anymore. The responsibility has been move to the subscriber of the state change.

So, steps have been simplified as following.

- When input field changed, doing calculation and publishing state change topic.
- the subscriber of the state change updates the all correspondent input fields.

Is this a more simple and clear way to deal with related input fields?

My answer is **Yes!**.

[Example code](/examples/input-pub-sub/).
