---
layout: post
title: "How to use r manipulate date string"
description: ""
category: ""
tags: R, data
---

### Convert string to Date object
To convert string to Date object, we can use `as.Date` function.<br>
The default format is **2015-01-01`%Y-%m-%d`** or **2015/01/01`%Y/%m/%d`**.

```
    as.Data("dateString")
```

### filter data by year and moth 
```
subset(data, format.Date(dateColumn, "%m") == "12" & format.Date(dateColumn, "%y") == "13")`
```
The data in the date column can be string or Date object. If using string, it should be `%Y-%m-%d`/`%Y/%m/%d` format.
