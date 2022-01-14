import {

	DebuggerTableGUI,
	DebuggerCueGUI,
	CameraGUI,
	DebuggerMultiGUI,
	DebuggerBallGUI

} from './GUI.js'
import * as THREE from 'three'
import {
	Ball
} from "../../models/Ball.js"
import {
	OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

import {
	AxesHelper,
	Vector3
} from 'three';
import {
	GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader';

import Stats from 'three/examples/jsm/libs/stats.module'

const TABLE_SIZE = {
	L: 430,
	H: 216
}

const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();


const redBall = new Ball(new THREE.SphereGeometry(6, 30, 30), new THREE.MeshLambertMaterial({
	color: "red"
}))

const balls = new THREE.Group();
balls.add(redBall)
balls.name = 'balls'
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.name = "Main Camera"
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 200
controls.maxDistance = 400
controls.touches = {
	ONE: THREE.TOUCH.DOLLY_ROTATE,
	TWO: THREE.TOUCH.DOLLY_PAN,

}
const stats = new Stats()


let listOfBalls = []
/**
 * Init function for loading all the assets of the scenes loader is specific for the table (const object)setting the initial position of the balls
 * Creating the gui for debugging balls and camera
 * Then, we set the light on the scene and we call the renderer. 
 */
const socket = io.connect("https://vps.thomasjuldo.com", {
	path: "/realtimepool/socket.io/",
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
	agent: false,
	upgrade: false,
	rejectUnauthorized: false,
	transports: ["websocket"],
});

socket.on("new_data", (data) => {
	//  console.log(data);
	listOfPosition = ConvertListPosition(data)
});

export function init() {
	new DebuggerBallGUI(camera, renderer, redBall, true)
	document.body.appendChild(stats.dom)

	const axisHelper = new THREE.AxesHelper(500)

	scene.add(axisHelper)
	camera.position.set(0, 300, 0)

	Light();
	Renderer();
	document.body.appendChild(renderer.domElement);


	const material = new THREE.MeshLambertMaterial({
		transparent: true
	});
	const table = LoadModel("DVIC_table")
	const cue = LoadModel('DVIC_cue')

	redBall.name = "Red ball"
	redBall.position.y = -11
	redBall.position.x = 140
	scene.add(balls);
	const cameraGUI = new CameraGUI(camera, renderer, true)


	initFrame(listOfPosition)
	//console.log("je suis 1")
	setInterval(() => {
		//console.log(frames)
		frames = 0;
	}, 1000)
}
let frames = 0

/**
 * Animate function which call itself for "animating all objects on the scene"
 * verify if balls are in a hole
 */

export function animate() {
	frames++;


	stats.update()
	let i = 0
	controls.enableDamping = true
	controls.dampingFactor = 0.05
	//controls.update(  )

	BallChecker(redBall)

	// redBall.MotionDesign(scene, /*table,*/  redBall)
	// console.log(camera.position.x, camera.position.y, camera.position.z)

	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = (window.innerWidth / window.innerHeight)
		camera.updateProjectionMatrix()
	})
	updateBalls(listOfPosition, balls)

}



///  

/**
 * Renderer function for setting the size and color
 */

function Renderer() {
	renderer.setSize(window.innerWidth, window.innerHeight); // size
	renderer.setClearColor(0x333F47, 1); //color
	renderer.shadowMapSoft = true;
}
/**
 * Function for creating all lights of the scene 
 * 
 */
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

/**
 * Returns a random position
 * Used in @BallChecker() (after the ball enters a hole)
 * @param {Integer} min 
 * @param {Integer} max 
 * @returns 
 */
function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
}
/**
 * Verify if the ball is insîde a pocket.
 * If so, the function calls the  @renderEvent() function
 * Then it will place the ball randomly on the table surface
 * Then, finally, will make the ball reappair 
 * @param {Object} ball 
 */
