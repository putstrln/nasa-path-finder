import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './app'

ReactDOM.render(
  <AppContainer>
    <App/>
  </AppContainer>,
  document.querySelector('main')
);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.querySelector('main')
    );
  });
}
