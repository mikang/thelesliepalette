var leslieAnimation = null;

window.onload = function() {
    var options = {
            rotation: 0.005,
            velocity: 3,
            zMax: 200,
            numberOfBallsPerLeslie: 2,
            toFrontIter: 10,
            maxLeslies: null,
            seaDistoration: 25.0,
            seaColor: 0x001e0f,
            seaSunColor: 0xA7A3F0
        };
    leslieAnimation = new LeslieAnimation();
    leslieAnimation.load(options);
};

function onControlsSubmit() {
    var newOptions = {
        rotation: Number(document.getElementById('rotation').value),
        velocity: Number(document.getElementById('velocity').value),
        zMax: Number(document.getElementById('z-max').value),
        numberOfBallsPerLeslie: Number(document.getElementById('number-of-balls-per-leslie').value),
        ballSizeRange: Number(document.getElementById('ball-size-range').value),
        toFrontIter: Number(document.getElementById('to-front-iter').value),
        maxLeslies: Number(document.getElementById('max-leslies').value),
        seaDistoration: Number(document.getElementById('sea-distoration').value),
        seaColor: document.getElementById('sea-color').value,
        seaSunColor: document.getElementById('sea-sun-color').value,
    };
    console.log(newOptions);

    leslieAnimation.remove();
    leslieAnimation.load(newOptions);
    toggleControls();

    return false;
}

function toggleControls() {
    var controls = document.getElementById("controls");
    controls.className = (controls.className === "open") ? "" : "open";
}
