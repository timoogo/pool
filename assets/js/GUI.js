import { GUI } from 'https://cdn.jsdelivr.net/npm/three@0.127/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
/**
 * 
 * @param {*} degrees 
 * @returns tne conversion of the degrees into radians
 */
function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}


/**
 
**/

function DebuggerMultiGUI(name, folders) {
  const gui = new GUI({autoplace: true})
  gui.name = name
  gui.domElement.id = name.replace(/\s/g, '')
  
  folders.forEach(folder => {
    const guiFolder = gui.addFolder(folder.name)
    folder.options.forEach(option => guiFolder.add(...option).listen())
  })
}

function DebuggerTableGUI(camera, renderer, obj, openFolder = false){
    const controls = new OrbitControls( camera, renderer.domElement );
    const gui = new GUI({autoplace: true});
    gui.domElement.id = obj.name.replace(/\s/g, '')
    gui.name = obj.name
    const tableFolder = gui.addFolder('table options')
    tableFolder.add(obj, 'visible').name("Display")
    const positionFolder = gui.addFolder('Position')
    positionFolder.add(obj.position, 'x', -140, 140).listen();
    positionFolder.add(obj.position, 'y', -500, 500).listen();
    positionFolder.add(obj.position, 'z', -90, 90).listen();
    if(openFolder){
      tableFolder.open()
    }

}
function DebuggerCueGUI(camera, renderer, obj, openFolder){
 const controls = new OrbitControls(camera, renderer.domElement)
 const gui = new GUI({autoplace: true});
 console.log(obj.position)
 const cueFolder = gui.addFolder('cue options')
    cueFolder.add(obj, 'visible').name("Display")
    cueFolder.add(obj.position, 'x', -500, 500).listen();
    cueFolder.add(obj.position, 'y', -500, 500).listen();
    cueFolder.add(obj.position, 'z', -500, 500).listen();
    const rotationFolder = gui.addFolder('Rotation')
    rotationFolder.add(obj.rotation, 'x', -90 * Math.PI / 180, 90 * Math.PI / 180).listen();
    rotationFolder.add(obj.rotation, 'y', -90 * Math.PI / 180, 90 * Math.PI / 180).listen();
    rotationFolder.add(obj.rotation, 'z', -90 * Math.PI / 180, 90 * Math.PI / 180).listen();
    if(openFolder){
      cueFolder.open()
    }
}
/**
 * debugger of the camera 
 * @param {*} camera 
 * @param {*} renderer 
 * @param {*} openFolder 
 */
function CameraGUI(camera, renderer, openFolder = false){
  const controls = new OrbitControls( camera, renderer.domElement );
  const gui = new GUI({autoplace: true});
  
  gui.domElement.id = camera.name.replace(/\s/g, '')
  gui.name = camera.name + ' options'
  const cameraFolder = gui.addFolder('camera options')
  const positionFolder = cameraFolder.addFolder('position')
  positionFolder.add(camera.position, 'x', -140, 140).listen();
  positionFolder.add(camera.position, 'y', -500, 500).listen();
  positionFolder.add(camera.position, 'z', -90, 90).listen();
  const rotationFolder = cameraFolder.addFolder('Rotation')
  rotationFolder.add(camera.rotation, 'x', -90, 90).step(1).listen();
  rotationFolder.add(camera.rotation, 'y', 0, 90).step(1).listen();
  rotationFolder.add(camera.rotation, 'z', -90, 90).step(1).listen();
  
  let topView = { topView:function(){
  //  controls.reset()

  camera.position.set(0,300,0)
  camera.lookAt(0,0,0)
    }
  };
  let rotateClockWise = {rotateClockWise: function() {
    console.log(camera.rotation.z) 
      camera.rotation.z += degrees_to_radians(90);
      console.log(camera.rotation.z) 
  }}
   
  cameraFolder.add(topView, 'topView')
  cameraFolder.add(rotateClockWise, 'rotateClockWise').name ('Rotate by 90 deg')
  if(openFolder){
    cameraFolder.open()

  }
}

export { DebuggerTableGUI,DebuggerCueGUI, CameraGUI, DebuggerMultiGUI}
 