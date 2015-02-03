---
layout: post
title: "Use PubSub Pattern implement mortgage calculator"
description: ""
category: ""
tags: [Javascript, Design Pattern]
---
## Using PubSub Pattern to synchronize related fields.

Recently, I need to implement a mortgage calculator and in the previous design, the calculator will require a clicking to update result. But is it necessary? 

The clicking is an extra step and this step takes a long time on mobile browsers, scrolling and clicking. So, the convenient way is updating result when the value of each input field has been changed. 

In jQuery, we can bind `change` event to each input field. 
The original implementation is when one field updated, it would trigger the related field's `change` event. In the `change` event handler, it updates itself and call re-calculate function.
However, I accidentally introduced an infinite cycle. Here is how come.
- when home's value change, it will trigger percentage's change event.
- when down payment change, it will trigger percentage's change event.
- when percentage change, it will trigger down payment's change event.

Do you see that?


**Down payment and Down payment percentage** trigger each other's `change` event, Down payment and Down payment percentage. They are two fields represent the **same value** in the different way.
