import ParticleEmitter from "./particle_emitter.js";

class RainEmitter extends ParticleEmitter{
    constructor(num, createrFunc, lifespan) {
        super(0, 0, num, createrFunc);
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
            p = this.mParticleCreator(this.mColorBegin, this.mColorEnd, this.mWind);
            pSet.addToSet(p);
        }
        if (Date.now() > this.mLifespan){
            this.mNumRemains = 0;
        }
    }
}
export default RainEmitter;