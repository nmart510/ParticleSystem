/* 
 * File: burst_emitter.js
 * 
 */
import ParticleEmitter from "./particle_emitter.js";
"use strict";

let kMinToEmit = 5; // Smallest number of particle emitted per cycle

class BurstEmitter extends ParticleEmitter {
    constructor(px, py, num, createrFunc, radius, pulses, spacing) {
        super(px, py, num, createrFunc);
        this.mRadius = radius;
        this.mNumParticles = num;
        this.mNumRemains = pulses;
        this.mSpacing = spacing;
        this.mCount = 0;
    }

    emitParticles(pSet) {
        if (this.mCount % this.mSpacing == 0){
            let i, p;
            let theta = 0;
            for (i = 0; i < this.mNumParticles; i++) {
                p = this.mParticleCreator(this.mEmitPosition[0], this.mEmitPosition[1],this.mColorBegin, 
                    this.mColorEnd, theta, this.mRadius);
                pSet.addToSet(p);
                theta += (2*Math.PI) / (this.mNumParticles);
            }
            this.mNumRemains -= 1;
        }
        this.mCount++;
    }
}

export default BurstEmitter;