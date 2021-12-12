import { GUI } from 'https://cdn.jsdelivr.net/npm/three@0.127/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


function d2r(degrees)
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
function DebuggerGUI(ball,mesh, material, camera, renderer){
    const controls = new OrbitControls( camera, renderer.domElement );
    const gui = new GUI({autoplace: false});
    gui.domElement.id = 'gui';
    
    
    const debuggerFolder = gui.addFolder('Debugger')
    debuggerFolder.add( material, 'wireframe' );
    //Rotation
    const rotationFolder = debuggerFolder.addFolder('Rotation')
    rotationFolder.add(mesh.rotation, 'x', -Math.PI/2, Math.PI/2)
    rotationFolder.add(mesh.rotation, 'y', -Math.PI/2, Math.PI/2)
    rotationFolder.add(mesh.rotation, 'z', -Math.PI/2, Math.PI/2)
    //Position
    const positionFolder = debuggerFolder.addFolder('Position')
    positionFolder.add(mesh.position, 'x', -5, 5)
    positionFolder.add(mesh.position, 'y', -2, 2)
    positionFolder.add(mesh.position, 'z', - Math.PI * 2, camera.position.z+2.5)
    const resetFolder = debuggerFolder.addFolder('Reset')


  
    let topView = { topView:function(){
     // mesh.rotation.set(0,0,0)
     camera.position.set(0,0, 300)
     camera.rotation.set(0,0, 0)     
      }
    };
    let sideView = {sideView: () => {
     console.log(camera.rotation)
      camera.rotation.z+= d2r(90)
    }}
    let params = {
        rotX: mesh.rotation.x,
        rotY: mesh.rotation.y,
        rotZ: mesh.rotation.z,
        balls: console.log(mesh),
        randomize: _ => {
          //params.rotX = Math.max(0, Math.min(Math.random() * 360, 180))
          // params.rotX = Math.random() * 360;
          params.rotY = Math.random() * d2r(360);
          params.rotZ = Math.random() * d2r(360);
          // mesh.rotation.x = params.rotX
          mesh.rotation.y = params.rotY

          mesh.rotation.z = params.rotZ
        }
      }
    resetFolder.add(params, "randomize");      
    resetFolder.add(topView, 'topView')
    resetFolder.add(sideView, 'sideView')


    debuggerFolder.open();
    rotationFolder.open();
    positionFolder.open();
    resetFolder.open();
   
   
    try {
      if(ball != undefined){
        
       // console.log(ball)
        let ballFolder = gui.addFolder(`ballFolder ${ball}`)
        let isActive = true
        ballFolder.add( ball, 'visible' );
        if(!isActive){
          ball.visible = false
        }
        ballFolder.add(ball.position, 'x', -140, 140)
        ballFolder.add(ball.position, 'z', -90, 90)
        ballFolder.open()
        if(ball.position.x > 75){
          isActive = false
        }
      }
        } catch (e) {
      console.log(e)
        }

}



export {DebuggerGUI}
 