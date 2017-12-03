import React from 'react';
import Renderer from 'components/Renderer/Renderer';
import Controls from 'components/Controls/Controls';
import Sidebar from 'react-sidebar';
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';
import {parseNodesFromStrFile} from 'utils/nodeProcessor/nodeProcessor';
import fetch from 'isomorphic-fetch';

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
      routesLoaded: false,
    };
    this.handrails = [];
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
    strFiles.forEach(file =>
      this.handrails = this.handrails.concat(parseNodesFromStrFile(file))
    );
    this.setState({strFiles});
  }

  handleSidebarOpen(open) {
    this.setState({sidebarOpen: open});
  }

  handleSubmit(data) {
    fetch('http://localhost:8080', {
      method: 'post',
      body: JSON.stringify({
        startHandrail: data.startHandrail ? data.startHandrail.value : null,
        endHandrail: data.endHandrail ? data.endHandrail.value : null,
        nodes: this.handrails
      })
    })
      .then(resp => resp.json())
      .then(json => {
        const firstRoute = json[0];
        this.setState({
          ...data,
          routes: data.routes.map(route => ({
            ...route,
            nodes: firstRoute.nodes // later change it to 1st, 2nd, 3rd route etc
          })),
          routesLoaded: true
        });
      })
      .catch(e => console.error(e));
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
      routesLoaded,
    } = this.state;
    return (
      <div className='Container'>
        <StickyHeader
          header={
            <div className='header'>
              <div className='sidebar-anchor' onClick={() => this.handleSidebarOpen(!sidebarOpen)}>Sidebar</div>
              <div>NASA EVA Navigator</div>
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
              {routesLoaded &&
                <div>
                  <h1 className='results-header'>Results</h1>
                  <div className='results'>
                    {routes.map((route, routeI) =>
                      <div key={routeI}>
                        <div>Route {routeI + 1}</div>
                        <ol>
                          {route.nodes.map((node, nodeI) =>
                            <li key={nodeI}>{node}</li>
                          )}
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
              }
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
