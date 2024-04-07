// Set up the WebGL context and canvas
const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

// Set up the viewport
const viewportWidth = canvas.width;
const viewportHeight = canvas.height;
gl.viewport(0, 0, viewportWidth, viewportHeight);

// Set up the clear color
gl.clearColor(0.0, 0.0, 0.0, 1.0);

// Set up the depth buffer
gl.enable(gl.DEPTH_TEST);

// Set up the vertex and fragment shaders
const vertexShaderSource = `
  attribute vec4 aVertexPosition;
  attribute vec4 aVertexColor;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying vec4 vColor;

  void main() {
    vColor = aVertexColor;
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  varying vec4 vColor;

  void main() {
    gl_FragColor = vColor;
  }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

// Set up the camera
const cameraPosition = [0.0, 0.0, 5.0];
const cameraLookAt = [0.0, 0.0, 0.0];
const cameraUp = [0.0, 1.0, 0.0];
const projectionMatrix = glMatrix.mat4.create();
glMatrix.mat4.perspective(projectionMatrix, 45.0, viewportWidth / viewportHeight, 0.1, 100.0);
const modelViewMatrix = glMatrix.mat4.create();
glMatrix.mat4.lookAt(modelViewMatrix, cameraPosition, cameraLookAt, cameraUp);

// Set up the shapes
const shapes = [
    {
      vertices: new Float32Array([
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
         1.0,  1.0, 0.0,
        -1.0,  1.0, 0.0
      ]),
      colors: new Float32Array([
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0
      ]),
      indices: new Uint16Array([
        0, 1, 2,
        0, 2, 3
      ]),
      position: [0.0, 0.0, 0.0],
      rotation: [0.0, 0.0, 0.0],
      scale: [1.0, 1.0, 1.0]
    },
    {
      vertices: new Float32Array([
        -1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
         1.0, -1.0, 0.0
      ]),
      colors: new Float32Array([
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0
      ]),
      indices: new Uint16Array([
        0, 1, 2,
        0, 2, 3
      ]),
      position: [2.0, 0.0, 0.0],
      rotation: [0.0, 0.0, 0.0],
      scale: [1.0, 1.0, 1.0]
    },
    {
      vertices: new Float32Array([
        -1.0, 0.0, -1.0,
         1.0, 0.0, -1.0,
         0.0, 1.0,  1.0
      ]),
      colors: new Float32Array([
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0
      ]),
      indices: new Uint16Array([
        0, 1, 2
      ]),
      position: [-2.0, 0.0, 0.0],
      rotation: [0.0, 0.0, 0.0],
      scale: [1.0, 1.0, 1.0]
    },
    // Add 6 more shapes here, each with a different position, rotation, and scale
  ];

// Set up the shape buffers
const shapeBuffers = [];
for (let i = 0; i < shapes.length; i++) {
  const shape = shapes[i];
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, shape.vertices, gl.STATIC_DRAW);
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, shape.colors, gl.STATIC_DRAW);
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, shape.indices, gl.STATIC_DRAW);
  shapeBuffers.push({
    vertexBuffer: vertexBuffer,
    colorBuffer: colorBuffer,
    indexBuffer: indexBuffer
  });
}

// Set up the shape uniforms
const shapeUniforms = [];
for (let i = 0; i < shapes.length; i++) {
  const shape = shapes[i];
  const shapeMatrix = glMatrix.mat4.create();
  glMatrix.mat4.fromRotationTranslationScale(shapeMatrix, glMatrix.quat.fromEuler(glMatrix.quat.create(), shape.rotation[0], shape.rotation[1], shape.rotation[2]), shape.position, shape.scale);
  shapeUniforms.push({
    modelViewMatrix: gl.getUniformLocation(program, 'uModelViewMatrix'),
    projectionMatrix: gl.getUniformLocation(program, 'uProjectionMatrix'),
    modelViewMatrixLocation: gl.getUniformLocation(program, 'uModelViewMatrix'),
    projectionMatrixLocation: gl.getUniformLocation(program, 'uProjectionMatrix'),
    shapeMatrix: shapeMatrix
  });
}

// Set up the drawing function
function draw() {
  // Clear the canvas and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Set up the model view and projection matrices
  glMatrix.mat4.multiply(modelViewMatrix, projectionMatrix, modelViewMatrix);

  // Draw each shape
  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];
    const shapeBuffer = shapeBuffers[i];
    const shapeUniform = shapeUniforms[i];

    // Set up the vertex and color attributes
    gl.bindBuffer(gl.ARRAY_BUFFER, shapeBuffer.vertexBuffer);
    const aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aVertexPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, shapeBuffer.colorBuffer);
    const aVertexColor = gl.getAttribLocation(program, 'aVertexColor');
    gl.vertexAttribPointer(aVertexColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aVertexColor);

    // Set up the index buffer
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shapeBuffer.indexBuffer);

    // Set up the model view matrix
    glMatrix.mat4.copy(shapeUniform.shapeMatrix, modelViewMatrix);
    gl.uniformMatrix4fv(shapeUniform.modelViewMatrixLocation, false, shapeUniform.shapeMatrix);

    // Draw the shape
    gl.drawElements(gl.TRIANGLES, shape.indices.length, gl.UNSIGNED_SHORT, 0);
  }

  // Request the next animation frame
  requestAnimationFrame(draw);
}

// Start the animation
requestAnimationFrame(draw);