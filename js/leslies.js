function Leslies(camera) {
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
        };

    var exports = {
        balls: [],
        leslies: {},
        selectedId: null,

        onClick: function (event) {
            event.preventDefault();
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            var meshes = _.map(exports.leslies, 'mesh'),
              intersects = raycaster.intersectObjects(meshes);

            if (exports.selectedId) exports.leslies[exports.selectedId].onBlur();

            if (intersects.length > 0) {
                exports.selectedId = intersects[0].object.id;
                exports.leslies[exports.selectedId].onClick(intersects);
            }
        },

        load: function (scene) {
            iterateLeslies(function (leslieDb) {
                var leslie = new Leslie(textureLoader, leslieDb),
                  ball1 = new Ball(leslieDb.colors[0]),
                  ball2 = new Ball(leslieDb.colors[1]);

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
};
