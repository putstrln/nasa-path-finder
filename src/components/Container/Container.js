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
    this.defaultRoutes = [
      {value: 1, color: 'green', nodes: []},
      {value: 2, color: 'blue', nodes: []},
      {value: 3, color: 'violet', nodes: []},
    ];
    this.state = {
      stationFile: null,
      handrailFiles: {},
      strFiles: [],
      sidebarOpen: true,
      startHandrail: null,
      endHandrail: null,
      routes: this.defaultRoutes,
      visibleRoutes: [1, 2, 3],
      routesLoaded: false,
      wingspan: 0,
    };
    this.handrails = [];
    this.handleWingspanChange = this.handleWingspanChange.bind(this);
    this.handleStationFileLoad = this.handleStationFileLoad.bind(this);
    this.handleHandrailFilesLoad = this.handleHandrailFilesLoad.bind(this);
    this.handleStrFilesLoad = this.handleStrFilesLoad.bind(this);
    this.handleSidebarOpen = this.handleSidebarOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartEndHandrailsChanged = this.handleStartEndHandrailsChanged.bind(this);
    this.handleVisibleRouteChanges = this.handleVisibleRouteChanges.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState({
      visibleRoutes: [1, 2, 3],
      startHandrail: null,
      endHandrail: null,
      wingspan: 0,
      routes: this.defaultRoutes
    });
  }

  handleStationFileLoad(stationFile) {
    this.setState({stationFile});
  }

  handleHandrailFilesLoad(handrailFiles) {
    this.setState({handrailFiles});
  }

  handleWingspanChange(wingspan) {
    this.setState({wingspan});
  }

  handleVisibleRouteChanges(visibleRoutes) {
    this.setState({visibleRoutes});
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

  handleStartEndHandrailsChanged(startOrEnd, handrail) {
    this.setState({
      [`${startOrEnd}Handrail`]: handrail
    });
  }

  handleSubmit(data) {
    const {routes} = this.state;
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
        const resultRoutes = json.map((route, i) => ({
          ...route,
          ...routes[i],
          nodes: route.nodes
        }));
        this.setState({
          ...data,
          routes: resultRoutes,
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
      visibleRoutes,
      routesLoaded,
      wingspan,
    } = this.state;
    return (
      <div className='Container'>
        <StickyHeader
          header={
            <div className='header'>
              <div className='logo'><h1>NASA EVA Navigator</h1></div>
              <div className='sidebar-anchor' onClick={() => this.handleSidebarOpen(!sidebarOpen)}>[Toggle sidebar]</div>
            </div>
          }
        />
        <Sidebar
          sidebar={
            <div className='sidebar-wrapper'>
              <Controls
                onStationFileLoad={this.handleStationFileLoad}
                onHandrailFilesLoad={this.handleHandrailFilesLoad}
                onStrFilesLoad={this.handleStrFilesLoad}
                onStartEndHandrailsChange={this.handleStartEndHandrailsChanged}
                onSubmit={this.handleSubmit}
                startHandrail={startHandrail}
                endHandrail={endHandrail}
                routes={routes}
                visibleRoutes={visibleRoutes}
                onRoutesChange={this.handleVisibleRouteChanges}
                onReset={this.reset}
                wingspan={wingspan}
                onWingspanChange={this.handleWingspanChange}
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
            routes={routes.filter(r => visibleRoutes.includes(r.value)).reverse()}
          />
        </Sidebar>
      </div>
    );
  }
}
