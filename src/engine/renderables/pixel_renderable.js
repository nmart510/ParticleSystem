/*
 * File: line_renderable.js
 *  
 * Renderable class for lines
 */
"use strict";

import * as glSys from "../core/gl.js";
import Renderable from "./renderable.js";
import Transform from "../utils/transform.js";
import * as shaderResources from "../core/shader_resources.js";

class PixelRenderable extends Renderable {
    /**
     * @constructor - Represents a PixelRenderable
     * @param {float} x - x coordinate of the renderable's position
     * @param {float} y - y coordinate of the renderable's position
     */
    // p1, p2: either both there, or none
    constructor(x, y) {
        super();
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

    /**
     * @function draw() - Activates the shader of the renderable and draws to the given camera
     * @param {Camera} camera - The camera to draw to 
     */
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

    /**
     * @function setShowPoint() - Sets whether or not the pixel gets drawn
     * @param {bool} b - determines if the point gets drawn
     */
    setShowPoint(b) { this.mShowPoint = b; }

    /**
     * @function setSize() - Sets the size of the point
     * @param {float} s - the new float size
     */
    setSize(s) { this.mPointSize = s; }
    /**
     * @function getSize() - Gets the current point size
     * @returns {float} mPointSize - The current size of the point
     */
    getSize() { return this.mPointSize; }

    /**
     * @function setPosition() - Sets the position of the renderable
     * @param {float} x - The x coordinate of the position
     * @param {float} y - The y coordinate of the position
     */
    setPosition(x, y) {
        let xf = this.mXform;
        xf.setPosition(x, y);
    }
    /**
     * @function getPosition() - Gets the current position of the renderable
     * @returns {vec2} The current position of the renderable
     */
    getPostion() {
        let xf = this.mXform;
        return xf.getPosition(); 
    }
}

export default PixelRenderable;