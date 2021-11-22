import style from '@/css/style.css';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight , 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry(1.5, 3 ,0.5);
const material = new THREE.MeshBasicMaterial( { color: 0x41a248 } );
const table = new THREE.Mesh( geometry, material );

scene.add( table );



camera.position.z = 5;
let topViewButton = document.getElementById('topView')
let freeViewButton = document.getElementById('freeView')

const controls = new OrbitControls( camera, renderer.domElement );

let resetView = document.getElementById('resetView')
let resetTheView = function(){
    controls.reset()
    camera.position.y = 0
    freeViewButton.disabled = false
    topViewButton.disabled = false
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    
    var isDebug = document.querySelector('#is_debug');
    setInterval(function(){ 
        if(isDebug.checked){
            debug(true, true, false)
            }
    }, 1000);
    

}
resetTheView()
animate();



let moveToTop = function () {
    console.log('tada')
    topViewButton.disabled = true
    freeViewButton.disabled = false

    controls.enabled = false;
}
let moveToFree = function () {
    freeViewButton.disabled = true
    topViewButton.disabled = false
    controls.enabled = true;
    console.log('freeview')
}

topView.onclick = moveToTop
freeView.onclick = moveToFree
resetView.onclick = resetTheView
/**
 * @param  {boolean} isDebug serves to know if we are in debug mode
 * @param  {boolean} positions serves to know if we want the position of the camera 
 * @param  {boolean} zoom serves to know the zoom level
 */
function debug(isDebug, positions, zoom){
    const _debugger = document.querySelector('#debugger')
    const controls = new OrbitControls( camera, renderer.domElement );
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