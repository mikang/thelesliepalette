window.onload = function () {
    var options = {
            rotation: 0.005,
            velocity: 3,
            zMax: 100,
            toFrontIter: 10,
            toFrontX: 4,
        },
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000),
        scene = new THREE.Scene(),
        renderer = new THREE.WebGLRenderer(),
        leslies = new Leslies(camera, options),
        lights = new Lights(),
        canvas = document.createElement('canvas'),
        container = document.getElementById('container'),
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
            onDocumentMouseDown(event);
        };

    camera.position.z = 750;

    leslies.load(scene);
    lights.load(scene, camera);

    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);
    canvas.width = window.width;
    canvas.height = window.height;

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousedown', leslies.onClick, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);

    animate();
};
