import style from '@/css/style.css';
import { func } from 'joi';
import * as THREE from 'three'
import { Color } from 'three';
import { GUI } from 'https://cdn.jsdelivr.net/npm/three@0.127/examples/jsm/libs/dat.gui.module.js';
import {DebuggerGUI} from './GUI.js'	

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight , 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const has_wireframe_checkbox = document.querySelector('input#has_wireframe')
const has_wireframe_checkbox_label = document.querySelector('label#wireframe_label')
const geometry = new THREE.BoxGeometry(1.5, 3 ,0.5);
const material = new THREE.MeshBasicMaterial( { color: new THREE.Color("rgb(0, 160, 0)"), wireframe: false } );
const mesh = new THREE.Mesh( geometry, material );
new DebuggerGUI(mesh, material, camera, renderer)

scene.add( mesh );
console.log(scene)
camera.position.z = 5;


function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

}
animate();
