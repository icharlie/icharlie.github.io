---
layout: post
title: "angular datatables angular way completed example"
description: ""
category: ""
tags: [angular,js]
---

In previous [post](/2015/03/31/using-a-local-promise-to-update-angular-datatables-in-angular-way.html),
I design a local promise function to make angular-datatables doesn't need to reload entire page to get fresh data.
Now, we start to integrate with server side. First, we know every data should have an unique key to identify and *id* is the key in the user data I used.
So, *id* is the data we need to wait for server response. We can handle this situation in different ways.

1. Update front end table, send the request to server and use server's response to update the new user's id.
2. Send the request to server, use server's response to update front end table.

The first one approach is complicated, but I think it is good to heavy update.

The potential problem is there is no unique key in the front-end data and we can't guarantee server's responses will follow the requests' sequence.
In order to make this work, we need to design a mechanism to generate a fake unique id and wrap this into the data sent between browser and server.

client          server
add user1
                add user1
add user2
                add user2
                send user2
update user2
                send user1
update user1

The simpler one approach which I used in the example is let server send back a completed user data and front end uses this data to update table.
Since this is just a small data, server should be able to response quickly (except for network latency, database issues).

For the deletion, we should deal with if failed, we should be able rollback the data on front end. I use caching the user is ready to remove before sending the request to server. So, Using the error method in the promise returned from `$http` can help use.
