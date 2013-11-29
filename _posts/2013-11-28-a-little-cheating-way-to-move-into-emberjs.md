---
layout: post
title: "A little cheating way to move your site into ember.js"
description: ""
category: ""
tags: [mber.js, view]
---

In the ember.js , the view system has lifecycle hooks. So, if you don't want or you don't know how to implement all actions directly, there is a hook you can use and you can still use all old functions you use to bind events to the elements, **didInsertElemnet** hook. As the ember.js guide mentions, _this hook is called immediately after the view has been inserted into DOM_. So, you can use jQuery selector to find the element then bind the event on it. But if you have hierarchy views, you should implement this on the target view layer. 

		App.ApplicationView = Ember.View.extend({
			didInsertElemnet: function() {
				// do something
			}
		});


ref: [The View Layer](http://emberjs.com/guides/understanding-ember/the-view-layer/)