---
layout: post
title: "using json to generate html is not a good idea"
description: ""
category: ""
tags: [thought]
---

First, it can't match the html semantic
Second, who is user? Developers?


    <div id="main-info" class="panel">
      Hello, <span class="focus">World</span>
    </div>



    {
      div: {
        id: 'main-info'
        class: 'panel',
        content: [
          {
            content: 'Hello'
          },
          {
            span: {
              class: 'focus',
              content: 'World'
            }
          }
        ]
      }
    }
