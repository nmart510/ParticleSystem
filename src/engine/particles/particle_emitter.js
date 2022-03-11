/* 
 * File: particle_emitter.js
 * 
 */
import Particle from "./particle.js";
import engine from "../../engine/index.js";
"use strict";

let kMinToEmit = 5; // Smallest number of particle emitted per cycle

class ParticleEmitter {
    constructor(px, py, num) {
        // Emitter position
        this.mEmitPosition = [px, py];

        // Number of particles left to be emitted
        this.mNumRemains = num;

        // Function to create particles (user defined)
        this.mColorBegin = [1,1,1,1];
        this.mColorEnd = [1,1,1,1];
    }

    getColorStart(){
        return this.mColorBegin;
    }
    setColorStart(r,g,b,a){
        this.mColorBegin = [r,g,b,a];
    }
    getColorEnd(){
        return this.mColorEnd;
    }
    setColorEnd(r,g,b,a){
        this.mColorEnd = [r,g,b,a];
    }
    //end any ongoing particle emitter by setting numRemains to 0
    terminate(){this.mNumRemains = 0;}
    expired() { return (this.mNumRemains <= 0); }

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
    createParticle(atX, atY, colorStart, colorEnd) {
        let life = 30 + Math.random() * 200;
        let p = new Particle(engine.defaultResources.getDefaultPSTexture(), atX, atY, life);
        p.setColor([colorStart[0],colorStart[1],colorStart[2],colorStart[3]]);
        // size of the particle
        let r = 5.5 + Math.random() * 0.5;
        p.setSize(r, r);
        // final color
        p.setFinalColor(colorEnd);
        
        // velocity on the particle
        let fx = 10 - 20 * Math.random();
        let fy = 10 * Math.random();
        p.setVelocity(fx, fy);
        
        // size delta
        p.setSizeDelta(0.98);
        
        return p;
    }

    //Default Value
    //Presets
    //Support for optional this.mParticleCreator = createrFunc;
}

export default ParticleEmitter;