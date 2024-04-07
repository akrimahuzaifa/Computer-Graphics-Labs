// draw.js
import { mat4 } from 'gl-matrix';

export function drawShape(gl, programInfo, buffers, color, translation, rotation) {
    const { vertexCount } = programInfo;
    const { position, color: colorLocation } = programInfo.attribLocations;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(position);

    gl.useProgram(programInfo.program);

    gl.uniform4fv(colorLocation, color);

    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, translation);
    mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[0], [1, 0, 0]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, rotation[1], [0, 1, 0]);

    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, 45 * Math.PI / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 100.0);

    const uModelViewMatrix = gl.getUniformLocation(programInfo.program, 'uModelViewMatrix');
    const uProjectionMatrix = gl.getUniformLocation(programInfo.program, 'uProjectionMatrix');

    gl.uniformMatrix4fv(uModelViewMatrix, false, modelViewMatrix);
    gl.uniformMatrix4fv(uProjectionMatrix, false, projectionMatrix);

    gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
}
