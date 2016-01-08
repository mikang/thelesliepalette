function Leslie(textureLoader, baseLeslie) {
    var setSidePaletteColors = function (box) {
        for (var i = 0; i < 20; i++) {
            var colorIndex = Math.floor(i / 2) % 5;
            if (i >= 10) colorIndex = 4 - colorIndex;
            box.faces[i].color.set(new THREE.Color(colors[colorIndex]));
        }
    };

    var flipTexture = function (texture) {
        var upsideTexture = texture.clone();
        upsideTexture.flipY = false;
        upsideTexture.needsUpdate = true;
        return upsideTexture;
    };

    var rotate = function () {
        exports.mesh.rotation.x += currentRotation.x;
        exports.mesh.rotation.y += currentRotation.y;
        exports.mesh.rotation.z += currentRotation.z;
    };

    var fly = function () {
        var xPlus = exports.mesh.position.x + currentVelocity.x,
            yPlus = exports.mesh.position.y + currentVelocity.y,
            zPlus = exports.mesh.position.z + currentVelocity.z,
            xMax = (window.innerWidth / 2) - 1,
            yMax = (window.innerHeight / 2) - 1;

        if (xPlus > xMax || xPlus < -xMax) currentVelocity.x *= -1;
        exports.mesh.position.x += currentVelocity.x;

        if (yPlus > yMax || yPlus < -yMax) currentVelocity.y *= -1;
        exports.mesh.position.y += currentVelocity.y;

        if (zPlus > ZMAX || zPlus < -ZMAX) currentVelocity.z *= -1;
        exports.mesh.position.z += currentVelocity.z;
    };

    var flyToFront = function () {
        var final = {
          position: { x: 0, y: 0, z: ZMAX * 2.5},
          rotation: {x: 1.5, y: 0, z: 0.6}
        };

        _.each(['position', 'rotation'], function (transform) {
            _.each(['x', 'y', 'z'], function (dimension) {
                if (exports.mesh[transform][dimension] != final[transform][dimension]) {
                    exports.mesh[transform][dimension] += (final[transform][dimension] - exports.mesh[transform][dimension]) / TO_FRONT;
                }
            });
        });
    };

    var getRandom = function (constant) {
        var sign = (Math.random() < 0.5) ? 1 : -1;
        return sign * Math.random() * constant;
    };

    var ROTATION = 0.005,
        VELOCITY = 3,
        ZMAX = 200,
        TO_FRONT = 10,
        currentVelocity = {x: getRandom(VELOCITY), y: getRandom(VELOCITY), z: getRandom(VELOCITY)},
        currentRotation = {x: getRandom(ROTATION), y: getRandom(ROTATION), z: getRandom(ROTATION)},
        name = baseLeslie.name,
        colors = baseLeslie.colors;

    var exports = {
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
                    new THREE.MeshLambertMaterial({map: flipTexture(leslieTexture)}),
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
                fly();
            }
        },

        onClick: function (intersects) {
            exports.selected = true;
        },

        onBlur: function () {
            exports.mesh.position.z = ZMAX;
            exports.selected = false;
        }
    };

    return exports;
}
