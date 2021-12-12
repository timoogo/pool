import {DebuggerGUI} from './GUI.js'	
import * as THREE from 'three'
import {Ball} from "../../models/Ball.js"

// import {Table} from "./models/Table.js"
import { AxesHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { object } from 'joi';
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
	let backLight = new THREE.DirectionalLight(0x93C54B, 0.10);
	backLight.position.set(0, 700, 200);
	backLight.name = 'Back light';
	let key_light = new THREE.DirectionalLight('white', 0.35);
	key_light.position.set(-6, -3, 0);
	key_light.name = 'Key light';
	let fill_light = new THREE.DirectionalLight('white', 0.10);
	fill_light.position.set(9, 9, 6);
	fill_light.name = 'Fill light';
	let spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(3, 700, 3);
	spotLight.castShadow = true;
	const groupLight = new THREE.Group();
	groupLight.add(spotLight, backLight, key_light, fill_light)
	scene.add(groupLight);
	groupLight.name = "Lighting"
}


export function init(){
	camera.position.y = 1000
	const loader = new GLTFLoader();
	loader.crossOrigin = true;
	loader.load( '../../models/obj/Pool.glb', function ( data ) {
		
	  
		const object = data.scene;
		object.position.set(0, 0, 0);
		 object.scale.set(1000, 1000, 1000)
			console.log(object.scale)
			scene.add( object );
			
	  //, onProgress, onError );
	  whiteBall.position.y = object.position.y + 11
	  redBall.position.y = object.position.y + 11
	});
	Light();
	Renderer();
	document.body.appendChild( renderer.domElement );


    const material = new THREE.MeshLambertMaterial({transparent: true });
	scene.add(  whiteBall  );
	//whiteBall.position.set(0, 0, 1)
	whiteBall.name = 'Boule Blanche'
	
	// const axisHelper = new THREE.AxesHelper()
	new DebuggerGUI(/* table, */ whiteBall,  redBall, material, camera, renderer)
	// console.log(scene)
	// scene.add( axisHelper);



}


export function animate() {
	
	// redBall.MotionDesign(scene, /*table,*/  redBall)
	// whiteBall.Move(scene, /* table */)
	console.log(camera.position.x, camera.position.y, camera.position.z)

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	window.addEventListener('resize', () =>{
		renderer.setSize( window.innerWidth, window.innerHeight );
    	
		camera.aspect = (window.innerWidth / window.innerHeight)
		camera.updateProjectionMatrix()
		
	})


}

