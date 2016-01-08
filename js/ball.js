function Ball(color, options) {
    var currentVelocity = Helpers.getRandomXYZ(options.velocity),
        exports = {
            mesh: null,

            animate: function () {
                Helpers.fly(exports.mesh.position, currentVelocity, options.zMax);
            },

            load: function (callback) {
                var sphere = new THREE.SphereGeometry(32, 32, 32);
                var mesh = new THREE.MeshLambertMaterial( {color: color, vertexColors: THREE.FaceColors} );
                exports.mesh = new THREE.Mesh(sphere, mesh);
                callback(exports);
            }
        };

    return exports;
}
