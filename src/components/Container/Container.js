import React from 'react';
import Renderer from 'components/Renderer/Renderer';
import Controls from 'components/Controls/Controls';

export default class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      stationFile: null,
      handrailFiles: null,
    };
    this.handleStationFileLoad = this.handleStationFileLoad.bind(this);
    this.handleHandrailFilesLoad = this.handleHandrailFilesLoad.bind(this);
  }

  handleStationFileLoad(stationFile) {
    this.setState({stationFile});
  }

  handleHandrailFilesLoad(handrailFiles) {
    this.setState({handrailFiles});
  }

  render() {
    const {
      stationFile,
      handrailFiles,
    } = this.state;
    return (
      <div>
        <Controls
          onStationFileLoad={this.handleStationFileLoad}
          onHandrailFilesLoad={this.handleHandrailFilesLoad}
        />
        <Renderer
          stationFile={stationFile}
          handrailFiles={handrailFiles}
        />
      </div>
    );
  }
}
