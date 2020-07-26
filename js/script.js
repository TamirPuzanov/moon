// import * as THREE from '/js/three/build/three.module.js';

// import Stats from '/js/three/examples/jsm/libs/stats.module.js';

// import { FlyControls } from '/js/three/examples/jsm/controls/FlyControls.js';
// import { GLTFLoader } from '/js/three/examples/jsm/loaders/GLTFLoader.js';

var step = 0;

var audio = new Audio();

(function() {

var container, stats, controls;
var camera, scene, renderer, light, ltf;

var clock = new THREE.Clock();

var mixer;

var cameraCenter = new THREE.Vector3();
var cameraHorzLimit = 10;
var cameraVertLimit = 10;
var mouse = new THREE.Vector2();

init();
animate();

function init() {

	container = document.createElement( 'div' );
	document.querySelector('#main-canvas').appendChild( container );

	camera = new THREE.PerspectiveCamera( 45, $(window).width() / $(window).height(), 1, 2000 );
	camera.position.set( 100, 200, 300 );

	camera.castShadow = true;
	camera.position.set(48.2299829406866, 119.53131728277586, -36.75509108056446);
	camera.rotation.set(-1.913151470623178, 0.41493710398962624, 2.294728727318423);
	console.log(camera.getWorldPosition());

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xa0a0a0 );
	scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

	light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
	light.position.set( 0, 200, 0 );
	scene.add( light );

	light = new THREE.DirectionalLight( "#807f88" );
	light.position.set( 0, 200, 1500 );
	light.castShadow = true;
	light.shadow.camera.top = 180;
	light.shadow.camera.bottom = - 100;
	light.shadow.camera.left = - 120;
	light.shadow.camera.right = 120;
	scene.add( light );

	cameraCenter.x = camera.position.x;
    cameraCenter.y = camera.position.y;

	// scene.add( new CameraHelper( light.shadow.camera ) );

	// ground
	var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
	mesh.rotation.x = - Math.PI / 2;
	mesh.receiveShadow = true;
	scene.add( mesh );

	var grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
	grid.material.opacity = 0.2;
	grid.material.transparent = true;
	scene.add( grid );

	// model
	var loader = new THREE.GLTFLoader();
	// loader.load( '/models/base.glb', function ( object ) {

	// 	mixer = new THREE.AnimationMixer( object );

	// 	object.castShadow = true;
	// 	object.receiveShadow = true;

	// 	scene.add( object );

	// } );

	loader.load( '/moon/models/base.glb', function ( gltf ) {

		mixer = new THREE.AnimationMixer( gltf );

		gltf.scene.castShadow = true;
		gltf.scene.receiveShadow = true;
		// gltf.receiveShadow = true;
		console.log(gltf);

		ltf = gltf;

		scene.add( gltf.scene );

		camera.position.set(48.2299829406866, 119.53131728277586, -36.75509108056446);
		camera.rotation.set(-1.913151470623178, 0.41493710398962624, 2.294728727318423);

	}, undefined, function ( error ) {

		console.error( error );

	} );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( $(window).width(), $(window).height() );
	renderer.shadowMap.enabled = true;
	container.appendChild( renderer.domElement );

	// var controls = new THREE.OrbitControls( camera, renderer.domElement );
	// controls.update();

	// controls = new FlyControls( camera, renderer.domElement );
	// // controls.target.set( 0, 100, 0 );
	// controls.update();

	$(window).on('resize', onWindowResize);
	$(window).on('mousemove', onDocumentMouseMove);

	// stats
	// stats = new Stats();
	// container.appendChild( stats.dom );

}

function onWindowResize() {

	camera.aspect = $(window).width() / $(window).height();
	camera.updateProjectionMatrix();

	renderer.setSize( $(window).width(), $(window).height() );

}

// window.onkeydown = () => { console.log([camera.getWorldPosition(), camera.position, camera]); }

//
// var delta;
var angle = 0; // текущий угол
var angularSpeed = THREE.Math.degToRad(20); // угловая скорость - градусов в секунду
var delta = 0;
var radius = 20;
function animate() {

	requestAnimationFrame( animate );

	if (step == 0) {
		delta = clock.getDelta();

		updateCamera(delta);

		if ( mixer ) mixer.update( delta );
		// if ( controls != undefined ) { controls.update(); }

		// camera.position.x = Math.cos(angle) * radius;
	 //  camera.position.z = Math.sin(angle) * radius;
	 //  angle += angularSpeed * delta; // приращение угла

		//   if (ltf != undefined) {
		//   	camera.lookAt(new THREE.Vector3(0,0,0));
		//   }

		renderer.render( scene, camera );
	}

	// stats.update();

}

function updateCamera(delta) {
    //offset the camera x/y based on the mouse's position in the window
    camera.position.x = cameraCenter.x + (cameraHorzLimit * mouse.x);
    camera.position.y = cameraCenter.y + (cameraVertLimit * mouse.y);
}

function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / $(window).width()) * 2 - 1;
    mouse.y = -(event.clientY / $(window).height()) * 2 + 1;
}

})();

