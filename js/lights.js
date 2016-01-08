function Lights() {
    return {
        load: function (scene, camera) {
            var ambientLight = new THREE.AmbientLight(0x000000);
            scene.add(ambientLight);
            var lights = [
                new THREE.PointLight(0xffffff, 1, 0),
                new THREE.PointLight(0xffffff, 0.5, 0),
                new THREE.PointLight(0xffffff, 0.5, 0),
                new THREE.PointLight(0xffffff, 0.5, 0)
            ];

            lights[0].position.set(0, 0, camera.position.z);
            lights[1].position.set(500, 1000, 100);
            lights[2].position.set(-500, 1000, 100);
            lights[3].position.set(0, -1000, 100);

            scene.add(lights[0]);
            scene.add(lights[1]);
            scene.add(lights[2]);
            scene.add(lights[3]);
        }
    };
};