---
title: "PHP type hinting"
description: ""
category: ""
tags: ["php"]
date: 2016-02-12T12:45:38-07:00
draft: true
---
In the previous article, I mentioned the interface is **a contract of a class**. The **type hinting** is a *similar* idea as interface. Type hinting is **a contract of a method**. The difference between interface and type-hinting is the interface is more like **an inner contract** of a system and the type hinting is **an outer contract** for users[^1].

Type hinting tells users if you want this method work correctly, please pass this type parameter and it would return the expected results. Users need to follow this **contract** otherwise it could return the unexpected results or throw a warning.

This thought comes from my work. I was assigned to implement a new class for a task, the idea of this task is combining the logic used in two separate places, and the new class has been passed the test. However, when I moved to utilize the new class in these two places, it caused a new bug, `PHP Warning:  Uncaught TypeError`. In a certain condition, one of these two places would pass **non array** parameter into the new class. At that time, I was off already, so my co-worker removed the type-hinting to resolve the issue temporary. However, this caught my eyes and let me think more.

If type-hinting wasn’t there, the current test couldn’t guarantee it cover the all possible *input* anymore and the test became a failed test, so it needed to be updated. But, this method was *only* design to deal with **array** data. Why do we want to check the type of the parameter and write more complex code to deal with different data types inside the method?

The right thing to me is finding where we could pass the wrong type of data. After looked into the bug, I found out if we pass the `null` into the php `array_merge` functions, the return would be `null` not `array` anymore.


In conclusion, the type-hinting is **a contract of a method** and test would depends on it as well. So, if the contract has been changed, the test must change as well. Before modifying **contract**, we should think more about the responsibility of the method and keep the method concise.


[^1]: User: here means where the method has been called.