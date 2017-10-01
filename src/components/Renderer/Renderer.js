import React from 'react';
// import THREE from 'three';
import 'utils/stlLoader';
import Detector from 'utils/detector';
import Stats from 'stats-js';

export default class Renderer extends React.Component {
  constructor() {
    super();
    this.container = null;
    this.stats = null;
    this.camera = null;
    this.cameraTarget = null;
    this.scene = null;
    this.renderer = null;
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    if (!Detector.webgl) {
      Detector.addGetWebGLMessage();
    }
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 15);
    // this.camera.position.set(3, 0.15, 3);
    this.cameraTarget = new THREE.Vector3(0, -0.25, 0);
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0x72645b);
    // this.scene.fog = new THREE.Fog(0x72645b, 2, 15);
    // Ground
    // const plane = new THREE.Mesh(
    //   new THREE.PlaneBufferGeometry(40, 40),
    //   new THREE.MeshPhongMaterial({color: 0x999999, specular: 0x101010})
    // );
    // plane.rotation.x = -Math.PI/2;
    // plane.position.y = -0.5;
    // this.scene.add(plane);
    // plane.receiveShadow = true;
    // ASCII file
    const loader = new THREE.STLLoader();
    loader.load('./slotted_disk.stl', geometry => {
      const material = new THREE.MeshPhongMaterial({color: 0xff5533, specular: 0x111111, shininess: 200});
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, - 0.25, 0.6);
      mesh.rotation.set(0, - Math.PI / 2, 0);
      mesh.scale.set(0.5, 0.5, 0.5);
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      var box = new THREE.Box3().setFromObject( mesh );
      console.log('disk', box.min, box.max, box.size() );
      this.scene.add(mesh);
    });
    loader.load('./S0_3538.stl', geometry => {
      geometry.computeBoundingBox();
      const material = new THREE.MeshPhongMaterial({color: 0xff5533, specular: 0x111111, shininess: 200});
      const mesh = new THREE.Mesh(geometry, material);
      console.log(mesh)
      mesh.position.set(0, - 0.37, 0.6);
      // mesh.rotation.set(0, - Math.PI / 2, 0);
      // mesh.scale.set(0.05, 0.05, 0.05);
      // mesh.castShadow = true;
      // mesh.receiveShadow = true;
      var box = new THREE.Box3().setFromObject( mesh );
console.log('handrail', box.min, box.max, box.size() );
      console.log('rail pos', mesh.position);
      this.scene.add(mesh);
    });
    // Binary files
    // const material = new THREE.MeshPhongMaterial({color: 0xAAAAAA, specular: 0x111111, shininess: 200});
    // loader.load('./models/stl/binary/pr2_head_pan.stl', geometry => {
    //   const mesh = new THREE.Mesh(geometry, material);
    //   mesh.position.set(0, - 0.37, - 0.6);
    //   mesh.rotation.set(- Math.PI / 2, 0, 0);
    //   mesh.scale.set(2, 2, 2);
    //   mesh.castShadow = true;
    //   mesh.receiveShadow = true;
    //   this.scene.add(mesh);
    // });
    // loader.load('./models/stl/binary/pr2_head_tilt.stl', geometry => {
    //   const mesh = new THREE.Mesh(geometry, material);
    //   mesh.position.set(0.136, - 0.37, - 0.6);
    //   mesh.rotation.set(- Math.PI / 2, 0.3, 0);
    //   mesh.scale.set(2, 2, 2);
    //   mesh.castShadow = true;
    //   mesh.receiveShadow = true;
    //   this.scene.add(mesh);
    // });
    // // Colored binary STL
    // loader.load('./models/stl/binary/colored.stl', function (geometry) {
    //   let meshMaterial = material;
    //   if (geometry.hasColors) {
    //     meshMaterial = new THREE.MeshPhongMaterial({opacity: geometry.alpha, vertexColors: THREE.VertexColors});
    //  }
    //   const mesh = new THREE.Mesh(geometry, meshMaterial);
    //   mesh.position.set(0.5, 0.2, 0);
    //   mesh.rotation.set(- Math.PI / 2, Math.PI / 2, 0);
    //   mesh.scale.set(0.3, 0.3, 0.3);
    //   mesh.castShadow = true;
    //   mesh.receiveShadow = true;
    //   this.scene.add(mesh);
    // });
    // Lights
    this.scene.add(new THREE.HemisphereLight(0x443333, 0x111122));
    this.addShadowedLight(1, 1, 1, 0xffffff, 1.35);
    this.addShadowedLight(0.5, 1, -1, 0xffaa00, 1);
    // this.renderer
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.renderReverseSided = false;
    this.container.appendChild(this.renderer.domElement);
    // this.stats
    // this.stats = new Stats();
    // this.container.appendChild(this.stats.domElement);
    //
    window.addEventListener('resize', this.handleWindowResize, false);
    this.animate();
  }

  // componentDidMount() {
  //   // this.animate();
  // }

  componentDidUpdate() {
    // this.animate();
  }

  componentWillUnMount() {
    window.addEventListener('resize', this.handleWindowResize, false);
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
    this.renderStl();
    // this.stats.update();
  }
  renderStl() {
    const timer = Date.now() * 0.0005;
    this.camera.position.x = Math.cos(timer) * 3;
    this.camera.position.z = Math.sin(timer) * 3;
    this.camera.lookAt(this.cameraTarget);
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return <div ref={c => this.container = c}>Renderer</div>;
  }
}
