/* 
 * File: burst_emitter.js
 * 
 */
import ParticleEmitter from "./particle_emitter.js";
"use strict";

let kMinToEmit = 5; // Smallest number of particle emitted per cycle

class BurstEmitter extends ParticleEmitter {
    constructor(px, py, num, createrFunc, radius) {
        super(px, py, num, createrFunc);
        this.mRadius = radius;
    }

    emitParticles(pSet) {
        let i, p;
        let theta = 0;
        for (i = 0; i < this.mNumRemains; i++) {
            p = this.mParticleCreator(this.mEmitPosition[0], this.mEmitPosition[1],this.mColorBegin, 
                this.mColorEnd, theta, this.mRadius);
            pSet.addToSet(p);
            theta += (2*Math.PI) / (this.mNumRemains);
        }
        this.mNumRemains = 0;
    }
}

export default BurstEmitter;