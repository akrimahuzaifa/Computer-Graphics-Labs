import { initCubeBuffers, initPyramidBuffers, initConeBuffers } from "./init-buffers.js";

function drawScene(gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
  gl.clearDepth(1.0); // Clear everything
  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things

  // Clear the canvas before we start drawing on it.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene initially lying on the positive z-axis.
  const modelViewMatrix = mat4.create();
  mat4.translate(
    modelViewMatrix,
    modelViewMatrix,
    [0.0, 0.0, -6.0], // Camera position initially
  );

  // Draw 9 3D shapes

  // Draw cubes
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const cubeModelViewMatrix = mat4.clone(modelViewMatrix);
      mat4.translate(cubeModelViewMatrix, cubeModelViewMatrix, [i * 2.5, j * 2.5, 0.0]);
      drawShape(gl, programInfo, buffers.cube, cubeModelViewMatrix);
    }
  }

  // Draw pyramids
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const pyramidModelViewMatrix = mat4.clone(modelViewMatrix);
      mat4.translate(pyramidModelViewMatrix, pyramidModelViewMatrix, [i * 2.5, j * 2.5, -5.0]);
      drawShape(gl, programInfo, buffers.pyramid, pyramidModelViewMatrix);
    }
  }

  // Draw cones
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const coneModelViewMatrix = mat4.clone(modelViewMatrix);
      mat4.translate(coneModelViewMatrix, coneModelViewMatrix, [i * 2.5, j * 2.5, -10.0]);
      drawShape(gl, programInfo, buffers.cone, coneModelViewMatrix);
    }
  }
}

function drawShape(gl, programInfo, buffer, modelViewMatrix) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.position);
  setPositionAttribute(gl, buffer, programInfo);

  gl.useProgram(programInfo.program);
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix,
  );

  const offset = 0;
  const vertexCount = buffer.numVertices;
  gl.drawArrays(gl.TRIANGLES, offset, vertexCount);
}

function setPositionAttribute(gl, buffer, programInfo) {
  const numComponents = 3; // 3 values per vertex for 3D
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.position);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset,
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}


export { drawScene };
