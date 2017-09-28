## Development

Install yarn if you don't have it, https://yarnpkg.com/lang/en/docs/install/#linux-tab.

Install dependencies if you haven't,
```sh
yarn
```

Start dev server
```sh
yarn start
```
and go to http://localhost:3000 to see the app.

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
  You can learn more at https://facebook.github.io/react/tutorial/tutorial.html
* API code lives in ```src/utils```.

## Continuous Delivery
