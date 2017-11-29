import React from 'react';
import Dropzone from 'react-dropzone';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

const demoHandrailFiles = 'CETA_LIGHT_BOOM1H.stl CETA_LIGHT_BOOM2H.stl GAP_SPAN_0201_0239.stl GAP_SPAN_0219_0232.stl GAP_SPAN_0231_0232.stl GAP_SPAN_0251_0286.stl GAP_SPAN_0288_0259.stl GAP_SPAN_0296_0260.stl GAP_SPAN_ESP2_8013_L0293.stl GAP_SPAN_L_N1.stl HWY_110.stl HWY_XXX.stl LAB_0200.stl LAB_0201.stl LAB_0202.stl LAB_0203.stl LAB_0204.stl LAB_0205.stl LAB_0206.stl LAB_0207.stl LAB_0208.stl LAB_0209.stl LAB_0210.stl LAB_0211.stl LAB_0212.stl LAB_0213.stl LAB_0214.stl LAB_0215.stl LAB_0216.stl LAB_0217.stl LAB_0218.stl LAB_0219.stl LAB_0220.stl LAB_0221.stl LAB_0222.stl LAB_0223.stl LAB_0224.stl LAB_0225.stl LAB_0226.stl LAB_0227.stl LAB_0228.stl LAB_0229.stl LAB_0230.stl LAB_0231.stl LAB_0232.stl LAB_0233.stl LAB_0234.stl LAB_0235.stl LAB_0236.stl LAB_0237.stl LAB_0238.stl LAB_0239.stl LAB_0240.stl LAB_0241.stl LAB_0242.stl LAB_0243.stl LAB_0244.stl LAB_0245.stl LAB_0246.stl LAB_0247.stl LAB_0248.stl LAB_0249.stl LAB_0250.stl LAB_0251.stl LAB_0252.stl LAB_0253.stl LAB_0254.stl LAB_0255.stl LAB_0256.stl LAB_0257.stl LAB_0258.stl LAB_0259.stl LAB_0260.stl LAB_0261.stl LAB_0262.stl LAB_0263.stl LAB_0264.stl LAB_0265.stl LAB_0266.stl LAB_0267.stl LAB_0268.stl LAB_0269.stl LAB_0270.stl LAB_0271.stl LAB_0272.stl LAB_0273.stl LAB_0274.stl LAB_0275.stl LAB_0277.stl LAB_0279.stl LAB_0280.stl LAB_0281.stl LAB_0282.stl LAB_0284.stl LAB_0285.stl LAB_0286.stl LAB_0287.stl LAB_0288.stl LAB_0291.stl LAB_0292.stl LAB_0293.stl LAB_0294.stl LAB_0295.stl LAB_0296.stl LAB_0297.stl LAB_0298.stl LAB_eva_P7.stl LAB_SLIDEWIRE.stl S0_3400.stl S0_3401.stl S0_3402.stl S0_3403.stl S0_3404.stl S0_3405.stl S0_3406.stl S0_3407.stl S0_3408.stl S0_3409.stl S0_3410.stl S0_3411.stl S0_3412.stl S0_3413.stl S0_3414.stl S0_3415.stl S0_3416.stl S0_3417.stl S0_3418.stl S0_3419.stl S0_3420.stl S0_3421.stl S0_3422.stl S0_3423.stl S0_3424.stl S0_3425.stl S0_3426.stl S0_3427.stl S0_3428.stl S0_3429.stl S0_3430.stl S0_3431.stl S0_3432.stl S0_3433.stl S0_3434.stl S0_3435.stl S0_3436.stl S0_3437.stl S0_3438.stl S0_3439.stl S0_3440.stl S0_3441.stl S0_3442.stl S0_3443.stl S0_3444.stl S0_3445.stl S0_3446.stl S0_3447.stl S0_3448.stl S0_3449.stl S0_3450.stl S0_3451.stl S0_3452.stl S0_3453.stl S0_3454.stl S0_3455.stl S0_3456.stl S0_3457.stl S0_3458.stl S0_3459.stl S0_3460.stl S0_3461.stl S0_3462.stl S0_3463.stl S0_3464.stl S0_3465.stl S0_3466.stl S0_3467.stl S0_3468.stl S0_3469.stl S0_3470.stl S0_3471.stl S0_3472.stl S0_3473.stl S0_3474.stl S0_3475.stl S0_3476.stl S0_3477.stl S0_3478.stl S0_3479.stl S0_3480.stl S0_3482.stl S0_3483.stl S0_3484.stl S0_3485.stl S0_3486.stl S0_3487.stl S0_3488.stl S0_3489.stl S0_3490.stl S0_3491.stl S0_3492.stl S0_3493.stl S0_3494.stl S0_3495.stl S0_3496.stl S0_3497.stl S0_3498.stl S0_3499.stl S0_3500.stl S0_3501.stl S0_3502.stl S0_3503.stl S0_3504.stl S0_3505.stl S0_3506.stl S0_3507.stl S0_3508.stl S0_3509.stl S0_3510.stl S0_3511.stl S0_3512.stl S0_3513.stl S0_3514.stl S0_3515.stl S0_3516.stl S0_3517.stl S0_3518.stl S0_3519.stl S0_3520.stl S0_3521.stl S0_3522.stl S0_3523.stl S0_3524.stl S0_3525.stl S0_3526.stl S0_3527.stl S0_3528.stl S0_3529.stl S0_3530.stl S0_3531.stl S0_3532.stl S0_3533.stl S0_3534.stl S0_3535.stl S0_3536.stl S0_3537.stl S0_3538.stl S0_3539.stl S0_3540.stl S0_3541.stl S0_3542.stl S0_3543.stl S0_3544.stl S0_3545.stl S0_3546.stl S0_3547.stl S0_3548.stl S0_3549.stl S0_3550.stl S0_3551.stl S0_GAP_SPAN_3427_3424.stl S0_KP_H1.stl S0_KP_H2.stl S0_KP_H3.stl S0_KS_H1.stl S0_KS_H2.stl S0_KS_H3.stl S0_TRAY_H1.stl S0_TRAY_H2.stl S0_TRAY_H3.stl S0_TRAY_H4.stl S0_TRAY_H5.stl'.split(' ');

