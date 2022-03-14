/* 
 * File: particle_emitter.js
 * 
 */
import Particle from "./particle.js";
import engine from "../../engine/index.js";
"use strict";

//let kMinToEmit = 5; // Smallest number of particle emitted per cycle

/** 
 *  @constructor ParticleEmitter
 *  @param {float} px - The x coordinate of the emitter's position
 *  @param {float} py - the y coordinate of the emitter's position
 *  @param {int} num - The number of particles to emit
 */
class ParticleEmitter {
    constructor(px, py, num) {
        // Emitter position
        this.mEmitPosition = [px, py];

        // Number of particles left to be emitted
        this.mNumRemains = num;

        // Function to create particles (user defined)
        this.mColorBegin = [1,1,1,1];
        this.mColorEnd = [1,1,1,1];
        this.size = 1;
        this.variance = 0;
        this.mDelta = 0;
    }
    /**
     * @function getParticleSize() - Returns the size of the particles
     * @returns {float} size - The current size of the particles
     */
    getParticleSize(){
        return this.size;
    }
    /**
     * @function setParticleSize() - Sets the size of the particles
     * @param {float} size - The new size 
     */
    setParticleSize(size){
        this.size = size;
    }
    /**
     * @function getSizeVariance() - gets the current size variance
     * @returns {float} variance - the amount in which the vary the particle sizes
     */
    getSizeVariance(){
        return this.variance;
    }
    /**
     * @function setSizeVariance() - Sets the size variance
     * @param {float} variance - The new size variance
     */
    setSizeVariance(variance){
        this.variance = 2*variance;
    }
    /**
     * @function setGrowth() - Sets the growth rate to a new value
     * @param {float} delta - The new growth rate
     */
    setGrowth(delta) {
        this.mDelta = delta;
    }
    /**
     * @function getGrowth() - Gets the current growth rate
     * @returns {float} mDelta - The current growth rate
     */
    getGrowth() { return this.mDelta; }
    /**
     * @function getColorStart() - gets the starting color
     * @returns {vec4} mColorBegin - The starting color
     */
    getColorStart(){
        return this.mColorBegin;
    }
    /**
     * @function setColorStart() - Sets the starting color
     * @param {vec4} c - The new starting color
     */
    setColorStart(c){
        this.mColorBegin = c;
    }
    /**
     * @function getColorEnd() - Gets the ending color
     * @returns {vec4} mColorEnd - The ending color
     */
    getColorEnd(){
        return this.mColorEnd;
    }
    /**
     * @function setColorEnd() - Sets the ending color
     * @param {vec4} c - the new ending color
     */
    setColorEnd(c){
        this.mColorEnd = c;
    }
    //end any ongoing particle emitter by setting numRemains to 0
    /**
     * @function terminate() - sets numRemains to 0
     */
    terminate(){this.mNumRemains = 0;}
    /**
     * @function expired() - Checks if the number of particles remaining is less than or equal to 0
     * @returns {bool} true if numRemains is less than or equal to 0, false otherwise
     */
    expired() { return (this.mNumRemains <= 0); }
    /**
     * @function emitParticles() - Creates the particles to be emitted and pushes them to the particle set
     * @param {ParticleSet} pSet - The particle set to be emitted
     */
    emitParticles(pSet) {
        let numToEmit = 0;
        if (this.mNumRemains < this.kMinToEmit) {
            // If only a few are left, emits all of them
            numToEmit = this.mNumRemains;
        } else {
            // Otherwise, emits about 20% of what's left
            numToEmit = Math.trunc(Math.random() * 0.2 * this.mNumRemains);
        }
        // Left for future emitting.                            
        this.mNumRemains -= numToEmit;
        let i, p;
        for (i = 0; i < numToEmit; i++) {
            p = this.createParticle(this.mEmitPosition[0], this.mEmitPosition[1],this.mColorBegin, this.mColorEnd);
            pSet.addToSet(p);
        }
    }
    /**
     * @function createParticle() - Creator function used by the emitter, creates a particle and returns it. Default effect.
     * @param {float} atX - x coordinate of the particle position
     * @param {float} atY - y coordinate of the particle position
     * @param {vec4} colorStart - the particle's initial color
     * @param {vec4} colorEnd - the particle's final color 
     * @returns {Particle} p - new particle to be pushed to the particle set
     */
    createParticle(atX, atY, colorStart, colorEnd) {
        let life = 30 + Math.random() * 200;
        let p = new Particle(atX, atY, life);
        p.setColor([colorStart[0],colorStart[1],colorStart[2],colorStart[3]]);
        // size of the particle
        let r = this.size + (Math.random()-.5) * this.variance;
        p.setSize(r, r);
        // final color
        p.setFinalColor(colorEnd);
        
        // velocity on the particle
        let fx = 10 - 20 * Math.random();
        let fy = 10 * Math.random();
        p.setVelocity(fx, fy);
        
        // size delta
        p.setSizeDelta(1 + this.mDelta);
        
        return p;
    }

    //Default Value
    //Presets
    //Support for optional this.mParticleCreator = createrFunc;
}

export default ParticleEmitter;