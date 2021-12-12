import {DebuggerBallGUI, CameraGUI} from './GUI.js'	
import * as THREE from 'three'
import {Ball} from "../../models/Ball.js"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// import {Table} from "./models/Table.js"
import { AxesHelper, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();



let color;
const whiteBall = new Ball(new THREE.SphereGeometry(6,30,30), new THREE.MeshLambertMaterial({
	color: "white"
}))
const redBall = new Ball(new THREE.SphereGeometry(6,30,30), new THREE.MeshLambertMaterial({
	color: "red"
}))
const yellowBall = new Ball(new THREE.SphereGeometry(6,30,30), new THREE.MeshLambertMaterial({
	color: "yellow"
}))
const groupBalls = new THREE.Group();
groupBalls.add(whiteBall, redBall, yellowBall)
groupBalls.name = 'Balls'
// const table = new Table(new THREE.BoxGeometry(150, 300 ,3), new THREE.MeshLambertMaterial({transparent: true }))
 const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight , 0.1, 1000 );
camera.name = "Main Camera"
const controls = new OrbitControls( camera, renderer.domElement );



function Renderer() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x333F47, 1);
	renderer.shadowMapSoft = true;
}

function Light() {
	let backLight = new THREE.DirectionalLight(0x93C54B, 0.10);
	backLight.position.set(0, 700, 200);
	backLight.name = 'Back light';
	let key_light = new THREE.DirectionalLight('white', 0.0);
	key_light.position.set(-6, -3, 0);
	key_light.name = 'Key light';
	let fill_light = new THREE.DirectionalLight('white', 0.0);
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

	camera.position.y = 300
	const loader = new GLTFLoader();
	loader.crossOrigin = true;
	loader.load( '../../models/obj/PoolMatte.glb', function ( data ) {
		const object = data.scene;
		object.position.set(0, 0, 0);
		 object.scale.set(1000, 1000, 1000)
		//	console.log(object.scale)
			scene.add( object );
			
	  //, onProgress, onError );
	  whiteBall.position.y = object.position.y + 11
	  redBall.position.y = object.position.y + 11
	  yellowBall.position.y = object.position.y + 11
	  redBall.position.x = 140
	  const cameraGUI = new CameraGUI(camera, renderer)

	});
	Light();
	Renderer();
	document.body.appendChild( renderer.domElement );


    const material = new THREE.MeshLambertMaterial({transparent: true });
	//whiteBall.position.set(0, 0, 1)
	whiteBall.name = 'White ball'
	yellowBall.name = 'Yellow ball'
	redBall.name = "Red ball"
	scene.add(  groupBalls  );
	
	const whiteBallGUI =  new DebuggerBallGUI(camera, renderer, whiteBall)
	 const redBallGUI =  new DebuggerBallGUI(camera, renderer, redBall)
	 const yellowBallGUI =  new DebuggerBallGUI(camera, renderer, yellowBall)
//	console.log(ballsArray)
	// const axisHelper = new THREE.AxesHelper()

//	 console.log(scene)
	// scene.add( axisHelper);


}

function BallChecker(ball) {
	let top_right_pocket = new Vector3(-140, 0, -90)
	let top_left_pocket = new Vector3(-140, 0, 90)
	let middle_left_pocket = new Vector3(0, 0, 90)
	let middle_right_pocket = new Vector3(0, 0, -90)
	let bottom_right_pocket = new Vector3(140, 0, -90)
	let bottom_left_pocket = new Vector3(140, 0, 90)

	// if(ball.position.x !=140 )

	if(ball.visible){
		if (ball.position.x == top_right_pocket.x && ball.position.z == top_right_pocket.z ){
			console.log('Ball felt in the top right pocket', )
			ball.visible = false
			renderEvent("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhRMf_T8E4OzWFVCbgIzcTcOhtgr48Wp0OOg&usqp=CAU")
			ball.position.x = 0
			ball.position.z = 0
			ball.visible = true
		} 
		if (ball.position.x == top_left_pocket.x && ball.position.z == top_left_pocket.z ){
			console.log('Ball felt in the top left pocket', )
			ball.visible = false
			renderEvent("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhRMf_T8E4OzWFVCbgIzcTcOhtgr48Wp0OOg&usqp=CAU")
			ball.position.x = 0
			ball.position.z = 0
			ball.visible = true
		} 
		if (ball.position.x == middle_left_pocket.x && ball.position.z == middle_left_pocket.z ){
			console.log('Ball felt in the middle left pocket', )
			ball.visible = false
			renderEvent("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhRMf_T8E4OzWFVCbgIzcTcOhtgr48Wp0OOg&usqp=CAU")
			ball.position.x = 0
			ball.position.z = 0
			ball.visible = true
		} 
		if (ball.position.x == middle_right_pocket.x && ball.position.z == middle_right_pocket.z ){
			console.log('Ball felt in the middle right pocket', )
			ball.visible = false
			renderEvent("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhRMf_T8E4OzWFVCbgIzcTcOhtgr48Wp0OOg&usqp=CAU")
			ball.position.x = 0
			ball.position.z = 0
			ball.visible = true
		} 
		if (ball.position.x == bottom_left_pocket.x && ball.position.z == bottom_left_pocket.z ){
			console.log('Ball felt in the bottom left pocket', )
			ball.visible = false
			renderEvent("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhRMf_T8E4OzWFVCbgIzcTcOhtgr48Wp0OOg&usqp=CAU")
			ball.position.x = 0
			ball.position.z = 0
			ball.visible = true
		} 
		if (ball.position.x == bottom_right_pocket.x && ball.position.z == bottom_right_pocket.z ){
			console.log('Ball felt in the bottom right pocket', )
			ball.visible = false
			renderEvent("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhRMf_T8E4OzWFVCbgIzcTcOhtgr48Wp0OOg&usqp=CAU")
			ball.position.x = 0
			ball.position.z = 0
			ball.visible = true
		} 
	}
}
function renderEvent(source){

	var img = document.createElement('img');
	img.src = source;
	document.getElementById('container').appendChild(img);
	img.style.zIndex = "100000"
	img.style.position = "fixed"
	img.style.top = "50%"
	img.style.left = "50%"
	img.style.transform = "translate(-50%, -50%)"
	setTimeout(()=>{
		img.remove()
	}, 2000)

}
export function animate() {
	controls.enableDamping = true
	controls.dampingFactor = 0.05
	//controls.update(  )

	BallChecker(whiteBall)
	BallChecker(redBall)
	BallChecker(yellowBall)

	// redBall.MotionDesign(scene, /*table,*/  redBall)
	// whiteBall.Move(scene, /* table */)
	// console.log(camera.position.x, camera.position.y, camera.position.z)

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	window.addEventListener('resize', () =>{
		renderer.setSize( window.innerWidth, window.innerHeight );
    	
		camera.aspect = (window.innerWidth / window.innerHeight)
		camera.updateProjectionMatrix()
		
	})


}

