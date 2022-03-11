/* 
 * File: burst_emitter.js
 * 
 */
import ParticleEmitter from "./particle_emitter.js";
import ElectricParticle from "./electric_particle.js";
import engine from "../../engine/index.js";
"use strict";

class ElectricityEmitter extends ParticleEmitter {
    constructor(px, py, num) {
        super(px, py, num);
        this.mRadius = 50;
        this.mNumParticles = num;
        this.mNumRemains = 4;
        this.mSpacing = 6;
        this.mCount = 0;
        this.mDrag = 1;
        this.mAcceleration = vec2.fromValues(0, 0);
        this.mSpread = 1;
    }

    getRadius() {
        return this.mRadius;
    }
    setRadius(r) {
        this.mRadius = r;
    }
    getNumParticles() {
        return this.mNumParticles;
    }
    setNumParticles(num) {
        this.mNumParticles = num;
    }
    getPulses() {
        return this.mNumRemains;
    }
    setPulses(pulses) {
        this.mNumRemains = pulses;
    }
    getSpacing() {
        return this.mSpacing;
    }
    setSpacing(s) {
        this.mSpacing = s;
    }
    getDrag() {
        return this.mDrag;
    }
    setDrag(d) {
        this.mDrag = d;
    }
    getAcceleration() {
        return this.mAcceleration;
    }
    setAcceleration(a) {
        this.mAcceleration = a;
    }
    getSpread(){
        return this.mSpread;
    }
    setSpread(spread){
        this.mSpread = spread;
    }

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
    
    createBurst(atX, atY, colorStart, colorEnd, theta, radius) {
        let life = 100 + Math.random() * 200;
        
        // size of the particle
        let r = 1.5 + Math.random() * 0.5;
        
        let p = new ElectricParticle(engine.defaultResources.getDefaultPSTexture(), atX, atY, life);
        p.setColor([colorStart[0],colorStart[1],colorStart[2],colorStart[3]]);
        p.setSize(r, r);
        // final color
        // let fr = 3.5 + Math.random();
        
        p.setFinalColor(colorEnd);

        let fx = Math.cos(theta) * radius;
        let fy = Math.sin(theta) * radius;
        // velocity on the particle
        p.setVelocity(fx, fy);
        p.setDrag(.95);
        p.setAcceleration(0, 0);
        // size delta
        p.setSizeDelta(0.95);
        p.setSpread(this.mSpread);
        
        return p;
    }
}

export default ElectricityEmitter;