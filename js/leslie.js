function Leslie(textureLoader, baseLeslie) {
  var setSidePaletteColors = function(box) {
    for (var i = 0; i < 20; i++) {
      var colorIndex = Math.floor(i / 2) % 5;
      if (i >= 10) colorIndex = 4 - colorIndex;
      box.faces[i].color.set(new THREE.Color('#' + exports.colors[colorIndex]));
    }
  };

  var flipTexture = function (texture) {
    var upsideTexture = texture.clone();
    upsideTexture.flipY = false;
    upsideTexture.needsUpdate = true;
    return upsideTexture;
  };

  var rotate = function () {
    exports.mesh.rotation.y += 0.001;
    exports.mesh.rotation.x += 0.01;
    exports.mesh.rotation.z += 0.001;
  };

  var fly = function () {
    var xPlus = exports.mesh.position.x + exports.currentVelocity.x,
      yPlus = exports.mesh.position.y + exports.currentVelocity.y,
      xMax = window.innerWidth / 2,
      yMax = window.innerHeight / 2;

    if (xPlus > xMax || xPlus < -xMax) exports.currentVelocity.x *= -1;
    exports.mesh.position.x += exports.currentVelocity.x;

    if (yPlus > yMax || yPlus < -yMax) exports.currentVelocity.y *= -1;
    exports.mesh.position.y += exports.currentVelocity.y;
  };

  var getRandomVelocity = function() {
    var sign = (Math.random() < .5) ? 1 : -1;
    return sign * Math.random();
  };

  var exports = {
    mesh: null,
    currentVelocity: { x: getRandomVelocity(), y: getRandomVelocity()},
    name: baseLeslie.name,
    colors: baseLeslie.colors,

    load: function() {
      textureLoader.load(baseLeslie.name, function ( leslieTexture ) {
        var box = new THREE.BoxGeometry( 256, 64, 512, 1, 1, 5);

        var sidePalette = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors});
        setSidePaletteColors(box);

        exports.mesh = new THREE.Mesh(box, new THREE.MeshFaceMaterial([
          sidePalette,
          sidePalette,
          new THREE.MeshBasicMaterial({map: leslieTexture}),
          new THREE.MeshBasicMaterial({map: flipTexture(leslieTexture)}),
          new THREE.MeshBasicMaterial({color: '#' + exports.colors[0]}),
          new THREE.MeshBasicMaterial({color: '#' + exports.colors[4]}),
        ]));

        scene.add(exports.mesh);
      });
    },

    animate: function() {
      if (!exports.mesh) return;

      rotate();
      fly();
    }
  };

  return exports;
}

