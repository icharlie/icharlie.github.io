---
title: "Handle waiting multiple ajax requests"
description: "Wait all ajax requests done and then deal with all return results in a dynamic way"
date: 2013-11-23T15:42:00-07:00
category: ""
tags: [ajax, deferred, $.when]
---

  The general way to handle multiple ajax requests, you can use the following code.<br>

    $.when(ajaxCall1, ajaxCall2, ...).done(function(result1, result2, ..) {
        // do something
    }

  <small><i>ps:result1, result2, ... are all array objects and the really data exists in the first element of each result array</i></small>

  However, this way can work only when you already know how many ajax calls.<br>
  How do you handle multiple unknown ajax calls?

  Here, we need to use `apply` to invoke jQuery's `when` function and use `arguments` to get the all results


      $.when.apply($, [ajaxCall1, ajaxCall2, ...]).done(function(){
        var results = arguments; // result1, result2, ....
        // do something
      }


  The code here will work the same as the first code example.<br>
  But we can collect all ajax calls into an array then pass this array into `apply` function as the second parameter, so we don't care how many ajax calls anymore.


#### reference:
[jQuery Deferred - waiting for multiple AJAX requests to finish](http://stackoverflow.com/questions/6538470/jquery-deferred-waiting-for-multiple-ajax-requests-to-finish)
