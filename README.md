# Persgroep app

[![Build Status](https://travis-ci.org/reauv/persgroep-app.svg?branch=master)](https://travis-ci.org/reauv/persgroep-app)
[![Coverage Status](https://coveralls.io/repos/github/reauv/persgroep-app/badge.svg?branch=master)](https://coveralls.io/github/reauv/persgroep-app?branch=master)

## Demo
You can view a live demo of the application here:
https://persgroep.rovansteen.nl/

## Features
* Read story
* Create story
* Assignments
* Login

### To do
* Profile pages
* Edit story
* Register

## Getting started
`git clone https://github.com/reauv/persgroep-app.git`
`cd persgroep-app`
`npm install`
`cp .env.example .env`
Now edit the `.env` file to suit your needs.
For the API endpoint you can set up your own API, check it's repository for doing so, or you can use the demo API on `api.persgroep.rovansteen.nl/api`

To set up a development environment run `npm run dev`.
For setting up a production environment run `npm run compile && npm run start`.

## Structure
Here is an outline of the application structure.
```
- internals			      – This folder stores files that are internally used by the system and are not exported or compiled.
  - testing   					- Configuration & bootstrap files for testing
	- webpack             - Webpack configuration files
- public              - Public folder that is used for static assets that should be exposed publicly.
- server              - Server files, this contains the bootstrap files for a development & production server
- src                 - Contains the source code of the application.
  - app									-
		- Collections					- The collections of the applications that are made up of entities
		- Components					- Small, reusable components go here
		- Domain							- React containers that hold our application logic
		- Entities						- The model files that describe the entities of the application
		- Http								- Folder that contains middleware & kernel
		- Library							- First party library files
		- Providers						- Providers that can be configured to do all sort of various actions
		- Sources							- Source files that contain actions how to interact with the API
		- Stores							- General stores that are shared among the application
		- Stylesheets					- Shared, general stylesheets that do not belong to a component
		- Templates						- The html templates used by the server (Sidenote: this should probably be moved outside the app folder)
		- routes.jsx          - Route configuration of the application
		- store.js            - Global store container
	- bootstrap						- This folder contains the startup script of the application
	- config							- Configuration files for the application
	- client.js       		- Entry point for the client bundle
	- server.js 					- Entry point for the server bundle
* 										- Everything inside the root is meta files, like .gitignore, package.json & .travis.yml.
```

Because of the isomorphic nature of the application there are 2 entry points to our bundle: `src/client.js` & `src/server.js`.
They each have their own logic of composing the parts they need for a bundle. We use Webpack to bundle these together.
These bundles are served by the server in the `server` folder.

## Courses
For this project I have focussed on 4 courses mentioned below. While this is a large application with
a lot of overlap between those courses I try to pick out a few things that was part of the course that
I've used for the application.

### Web apps from scratch
In the course web apps from scratch we learned to build a simple web application.
Looking at the requirements of this course we can check most items off the list:
It's a single page website that serves as an application, it's responsive, you
can view it on a mobile device, it has a router & different pages, it uses
a templating engine to render HTML, there is loading feedback, animations and
gestures.

There are lots of other advanced patterns & implementations in the application,
too much to describe them all but I'll highlight a few:
* Story swiper
On a [story page](https://persgroep.rovansteen.nl/story/1) you can swipe left & right
to go to the next or previous story. I build this myself with the help of the
hammer.js library.
But that wasn't enough, to really create an experience that feels *native*
I wanted the posts you see when panning to be stickied to the top. So if you are
on one story, and you pan to the left to go to the next story you should see the
top of the new story. This is something that is not really supported on the web,
but with some workarounds I managed to create this behavior.
* MobX
Application state can be incredibly difficult to manage for web applications and
quickly becomes a bug herd. To manage my application state I use a library called
MobX that allows us to observe properties. In combination with mobx-react it can
tell a component exactly when it's changed & that it should rerender.


### CSS to the rescue
For the course **CSS to the rescue** I've used CSS modules to make my CSS modular
and maintainable. You can read more about how this works & my opinions about it
in my [blog post](https://medium.com/@reauv/css-modules-78186e2b838f#.4eeujkti7)

### Performance matters
Performance is a really important aspect of web development and with the rise
of rich web applications even more important. While I did my best to reduce the
file size of the bundled JavaScript to a minimum without sacrificing the libraries
I wanted to use I mainly experimented with other ways to increase performance.

* Caching
To improve the performance across the board for repeated visits I use aggressive
caching. All the generated assets contain a unique hash that represents the contents
of the file. If the content is changed, the hash is different. Therefore we can
use long term caching rules on our server to tell the browser it can cache the
assets for a year. On repeated visits the performance is going to be tremendously
better.

* Service worker
While the caching gives a nice performance boost for repeated visits, it only
works for local, static assets. Caching also doesn't help if the user is offline.
To really give the user a good web app experience with good performance I've
implemented a service worker. This service worker is dynamically build along with
our assets so it knows exactly what to precache. Using Google's excellent SW Toolbox
there are also caching strategies implemented for external assets & API.
The external assets for example have a cache first strategy, meaning that if there
is a cache available, that is served while the service worker fetches a new one.
For our API we use a a network first strategy, meaning if there is a connection
available we use the network, otherwise the cache.
You can see the details of this configuration in the [webpack production config](https://github.com/reauv/persgroep-app/blob/master/internals/webpack/client.production.js)

### Real time web
Real time web is all about enhancing the user's experience with direct changes
to what the user sees with outside information.

In this application if you are logged in you'll get a notification when a user
likes a story of you. The like count you see when you are on a story is also
updated if a story is liked or unliked.

Behind the scenes we leverage redis & socket.io to communicate events from the API
to the application.

## Process
