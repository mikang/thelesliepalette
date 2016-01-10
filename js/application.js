var leslieAnimation = null;

window.onload = function() {
    var options = {
            rotation: 0.005,
            velocity: 3,
            zMax: 200,
            numberOfBallsPerLeslie: 2,
            toFrontIter: 10,
            toFrontX: 2,
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
        rotation: document.getElementById('rotation').value,
        velocity: document.getElementById('velocity').value,
        zMax: document.getElementById('z-max').value,
        numberOfBallsPerLeslie: document.getElementById('number-of-balls-per-leslie').value,
        toFrontIter: document.getElementById('to-front-iter').value,
        toFrontX: document.getElementById('to-front-x').value,
        maxLeslies: document.getElementById('max-leslies').value,
        seaDistoration: document.getElementById('sea-distoration').value,
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
