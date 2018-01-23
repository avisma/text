// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 4;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a Cube Mesh with basic material

var loader = new THREE.FontLoader();

var geometry;

loader.load( 'opensans.json', function ( font ) {

	geometry = new THREE.TextGeometry( 'Hello three.js!', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelSegments: 5
	} );
} );


// var geometry = new THREE.TextGeometry( 1, 1, 1 );
var material = new THREE.MeshPhongMaterial({
    color: 0xdddddd
});

var lights = [];
			lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
			lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
			lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

			lights[ 0 ].position.set( 0, 200, 0 );
			lights[ 1 ].position.set( 100, 200, 100 );
			lights[ 2 ].position.set( - 100, - 200, - 100 );

			scene.add( lights[ 0 ] );
			scene.add( lights[ 1 ] );
			scene.add( lights[ 2 ] );


var text = new THREE.Mesh( geometry, material );

// Add cube to Scene
scene.add( text );

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  text.rotation.x += 0.01;
  text.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
};

render();
