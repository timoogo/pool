import style from '@/css/style.css';
import * as THREE from 'three'
import { Color } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight , 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry(1.5, 3 ,0.5);
const material = new THREE.MeshBasicMaterial( { color: new Color({r:20 , g:20 , b:200 }), wireframe:true } );
const table = new THREE.Mesh( geometry, material );

scene.add( table );



camera.position.z = 5;
let freeViewButton = document.getElementById('freeView')
let topViewButton = document.getElementById('topView')
let resetView = document.getElementById('resetView')

const controls = new OrbitControls( camera, renderer.domElement );

let resetTheView = function(){
    controls.reset()
    camera.position.y = 0
    freeViewButton.disabled = false
}
const _debugger = document.querySelector('#debugger')

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    
    var isDebug = document.querySelector('#is_debug');
        if(isDebug.checked){
            debug(true, true, false, true)
            }
            else if(_debugger.checked === false){
                console.log(false)
                _debugger.style.display = 'none';
            }
}
resetTheView()
animate();



let moveToFree = function () {
    freeViewButton.disabled = true
    controls.enabled = true;
    console.log('freeview')
    topViewButton.disabled = false

}
let switchToTopView = function(){
    controls.reset()
    camera.position.y = 0
    freeViewButton.disabled = false
    topViewButton.disabled = true

}

freeView.onclick = moveToFree
resetView.onclick = resetTheView
topViewButton.onclick = switchToTopView 
/**
 * @param  {boolean} isDebug serves to know if we are in debug mode
 * @param  {boolean} positions serves to know if we want the position of the camera 
 * @param  {boolean} zoom serves to know the zoom level
 */
function debug(isDebug, positions, zoom){
    if(isDebug){
        if(positions){
            _debugger.querySelector('p#xPos').innerHTML = 'x ' + camera.position.x
            _debugger.querySelector('p#yPos').innerHTML = 'y ' + camera.position.y
            _debugger.querySelector('p#zPos').innerHTML = 'z '+ camera.position.z
        }
        else if(zoom){
            let zoomLevel = controls.target.distanceTo( controls.object.position )
            _debugger.querySelector('p#zoom').innerHTML =  zoomLevel
           }
    }
    


}