---
layout: post
title: "angular datatables in angular way - an Add/Delete User example"
description: "an angular and angular datatables example"
category: "tech"
tags: [angular,js]
---

In previous [post](/2015/03/31/using-a-local-promise-to-update-angular-datatables-in-angular-way.html),
I designed a local promise function to make angular-datatables doesn't need to reload entire page to get fresh data.

Now, we start doing server side integration. 

First, we know every data should have an unique key to identify and *id* is the key in this example.

So, *id* is the data we need to wait for server's response. In my opinion, we can deal with this situation in two different ways.

1. Update front end table, send the request to server and use server's response to update the new user's id.
2. Send the request to server, use server's response to update front end table.

The first approach is we can view up-to-date data immediately. However, this could have following concerns.

* There is no unique key in the front-end data and we can't guarantee server's responses will follow the requests' sequence.
* If failed on the server, front-end needs to rollback or keep sending the same request to server.
* Feedback for user. We can not show the data at beginning and remove it in the rollback without giving user any information.


In this example, I take the simple approach - sending the request, waiting server's response and updating the front-end table.
This will make life easier and still have the effect we want.

The difference between this and [previous example](/2015/03/31/using-a-local-promise-to-update-angular-datatables-in-angular-way.html)
is not much.

I inject the `$http` service into `DataReloadWithPromiseCtrl` controller and move the updating datatables code into the `success` method.

{% gist icharlie/48a8c985eb57456db47d %}


And we need to do similar thing to delete a user. 
The difference is I create a cache `_users` filters out the deleting user, wait to server's response, and update `vm.users` to the `_users`.

{% gist icharlie/38a796fe54f404264ff4 %}


The example code is [here](https://github.com/icharlie/angular-datatables-completed)
