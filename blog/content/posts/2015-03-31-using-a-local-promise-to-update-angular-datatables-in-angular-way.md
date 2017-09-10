---
layout: post
title: "Using a local promise to update angular-datatables in angular way"
---

The [datatables](https://www.datatables.net/) is the one of most important jQuery libraries in our system. Recently, my colleagues are planing to start using [angularjs](https://angularjs.org/). So, we need integrate both of them into our system. Lucky, there's already one open source project [angular-datatables](http://l-lin.github.io/angular-datatables/) doing a good job. Especially, we don't have enough experience on angularjs.

However, the way angular-datatables updates table is not "the angular way" according to what my co-workers say. They want to update front-end table and backend database separately, but angular-datatables is still going to update backend and then reload all on front-end table. It is kind wasting resource.

Fortunately, the angular-datatables provides a promise way to load data and we can take  anadvantage on it.  In order to make update the front-end datatables immediately, we need to create a function to return a promise. So, when we do [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete) actions and call `reloadData`, it will just reload from the front-end data rather making another ajax call to get the all data from server. It looks like simple and elegant. 

Now, we need to think further. We update front-end without checking the CRUD actions are success or failed, so we might cause the disconnection between client and server. In this case, we need to write more custom code to solve issues introduced by not using the datatables' mechanism to update front-end. I will talk about using `$http` to design a rollback to deal with failing issue.

Here is an example adding a new user on the front-end.
{% gist icharlie/8084838dace2d43a47fb %}
