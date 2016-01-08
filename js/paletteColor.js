function PaletteColor() {
    var copyText = function (selectedColorDiv) {
        var selection = window.getSelection(),
            range = document.createRange();

        try {
            range.selectNodeContents(selectedColorDiv);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
            selection.removeAllRanges();
        } catch (err) {
            console.error('Unable to copy');
        }
    };

    return {
        load: function (box, colors) {
            var sidePalette = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors})
            for (var i = 0; i < 20; i++) {
                var colorIndex = Math.floor(i / 2) % 5;
                if (i >= 10) colorIndex = 4 - colorIndex;
                box.faces[i].color.set(new THREE.Color(colors[colorIndex]));
            }
            return sidePalette;
        },
        remove: function () {
            var selectedColorDiv = document.getElementById('selected-color');
            if (selectedColorDiv) selectedColorDiv.remove();
        },
        add: function (colorString, top) {
            var selectedColorDiv = document.createElement('div');
            selectedColorDiv.innerHTML = '#' + colorString;
            selectedColorDiv.id = 'selected-color';
            selectedColorDiv.style.top = (window.innerHeight / 2) + top + 'px';
            selectedColorDiv.style.left = (window.innerWidth / 2) + 'px';
            document.body.appendChild(selectedColorDiv);
            copyText(selectedColorDiv);
        }
    };
}
