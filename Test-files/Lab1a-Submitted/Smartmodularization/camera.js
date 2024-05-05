import { mat4, vec3 } from 'https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js';

export const Camera = (function () {
    var modelViewMatrix;

    function init() {
        modelViewMatrix = mat4.create();
        // Set up camera here
    }

    function handleMouseMove(event) {
        // Handle mouse move event here
    }

    function handleKeyDown(event) {
        // Handle key down event here
    }

    return {
        init: init,
        handleMouseMove: handleMouseMove,
        handleKeyDown: handleKeyDown
    };
})();
