var container, camera, scene, renderer, leslies = [];

init();
animate();

function init() {
  container = document.getElementById( 'container' );

  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.z = 750;

  scene = new THREE.Scene();

  var textureLoader = new THREE.TextureLoader();
  baseLeslies.map(function(baseLeslie) {
    var leslie = new Leslie(textureLoader, baseLeslie);
    leslie.load();
    leslies.push(leslie);
  });

  var canvas = document.createElement( 'canvas' );
  canvas.width = window.width;
  canvas.height = window.height;

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0xaaaaaa );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
}

function animate() {
  requestAnimationFrame( animate );
  _.each(leslies, function (leslie) {
    leslie.animate();
  });
  renderer.render( scene, camera );
}
