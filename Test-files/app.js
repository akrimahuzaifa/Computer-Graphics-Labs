
var InitDemo = function () {
    console.log('this working');
    var canvas = document.getElementById('game-surface');
    var gl = canvas.getContext('webgl');
    if (!gl) {
        console.log('WebGL not supported, falling back on experimental');
        gl = canvas.getContext('experimental-webgl');
        alert('Your browaer does not support webgl');
    }
    else{
        console.log('WebGL supported!@!@!@!');
    }

    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

};