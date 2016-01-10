function ColorPalette(options) {
    var copyText = function (colorString) {
            var textDiv = document.getElementById('selected-color'),
                selection = window.getSelection(),
                range = document.createRange();

            try {
                textDiv.innerHTML = '#' + colorString;
                range.selectNodeContents(textDiv);
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand('copy');
                selection.removeAllRanges();
            } catch (err) {
                console.error('Unable to copy');
            }
        },
        createColorHexMaterial = function (color) {
            var canvas = document.createElement("canvas"),
                context = canvas.getContext("2d"),
                texture = new THREE.Texture(canvas);

            canvas.width = 128;
            canvas.height = 64;

            context.fillStyle = color.getStyle();
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.textAlign = "center";
            context.textBaseline = "middle";
            context.font = "22pt 'Oswald', sans-serif";
            context.fillStyle = '#' + ('000000' + (0xffffff ^ color.getHex())).toString(16).slice(-6);
            context.fillText('#' + color.getHexString(), canvas.width / 2, canvas.height / 2);

            texture.needsUpdate = true;
            return new THREE.MeshBasicMaterial({map : texture});
        },
        exports = {
            drawers: [],
            final: {},
            openDrawer: null,
            closeDrawers: [],

            createColors: function (box, colors) {
                var sidePalette = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors});
                for (var i = 0; i < 20; i++) {
                    var colorIndex = Math.floor(i / 2) % 5;
                    if (i >= 10) colorIndex = 4 - colorIndex;
                    box.faces[i].color.set(new THREE.Color(colors[colorIndex]));
                }
                return sidePalette;
            },

            createDrawers: function (box, callback) {
                var leslieWidth = box.parameters.width, // 128
                    leslieHeight = box.parameters.height, // 32
                    leslieDepth = box.parameters.depth,  // 256
                    depth = leslieDepth / 5;

                for (var j = 0; j < 5; j++) {
                    var faceIndex = j * 2,
                        color = box.faces[faceIndex].color,
                        colorDrawer = new THREE.BoxGeometry(depth * 1.8, leslieHeight - 3, depth), // w to fit text, height to fit inside leslie
                        material = new THREE.MeshBasicMaterial({color: color.getHex()}),
                        mesh = new THREE.Mesh(colorDrawer, new THREE.MeshFaceMaterial([
                            material, material,
                            createColorHexMaterial(color),
                            material, material, material
                        ]));

                    mesh.position.set(0, -1, depth * (Math.floor(faceIndex / 2) - 2) * -1);
                    exports.final = {x: (leslieWidth / 2) + (colorDrawer.parameters.width / 2)};
                    exports.drawers.push(mesh);
                    callback(mesh);
                }
            },

            animate: function () {
                if (exports.openDrawer && exports.openDrawer.position.x < exports.final.x) {
                    exports.openDrawer.position.x += (exports.final.x - exports.openDrawer.position.x) / options.toFrontIter;
                }
                if (exports.closeDrawers.length > 0) {
                    exports.closeDrawers = _.chain(exports.closeDrawers).map(function (closeDrawer) {
                        closeDrawer.position.x += (-1 - closeDrawer.position.x) / options.toFrontIter;
                        if (closeDrawer.position.x <= 0) {
                            closeDrawer.position.x = 0;
                            closeDrawer.visible = false;
                            return null;
                        }
                        return closeDrawer;
                    }).compact().value();
                }
            },

            onClick: function (faceIndex) {
                if (exports.openDrawer) exports.onBlur();
                exports.openDrawer = exports.drawers[Math.floor(faceIndex / 2)];
                exports.openDrawer.visible = true;
                copyText(exports.openDrawer.material.materials[0].color.getHexString());
            },

            onBlur: function () {
                if (exports.openDrawer) {
                    exports.closeDrawers.push(exports.openDrawer);
                    exports.openDrawer = null;
                }
            }
        };

    return exports;
}
