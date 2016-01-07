var container;
var camera, scene, renderer;
var group;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function isPowerOfTwo(x) {
  return (x & (x - 1)) == 0;
}

function init() {
  container = document.getElementById( 'container' );

  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.z = 1000;

  scene = new THREE.Scene();

  var loader = new THREE.TextureLoader();
  loader.load(leslies[0].name, function ( texture ) {
    var geometry = new THREE.BoxGeometry( 256, 512, 32, 1, 1, 4 );
    var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
  });

  var canvas = document.createElement( 'canvas' );
  canvas.width = 512;
  canvas.height = 512;

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0xffffff );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
}

function animate() {
  requestAnimationFrame( animate );
  scene.rotation.y += 0.01;
  renderer.render( scene, camera );
}


