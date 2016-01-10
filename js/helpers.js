var Helpers = {
    fly: function (position, velocity, zMax) {
        // Use http://threejs.org/docs/#Reference/Math/Quaternion here
        var maxPos = {x: window.innerWidth / 2, y: window.innerHeight / 2, z: zMax};

        _.each(['x', 'y', 'z'], function (dimension) {
            var nextPos = position[dimension] + velocity[dimension];
            if (nextPos > maxPos[dimension] || nextPos < -maxPos[dimension]) velocity[dimension] *= -1;
            position[dimension] += velocity[dimension];
        });
    },

    getRandomVector3: function (constant) {
        function random() {
            var sign = (Math.random() < 0.5) ? 1 : -1;
            return sign * Math.random() * constant;
        }
        return new THREE.Vector3(random(), random(), random());
    }
};
