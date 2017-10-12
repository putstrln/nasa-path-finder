/*
  stl files have models
  str files have model location & orientation
  this file deals with loading the files and putting the models in correct location
*/

import 'utils/stlLoader';

const defaultMaterialOptions = {
  color: '#B0C4DE'
};

const loadMeshFromFile = (file, materialOptions = {}) => {
  const loader = new THREE.STLLoader();
  const geometry = loader.parse(file);
  // center it to the bounding box
  geometry.center();
  const material = new THREE.MeshLambertMaterial({
    ...defaultMaterialOptions,
    ...materialOptions
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  mesh.rotation.set(90, 0, 30);
  // the models are in inches, scale back to meters
  // TODO: maybe guess units and scale automatically
  mesh.scale.set(0.0018, 0.0018, 0.0018);
  return mesh;
  // // Colored binary STL
  // loader.load('./models/stl/binary/colored.stl', function (geometry) {
  //   let meshMaterial = material;
  //   if (geometry.hasColors) {
  //     meshMaterial = new THREE.MeshLambertMaterial({opacity: geometry.alpha, vertexColors: THREE.VertexColors});
  //  }
  //   const mesh = new THREE.Mesh(geometry, meshMaterial);
  //   mesh.position.set(0.5, 0.2, 0);
  //   mesh.rotation.set(- Math.PI / 2, Math.PI / 2, 0);
  //   mesh.scale.set(0.3, 0.3, 0.3);
  //   mesh.castShadow = true;
  //   mesh.receiveShadow = true;
  //   this.scene.add(mesh);
  // });
}

export {
  loadMeshFromFile
}
