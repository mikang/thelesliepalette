function Leslie(textureLoader, leslieDB, options) {
    var currentVelocity = Helpers.getRandomXYZ(options.velocity),
        currentRotation = Helpers.getRandomXYZ(options.rotation),
        name = leslieDB.name,
        colors = leslieDB.colors,
        setSidePaletteColors = function (box) {
            for (var i = 0; i < 20; i++) {
                var colorIndex = Math.floor(i / 2) % 5;
                if (i >= 10) colorIndex = 4 - colorIndex;
                box.faces[i].color.set(new THREE.Color(colors[colorIndex]));
            }
        },
        rotate = function () {
            exports.mesh.rotation.x += currentRotation.x;
            exports.mesh.rotation.y += currentRotation.y;
            exports.mesh.rotation.z += currentRotation.z;
        },
        flipAndCloneTexture = function (texture) {
            var upsideTexture = texture.clone();
            upsideTexture.flipY = false;
            upsideTexture.needsUpdate = true;
            return upsideTexture;
        },
        flyToFront = function () {
            var final = {
              position: { x: 0, y: 0, z: options.zMax * options.toFrontX },
              rotation: { x: 1.5, y: 0, z: 0.6 }
            };

            _.each(['position', 'rotation'], function (transform) {
                _.each(['x', 'y', 'z'], function (dimension) {
                    if (exports.mesh[transform][dimension] != final[transform][dimension]) {
                        exports.mesh[transform][dimension] += (final[transform][dimension] - exports.mesh[transform][dimension]) / options.toFrontIter;
                    }
                });
            });
        },
        exports = {
            mesh: null,
            selected: false,

            load: function (callback) {
                textureLoader.load(name, function (leslieTexture) {
                    var box = new THREE.BoxGeometry(128, 32, 256, 1, 1, 5);

                    var sidePalette = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors});
                    setSidePaletteColors(box);

                    exports.mesh = new THREE.Mesh(box, new THREE.MeshFaceMaterial([
                        sidePalette,
                        sidePalette,
                        new THREE.MeshLambertMaterial({map: leslieTexture}),
                        new THREE.MeshLambertMaterial({map: flipAndCloneTexture(leslieTexture)}),
                        new THREE.MeshBasicMaterial({color: colors[0]}),
                        new THREE.MeshBasicMaterial({color: colors[4]})
                    ]));

                    callback();
                });
            },

            animate: function () {
                if (exports.selected) {
                    flyToFront();
                } else {
                    rotate();
                    Helpers.fly(exports.mesh.position, currentVelocity, options.zMax);
                }
            },

            onClick: function (intersects) {
                exports.selected = true;
            },

            onBlur: function () {
                exports.mesh.position.z = options.zMax;
                exports.selected = false;
            }
        };

    return exports;
}
