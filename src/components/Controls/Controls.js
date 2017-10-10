import React from 'react';
import Dropzone from 'react-dropzone';
import fetch from 'isomorphic-fetch';

export default class Controls extends React.Component {
  constructor() {
    super();
    this.state = {
      file: null,
      error: '',
      loading: false,
    };
    this.handleFileDrop = this.handleFileDrop.bind(this);
    this.handleFileRejected = this.handleFileRejected.bind(this);
  }

  componentDidMount() {
    const {onFileLoad} = this.props;
    const fileName = './models/LAB_S0_geometry.stl';
    // load a default file for demo purposes
    this.setState({
      file: {
        name: fileName,
        size: 35000000
      },
      loading: true
    });
    fetch(fileName)
      .then(response => response.arrayBuffer())
      .then(data => {
        onFileLoad(data);
        this.setState({loading: false});
      });
  }

  handleFileDrop(acceptedFiles) {
    const {
      onFileLoad
    } = this.props;
    this.setState({
      file: acceptedFiles[0],
    });
    acceptedFiles.forEach(file => {
      this.setState({error: ''});
      const reader = new FileReader();
      reader.onload = () => {
        onFileLoad(reader.result);
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onloadstart = () => this.setState({loading: true});
      reader.onloadend = () => this.setState({loading: false});

      reader.readAsBinaryString(file);
    });
  }

  handleFileRejected() {
    this.setState({error: 'Can only accept stl files'});
  }

  render() {
    const {
      file,
      error,
      loading
    } = this.state;
    return (
      <div className='Controls' style={{padding: '1em'}}>
        Controls
        <div>Drag & drop any stl files to render...</div>
        {loading && <div style={{color: 'blue'}}>Loading..</div>}
        <Dropzone
          onDrop={this.handleFileDrop}
          multiple={false}
          onDropRejected={this.handleFileRejected}
          style={{
            width: '100px',
            height: '100px',
            border: '1px dotted black'
          }}
          accept='.stl'
        >
          <div style={{color: 'red'}}>{error}</div>
          {file &&
            <div>{file.name} - {file.size} bytes</div>
          }
        </Dropzone>
      </div>
    );
  }
}
