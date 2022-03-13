import ParticleEmitter from "./particle_emitter.js";
import DustParticle from "./dust_particle.js";
import engine from "../../engine/index.js";

class DustEmitter extends ParticleEmitter{
    constructor(num, lifespan) {
        super(0, 0, num);
        this.mLifespan = Date.now() + lifespan;
        this.mWind = 0;
    }
    getWind(){
        return this.mWind;
    }
    setWind(val){
        this.mWind = val;
    }
    emitParticles(pSet){
        if (Date.now()%3 == 0){
            let numToEmit = this.mNumRemains;
            let i, p;
            for (i = 0; i < numToEmit; i++) {
                p = this.createDust(this.mColorBegin, this.mColorEnd, this.mWind);
                pSet.addToSet(p);
            }
            if (Date.now() > this.mLifespan){
                this.mNumRemains = 0;
            }
        }
        
    }
        
    createDust(colorStart, colorEnd, wind) {
        let life = 120 + Math.random() * 480;
        let x = (Math.random()-.5) * 200;
        let y = (Math.random()-.5) * 160;
        let p = new DustParticle(engine.defaultResources.getDefaultPSTexture(), x, y, life);
        p.setColor([colorStart[0],colorStart[1],colorStart[2],colorStart[3]]);
        // size of the particle
        let r = this.size + (Math.random()-.5) * this.variance;
        p.setSize(r, r);
        // final color
        p.setFinalColor(colorEnd);
        
        // velocity on the particle
        let fx = wind;
        let fy = -1;
        p.setVelocity(fx, fy);
        p.setAcceleration(0,0);
        // size delta
        p.setSizeDelta(1);
        p.setDrag(1)
        
        return p;
    }
}
export default DustEmitter;