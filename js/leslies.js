function Leslies() {
    var add = function (item, scene) {
        item.load(scene);
        exports.collection.push(item)
    };

    var exports = {
        collection: [],

        load: function (scene) {
            var textureLoader = new THREE.TextureLoader();
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