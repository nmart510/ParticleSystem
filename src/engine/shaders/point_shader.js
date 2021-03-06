/* 
 * File: point_shader.js
 *          for particle engine
 */
"use strict";

import * as glSys from "../core/gl.js";
import * as vertexBuffer from "../core/vertex_buffer.js";
import SimpleShader from "./simple_shader.js";

class PointShader extends SimpleShader {
    /**
     * @constructor PointShader
     * @param {string} vertexShaderPath - Path to the vertex shader
     * @param {string} fragmentShaderPath - Path to the fragment shader
     */
    constructor(vertexShaderPath, fragmentShaderPath) {
        super(vertexShaderPath, fragmentShaderPath);
        let gl = glSys.get();

        this.mPointSizeRef = null;            // reference to the PointSize uniform

        // point size uniform
        this.mPointSizeRef = gl.getUniformLocation(this.mCompiledShader, "uPointSize");

        this.mPointSize = 1;
    }

    /**
     * @function activate() - Activates the shader for rendering
     * @param {vec4} pixelColor - The color that is referenced in the fragment shader
     * @param {mat4} trsMatrix - The transform matrix
     * @param {mat4} cameraMatrix - The camera matrix
     */
    // Activate the shader for rendering
    activate(pixelColor, trsMatrix, cameraMatrix) {
        // first call the super class' activate
        super.activate(pixelColor, trsMatrix, cameraMatrix);

        // now our own functionality: load the pixel size
        let gl = glSys.get();
        gl.uniform1f(this.mPointSizeRef, this.mPointSize);

        // re-bind the vertex position attribute to the pixel's buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.getPointVertexBuffer());
        gl.vertexAttribPointer(this.mVertexPositionRef,  // this is defined in SimpleShader
            3,              // each element is a 3-float (x,y.z)
            gl.FLOAT,       // data type is FLOAT
            false,          // if the content is normalized vectors
            0,              // number of bytes to skip in between elements
            0);
        gl.enableVertexAttribArray(this.mVertexPositionRef);
    }
    /**
     * @function setPointSize() - sets the pixel size to allow resizing
     * @param {float} w - the new pixel size
     */
    setPointSize(w) { 
        this.mPointSize = w;
    }
}

export default PointShader;