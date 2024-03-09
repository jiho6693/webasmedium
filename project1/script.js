window.onload = function() {
    const canvas = document.getElementById('glCanvas');
    const gl = canvas.getContext('webgl');
    if (!gl) {
        alert('Unable to initialize WebGL. Your browser may not support it.');
        return;
    }

    // Vertex shader program
    const vsSource = `
        attribute vec2 a_position;
        uniform vec2 u_resolution;
        varying vec2 v_texCoord;

        void main() {
            // Convert the position from pixels to 0.0 to 1.0
            vec2 zeroToOne = a_position / u_resolution;

            // Convert from 0->1 to 0->2
            vec2 zeroToTwo = zeroToOne * 2.0;

            // Convert from 0->2 to -1->+1 (clip space)
            vec2 clipSpace = zeroToTwo - 1.0;

            gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

            // Pass the texture coordinate to the fragment shader
            v_texCoord = zeroToOne;
        }
    `;

    // Fragment shader program
    const fsSource = `
        precision mediump float;
        varying vec2 v_texCoord;

        void main() {
            vec2 center = vec2(0.5);
            float strength = 0.1; // Strength of the paper folding effect
            float radius = 0.2; // Radius of the paper folding effect

            // Calculate distance to the center
            float distanceToCenter = distance(v_texCoord, center);

            // Apply the folding effect
            float foldEffect = smoothstep(radius - strength, radius + strength, distanceToCenter);

            // Blend between original texture and folded texture
            vec4 originalColor = vec4(1.0); // Original color (white)
            vec4 foldedColor = vec4(0.8, 0.8, 0.8, 1.0); // Folded color (light gray)
            gl_FragColor = mix(originalColor, foldedColor, foldEffect);
        }
    `;

    // Compile shader
    function compileShader(gl, source, type) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vertexShader = compileShader(gl, vsSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(gl, fsSource, gl.FRAGMENT_SHADER);

    // Link program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    gl.useProgram(shaderProgram);

    // Set up geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
        -1.0,  1.0,
         1.0,  1.0,
        -1.0, -1.0,
         1.0, -1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Set resolution uniform
    const resolutionUniformLocation = gl.getUniformLocation(shaderProgram, 'u_resolution');
    gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);

    // Render loop
    function render() {
        gl.clearColor(1.0, 1.0, 1.0, 1.0); // White background
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    render();
};
