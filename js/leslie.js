function Leslie(textureLoader, baseLeslie) {
  var ROTATION = 0.005,
    VELOCITY = 0.5,
    CROP = 0.75,
    ZMAX = 200;

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
    exports.mesh.rotation.x += exports.currentRotation.x;
    exports.mesh.rotation.y += exports.currentRotation.y;
    exports.mesh.rotation.z += exports.currentRotation.z;
  };

  var fly = function () {
    var xPlus = exports.mesh.position.x + exports.currentVelocity.x,
      yPlus = exports.mesh.position.y + exports.currentVelocity.y,
      zPlus = exports.mesh.position.z + exports.currentVelocity.z,
      xMax = (window.innerWidth / 2) * CROP,
      yMax = (window.innerHeight / 2) * CROP;

    if (xPlus > xMax || xPlus < -xMax) exports.currentVelocity.x *= -1;
    exports.mesh.position.x += exports.currentVelocity.x;

    if (yPlus > yMax || yPlus < -yMax) exports.currentVelocity.y *= -1;
    exports.mesh.position.y += exports.currentVelocity.y;

    if (zPlus > ZMAX || zPlus < -ZMAX) exports.currentVelocity.z *= -1;
    exports.mesh.position.z += exports.currentVelocity.z;
  };

  var getRandom = function(constant) {
    var sign = (Math.random() < .5) ? 1 : -1;
    return sign * Math.random() * constant;
  };

  var exports = {
    mesh: null,
    currentVelocity: { x: getRandom(VELOCITY), y: getRandom(VELOCITY), z: getRandom(VELOCITY) },
    currentRotation: { x: getRandom(ROTATION), y: getRandom(ROTATION), z: getRandom(ROTATION) },
    name: baseLeslie.name,
    colors: baseLeslie.colors,

    load: function() {
      textureLoader.load(baseLeslie.name, function ( leslieTexture ) {
        var box = new THREE.BoxGeometry( 128, 32, 256, 1, 1, 5);

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

