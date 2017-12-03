/*
  stl files have models
  str files have model location & orientation
  this file deals with loading the files and putting the models in correct location
*/

import 'utils/stlLoader';
import THREEx from 'utils/threex.domevents';

const MMETER_PER_INCH = 0.00254;

const defaultMaterialOptions = {
  color: '#B0C4DE',
};

const loadMeshFromFile = (file, materialOptions = {}, extraOptions = {scale: 1}) => {
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
  const scale = MMETER_PER_INCH * extraOptions.scale;
  // TODO: maybe guess units and scale automatically
  mesh.scale.set(scale, scale, scale);
  return mesh;
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

const parseNodesFromStrFile = file => {
  const nodes = [];
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
    const unique_node_name = allLines[i];
    const geometry_file_name = unique_node_name + '.stl';
    const [x, y, z] = allLines[i + 2].split(' ');
    const [pitch, yaw, roll] = allLines[i + 3].split(' ');
    const parent_node_name = allLines[i + 4];
    nodes.push({
      unique_node_name,
      geometry_file_name,
      x,
      y,
      z,
      pitch,
      yaw,
      roll,
      parent_node_name
    });
  }
  return nodes;
};

const createDomEvents = (camera, renderer) => {
  return new THREEx.DomEvents(camera, renderer.domElement);
};

const bindDomEventsToMeshes = (modelsMap, domEvents, events) => {
  for (const id in modelsMap) {
    const mesh = modelsMap[id];
    for (const eventName in events) {
      domEvents.addEventListener(mesh, eventName, events[eventName], false);
    }
  }
};

const unbindDomEventsFromMeshes = (modelsMap, domEvents, events) => {
  for (const id in modelsMap) {
    const mesh = modelsMap[id];
    for (const eventName in events) {
      domEvents.removeEventListener(mesh, eventName, events[eventName], false);
    }
  }
};

export {
  loadMeshFromFile,
  positionModelsBasedOnStrFile,
  createDomEvents,
  bindDomEventsToMeshes,
  unbindDomEventsFromMeshes,
  parseNodesFromStrFile
}
