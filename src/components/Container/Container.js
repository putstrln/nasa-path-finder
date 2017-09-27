import React from 'react';
import {plus} from 'utils/math/math';

export default class Container extends React.Component {
  render() {
    return (
      <div>1 + 1 = {plus(1, 1)}</div>
    );
  }
}
