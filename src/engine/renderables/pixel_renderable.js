/*
 * File: line_renderable.js
 *  
 * Renderable class for lines
 */
"use strict";

import * as glSys from "../core/gl.js";
import Transform from "../utils/transform.js";
import * as shaderResources from "../core/shader_resources.js";

class PixelRenderable {
    // p1, p2: either both there, or none
    constructor(x, y) {
        this.mShader = shaderResources.getPointShader();  // get the constant color shader
        this.mXform = new Transform(); // transform that moves this object around
        this.mColor = [1, 0, 0, 1];    // color of pixel

        this.mPointSize = 1;
        this.mShowPoint = true;

        this.mPointLoc = vec2.fromValues(0, 0);

        if (x !== "undefined") {
            this.setPosition(x, y);
        }
    }

    //**-----------------------------------------
    // Public methods
    //**-----------------------------------------
    draw(camera) {
        let x = this.mPointLoc[0];
        let y = this.mPointLoc[1];
        let xf = this.mXform;
        xf.setSize(this.mPointSize, this.mPointSize);
        xf.setPosition(x, y);
        this.mShader.activate(this.mColor, this.mXform.getTRSMatrix(), camera.getCameraMatrix());
        this.mShader.setPointSize(this.mPointSize);

        // Draw point instead of triangle!
        let gl = glSys.get();
        if (this.mShowPoint) {
            //gl.drawArrays(gl.LINE_STRIP, 0, 2);
            gl.drawArrays(gl.POINTS, 0, 2);
        }
    }

    setShowPoint(b) { this.mShowPoint = b; }
    setSize(s) { this.mPointSize = s; }
    setPosition(x, y) {
        this.mPointLoc[0] = x;
        this.mPointLoc[1] = y;
    }

    //getXform() { return this.mXform; }
    setColor(color) { this.mColor = color; }
    getColor() { return this.mColor; }
}

export default PixelRenderable;