export default class Controls extends React.Component {
  constructor() {
    super();
    this.defaultRoutes = [
      {value: 1, color: '#45FFFF', nodes: []},
      {value: 2, color: '#D7FF5F', nodes: []},
      {value: 3, color: 'green', nodes: []},
    ];
    this.state = {
      stationFile: null,
      stationError: '',
      stationLoading: false,
      handrailFiles: [],
      handrailError: '',
      handrailLoading: false,
      strFiles: [],
      startHandrail: null,
      endHandrail: null,
      wingspan: 0,
      visibleRoutes: this.defaultRoutes,
    };
    this.handleStationFileDrop = this.handleStationFileDrop.bind(this);
    this.handleStationFileRejected = this.handleStationFileRejected.bind(this);
    this.handleHandrailFilesDrop = this.handleHandrailFilesDrop.bind(this);
    this.handleStrFilesDrop = this.handleStrFilesDrop.bind(this);
    this.handleHandrailChange = this.handleHandrailChange.bind(this);
    this.createHandrailOptions = this.createHandrailOptions.bind(this);
    this.handleWingspanChange = this.handleWingspanChange.bind(this);
    this.submit = this.submit.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    const {onStationFileLoad, onHandrailFilesLoad, onStrFilesLoad} = this.props;
    const fileName = './models/LAB_S0_geometry.stl';
    const handrailDataFiles = {};
    const handrailFiles = [];
    const strFiles = [];
    // load a default stationFile for demo purposes
    this.setState({
      stationFile: {
        name: fileName,
        size: 35000000
      },
      stationLoading: true,
      handrailLoading: false,
    });
    fetch(fileName)
      .then(response => response.arrayBuffer())
      .then(data => {
        onStationFileLoad(data);
        this.setState({stationLoading: false, });
      });
    demoHandrailFiles.forEach(handrailFile => {
      fetch(`./models/Handrails/frames/${handrailFile}`)
        .then(response => response.arrayBuffer())
        .then(data => {
          handrailDataFiles[handrailFile] = data;
          handrailFiles.push({name: handrailFile});
          if (Object.keys(handrailDataFiles).length == demoHandrailFiles.length) {
            onHandrailFilesLoad(handrailDataFiles);
            this.setState({
              handrailLoading: false,
              handrailFiles,
            });
          }
        });
    });
    fetch('./models/Handrails/LABHANDHOLDS.str')
      .then(response => response.text())
      .then(data => strFiles.push(data));
    fetch('./models/Handrails/S0HANDHOLDS.str')
      .then(response => response.text())
      .then(data => {
        strFiles.push(data);
        onStrFilesLoad(strFiles)
      });
  }

