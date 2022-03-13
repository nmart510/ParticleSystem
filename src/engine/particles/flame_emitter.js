import ParticleEmitter from "./particle_emitter.js";
import FlameParticle from "./flame_particle.js";
import engine from "../../engine/index.js";

class FlameEmitter extends ParticleEmitter{
    constructor(px, py, num, lifespan) {
        super(px, py, num);
        this.mLifespan = Date.now() + lifespan;
        this.mSpread = .3;
        this.mClimb = 20;
        this.mWind = 0;
    }
    getSpread(){
        return this.mSpread;
    }
    setSpread(val){
        this.mSpread = val;
    }
    getClimb(){
        return this.mClimb;
    }
    setClimb(val){
        this.mClimb = val;
    }
    getWind(){
        return this.mWind;
    }
    setWind(val){
        this.mWind = val;
    }
    getIntensity(){
        return this.mNumRemains; 
    }
    setIntensity(num){
        this.mNumRemains = num; 
    }


    emitParticles(pSet){
        let numToEmit = this.mNumRemains;
        let i, p;
        for (i = 0; i < numToEmit; i++) {
            p = this.createFlame(this.mEmitPosition[0], this.mEmitPosition[1], this.mClimb, this.mSpread, this.mColorBegin, this.mColorEnd, this.mWind);
            pSet.addToSet(p);
        }
        if (Date.now() > this.mLifespan){
            this.mNumRemains = 0;
        }
    }
    createFlame(atX, atY, climb, spread, colorStart, colorEnd, wind) {
        let life = 30 + Math.random() * 40;
        let p = new FlameParticle(engine.defaultResources.getDefaultPSTexture(), atX, atY, life);
        p.setColor([colorStart[0],colorStart[1],colorStart[2],colorStart[3]]);
        // size of the particle
        let r = 5.5 + Math.random() * 0.5;
        p.setSize(r, r);
        // final color
        p.setFinalColor(colorEnd);
        
        // velocity on the particle
        let fx = 5 - 10 * Math.random();
        let fy = 10 * Math.random();
        p.setVelocity(fx, fy);
        p.setAcceleration(wind,climb);
        p.setSpread(spread);
        // size delta
        p.setSizeDelta(.985);
        
        return p;
    }
}
export default FlameEmitter;