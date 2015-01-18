---
layout: post
title: "Read sequence csv files into one data frame in R"
description: ""
category: ""
tags: [R]
---


In the folder, there are 001, 002, ...., 999.csv files. How do we read all csv files and combine them to one data frame?

I find two different ways to load all files. One is using `list.files` to store all file paths into one variable. The other one is using `sprintf` to build file path each time.

Here are examples.

1. Using `list.files`
	
	```R
		data <- data.frame()
		files <- list.files(directory, full.names = TRUE)
		for(i in 1:999) {
			data <- rbind(data, read.csv(files[i]))
		}
	```
	
2. Using `sprintf`

	```R
		data <- data.frame()
		for(i in 1:999) {
			data <- rbind(data, read.csv(sprintf("%s/%03.0f.csv", directory, i))
		}
	```


