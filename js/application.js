var container, camera, scene, renderer;

init();
animate();

function init() {
  container = document.getElementById( 'container' );

  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.z = 1000;

  scene = new THREE.Scene();

  var loader = new THREE.TextureLoader();
  loadLeslie(loader, leslies[0]);

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

function setSidePaletteColors(box, leslie) {
  for (var i = 0; i < 10; i++) {
    var colorIndex = Math.floor(i / 2) % 5;
    box.faces[i].color.set(new THREE.Color('#' + leslie.colors[colorIndex]));
  }
  for (var i = 10; i < 20; i++) {
    var colorIndex = Math.floor(i / 2) % 5;
    box.faces[i].color.set(new THREE.Color('#' + leslie.colors[4 - colorIndex]));
  }
}

function flipTexture(texture) {
  var upsideTexture = texture.clone();
  upsideTexture.flipY = false;
  upsideTexture.needsUpdate = true;
  return upsideTexture;
}

function loadLeslie(loader, leslie) {
  loader.load(leslie.name, function ( leslieTexture ) {
    var box = new THREE.BoxGeometry( 256, 64, 512, 1, 1, 5);

    var sidePalette = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors});
    setSidePaletteColors(box, leslie);

    scene.add(new THREE.Mesh(box, new THREE.MeshFaceMaterial([
      sidePalette,
      sidePalette,
      new THREE.MeshBasicMaterial({map: leslieTexture}),
      new THREE.MeshBasicMaterial({map: flipTexture(leslieTexture)}),
      new THREE.MeshBasicMaterial({color: '#' + leslie.colors[0]}),
      new THREE.MeshBasicMaterial({color: '#' + leslie.colors[4]}),
    ])));
  });
}
