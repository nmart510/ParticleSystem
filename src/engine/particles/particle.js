/* 
 * File: particle.js
 * Defines a particle
 */
"use strict";

import * as loop from "../core/loop.js";
import * as particleSystem from "../components/particle_system.js";
import ParticleRenderable from "../renderables/particle_renderable.js";
import PixelRenderable from "../renderables/pixel_renderable.js";
import * as debugDraw from "../core/debug_draw.js";

let kSizeFactor = 0.2;

class Particle {
    /**
     * @constructor - Represents a Particle
     * @param {string} texture - A path to the texture that the particle will have
     * @param {float} x - The x coordinate of the position
     * @param {float} y - The y coordinate of the position
     * @param {float} life - The lifespan of the particle
     */
    constructor(texture, x, y, life) {
        //this.mRenderComponent = new ParticleRenderable(texture);
        this.mRenderComponent = new PixelRenderable(texture);
        this.setPosition(x, y);

        // position control
        this.mVelocity = vec2.fromValues(0, 0);
        this.mAcceleration = particleSystem.getSystemAcceleration();
        this.mDrag = .95;

        // Color control
        this.mDeltaColor = [0, 0, 0, 0];

        // Size control
        this.mSizeDelta = 0;

        // Life control
        this.mCyclesToLive = life;
    }

    drawMarker(aCamera) {
        let size = this.getSize();
        debugDraw.drawCrossMarker(aCamera, this.getPosition(), size[0] * kSizeFactor, [0, 1, 0, 1]);
    }
    /**
     * @function draw() - Draws the particle to the given camera
     * @param {Camera} aCamera - The camera to be drawn to
     */
    draw(aCamera) {
        this.mRenderComponent.draw(aCamera);
    }
    /**
     * @function terminate() - Sets the number of cycles to 0
     */
    terminate(){
        this.mCyclesToLive = 0;
    }
    /**
     * @function update() - Uses the position and color control variables to update the particle based on the update interval
     */
    update() {
        this.mCyclesToLive--;

        let dt = loop.getUpdateIntervalInSeconds();

        // Symplectic Euler
        //    v += a * dt
        //    x += v * dt
        let p = this.getPosition();
        vec2.scaleAndAdd(this.mVelocity, this.mVelocity, this.mAcceleration, dt);
        vec2.scale(this.mVelocity, this.mVelocity, this.mDrag);
        vec2.scaleAndAdd(p, p, this.mVelocity, dt);

        // update color
        let c = this.mRenderComponent.getColor();
        vec4.add(c, c, this.mDeltaColor);
    
        // update size
        let size = this.mRenderComponent.getSize();
        let s = size * this.mSizeDelta;
        this.mRenderComponent.setSize(s);
    }

    /**
     * @function hit() - Behavior of the particle upon collision
     */
    hit() {
        //console.log("Test");
    }
    /**
     * @function setFinalColor() - Sets the final color of the particle
     * @param {vec2} f - the vector to subtract from the current color
     */
    setFinalColor = function(f) {    
        vec4.sub(this.mDeltaColor, f, this.getColor());
        if (this.mCyclesToLive !== 0) {
            vec4.scale(this.mDeltaColor, this.mDeltaColor, 1/this.mCyclesToLive);
        }
    }
    /**
     * @function setColor() - Sets the current color to a new one
     * @param {vec4} c - The new color
     */
    setColor(c) { this.mRenderComponent.setColor(c); }
    /**
     * @function getColor() - Gets the current color
     * @returns {vec4} The current color
     */
    getColor() { return this.mRenderComponent.getColor(); }
    /**
     * @function getDrawBounds() - Returns the drawing bounds of the particle
     * @returns {}
     */
    getDrawBounds() { return this.mDrawBounds; }
    /**
     * @function setDrawBounds() - Sets the drawing bounds
     * @param {*} d 
     */
    setDrawBounds(d) { this.mDrawBounds = d; }

    /**
     * @function getPosition() - Gets the current position of the particle
     * @returns {vec2} The x and y coordinates of the particle's position
     */
    getPosition() { return this.mRenderComponent.getXform().getPosition(); }
    /**
     * @function setPosition() - Sets the position of the particle
     * @param {float} xPos - the x coordinate of the position
     * @param {float} yPos - the y coordinate of the position
     */
    setPosition(xPos, yPos) { 
        this.mRenderComponent.getXform().setXPos(xPos); 
        this.mRenderComponent.getXform().setYPos(yPos); 
    }
    /**
     * @function getSize() - gets the size of the particle
     * @returns {vec2} The width and height of the particle
     */
    getSize() { return this.mRenderComponent.getSize(); }
    /**
     * @function setSize() - Sets the size of the particle
     * @param {vec2} s - The new size to assign to the particle
     */
    setSize(s) { this.mRenderComponent.setSize(s); }

    /**
     * @function getVelocity() - gets the current velocity
     * @returns {vec2} mVelocity - The current velocity
     */
    getVelocity() { return this.mVelocity; }
    /**
     * @function setVelocity() - Sets the current velocity
     * @param {float} x - Horizontal velocity
     * @param {float} y - Vertical velocity
     */
    setVelocity(x, y) { 
        this.mVelocity[0] = x;
        this.mVelocity[1] = y;
    }
    /**
     * @function getAcceleration() - Gets the current acceleration
     * @returns {vec2} The current acceleration
     */
    getAcceleration() { return this.mAcceleration; }
    /**
     * @function setAcceleration() - Sets the current acceleration
     * @param {float} x - The horizontal acceleration
     * @param {float} y - The vertical acceleration
     */
    setAcceleration(x, y) { 
        this.mAcceleration[0] = x;
        this.mAcceleration[1] = y;
    }

    /**
     * @function setDrag() - Sets the current drag to a new value
     * @param {float} d - The new drag
     */
    setDrag(d) { this.mDrag = d; }
    /**
     * @function getDrag() - Gets the current drag
     * @returns {float} mDrag - The current drag
     */
    getDrag() { return this.mDrag; }

    /**
     * @function setSizeDelta() - Sets the size delta
     * @param {float} d - the size delta
     */
    setSizeDelta(d) { this.mSizeDelta = d; }

    /**
     * @function hasExpired() - Checks if the particle has expired or not
     * @returns {bool} true if cycles to live ar eless than 0, false otherwise
     */
    hasExpired() { return (this.mCyclesToLive < 0); }
}

export default Particle;