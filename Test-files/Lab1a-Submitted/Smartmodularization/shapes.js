import { WebGLUtility } from './webglUtility.js';

export const Shapes = (function () {
    var vertices, indices;

    function init() {
        vertices = [
            -1, -1, 1,   1, 0, 0,  
            1, -1, 1,    0, 1, 0,  
            1, 1, 1,     0, 0, 1,  
            -1, 1, 1,    1, 1, 0,  
            // Define more vertices here
        ];

        indices = [
            0, 1, 2,    0, 2, 3,  
            // Define more indices here
        ];
    }

    function setupBuffers() {
        var gl = WebGLUtility.getContext();
        var vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        var indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

        var a_Position = gl.getAttribLocation(WebGLUtility.program, 'a_Position');
        var a_Color = gl.getAttribLocation(WebGLUtility.program, 'a_Color');
        var u_ModelViewMatrix = gl.getUniformLocation(WebGLUtility.program, 'u_ModelViewMatrix');
        var u_ProjectionMatrix = gl.getUniformLocation(WebGLUtility.program, 'u_ProjectionMatrix');

        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.enableVertexAttribArray(a_Position);
        gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(a_Color);
    }

    function draw() {
        var gl = WebGLUtility.getContext();
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    }

    return {
        init: init,
        setupBuffers: setupBuffers,
        draw: draw
    };
})();
