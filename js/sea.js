function Sea() {
    var exports = {
        water: null,

        load: function (renderer, camera, scene, light, options) {
            new THREE.TextureLoader().load('images/water.jpg', function (waterTexture) {
                waterTexture.wrapS = waterTexture.wrapT = THREE.RepeatWrapping;
                exports.water = new THREE.Water(renderer, camera, scene, {
        			textureWidth: 512,
        			textureHeight: 512,
        			waterNormals: waterTexture,
        			alpha: 1.0,
        			sunDirection: light.position.normalize(),
        			sunColor: options.seaSunColor,
        			waterColor: options.seaColor,
        			distortionScale: options.seaDistoration
        		});
        		var waterMirror = new THREE.Mesh(
        			new THREE.PlaneBufferGeometry(window.innerWidth * 500, window.innerHeight * 500, 10, 10),
        			exports.water.material
        		);
        		waterMirror.add(exports.water);
                waterMirror.rotation.x = -Math.PI / 8;
                waterMirror.position.z = -options.zMax * 3;
        		scene.add(waterMirror);
            });
        },

        animate: function () {
            if (exports.water) {
                var time = exports.water.material.uniforms.time.value + 1.0 / 60.0;
		        exports.water.material.uniforms.time.value = time;
                exports.water.render();
            }
        }
    };

    return exports;
}
