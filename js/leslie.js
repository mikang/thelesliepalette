function Leslie(textureLoader, baseLeslie) {
  var exports = {
    mesh: null,
    currentVelocity: {
      x: 0.1,
      y: 0.1
    },
    name: baseLeslie.name,
    colors: baseLeslie.colors,

    load: function() {
      textureLoader.load(baseLeslie.name, function ( leslieTexture ) {
        var box = new THREE.BoxGeometry( 256, 64, 512, 1, 1, 5);

        var sidePalette = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors});
        exports._setSidePaletteColors(box);

        exports.mesh = new THREE.Mesh(box, new THREE.MeshFaceMaterial([
          sidePalette,
          sidePalette,
          new THREE.MeshBasicMaterial({map: leslieTexture}),
          new THREE.MeshBasicMaterial({map: exports._flipTexture(leslieTexture)}),
          new THREE.MeshBasicMaterial({color: '#' + exports.colors[0]}),
          new THREE.MeshBasicMaterial({color: '#' + exports.colors[4]}),
        ]));

        scene.add(exports.mesh);
      });
    },

    animate: function() {
      exports.mesh.rotation.y += 0.001;
      exports.mesh.rotation.x += 0.01;
      exports.mesh.rotation.z += 0.001;
    },

    _setSidePaletteColors: function(box) {
      for (var i = 0; i < 20; i++) {
        var colorIndex = Math.floor(i / 2) % 5;
        if (i >= 10) colorIndex = 4 - colorIndex;
        box.faces[i].color.set(new THREE.Color('#' + exports.colors[colorIndex]));
      }
    },

    _flipTexture: function (texture) {
      var upsideTexture = texture.clone();
      upsideTexture.flipY = false;
      upsideTexture.needsUpdate = true;
      return upsideTexture;
    }
  };

  return exports;
};

