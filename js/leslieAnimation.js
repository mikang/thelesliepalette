function LeslieAnimation() {
    var container = document.getElementById('container'),
        canvas = document.createElement('canvas'),
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.5, 10000),
        scene = new THREE.Scene(),
        renderer = new THREE.WebGLRenderer(),
        lights = new Lights(),
        leslies = new Leslies(camera),
        sea = new Sea(),
        animationId = null,
        animate = function () {
            animationId = requestAnimationFrame(animate);
            leslies.animate();
            sea.animate();
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

    camera.position.z = 800;
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    lights.load(scene, camera);

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousedown', leslies.onClick, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);

    return {
        load: function (options) {
            sea.load(renderer, camera, scene, lights.lights[0], options);
            leslies.load(scene, options);
            animate();
        },

        remove: function () {
            if (animationId) {
                window.cancelAnimationFrame(animationId);
                animationId = null;
            }
            sea.unload(scene);
            leslies.unload(scene);
            renderer.render(scene, camera);
        }
    };
}
