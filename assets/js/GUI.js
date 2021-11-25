import { GUI } from 'https://cdn.jsdelivr.net/npm/three@0.127/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function DebuggerGUI(mesh, material, camera, renderer){
    const controls = new OrbitControls( camera, renderer.domElement );
    const gui = new GUI({autoplace: false});
    gui.domElement.id = 'gui';
  

    const debuggerFolder = gui.addFolder('Debugger')
    debuggerFolder.add( material, 'wireframe' );
    //Rotation
    const rotationFolder = debuggerFolder.addFolder('Rotation')
    rotationFolder.add(mesh.rotation, 'x', 0, 180)


    

    rotationFolder.add(mesh.rotation, 'y', 0, Math.PI * 2)
    rotationFolder.add(mesh.rotation, 'z', 0, Math.PI * 2)
    //Position
    const positionFolder = debuggerFolder.addFolder('Position')
    positionFolder.add(mesh.position, 'x', -5, 5)
    positionFolder.add(mesh.position, 'y', -2, 2)
    positionFolder.add(mesh.position, 'z', - Math.PI * 2, camera.position.z+2.5)
    const resetFolder = debuggerFolder.addFolder('Reset')
    var topView = { topView:function(){
        mesh.position.x = 0; mesh.position.y = 0; 
        mesh.rotation.x = 0; mesh.rotation.y = 0; mesh.rotation.z = 0
        console.log(mesh.position)
    }};
    let params = {
        rotX: mesh.rotation.x,
        rotY: mesh.rotation.y,
        rotZ: mesh.rotation.z,
        randomize: _ => {
          //params.rotX = Math.max(0, Math.min(Math.random() * 360, 180))
          params.rotX = Math.random() * 360;
          params.rotY = Math.random() * 360;
          params.rotZ = Math.random() * 360;
          console.log(params)
          mesh.rotation.x = params.rotX
          mesh.rotation.y = params.rotY
          mesh.rotation.z = params.rotZ
        }
      }
    resetFolder.add(params, "randomize");      
    resetFolder.add(topView, 'topView')


    debuggerFolder.open();
    rotationFolder.open();
    positionFolder.open();
    resetFolder.open();


}



export {DebuggerGUI}