  handleStationFileDrop(acceptedFiles) {
    const {
      onStationFileLoad
    } = this.props;
    acceptedFiles.forEach(stationFile => {
      this.setState({stationError: ''});
      const reader = new FileReader();
      reader.onabort = () => console.warn('stationFile reading was aborted');
      reader.onerror = () => console.warn('stationFile reading has failed');
      reader.onloadstart = () => this.setState({stationLoading: true});
      reader.onloadend = () => {
        onStationFileLoad(reader.result);
        this.setState({
          stationFile,
          stationLoading: false
        });
      };

      reader.readAsBinaryString(stationFile);
    });
  }

  handleStationFileRejected() {
    this.setState({stationError: 'Can only accept stl files'});
  }

  handleHandrailFilesDrop(files) {
    const {onHandrailFilesLoad} = this.props;
    const {handrailLoading, handrailFiles} = this.state;
    const handrailResults = {};
    files.forEach((handrailFile, i) => {
      this.setState({handrailError: ''});
      const reader = new FileReader();
      reader.onabort = () => console.warn('handrailFile reading was aborted');
      reader.onerror = () => console.warn('handrailFile reading has failed');
      reader.onloadstart = () => {
        if (!handrailLoading) {
          this.setState({handrailLoading: true});
        }
      };
      reader.onloadend = () => {
        handrailFiles.push(handrailFile);
        handrailResults[handrailFile.name] = reader.result;
        if (i === files.length - 1) {
          this.setState({
            handrailFiles,
            handrailLoading: false
          });
          onHandrailFilesLoad(handrailResults);
        }
      };

      reader.readAsBinaryString(handrailFile);
    });
  }

  handleStrFilesDrop(files) {
    const {onStrFilesLoad} = this.props;
    const strResults = [];
    files.forEach((handrailFile, i) => {
      const reader = new FileReader();
      reader.onabort = () => console.warn('handrailFile reading was aborted');
      reader.onerror = () => console.warn('handrailFile reading has failed');
      reader.onloadend = () => {
        strResults.push(reader.result);
        if (i === files.length - 1) {
          this.setState({
            strFiles: files,
          });
          onStrFilesLoad(strResults);
        }
      };

      reader.readAsBinaryString(handrailFile);
    });
  }

  handleHandrailChange(startOrEnd, handrail) {
    this.setState({
      [`${startOrEnd}Handrail`]: handrail
    });
  }

  createHandrailOptions() {
    return this.state.handrailFiles.map(file => ({
      value: file.name.replace(/\.stl$/, ''),
      label: file.name.replace(/\.stl$/, '')
    }));
  }

  handleWingspanChange(wingspan) {
    this.setState({wingspan});
  }

  reset() {
    this.setState({
      startHandrail: null,
      endHandrail: null,
      wingspan: 0,
      visibleRoutes: this.defaultRoutes
    });
  }

  submit() {
    const {
      startHandrail,
      endHandrail,
      visibleRoutes,
    } = this.state;
    this.props.onSubmit({
      startHandrail,
      endHandrail,
      routes: visibleRoutes.map(route => ({
        ...route,
        nodes: [
          'LAB_0259',
          'LAB_0233',
          'LAB_0268',
          'LAB_0232',
          'LAB_0237',
          'LAB_0201',
          'LAB_0295',
          'LAB_0208',
          'LAB_0239',
          'LAB_0293',
          'LAB_0280',
          'LAB_0200',
          'LAB_0267',
          'LAB_0242',
          'LAB_0288',
          'LAB_0223',
          'LAB_0277',
          'LAB_0252',
          'LAB_0270',
          'LAB_0243',
          'LAB_0216',
          'LAB_0266',
        ]
      }))
    });
  }

