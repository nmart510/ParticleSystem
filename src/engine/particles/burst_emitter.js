/* 
 * File: burst_emitter.js
 * 
 */
import ParticleEmitter from "./particle_emitter.js";
import Particle from "./particle.js";
import engine from "../../engine/index.js";
"use strict";

let kMinToEmit = 5; // Smallest number of particle emitted per cycle

/** Class BurstEmitter
 *  Creates and emits burst-like effects.
 *  @constructor
 *  @param {float} px - The x coordinate of the emitter's position
 *  @param {float} py - the y coordinate of the emitter's position
 *  @param {int} num - The number of particles to emit
 */
class BurstEmitter extends ParticleEmitter {
    constructor(px, py, num) {
        super(px, py, num);
        this.mRadius = 50;
        this.mNumParticles = num;
        this.mNumRemains = 4;
        this.mSpacing = 6;
        this.mCount = 0;
        this.mDrag = 1;
        this.mAcceleration = vec2.fromValues(0, 0);
    }
    /**
     * @function getRadius() - Returns the current radius
     * @returns {float} mRadius - The radius of the burst being emitted
     */
    getRadius() {
        return this.mRadius;
    }
    /**
     * @function setRadius() - Sets the radius to a new value 
     * @param {float} r - The new value to assign to the radius
     */
    setRadius(r) {
        this.mRadius = r;
    }
    /**
     * @function getNumParticles() - gets the current number of particles to be emitted
     * @returns {int} mNumParticles - The number of particles to emit
     */
    getNumParticles() {
        return this.mNumParticles;
    }
    /**
     * @function setNumParticles() - Sets the number of particles to emit to a new value
     * @param {int} num - the new value to assign to mNumParticles
     */
    setNumParticles(num) {
        this.mNumParticles = num;
    }
    /**
     * @function getPulses() - gets the number of pulses for the burst
     * @returns {int} mNumRemains - The number of pulses left
     */
    getPulses() {
        return this.mNumRemains;
    }
    /**
     * @function setPulses(pulses) - Sets the number of pulses
     * @param {int} pulses - the number of pulses to assign mNumRemains to
     */
    setPulses(pulses) {
        this.mNumRemains = pulses;
    }
    /**
     * @function getSpacing() - gets the spacing
     * @returns {int} mSpacing - The space between each ring in the burst
     */
    getSpacing() {
        return this.mSpacing;
    }
    /**
     * @function setSpacing() - sets the space between each ring in the burst
     * @param {int} s - the new value to set mSpacing to
     */
    setSpacing(s) {
        this.mSpacing = s;
    }
    /**
     * @function getDrag() - gets the current drag
     * @returns {float} mDrag - The drag for each particle
     */
    getDrag() {
        return this.mDrag;
    }
    /**
     * @function setDrag() - sets the drag for each particle being emitted
     * @param {float} d 
     */
    setDrag(d) {
        this.mDrag = d;
    }
    /**
     * @function getAcceleration() - gets the current acceleration
     * @returns {float} mAcceleration - The current acceleration
     */
    getAcceleration() {
        return this.mAcceleration;
    }
    /**
     * @function setAcceleration() - updates the current acceleration
     * @param {float} a - The new value for acceleration
     */
    setAcceleration(a) {
        this.mAcceleration = a;
    }
    /**
     * @function emitParticles() - uses the creator function to create and emit particles
     * @param {ParticleSet} pSet - The set of particles to emit
     */
    emitParticles(pSet) {
        if (this.mCount % this.mSpacing == 0){
            let i, p;
            let theta = 0;
            for (i = 0; i < this.mNumParticles; i++) {
                p = this.createBurst(this.mEmitPosition[0], this.mEmitPosition[1],this.mColorBegin, 
                    this.mColorEnd, theta, this.mRadius);
                pSet.addToSet(p);
                theta += (2*Math.PI) / (this.mNumParticles);
            }
            this.mNumRemains -= 1;
        }
        this.mCount++;
    }
    /**
     * @function createBurst() - Creator function used by the emitter, creates a particle and returns it. 
     *                           Used for burst effects.
     * @param {float} atX - x coordinate of the particle position
     * @param {float} atY - y coordinate of the particle position
     * @param {vec4} colorStart - the particle's initial color
     * @param {vec4} colorEnd - the particle's final color
     * @param {float} theta - the angle in which the particle will travel
     * @param {float} radius - radius of the burst
     * @returns {Particle} p - The newly created particle
     */
    createBurst(atX, atY, colorStart, colorEnd, theta, radius) {
        let life = 100 + Math.random() * 200;
        
        // size of the particle
        let r = this.size + (Math.random()-.5) * this.variance;
        
        let p = new Particle(engine.defaultResources.getDefaultPSTexture(), atX, atY, life);
        p.setColor([colorStart[0],colorStart[1],colorStart[2],colorStart[3]]);
        p.setSize(r, r);
        // final color
        // let fr = 3.5 + Math.random();
        
        p.setFinalColor(colorEnd);

        let fx = Math.cos(theta) * radius;
        let fy = Math.sin(theta) * radius;
        // velocity on the particle
        p.setVelocity(fx, fy);
        p.setDrag(1);
        p.setAcceleration(0, 0);
        // size delta
        p.setSizeDelta(0.95);
        
        return p;
    }
}

export default BurstEmitter;