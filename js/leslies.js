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
            leslieMeshes: [],
            selectedId: false,

            onClick: function (event) {
                event.preventDefault();
                mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);

                var intersects = raycaster.intersectObjects(exports.leslieMeshes);

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
                    var ballLoad = function (ball) {
                        scene.add(ball.mesh);
                        exports.balls.push(ball);
                    };

                    new Leslie(textureLoader, leslieDb, options).load(scene, function (leslie) {
                        exports.leslies[leslie.mesh.id] = leslie;
                        exports.leslieMeshes.push(leslie.mesh);
                    });
                    new Ball(leslieDb.colors[0], options).load(ballLoad);
                    new Ball(leslieDb.colors[1], options).load(ballLoad);
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