  render() {
    const {
      stationFile,
      stationError,
      stationLoading,
      handrailFiles,
      handrailError,
      handrailLoading,
      strFiles,
      startHandrail,
      endHandrail,
      wingspan,
      visibleRoutes,
    } = this.state;
    return (
      <div className='Controls'>
        <Tabs>
          <TabList>
            <Tab>Controls</Tab>
            <Tab>Upload Files</Tab>
          </TabList>
          <TabPanel>
            <div className='handrails-selector'>
              <Select
                name='startHandrail'
                placeholder='Select start handrail...'
                value={startHandrail}
                options={this.createHandrailOptions()}
                onChange={option => this.handleHandrailChange('start', option)}
              />
              <Select
                name='endHandrail'
                placeholder='Select end handrail...'
                value={endHandrail}
                options={this.createHandrailOptions()}
                onChange={option => this.handleHandrailChange('end', option)}
              />
            </div>
            <div className='wingspan-control'>
              Wingspan: {wingspan} ft
              <Slider value={wingspan}
                onChange={this.handleWingspanChange}
                min={0}
                max={100}
                marks={{
                  0: '0 ft',
                  100: '100 ft'
                }}
              />
            </div>
            <div className='route-select-control'>
              <strong>Visible Routes</strong>
              <CheckboxGroup name="routes" value={visibleRoutes} onChange={routes => this.setState({visibleRoutes: routes})}>
                {this.defaultRoutes.map(route => (
                  <label style={{borderBottom: `${route.color} 5px solid`}} key={route.value}>
                    <Checkbox value={route} />
                    Route {route.value}
                  </label>
                ))}
              </CheckboxGroup>
            </div>
            <div className='action-control'>
              <button onClick={this.submit}>Go</button>
              <button onClick={this.reset}>Reset</button>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='file-controls'>
              <div className='station-controls'>
                <div>Drag & drop the station stl file to render...</div>
                {stationLoading && <div style={{color: 'blue'}}>stationLoading..</div>}
                <Dropzone
                  onDrop={this.handleStationFileDrop}
                  multiple={false}
                  onDropRejected={this.handleStationFileRejected}
                  style={{
                    width: '100px',
                    height: '100px',
                    border: '1px dotted black'
                  }}
                  accept='.stl'
                >
                  <div style={{color: 'red'}}>{stationError}</div>
                  {stationFile &&
                    <div>{stationFile.name} - {stationFile.size} bytes</div>
                  }
                </Dropzone>
              </div>
              <div className='handrails-controls'>
                <div>Drag & drop the handrail stl files to render...</div>
                {handrailLoading && <div style={{color: 'blue'}}>handrail loading..</div>}
                <Dropzone
                  onDrop={this.handleHandrailFilesDrop}
                  onDropRejected={this.handleHandrailFilesRejected}
                  style={{
                    width: '100px',
                    height: '100px',
                    border: '1px dotted black'
                  }}
                  accept='.stl'
                >
                  <div style={{color: 'red'}}>{handrailError}</div>
                  {handrailFiles.length > 0 &&
                    <div>{handrailFiles.length} handrails loaded</div>
                  }
                </Dropzone>
              </div>
              <div className='str-controls'>
                <div>Drag & drop one or more str files to position the handrails...</div>
                <Dropzone
                  onDrop={this.handleStrFilesDrop}
                  style={{
                    width: '100px',
                    height: '100px',
                    border: '1px dotted black'
                  }}
                  accept='.str'
                >
                  {strFiles.map(strFile =>
                    <div key={strFile.name}>{strFile.name}</div>
                  )}
                </Dropzone>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

Controls.propTypes = {
  onStationFileLoad: PropTypes.func.isRequired,
  onHandrailFilesLoad: PropTypes.func.isRequired,
  onStrFilesLoad: PropTypes.func.isRequired
};
