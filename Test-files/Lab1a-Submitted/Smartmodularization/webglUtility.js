export const WebGLUtility = (function () {
    var gl, program, u_ModelViewMatrix, u_ProjectionMatrix;

    function init() {
        var canvas = document.getElementById('webgl-canvas');
        gl = canvas.getContext('webgl');
        if (!gl) {
            console.error('Unable to initialize WebGL. Your browser may not support it.');
        }
    }

    function compileShader(type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Error compiling shader:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    function createProgram(vertexShader, fragmentShader) {
        program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Unable to initialize the shader program:', gl.getProgramInfoLog(program));
        }
        gl.useProgram(program);
    }

    function getUniformLocation(name) {
        return gl.getUniformLocation(program, name);
    }

    return {
        init: init,
        compileShader: compileShader,
        createProgram: createProgram,
        getUniformLocation: getUniformLocation,
        getContext: function () { return gl; }
    };
})();
