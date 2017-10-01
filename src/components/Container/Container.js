import React from 'react';
import Renderer from 'components/Renderer/Renderer';

export default class Container extends React.Component {
  render() {
    return (
      <div>
        NASA
        <Renderer />
      </div>
    );
  }
}
