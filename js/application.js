var leslieAnimation = null;

window.onload = function() {
    var options = {
            rotation: 0.005,
            velocity: 3,
            zMax: 200,
            numberOfBallsPerLeslie: 2,
            ballSizeRange: 15,
            toFrontIter: 10,
            maxLeslies: null,
            seaEnabled: true,
            seaDistoration: 25.0,
            seaColor: 0x001e0f,
            seaSunColor: 0xA7A3F0
        };
    leslieAnimation = new LeslieAnimation();
    leslieAnimation.load(options);
};

function onControlsSubmit() {
    var newOptions = {
        rotation: Number(document.controls.rotation.value),
        velocity: Number(document.controls.velocity.value),
        zMax: Number(document.controls.zMax.value),
        numberOfBallsPerLeslie: Number(document.controls.numberOfBallsPerLeslie.value),
        ballSizeRange: Number(document.controls.ballSizeRange.value),
        toFrontIter: Number(document.controls.toFrontIter.value),
        maxLeslies: Number(document.controls.maxLeslies.value),
        seaEnabled: document.controls.seaEnabled.checked,
        seaDistoration: Number(document.controls.seaDistoration.value),
        seaColor: document.controls.seaColor.value,
        seaSunColor: document.controls.seaSunColor.value,
    };
    console.log(newOptions);

    leslieAnimation.unload();
    leslieAnimation.load(newOptions);
    toggleControls();

    return false;
}

function toggleControls() {
    var controls = document.getElementById("controls");
    controls.className = (controls.className === "open") ? "" : "open";
}
