import style from '@/css/style.css';
import {DebuggerGUI} from './GUI.js'	

import * as THREE from 'three'
import {Ball} from "../../models/Ball.js"
// import {Table} from "./models/Table.js"


import { OBJLoader } from './jsm/loaders/OBJLoader.js';
import { MTLLoader } from './jsm/loaders/MTLoader.js'

let table
function loadModel() {

	table.traverse( function ( child ) {

		if ( child.isMesh ) child.material.map = texture;

	} );

	table.position.y = - 95;
	scene.add( table );

}

const manager = new THREE.LoadingManager( loadModel );

manager.onProgress = function ( item, loaded, total ) {

	console.log( item, loaded, total );

};

// texture

const mtlLoader = new MTLLoader( manager );
const texture = mtlLoader.load( 'models/obj/Pool.mtl' );


function onProgress( xhr ) {

	if ( xhr.lengthComputable ) {

		const percentComplete = xhr.loaded / xhr.total * 100;
		console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );

	}

}
function onError() {}

const loader = new OBJLoader( manager );
loader.load( 'models/obj/Pool.obj', function ( obj ) {
	table = obj;
}, onProgress, onError );

const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
let color;
const whiteBall = new Ball(new THREE.SphereGeometry(6,30,30), new THREE.MeshLambertMaterial({
	color: "white"
}))
const redBall = new Ball(new THREE.SphereGeometry(6,30,30), new THREE.MeshLambertMaterial({
	color: "red"
}))
// const table = new Table(new THREE.BoxGeometry(150, 300 ,3), new THREE.MeshLambertMaterial({transparent: true }))
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight , 0.1, 1000 );


function Renderer() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x333F47, 1);
	renderer.shadowMapSoft = true;
}

function Light() {
	var object3d = new THREE.DirectionalLight(0x93C54B, 0.55);
	object3d.position.set(0, 30, 200);
	object3d.name = 'Back light';
	object3d = new THREE.DirectionalLight('white', 0.35);
	object3d.position.set(-6, -3, 0);
	object3d.name = 'Key light';
	object3d = new THREE.DirectionalLight('white', 0.55);
	object3d.position.set(9, 9, 6);
	object3d.name = 'Fill light';
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(3, 30, 3);
	spotLight.castShadow = true;
	var backLight = new THREE.SpotLight(0x000000);
	backLight.position.set(0, 30, -300);
	backLight.castShadow = true;
	const groupLight = new THREE.Group();
	groupLight.add(spotLight, backLight, object3d)
	scene.add(groupLight);
	groupLight.name = "Lighting"
}


export function init(){
	camera.position.z = 300;
	Light();
	// createSphere()
	Renderer();
	document.body.appendChild( renderer.domElement );


    const material = new THREE.MeshLambertMaterial({transparent: true });

	redBall.position.y = -86
	whiteBall.position.z =10 
	whiteBall.name = 'Boule Blanche'
	// const axisHelper = new THREE.AxesHelper()


	new DebuggerGUI(/* table, */ whiteBall,  redBall, material, camera, renderer)
	
	scene.add( /* table,*/ whiteBall, redBall  );
	// scene.add( axisHelper);

}

function  rand (min, max) {
	return Math.random(min, max)
}
export function animate() {
	redBall.MotionDesign(scene, /*table,*/  redBall)
	//console.log(velY)
	whiteBall.Move(scene, /* table */)


	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	window.addEventListener('resize', () =>{
		renderer.setSize( window.innerWidth, window.innerHeight );
    	
		camera.aspect = (window.innerWidth / window.innerHeight)
		camera.updateProjectionMatrix()
		
	})


}

