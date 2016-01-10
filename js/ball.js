function Ball(color, options) {
    var currentVelocity = Helpers.getRandomVector3(options.velocity),
        exports = {
            mesh: null,

            animate: function () {
                Helpers.fly(exports.mesh.position, currentVelocity, options.zMax);
            },

            load: function (callback) {
                var radius = _.random(25, 25 + options.ballSizeRange),
                    sphere = new THREE.SphereGeometry(radius, 16, 16),
                    mesh = new THREE.MeshPhongMaterial( {color: color, vertexColors: THREE.FaceColors} );
                exports.mesh = new THREE.Mesh(sphere, mesh);
                callback(exports);
            }
        };

    return exports;
}
