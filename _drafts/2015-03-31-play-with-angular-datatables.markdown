---
layout: post
title: "Create a local promise to update angular-datatables at front-end"
---

Recently, my colleagues are planing to use angularjs and datatables into our system and they don't like how anuglar-datatables's to update after adding, updating, and deleting a row data. It will go to make an ajax, get all data and then refresh the table. The functionality they want is updating table and sending the ajax should work simultaneously.


Fortunately, the angular-datatables provides a promise way to load data. In order to make update the datatable from the front-end model, we need to create a function to return a promise.

In the function, we need create a deferred, setup the deferred's resolve function will go to use front-end model, and then return the promise from the deferred.


Somethings need to think more. First, we don't know creating, update, and delete a new data will success or failed, so we need to design a rollback mechanism to avoid client and server have different results. Furthermore, updating and deleting a data need the id, so we need to update the new data's id when the creation has finished. Otherwise, we can't update or delete the new data.

{% gist icharlie/8084838dace2d43a47fb %}
