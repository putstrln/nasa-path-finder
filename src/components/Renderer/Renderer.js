import React from 'react';
import 'utils/stlLoader';
import {
  loadMeshFromFile,
  positionModelsBasedOnStrFile,
  createDomEvents,
  bindDomEventsToMeshes,
  unbindDomEventsFromMeshes
} from 'utils/nodeProcessor/nodeProcessor';
import Detector from 'utils/detector';
import Stats from 'stats-js';
import OrbitControlsFactory from 'three-orbit-controls';
import PropTypes from 'prop-types';

let OrbitControls = OrbitControlsFactory(THREE);
export default class Renderer extends React.Component {
  constructor() {
    super();
    this.container = null;
    this.stats = null;
    this.camera = null;
    this.cameraTarget = null;
    this.scene = null;
    this.renderer = null;
    this.stationModel = null;
    this.stationModelIsDirty = true;
    this.handrailModels = {};
    this.domEvents = null;
    this.handleHandrailMouseOver = this.handleHandrailMouseOver.bind(this);
    this.domEventsMap = {
      'mouseover': this.handleHandrailMouseOver
    };
    this.state = {
      hoveredHandrail: null
    };
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.animate = this.animate.bind(this);
    this.processFiles = this.processFiles.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.stationFile !== newProps.stationFile) {
      this.stationModelIsDirty = true;
    }
  }

  componentDidMount() {
    if (!Detector.webgl) {
      Detector.addGetWebGLMessage();
    }
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.0001, 5000);
    this.camera.position.set(0, 0, 3);
    this.cameraTarget = new THREE.Vector3(0, 0, 0);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('black');

    // mouse controls to rotate/zoom the model
    new OrbitControls(this.camera);
    // Lights
    this.scene.add(new THREE.HemisphereLight('grey', 'grey'));
    this.addShadowedLight(1, 1, 1, 0xffffff, 1.35);
    this.addShadowedLight(0.5, 1, -1, 0xffffff, 1);
    // this.renderer
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.renderReverseSided = false;
    this.container.appendChild(this.renderer.domElement);
    this.stats = new Stats();
    this.container.appendChild(this.stats.domElement);
    window.addEventListener('resize', this.handleWindowResize, false);
    // dom events for meshes
    this.domEvents = createDomEvents(this.camera, this.renderer);
  }

  componentDidUpdate() {
    this.processFiles();
  }

  componentWillUnMount() {
    window.addEventListener('resize', this.handleWindowResize, false);
    unbindDomEventsFromMeshes(this.handrailModels, this.domEvents, this.domEventsMap);
  }

  handleHandrailMouseOver(e) {
    this.setState({hoveredHandrail: e.target});
  }

  processFiles() {
    const {
      stationFile,
      handrailFiles,
      strFiles,
      startHandrail,
      endHandrail,
      routes,
    } = this.props;
    if (!stationFile) {
      return;
    }
    if (this.stationModelIsDirty) {
      if (this.stationModel) {
        this.scene.remove(this.stationModel);
        this.stationModel.geometry.dispose();
        this.stationModel.material.dispose();
        this.stationModel = undefined;
      }
      const mesh = loadMeshFromFile(stationFile);
      this.stationModel = mesh;
      this.scene.add(mesh);
      this.camera.lookAt(mesh);
      this.stationModelIsDirty = false;
    }
    if (handrailFiles && Object.keys(handrailFiles).length > 0 && strFiles && strFiles.length > 0 ) {
      Object.entries(handrailFiles).forEach(([name, handrailFile]) => {
        let color = 'red';
        let scale = 1;
        if (startHandrail && name === `${startHandrail.value}.stl`) {
          color = 'green';
        } else if (endHandrail && name === `${endHandrail.value}.stl`) {
          color = 'black';
        } else {
          // refactor and exit early or just loop routes outside for performance
          routes.forEach(route => {
            route.nodes.forEach(node => {
              if (name === `${node}.stl`) {
                color = route.color;
                scale = 2;
              }
            });
          });
        }
        const handrailMesh = loadMeshFromFile(handrailFile, {color}, {scale});
        handrailMesh.name = name;
        this.handrailModels[name] = handrailMesh;
        this.scene.add(handrailMesh);
      });
      strFiles.forEach(strFile => positionModelsBasedOnStrFile(this.handrailModels, strFile));
      bindDomEventsToMeshes(this.handrailModels, this.domEvents, this.domEventsMap);
    }
    this.animate();
  }

  addShadowedLight(x, y, z, color, intensity) {
    const directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.set(x, y, z);
    this.scene.add(directionalLight);
    directionalLight.castShadow = true;
    const d = 1;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.bias = -0.005;
  }
  handleWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  animate() {
    requestAnimationFrame(this.animate);
    this.camera.lookAt(this.cameraTarget);
    this.renderer.render(this.scene, this.camera);
    this.stats.update();
  }

  render() {
    const {
      hoveredHandrail
    } = this.state;
    return (
      <div>
        <div className='info-panel'>
          {hoveredHandrail &&
            <div>
              <div>{hoveredHandrail.name}</div>
              <div>{Object.values(hoveredHandrail.position).join(', ')}</div>
            </div>
          }
        </div>
        <div ref={c => this.container = c}></div>
      </div>
    );
  }
}

Renderer.propTypes = {
  stationFile: PropTypes.object,
  handrailFiles: PropTypes.object.isRequired,
  strFiles: PropTypes.array.isRequired,
  startHandrail: PropTypes.object,
  endHandrail: PropTypes.object,
  routes: PropTypes.array,
};
