function Ball(color) {
    var VELOCITY = 1,
        CROP = 0.75,
        ZMAX = 500;

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

    var getRandom = function (constant) {
        var sign = (Math.random() < .5) ? 1 : -1;
        return sign * Math.random() * constant;
    };

    var exports = {
        mesh: null,
        currentVelocity: {x: getRandom(VELOCITY), y: getRandom(VELOCITY), z: getRandom(VELOCITY)},

        load: function (scene) {
            var sphere = new THREE.SphereGeometry(32, 32, 32);
            var mesh = new THREE.MeshLambertMaterial( {color: color, vertexColors: THREE.FaceColors} );
            exports.mesh = new THREE.Mesh(sphere, mesh);
            scene.add(exports.mesh);
        },

        animate: function () {
            if (!exports.mesh) return;
            fly();
        },

        onClick: $.noop,
        onBlur: $.noop,
    };

    return exports;
}

