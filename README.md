[![CircleCI](https://circleci.com/gh/lovetostrike/nasa-path-finder.svg?style=svg)](https://circleci.com/gh/lovetostrike/nasa-path-finder)

## Demo
Demo is available at  <https://lovetostrike.github.io/nasa-path-finder/demo.html>.

## Development

Install yarn if you don't have it, <https://yarnpkg.com/lang/en/docs/install/#linux-tab>.

Install dependencies if you haven't,
```sh
yarn
```

Start dev server
```sh
yarn start
```
and go to <http://localhost:3000> to see the app.

To run native app for development, build it first and then,
```yarn build && yarn start:native```

## Production Deployment

To build for web
```
yarn build
```
and you get the static files under public.

There's a docker image with a web server if you want it to work out-of-the-box.
Install docker for your box and
```
docker run -p 8080:8080 lovetostrike/nasa-path-finder
```
Now it will be available at <http://localhost:8080>.

Native apps production builds *coming soon*.

## Test
```yarn test```

## Backend

* Prior to building for the backend, ensure file paths within CreateNodes.java 
point to the correct locations for the source files.
* CreateNodes.java lives in ```server/src/main/java/com/nasa/```.

To build, ```yarn compile```

To run, ```yarn start:server```

To do both, ```yarn compile:start:server```

## Structure

* UI Components are React components and live in ```src/components```.
  You can learn more at <https://facebook.github.io/react/tutorial/tutorial.html>
* API code lives in ```src/utils```.

## Continuous Delivery

There are both OS and web builds available. Web build is just a static html/js/css and OS builds use electron for different distributions.

Builds are executed on every merge at <https://circleci.com/gh/lovetostrike/nasa-path-finder/> and on successful build,
docker image is built at <https://hub.docker.com/r/lovetostrike/nasa-path-finder/>.
The latest web build is hosted on the demo page.
