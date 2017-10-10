import React from 'react';
import Renderer from 'components/Renderer/Renderer';
import Controls from 'components/Controls/Controls';

export default class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      file: null
    };
    this.handleFileLoad = this.handleFileLoad.bind(this);
  }

  handleFileLoad(file) {
    this.setState({file});
  }

  render() {
    const {
      file
    } = this.state;
    return (
      <div>
        <Controls onFileLoad={this.handleFileLoad} />
        <Renderer file={file} />
      </div>
    );
  }
}
