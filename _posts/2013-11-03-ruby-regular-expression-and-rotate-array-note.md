---
layout: post
title: "ruby regular expression and rotate 2d array note"
description: ""
category: ""
tags: [ruby, regex]
---
{% include JB/setup %}

### Regular Expression
  `char =~ /[0-9]/` or `char =~ /\d/` or `char =~ /[[:digit]]/`.

  These three expressions are the same to check the character is digit or not.
  
  You can find more information from [Ruby regular expressions](http://doc.infosnel.nl/ruby_regular_expressions.html)


### Rotate 2d Array
  `array.map { |row| row[0]}` will return an array includes all first elements of each row.

  So, we can use a loop to wrap this then to accomplish rotating a 2d array

    result = []
    0.upto(array.size - 1) do |i|
      result << array.map { |row| row|i| }
    end
