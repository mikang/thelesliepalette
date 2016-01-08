function Lights() {
    return {
        load: function (scene, camera) {
            var ambientLight = new THREE.AmbientLight( 0x000000 );
            scene.add( ambientLight );
            var lights = [
                new THREE.PointLight( 0xffffff, 1, 0 ),
                new THREE.PointLight( 0xffffff, 1, 0 ),
                new THREE.PointLight( 0xffffff, 1, 0 )
            ];

            lights[0].position.set( 500, 1000,  camera.position.z);
            lights[1].position.set( -500, 1000, camera.position.z );
            lights[2].position.set( 0, -1000, camera.position.z );

            scene.add( lights[0] );
            scene.add( lights[1] );
            scene.add( lights[2] );
        }
    };
};