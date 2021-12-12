import { GUI } from 'https://cdn.jsdelivr.net/npm/three@0.127/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DEG2RAD } from 'three/src/math/MathUtils';


function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}


/**
 * 
 * @param {*} mesh 
 * @param {object=} ball optional  
 * @param {*} material 
 * @param {*} camera 
 * @param {*} renderer 
 */
function DebuggerBallGUI(camera, renderer, obj, openFolder = true){
  console.log(obj.name)
    const controls = new OrbitControls( camera, renderer.domElement );
    const gui = new GUI({autoplace: true});
    gui.domElement.id = obj.name.replace(/\s/g, '')
    gui.name = obj.name
    const ballFolder = gui.addFolder(obj.name + ' options')
    ballFolder.add(obj, 'visible').name("Display")
    ballFolder.add(obj.position, 'x', -140, 140).listen();
    ballFolder.add(obj.position, 'z', -90, 90).listen();
    if(openFolder){
      ballFolder.open()
    }

}
function CameraGUI(camera, renderer, openFolder = true){
  const controls = new OrbitControls( camera, renderer.domElement );
  const gui = new GUI({autoplace: true});
  
  gui.domElement.id = camera.name.replace(/\s/g, '')
  gui.name = camera.name + ' options'
  const cameraFolder = gui.addFolder('camera options')

  
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


export {DebuggerBallGUI, CameraGUI}
 