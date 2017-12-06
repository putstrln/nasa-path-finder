[![CircleCI](https://circleci.com/gh/lovetostrike/nasa-path-finder.svg?style=svg)](https://circleci.com/gh/lovetostrike/nasa-path-finder)

## Demo
Demo is available at  <https://lovetostrike.github.io/nasa-path-finder/demo.html>.

## Development

Install yarn if you don't have it, <https://yarnpkg.com/lang/en/docs/install/#linux-tab>.

Install java 8 & maven for your platform.

#### Frontend
Install yarn dependencies if you haven't,
```sh
yarn
```

Start dev frontend server
```sh
yarn start
```

#### Backend

* Prior to building for the backend, ensure file paths within CreateNodes.java
point to the correct locations for the source files.
* CreateNodes.java lives in ```server/src/main/java/com/nasa/```.

In another terminal, start dev backend server, (you need to run this every code change since it's Java). We can improve it to watch the files changes and use hot swap.

To build, ```yarn compile```

To run, ```yarn start:server```

To do both, ```yarn compile:start:server```

Go to <http://localhost:3000> to see the app.

## Production Deployment

#### Web build
To build for web
```
yarn build
yarn start:web & yarn start:server
```
and you get the static files under public which can be deployed on any server.

#### Docker build
There's a docker image with a web server if you want the app to work out-of-the-box and skip any setup.

For linux and mac,
Install docker for your box and
```
docker run -p 8080:8080 -p 3000:3000 lovetostrike/nasa-path-finder
```
Now it will be available at <http://localhost:3000>.

For windows, install docker https://docs.docker.com/toolbox/toolbox_install_windows/.
Open up kitematic.
Search for nasa-path-finder and download it.
In the settings, it should look something like this:

In the preview window, clicking popup button will launch the app in the browser.
![Port Config](https://github.com/lovetostrike/nasa-path-finder/blob/master/Capture.PNG).
Make sure both docker & published ip has 8080 port open.
Save and restart the container.

## Test
```yarn test```

## Structure

* UI Components are React components and live in ```src/components```.
  You can learn more at <https://facebook.github.io/react/tutorial/tutorial.html>
* API code lives in ```src/utils```.

## Continuous Delivery

There are both OS and web builds available. Web build is just a static html/js/css and OS builds use electron for different distributions.

Builds are executed on every merge at <https://circleci.com/gh/lovetostrike/nasa-path-finder/> and on successful build,
docker image is built at <https://hub.docker.com/r/lovetostrike/nasa-path-finder/>.
The latest web build is hosted on the demo page.
