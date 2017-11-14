import React from 'react';
import Renderer from 'components/Renderer/Renderer';
import Controls from 'components/Controls/Controls';

export default class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      stationFile: null,
      handrailFiles: {},
      strFiles: [],
    };
    this.handleStationFileLoad = this.handleStationFileLoad.bind(this);
    this.handleHandrailFilesLoad = this.handleHandrailFilesLoad.bind(this);
    this.handleStrFilesLoad = this.handleStrFilesLoad.bind(this);
  }

  handleStationFileLoad(stationFile) {
    this.setState({stationFile});
  }

  handleHandrailFilesLoad(handrailFiles) {
    this.setState({handrailFiles});
  }

  handleStrFilesLoad(strFiles) {
    this.setState({strFiles});
  }

  render() {
    const {
      stationFile,
      handrailFiles,
      strFiles,
    } = this.state;
    return (
      <div className='Container'>
        <Controls
          onStationFileLoad={this.handleStationFileLoad}
          onHandrailFilesLoad={this.handleHandrailFilesLoad}
          onStrFilesLoad={this.handleStrFilesLoad}
        />
        <Renderer
          stationFile={stationFile}
          handrailFiles={handrailFiles}
          strFiles={strFiles}
        />
      </div>
    );
  }
}
