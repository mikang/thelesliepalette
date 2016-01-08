function Leslies(camera, options) {
    var raycaster = new THREE.Raycaster(),
        mouse = new THREE.Vector2(),
        textureLoader = new THREE.TextureLoader(),
        iterateLeslies = function (callback) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) _.each(JSON.parse(xmlhttp.responseText), callback);
            };
            xmlhttp.open('GET', 'leslies/db.json', true);
            xmlhttp.send();
        },
        exports = {
            balls: [],
            leslies: {},
            selectedId: false,

            onClick: function (event) {
                event.preventDefault();
                mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);

                var meshes = _.map(exports.leslies, 'mesh'),
                  intersects = raycaster.intersectObjects(meshes);

                if (intersects.length > 0) {
                    if (exports.selectedId && exports.selectedId != intersects[0].object.id) {
                        exports.leslies[exports.selectedId].onBlur();
                    }

                    exports.selectedId = intersects[0].object.id;
                    exports.leslies[exports.selectedId].onClick(intersects);
                } else if (exports.selectedId) {
                    exports.leslies[exports.selectedId].onBlur();
                    exports.selectedId = false;
                }
            },

            load: function (scene) {
                iterateLeslies(function (leslieDb) {
                    var leslie = new Leslie(textureLoader, leslieDb, options),
                      ball1 = new Ball(leslieDb.colors[0], options),
                      ball2 = new Ball(leslieDb.colors[1], options);

                    leslie.load(function () {
                        scene.add(leslie.mesh);
                        exports.leslies[leslie.mesh.id] = leslie;
                    });

                    ball1.load(function () {
                        scene.add(ball1.mesh);
                        exports.balls.push(ball1);
                    });

                    ball2.load(function () {
                        scene.add(ball2.mesh);
                        exports.balls.push(ball2);
                    });
                });
            },

            animate: function () {
                var itemAnimate = function (item) { item.animate(); };
                _.each(exports.leslies, itemAnimate);
                _.each(exports.balls, itemAnimate);
            }
        };

    return exports;
}
