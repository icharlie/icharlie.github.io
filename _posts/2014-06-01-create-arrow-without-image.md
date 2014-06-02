---
layout: post
title: "Create Arrow Without Image"
description: ""
category: ""
tags: [css3]
---
We need to two `div` continers to accomplish this.

One is outside `div` container, and the other is inside `div` container, which is the arrow.

In the inside `div`, we need to use `transform`, rotate and scall, to make it look like arrow.

We also need to centralize inside `div`. Because the posistion is `absolute`, we need to use `left:50%` and `margin-left:-12px`. The negative *12px* is the half of the inside `div`'s width.

If you want the border effect, you need to put an element,`span`, into the inside `div`. Move the `transform` into `span` and create border on `span` not inside `div`. In the inside `div`, we need to use `clip: rect(12px 24px 24px 0);` cut off the top border.

Reference: [Medium](http://medium.com)

HTML:

      <div class="tool-tip-button">
        <a href="#">Map</a>
        <div class="clip"><span class="arrow"></span></div>
      </div>


CSS:

      .tool-tip-button {
        position: absolute;
        top: 100px;
        left: 50%;
        top: 100px;
        color: #fff;
        font-size: 16pt;
        background-color: #505050;
        width: 60px;
        margin-left: -30px;
        border: 2px solid #CFCFCF;
      }

      .tool-tip-button a {
        display: block;
        color: #fff;
        text-decoration: none;
        padding: 10px;
      }

      .clip {
        position: absolute;
        width: 24px;
        height: 24px;
        bottom: -12px;
        left: 50%;
        margin-left: -12px;
        clip: rect(12px 24px 24px 0);
      }

      .arrow {
        display: block;
        width: 20px;
        height: 20px;
        -webkit-transform: rotate(45deg) scale(.5);
        border: 2px solid #CFCFCF;
        background-color: #505050;
      }

[Demo](http://codepen.io/icharlie/pen/FoIBj)