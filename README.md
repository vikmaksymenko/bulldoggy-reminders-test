Buldooggy Reminders Testing Project
====================================

This is a testing project for the [Buldooggy Reminders project](https://github.com/AutomationPanda/bulldoggy-reminders-app).

Prerequisites
-------------

* Node 16.x of higher
* npm 7.x or higher
* Docker 20.x or higher

Run Buldooggy Reminders app
---------------------------

The simplest way to run the app is to use Docker Image:

```shell
docker run -it --rm --name bulldoggy-reminders-app -p 8000:8000 vmaksimenko/bulldoggy-reminders-app
```

Setup
-----

```shell
npm install
```

Run Tests
---------

```shell    
npm test
```