$('.button').on('mouseover', function() {
	$('#div').attr('class', 'isHover');	
});

$('.button').on('mouseout', function() {
	$('#div').attr('class', '');
});

var items = document.querySelectorAll('.item');

function edit_title() {
	let title;
	switch(step) {
		case 1:
			title = "Цели создания базы";
			break;
		case 2:
			title = "Выбор места";
			break;
		case 3:
			title = "Этапы развертывания базы";
			break;
		case 4:
			title = "Структурная схема базы";
			break;
		case 5:
			title = "Основные объекты базы";
			break;
		case 6:
			title = "Генеральный план базы";
			break;
		case 7:
			title = "Заключение";
			break;
		default:
		    title = "Город на луне"	
	}
	$('title').html(title);
}

$('.button').on('click', function() {
	audio.pause();
	$('.play').css('display', 'none');
	$('.start').css('display', 'flex');
		$('.pause').css('display', 'none');
	$('.header').css('margin-top', '-100vh');
	for (var a = 0; a < items.length; a++) {
		items[a].setAttribute('class', 'item');
	}
	items[1].setAttribute('class', 'item active');
	step = 1;
	edit_title();
});

for (var i = 0; i < items.length; i++) {
	items[i].onclick = function() {
		audio.pause();
		$('.play').css('display', 'none');
		$('.start').css('display', 'flex');
		$('.pause').css('display', 'none');
		for (var a = 0; a < items.length; a++) {
			items[a].setAttribute('class', 'item');
		}
		this.setAttribute('class', 'item active');
		step = parseInt(this.getAttribute('pos'));
		$('.header').css('margin-top', -step * 100 + "vh");
		edit_title();
	}
}

var go = document.querySelectorAll('.go'),
	back = document.querySelectorAll('.back');

for (var i = 0; i < back.length; i++) {
	back[i].onclick = function() {
		audio.pause();
		$('.play').css('display', 'none');
		$('.start').css('display', 'flex');
		$('.pause').css('display', 'none');
		for (var a = 0; a < items.length; a++) {
			items[a].setAttribute('class', 'item');
		}
		step = parseInt(this.getAttribute('to'));
		$('[pos='+step+']').attr('class', 'item active');
		$('.header').css('margin-top', -step * 100 + "vh");
		edit_title();
	}
}

for (var i = 0; i < go.length; i++) {
	go[i].onclick = function() {
		audio.pause();
		$('.play').css('display', 'none');
		$('.start').css('display', 'flex');
		$('.pause').css('display', 'none');
		for (var a = 0; a < items.length; a++) {
			items[a].setAttribute('class', 'item');
		}
		step = parseInt(this.getAttribute('to'));
		$('[pos='+step+']').attr('class', 'item active');
		$('.header').css('margin-top', -step * 100 + "vh");
		edit_title();
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

$('.start').click(function() {
	audio.src = "/tts/" + step + ".ogg";
	audio.onloadeddata = function() {
		audio.play();
		$('.start').css('display', 'none');
		$('.play').css('display', 'none');
		$('.pause').css('display', 'flex');
	}
});

$('.play').click(function() {	
	audio.play();
	$('.start').css('display', 'none');
	$('.play').css('display', 'none');
	$('.pause').css('display', 'flex');
});

$('.pause').click(function() {
	$('.play').css('display', 'flex');
	$('.start').css('display', 'none');
	$('.pause').css('display', 'none');
	audio.pause();
});

audio.addEventListener('ended', function() {
	$('.start').css('display', 'flex');
	$('.play').css('display', 'none');
	$('.pause').css('display', 'none');
});

var wrap = document.querySelector('.wrap');

function closeAll(y) {
	wrap.children[y].children[0].children[1].style.transform = "rotate(0deg)";
	wrap.children[y].children[1].style.display = "none";
	wrap.children[y].setAttribute('is-open', 'false');
}

for (let i = 0; i < wrap.children.length; i++) {
	wrap.children[i].children[0].onclick = function() {
		if (wrap.children[parseInt(this.getAttribute('wrap-id'))].getAttribute('is-open') == "false") {
			closeAll(0); closeAll(1); closeAll(2);
			this.children[1].style.transform = "rotate(180deg)";
			wrap.children[parseInt(this.getAttribute('wrap-id'))].children[1].style.display = "block";
			wrap.children[parseInt(this.getAttribute('wrap-id'))].setAttribute('is-open', 'true');
		} else {
			this.children[1].style.transform = "rotate(0deg)";
			wrap.children[parseInt(this.getAttribute('wrap-id'))].children[1].style.display = "none";
			wrap.children[parseInt(this.getAttribute('wrap-id'))].setAttribute('is-open', 'false');
		}
	}
}

wrap.children[0].children[0].onclick();
