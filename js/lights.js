function Lights() {
    var exports = {
        lights: null,

        load: function (scene, camera) {
            exports.lights = [
                new THREE.DirectionalLight(0xffffff, 1),
                new THREE.AmbientLight(0x404040, 0.5)
            ];

            exports.lights[0].position.set(0, 750, 750);
            exports.lights[0].castShadow = true;

            _.each(exports.lights, function (light) {
                scene.add(light);
            });
        }
    };

    return exports;
}
