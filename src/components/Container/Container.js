import React from 'react';
import Renderer from 'components/Renderer/Renderer';
import Controls from 'components/Controls/Controls';
import Sidebar from 'react-sidebar';
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';

export default class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      stationFile: null,
      handrailFiles: {},
      strFiles: [],
      sidebarOpen: true,
      startHandrail: null,
      endHandrail: null,
      routes: [],
    };
    this.handleStationFileLoad = this.handleStationFileLoad.bind(this);
    this.handleHandrailFilesLoad = this.handleHandrailFilesLoad.bind(this);
    this.handleStrFilesLoad = this.handleStrFilesLoad.bind(this);
    this.handleSidebarOpen = this.handleSidebarOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSidebarOpen(open) {
    this.setState({sidebarOpen: open});
  }

  handleSubmit(data) {
    this.setState({...data});
  }

  render() {
    const {
      stationFile,
      handrailFiles,
      strFiles,
      sidebarOpen,
      startHandrail,
      endHandrail,
      routes,
    } = this.state;
    return (
      <div className='Container'>
        <StickyHeader
          header={
            <div className='header'>
              <div className='sidebar-anchor' onClick={() => this.handleSidebarOpen(!sidebarOpen)}>Sidebar</div>
              <div>NASA PATH FINDER</div>
            </div>
          }
        />
        <Sidebar
          sidebar={
            <div>
              <Controls
                onStationFileLoad={this.handleStationFileLoad}
                onHandrailFilesLoad={this.handleHandrailFilesLoad}
                onStrFilesLoad={this.handleStrFilesLoad}
                onSubmit={this.handleSubmit}
              />
              <div
                className='sidebar-hide-button'
                onClick={() => this.handleSidebarOpen(false)}
              >
                {'<<<'}
              </div>
            </div>
          }
          open={sidebarOpen}
          onSetOpen={this.handleSidebarOpen}
          styles={{
            sidebar: {
              top: '1em',
              background: 'white',
              overflow: 'hidden',
              minWidth: '20em',
            },
            content: {
              overflow: 'hidden',
            },
            overlay: {
              zIndex: 0,
            }
          }}
        >
          <Renderer
            stationFile={stationFile}
            handrailFiles={handrailFiles}
            strFiles={strFiles}
            startHandrail={startHandrail}
            endHandrail={endHandrail}
            routes={routes}
          />
        </Sidebar>
      </div>
    );
  }
}
