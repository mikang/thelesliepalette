function Lights() {
    return {
        load: function (scene, camera) {
            var whiteLight = 0xffffff;
            var lights = [
                new THREE.SpotLight(whiteLight, 1, 0),
                new THREE.PointLight(whiteLight, 0.5, 0),
                new THREE.HemisphereLight(whiteLight, 0x080820, 0.5)
            ];

            lights[0].position.set(0, 0, 800);
            lights[1].position.set(0, 0, 0);

            _.each(lights, function (light) {
                scene.add(light);
            });
        }
    };
}
