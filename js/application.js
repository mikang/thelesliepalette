(function () {
  function animate() {
    requestAnimationFrame( animate );
    leslies.animate();
    renderer.render( scene, camera );
  }

  var camera, scene, renderer, leslies,
    container = document.getElementById( 'container' );

  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.z = 750;

  scene = new THREE.Scene();

  leslies = new Leslies();
  leslies.load(scene);
  new Lights().load(scene, camera);

  var canvas = document.createElement( 'canvas' );
  canvas.width = window.width;
  canvas.height = window.height;

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0xaaaaaa );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );


  container.appendChild( renderer.domElement );

  animate();
})();


