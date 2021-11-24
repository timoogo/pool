import style from '@/css/style.css';
import { func } from 'joi';
import * as THREE from 'three'
import { Color } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'https://cdn.jsdelivr.net/npm/three@0.127/examples/jsm/libs/dat.gui.module.js';
	


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight , 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
//toggle wireframe
const has_wireframe_checkbox = document.querySelector('input#has_wireframe')
const has_wireframe_checkbox_label = document.querySelector('label#wireframe_label')

const geometry = new THREE.BoxGeometry(1.5, 3 ,0.5);
let material = new THREE.MeshBasicMaterial( { color: new THREE.Color("rgb(0, 160, 0)"), wireframe: false } );
const mesh = new THREE.Mesh( geometry, material );
const gui = new GUI();
gui.add( material, 'wireframe' );
gui.add(mesh.rotation, 'x', 0, Math.PI * 2)
gui.add(mesh.rotation, 'y', 0, Math.PI * 2)
gui.add(mesh.rotation, 'z', 0, Math.PI * 2)
gui.open();
scene.add( mesh );
console.log(scene)
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


function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    DebugMode(); 
    
}

resetTheView()
animate();
has_wireframe_checkbox.addEventListener("change", function(){
    if(this.checked){
        scene.children[0].material.wireframe = true
            }
            else {
                scene.children[0].material.wireframe = false
            }
        })



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

function DebugMode(){
    //Debug Checkbox
    let is_debug_checkbox = document.querySelector('input#is_debug')
    let is_debug_checkbox_label = document.querySelector('label#debug_label')
    //Data
    let data = document.querySelector(".data")
    //Wireframe mode


    if(is_debug_checkbox.checked == true){
        is_debug_checkbox_label.innerHTML = "Debug mode" + "true"
        has_wireframe_checkbox.style.display = "inline-block"
        has_wireframe_checkbox_label.style.display = "inline-block"
       // console.log(toggleWireframe)
       let xPos, yPos, zPos, zoom
       xPos = document.querySelector('#xPos')
       yPos = document.querySelector('#yPos')
       zPos = document.querySelector('#zPos')
       zoom = document.querySelector('#zoom')
       
        

        data.style.display = "block"
        
        xPos.innerHTML = camera.position.x 
        yPos.innerHTML  = camera.position.y  
        zPos.innerHTML  = camera.position.z  
        zoom.innerHTML = controls.target.distanceTo( controls.object.position )
    } else{
        is_debug_checkbox_label.innerHTML = "Debug mode"
        data.style.display = "none"
        has_wireframe_checkbox.style.display = "none"
        has_wireframe_checkbox_label.style.display = "none"
    }
}
