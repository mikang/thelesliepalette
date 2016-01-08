window.onload = function () {
    var options = {
            rotation: 0.005,
            velocity: 3,
            zMax: 100,
            toFrontIter: 10,
            toFrontX: 4
        },
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000),
        scene = new THREE.Scene(),
        renderer = new THREE.WebGLRenderer(),
        leslies = new Leslies(camera, options),
        lights = new Lights(),
        container = document.getElementById('container'),
        canvas = document.createElement('canvas'),
        animate = function () {
            requestAnimationFrame(animate);
            leslies.animate();
            renderer.render(scene, camera);
        },
        onWindowResize = function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        },
        onDocumentTouchStart = function (event) {
            event.preventDefault();
            event.clientX = event.touches[0].clientX;
            event.clientY = event.touches[0].clientY;
            leslies.onClick(event);
        };

    camera.position.z = 750;
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    leslies.load(scene);
    lights.load(scene, camera);

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousedown', leslies.onClick, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);

    animate();
};
