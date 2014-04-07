---
layout: post
title: "The Importance of the Domain Konwledge"
description: ""
category: ""
tags: []
---

Last week, I got an emergency bug and our support team said the client is willing to pay extra money to fix it ASAP. So, after the regular stand meeting, I went to ask a senior about this issue. He told me he haven't seen this bug before and he would help me. At the same time, I aslo kept digging into the same bug. About 10 mins later, we both found where causes the bug. But we had different solutions. 

The bug was the data would be showed at a certain condition, and my solution was moving one line of code out of the if scope. But the senior's solution was keeping the code but changing the codition, and his solution is correct. The condition is gaven from the source and it should be followed, otherwise our company could get penalty.

After the senior hept me solve this bug, we had a further discussion about the code. Because the previous code was getting data from a multidimensional array, about 3 dimensions. It looks like as the following.

    if ($data['a']['b']['c] == 'y')
    {
      // do something.
    }

At my first glance, I thought the code is just checking clients have customized labels, then we use them. But the condition is from other part of the knowledge. So, my idea was assigning a meaningful variable to this element, then the code becomes legible and easier to understand.

    $isAllowedToDisplay = $data['a']['b']['c'];
    if ($isAllowedToDisplay == 'y' && $isAllowedToDisplay == 'r')
    {
      // do something.
    }


The lesson I learned is when trying to debug or change some code, I need to keep thinking of data. Otherwise, it will come out a "wrong" solution. To be a great developer/programmer, we should always be aware of the knowledge behind the data.
