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
        let theta = 0;
        for (i = 0; i < numToEmit; i++) {
            p = this.mParticleCreator(this.mEmitPosition[0], this.mEmitPosition[1],this.mColorBegin, 
                this.mColorEnd, theta, this.mRadius);
            pSet.addToSet(p);
            theta += (Math.PI) / 6.0;
        }
    }
}

export default BurstEmitter;