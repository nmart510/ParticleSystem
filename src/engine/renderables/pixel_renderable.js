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

        //this.mPointLoc = vec2.fromValues(0, 0);

        if (x !== "undefined") {
            this.setPosition(x, y);
        }
    }

    //**-----------------------------------------
    // Public methods
    //**-----------------------------------------
    draw(camera) {
        let xf = this.mXform;
        xf.setSize(this.mPointSize, this.mPointSize);
        this.mShader.setPointSize(this.mPointSize);
        this.mShader.activate(this.mColor, this.mXform.getTRSMatrix(), camera.getCameraMatrix());
        
        // Draw point instead of triangle!
        let gl = glSys.get();
        if (this.mShowPoint) {
            //gl.drawArrays(gl.LINE_STRIP, 0, 2);
            gl.drawArrays(gl.POINTS, 0, 1);
        }
    }

    setShowPoint(b) { this.mShowPoint = b; }

    //Size Getters and Setters
    setSize(s) { this.mPointSize = s; }
    getSize() { return this.mPointSize; }

    //Position Getters and Setters
    setPosition(x, y) {
        let xf = this.mXform;
        xf.setPosition(x, y);
    }
    getPostion() {
        let xf = this.mXform;
        return xf.getPosition(); 
    }

    getXform() { return this.mXform; } //Xform can result in unexpected behavior

    //Color Getters and Setters
    setColor(color) { this.mColor = color; }
    getColor() { return this.mColor; }
}

export default PixelRenderable;