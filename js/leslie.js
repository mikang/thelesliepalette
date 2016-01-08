function Leslie(textureLoader, leslieDB, options) {
    var currentVelocity = Helpers.getRandomXYZ(options.velocity),
        currentRotation = Helpers.getRandomXYZ(options.rotation),
        paletteColor = new PaletteColor(),
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
                textureLoader.load(leslieDB.name, function (leslieTexture) {
                    var box = new THREE.BoxGeometry(128, 32, 256, 1, 1, 5),
                        sidePalette = paletteColor.load(box, leslieDB.colors);
                    exports.mesh = new THREE.Mesh(box, new THREE.MeshFaceMaterial([
                        sidePalette,
                        sidePalette,
                        new THREE.MeshLambertMaterial({map: leslieTexture}),
                        new THREE.MeshLambertMaterial({map: flipAndCloneTexture(leslieTexture)}),
                        new THREE.MeshBasicMaterial({color: leslieDB.colors[0]}),
                        new THREE.MeshBasicMaterial({color: leslieDB.colors[4]})
                    ]));
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
                    paletteColor.remove();
                    paletteColor.add(
                        exports.mesh.geometry.faces[intersects[0].faceIndex].color.getHexString(),
                        exports.mesh.geometry.boundingSphere.radius + 10);
                } else {
                    exports.selected = true;
                }
            },

            onBlur: function () {
                paletteColor.remove();
                exports.mesh.position.z = options.zMax;
                exports.selected = false;
            }
        };

    return exports;
}
