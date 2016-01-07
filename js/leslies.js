function Leslies() {
    var exports = {
        collection: [],

        load: function () {
            var textureLoader = new THREE.TextureLoader();
            $.getJSON('leslies/db.json', function (lesliesDb) {
                lesliesDb.map(function(leslieDb) {
                    var leslie = new Leslie(textureLoader, leslieDb);
                    leslie.load();
                    exports.collection.push(leslie);
                });
            });
        },
        animate: function () {
            _.each(exports.collection, function (leslie) {
                leslie.animate();
            });
        }
    };
    return exports;
};