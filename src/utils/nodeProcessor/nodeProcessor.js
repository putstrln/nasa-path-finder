/*
  stl files have models
  str files have model location & orientation
  this file deals with loading the files and putting the models in correct location
*/

import 'utils/stlLoader';

const MMETER_PER_INCH = 0.00254;
const PITCH_YAW_ROLL_ORDER = 'YZX';

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
  // the models are in inches, scale back to meters
  // TODO: maybe guess units and scale automatically
  mesh.scale.set(MMETER_PER_INCH, MMETER_PER_INCH, MMETER_PER_INCH);
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

const positionModelsBasedOnStrFile = (modelsMap, file) => {
  const allLines = file.split(/\r\n|\n/);
  allLines.splice(allLines.length - 1, 1); // last line is empty
  /*
    example format
    ------------------
    HWY_XXX
    HWY_XXX.stl
    221.42 0.00 190.95
    180.00 0.00 180.00
    SSREF
  */
  for (let i = 0; i < allLines.length; i += 5) {
    const modelId = allLines[i];
    const model = modelsMap[modelId + '.stl'];
    if (model) {
      const [x, y, z] = allLines[i + 2].split(' ').map(pos => parseInt(pos) * MMETER_PER_INCH);
      // adjust model position to fit the main model, this is probably from rounding
      model.position.set(x - 0.15, y - 0.05, z - 0.25)
    }
  }
};

export {
  loadMeshFromFile,
  positionModelsBasedOnStrFile
}
