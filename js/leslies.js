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

            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);


            exports.collection.every(function (item) {
                var intersects = raycaster.intersectObject(item.mesh);
                if (intersects.length > 0) {
                    item.onClick(intersects);
                } else {
                    if (item.selected) item.onBlur();
                    return true;
                }
            });
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