function Leslie(textureLoader, leslieDB, options) {
    var currentVelocity = Helpers.getRandomXYZ(options.velocity),
        currentRotation = Helpers.getRandomXYZ(options.rotation),
        colorPalette = new ColorPalette(options),
        rotate = function () {
            _.each(['x', 'y', 'z'], function (dimension) {
                exports.mesh.rotation[dimension] += currentRotation[dimension];
                if (Math.abs(exports.mesh.rotation[dimension]) > 2 * Math.PI) exports.mesh.rotation[dimension] = 0;
            });
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
              rotation: { x: Math.PI / 2, y: 0, z: Math.PI / 5 }
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

            load: function (scene, callback) {
                textureLoader.load(leslieDB.name, function (leslieTexture) {
                    var box = new THREE.BoxGeometry(128, 32, 256, 1, 1, 5),
                        sidePalette = colorPalette.createColors(box, leslieDB.colors);
                    exports.mesh = new THREE.Mesh(box, new THREE.MeshFaceMaterial([
                        sidePalette,
                        sidePalette,
                        new THREE.MeshLambertMaterial({map: leslieTexture}),
                        new THREE.MeshLambertMaterial({map: flipAndCloneTexture(leslieTexture)}),
                        new THREE.MeshBasicMaterial({color: leslieDB.colors[0]}),
                        new THREE.MeshBasicMaterial({color: leslieDB.colors[4]})
                    ]));
                    colorPalette.createDrawers(box, function(drawer) {
                        exports.mesh.add(drawer);
                        drawer.visible = false;
                    });
                    scene.add(exports.mesh);
                    callback(exports);
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
                if (exports.selected && intersects[0].faceIndex < 10) {
                    colorPalette.onClick(intersects[0].faceIndex);
                } else {
                    exports.selected = true;
                }
            },

            onBlur: function () {
                colorPalette.onBlur();
                exports.mesh.position.z = options.zMax;
                exports.selected = false;
            }
        };

    return exports;
}
