// main.js
import { vsSource, fsSource } from './shader.js';
import { initBuffer } from './buffer.js';
import { drawShape } from './draw.js';

const canvas = document.getElementById("webglCanvas");
const gl = canvas.getContext("webgl");

if (!gl) {
    alert("Unable to initialize WebGL. Your browser may not support it.");
}



function main() {
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            position: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            color: gl.getUniformLocation(shaderProgram, 'uColor'),
        },
        vertexCount: 36,
    };

    const cubeVertices = [
        // Cube vertices...
        // Front face
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, -1.0, -1.0,

        // Top face
        -1.0, 1.0, -1.0,
        -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0, 1.0,
        -1.0, -1.0, -1.0,
        1.0, -1.0, 1.0,
        -1.0, -1.0, 1.0,

        // Right face
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, -1.0, -1.0,
        -1.0, 1.0, 1.0,
        -1.0, 1.0, -1.0,
    ];

    const pyramidVertices = [
        // Pyramid vertices...
        // Front face
        0.0, 1.0, 0.0,
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,

        // Right face
        0.0, 1.0, 0.0,
        1.0, -1.0, 1.0,
        1.0, -1.0, -1.0,

        // Back face
        0.0, 1.0, 0.0,
        1.0, -1.0, -1.0,
        -1.0, -1.0, -1.0,

        // Left face
        0.0, 1.0, 0.0,
        -1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0,
    ];

    const cubeBuffer = initBuffer(gl, cubeVertices);
    const pyramidBuffer = initBuffer(gl, pyramidVertices);

    // Clear the canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    // Draw the shapes
    drawShape(gl, programInfo, cubeBuffer, [1.0, 0.0, 0.0, 1.0], [-2.0, 0.0, -6.0], [0.0, 0.0]);
    drawShape(gl, programInfo, cubeBuffer, [0.0, 1.0, 0.0, 1.0], [0.0, 0.0, -6.0], [0.0, 0.0]);
    drawShape(gl, programInfo, cubeBuffer, [0.0, 0.0, 1.0, 1.0], [2.0, 0.0, -6.0], [0.0, 0.0]);

    drawShape(gl, programInfo, pyramidBuffer, [1.0, 1.0, 0.0, 1.0], [-2.0, 2.0, -6.0], [0.0, 0.0]);
    drawShape(gl, programInfo, pyramidBuffer, [1.0, 0.0, 1.0, 1.0], [0.0, 2.0, -6.0], [0.0, 0.0]);
    drawShape(gl, programInfo, pyramidBuffer, [0.0, 1.0, 1.0, 1.0], [2.0, 2.0, -6.0], [0.0, 0.0]);

    drawShape(gl, programInfo, cubeBuffer, [1.0, 1.0, 1.0, 1.0], [-2.0, -2.0, -6.0], [0.0, 0.0]);
    drawShape(gl, programInfo, cubeBuffer, [0.5, 0.5, 0.5, 1.0], [0.0, -2.0, -6.0], [0.0, 0.0]);
    drawShape(gl, programInfo, cubeBuffer, [0.5, 0.0, 0.5, 1.0], [2.0, -2.0, -6.0], [0.0, 0.0]);
}

main();
