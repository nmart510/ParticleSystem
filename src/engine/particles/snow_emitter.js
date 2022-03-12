import ParticleEmitter from "./particle_emitter.js";
import RainParticle from "./rain_particle.js";
import engine from "../index.js";

class SnowEmitter extends ParticleEmitter{
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
        let numToEmit = this.mNumRemains;
        let i, p;
        for (i = 0; i < numToEmit; i++) {
            p = this.createRain(this.mColorBegin, this.mColorEnd, this.mWind);
            pSet.addToSet(p);
        }
        if (Date.now() > this.mLifespan){
            this.mNumRemains = 0;
        }
        
    }
        
    createSnow(colorStart, colorEnd, wind) {
        let life = 60;
        let x = (Math.random()-.5) * 200;
        let y = 80 + Math.random();
        let p = new RainParticle(engine.defaultResources.getDefaultPSTexture(), x, y, life);
        p.setColor([colorStart[0],colorStart[1],colorStart[2],colorStart[3]]);
        // size of the particle
        let r = .5;
        p.setSize(r, r);
        // final color
        p.setFinalColor(colorEnd);
        
        // velocity on the particle
        let fx = wind;
        let fy = -25;
        p.setVelocity(fx, fy);
        p.setAcceleration(0,0);
        // size delta
        p.setSizeDelta(1);
        p.setDrag(1)
        
        return p;
    }
}
export default SnowEmitter;