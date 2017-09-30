[![CircleCI](https://circleci.com/gh/lovetostrike/nasa-path-finder.svg?style=svg)](https://circleci.com/gh/lovetostrike/nasa-path-finder)

## Demo
Demo is available on <https://lovetostrike.github.io/nasa-path-finder>.

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

To build for production
```
yarn build
```

To run native app, build it for production first and then,
```yarn start:native```

## Test
```yarn test```

## Structure

* UI Components are React components and live in ```src/components```.
  You can learn more at <https://facebook.github.io/react/tutorial/tutorial.html>
* API code lives in ```src/utils```.

## Continuous Delivery

Builds are executed on every merge at <https://circleci.com/gh/lovetostrike/nasa-path-finder/> and on successful build,
docker image is built at <https://hub.docker.com/r/lovetostrike/nasa-path-finder/>.
The latest build is hosted on *coming soon*.
