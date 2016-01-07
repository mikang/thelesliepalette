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
    var geometry = new THREE.BoxGeometry( 256, 64, 512, 1, 1, 5);
    var frontLeslieMaterial = new THREE.MeshBasicMaterial({map: texture});
    var backTexture = texture.clone();
    backTexture.flipY = false;
    backTexture.needsUpdate = true;
    var backLeslieMaterial = new THREE.MeshBasicMaterial({map: backTexture});
    var topMaterial = new THREE.MeshBasicMaterial({color: '#' + leslies[0].colors[0]});
    var bottomMaterial = new THREE.MeshBasicMaterial({color: '#' + leslies[0].colors[4]});
    var sideMaterial = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors});
    var materials = [
      sideMaterial,
      sideMaterial,
      frontLeslieMaterial,
      backLeslieMaterial,
      topMaterial,
      bottomMaterial,
    ];
    for(var i = 0; i < 20; i++) {
      var colorIndex = Math.floor(i / 2) % 5;
      geometry.faces[i].color.set( new THREE.Color('#' + leslies[0].colors[colorIndex]) );
    }
    var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    scene.add(mesh);
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
  scene.rotation.y += 0.001;
  scene.rotation.x += 0.01;
  scene.rotation.z += 0.001;
  renderer.render( scene, camera );
}