function BallChecker(ball) {
	if (!ball.visible) return;

	const DISTANCE_THRESHOLD = 81; // (pocket_radius = 9 + ball_radius = 6)^2 // Hole - ballRadius

	function ballInPocket(gifUrl, logMessage, holeName) {
		console.log(logMessage)
		ball.visible = false
		renderEvent(gifUrl, ball.name, holeName)
		ball.position.x = 0
		ball.position.z = 20
		setTimeout(() => {
			ball.visible = true
		}, 5500)
	}

	function logThis(name, arg) {
		console.log(name + " -> " + arg)
		return arg;
	}

	const position = ball.position;
	let currentPocket = {
		x: -215,
		z: -108
	}; //top_right_pocket
	if (
		Math.pow(currentPocket.x - position.x, 2 + Math.pow(currentPocket.z - position.z, 2)) <= DISTANCE_THRESHOLD) {
		ballInPocket("https://billiards.colostate.edu/images/one-pocket/straight_back_kiss_beat.gif",
			ball.name,
			" top right pocket")
		return;
	}

	currentPocket = {
		x: -215,
		z: 108
	}; //top_left_pocket
	if (
		Math.pow(currentPocket.x - position.x, 2) + Math.pow(currentPocket.z - position.z, 2) <= DISTANCE_THRESHOLD) {
		ballInPocket("https://billiards.colostate.edu/images/one-pocket/straight_back_kiss_beat.gif",
			ball.name,
			" //top_left_pocket")

		return;
	}

	currentPocket = {
		x: 0,
		z: 108
	}; //middle_top_pocket
	if (
		Math.pow(currentPocket.x - position.x, 2) + Math.pow(currentPocket.z - position.z, 2) <= DISTANCE_THRESHOLD) {
		ballInPocket("https://billiards.colostate.edu/images/one-pocket/straight_back_kiss_beat.gif",
			ball.name,
			" middle_top_pocket")

		return;
	}

	currentPocket = {
		x: 0,
		z: -108
	}; //middle_bottom_pocket
	if (
		Math.pow(currentPocket.x - position.x, 2) + Math.pow(currentPocket.z - position.z, 2) <= DISTANCE_THRESHOLD) {
		ballInPocket("https://billiards.colostate.edu/images/one-pocket/straight_back_kiss_beat.gif",
			ball.name,
			" middle_bottom_pocket")

		return;
	}

	currentPocket = {
		x: 215,
		z: -108
	}; //bottom_right_pocket
	if (
		Math.pow(currentPocket.x - position.x, 2) + Math.pow(currentPocket.z - position.z, 2) <= DISTANCE_THRESHOLD) {
		ballInPocket("https://billiards.colostate.edu/images/one-pocket/straight_back_kiss_beat.gif",
			ball.name,
			" bottom_right_pocket")

		return;
	}

	currentPocket = {
		x: 215,
		z: 108
	}; //bottom_left_pocket
	if (
		Math.pow(currentPocket.x - position.x, 2) + Math.pow(currentPocket.z - position.z, 2) <= DISTANCE_THRESHOLD) {
		ballInPocket("https://billiards.colostate.edu/images/one-pocket/straight_back_kiss_beat.gif",
			ball.name,
			" bottom_left_pocket")

		return;
	}

}
/**
 * Just create the video / image element, then render it over everything of the screen then place it on the center
 * @param {*} source 
 * @param {*} ball 
 * @param {*} hole 
 */
function renderEvent(source, ball, hole) {




	let img = document.createElement('img');
	let txt = document.createElement('p')
	img.src = source;
	img.autoplay = true
	txt.innerHTML = ball + " in pocket" + hole
	document.getElementById('container').appendChild(img);
	document.getElementById('container').appendChild(txt);
	img.style.zIndex = "100000"
	img.style.position = "fixed"
	img.style.top = "50%"
	img.style.left = "50%"
	img.style.transform = "translate(-50%, -50%)"
	//
	txt.style.zIndex = "100000"
	txt.style.position = "fixed"
	txt.style.top = "75%"
	txt.style.left = "50%"
	txt.style.transform = "translate(-50%, -50%)"
	txt.style.color = "white"
	txt.style.fontSize = "2rem"
	txt.style.marginTop = "3rem"


	setTimeout(() => {
		img.remove()
		txt.remove()
	}, 5000)

}

///
let listOfPosition = [];



/**
 * @param {Array} list
 */
function initFrame(list) {
	const debugFolders = []
	for (let i = 0; i < list.length; i++) {
		const ball = list[i]
		let yellowBall = new Ball(new THREE.SphereGeometry(6, 30, 30), new THREE.MeshLambertMaterial({
			color: "yellow"
		}))
		yellowBall.position.set(ball[0], -11, ball[1])
		yellowBall.name = `Ballname:  ${yellowBall.id} [{i}]`;
		listOfBalls.push(yellowBall)
		scene.add(yellowBall)
		debugFolders.push({
			name: yellowBall.name,
			options: [
				[yellowBall, 'visible'],
				[yellowBall.position, 'x', -140, 140],
				[yellowBall.position, 'y', -500, 500],
				[yellowBall.position, 'z', -90, 90],
			]
		})
	}
	DebuggerMultiGUI('Balls', debugFolders)
	console.log(listOfBalls)
	return listOfBalls;
}

function updateBalls(list) {
	listOfBalls = []

	list.forEach((element, index) => {
		let ball = new Ball(new THREE.SphereGeometry(6, 30, 30), new THREE.MeshLambertMaterial({
			color: "yellow"
		}))
		const [xPosition, yPosition] = list[index]
		ball.position.x = xPosition
		ball.position.z = yPosition
		listOfBalls.push(ball)
		//	BallChecker(element)

	});
}


function LoadModel(object) {
	const Loader = new GLTFLoader();
	Loader.crossOrigin = true;
	Loader.load("../../models/obj/" + object + ".glb", function (data) {
		// Loader.load("realtimepool/models/obj/"+object+".glb", function (data) {
		const object = data.scene;
		object.position.y = 87

		if (object.getObjectByName('cue')) {
			const CueGUI = new DebuggerCueGUI(camera, renderer, object, true)
			object.position.set(0, -300, -142)


		} else {
			const TableGUI = new DebuggerTableGUI(camera, renderer, object, true)
			object.position.set(0, -187, 0)

		}
		console.log(object)
		object.scale.set(1, 1, 1)
		scene.add(object);

		//, onProgress, onError );

	});
}

function ConvertListPosition(list) {
	let localList = []
	for (let i = 0; i < list.length; i++) {
		localList.push(TABLE_SIZE.L * list[i][0] - TABLE_SIZE.L / 2,
			TABLE_SIZE.H * list[i][1] - TABLE_SIZE.H / 2)
	}
	return localList;
}