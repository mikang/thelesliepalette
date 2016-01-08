function Leslies(camera) {
    var raycaster = new THREE.Raycaster(),
        mouse = new THREE.Vector2(),
        textureLoader = new THREE.TextureLoader();

    var add = function (item, scene) {
        item.load(scene);
        exports.collection.push(item)
    };

    var exports = {
        collection: [],

        onClick: function (event) {
            event.preventDefault();

            mouse.x = ( event.clientX / window.innerWidth.clientWidth ) * 2 - 1;
            mouse.y = -( event.clientY / window.innerHeight.clientHeight ) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            var meshes = _.map(exports.collection, 'mesh');
            var intersects = raycaster.intersectObjects(meshes);

            if (intersects.length > 0) {
                console.log("Intersection YES");
            } else {
                console.log("Intersection NO");
            }
        },

        load: function (scene) {
            $.getJSON('leslies/db.json', function (lesliesDb) {
                lesliesDb.map(function (leslieDb) {
                    add(new Leslie(textureLoader, leslieDb), scene);
                    add(new Ball(leslieDb.colors[0]), scene);
                    add(new Ball(leslieDb.colors[3]), scene);
                });
            });
        },
        animate: function () {
            _.each(exports.collection, function (item) {
                item.animate();
            });
        }
    };
    return exports;
};