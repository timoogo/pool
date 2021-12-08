import style from '@/css/style.css';
import {DebuggerGUI} from './GUI.js'	

import * as THREE from 'three'
import {Ball} from "./models/Ball.js"
import {Table} from "./models/Table.js"








const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
let color;
const whiteBall = new Ball(new THREE.SphereGeometry(6,30,30), new THREE.MeshLambertMaterial({
	color: "white"
}))
const redBall = new Ball(new THREE.SphereGeometry(6,30,30), new THREE.MeshLambertMaterial({
	color: "red"
}))
// holetest
const material2 = new THREE.MeshBasicMaterial({color: 0xffff00 });
const geometry2 = new THREE.CylinderGeometry(20, 20, 24, 30, 30, false);
const cylinder = new THREE.Mesh(geometry2, material2);
// end 
const table = new Table(new THREE.BoxGeometry(150, 300 ,3), new THREE.MeshLambertMaterial({transparent: true }))
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
	scene.add(object3d);
	object3d = new THREE.DirectionalLight('white', 0.35);
	object3d.position.set(-6, -3, 0);
	object3d.name = 'Key light';
	scene.add(object3d);
	object3d = new THREE.DirectionalLight('white', 0.55);
	object3d.position.set(9, 9, 6);
	object3d.name = 'Fill light';
	scene.add(object3d);
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(3, 30, 3);
	spotLight.castShadow = true;
	var backLight = new THREE.SpotLight(0x000000);
	backLight.position.set(0, 30, -300);
	backLight.castShadow = true;
	
	scene.add(spotLight, backLight);
}


export function init(){
	camera.position.z = 300;
	Light();
	// createSphere()
	Renderer();
	document.body.appendChild( renderer.domElement );


    const material = new THREE.MeshLambertMaterial({transparent: true });
	
	
	// mesh.position.z = 0 
	whiteBall.parent = table
	redBall.position.x= 15
	redBall.position.z= 10
	whiteBall.position.z =10 
	whiteBall.name = 'Boule Blanche'
	cylinder.position.x = 15
	cylinder.position.z = 15
	// console.log(whiteBall.parent)
	// const axisHelper = new THREE.AxesHelper()


	new DebuggerGUI(table,redBall, material, camera, renderer)
	cylinder.parent = table
	cylinder.rotation.x = 45
	scene.add( table, whiteBall, redBall,/* holetest */ cylinder /* end holetest */  );
	// scene.add( axisHelper);

}

function  rand (min, max) {
	return Math.random(min, max)
}
export function animate() {
	redBall.MotionDesign(scene, table, redBall)
	//console.log(velY)
	whiteBall.Move(scene, table)


	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	window.addEventListener('resize', () =>{
		renderer.setSize( window.innerWidth, window.innerHeight );
    	
		camera.aspect = (window.innerWidth / window.innerHeight)
		camera.updateProjectionMatrix()
		
	})


}

