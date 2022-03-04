import ParticleEmitter from "./particle_emitter.js";

class FlameEmitter extends ParticleEmitter{
    constructor(px, py, num, createrFunc, lifespan) {
        super(px, py, num, createrFunc);
        this.mLifespan = Date.now() + lifespan;
        this.mSpread = .3;
        this.mClimb = 20;
        this.mColorStart = [1,0,0,1];
        this.mColorEnd = [1,.8,.4,.6];
        this.mWind = 0;
    }
    emitParticles(pSet){
        let numToEmit = this.mNumRemains;
        let i, p;
        for (i = 0; i < numToEmit; i++) {
            p = this.mParticleCreator(this.mEmitPosition[0], this.mEmitPosition[1], this.mClimb, this.mSpread, this.mColorStart, this.mColorEnd, this.mWind);
            pSet.addToSet(p);
        }
        if (Date.now() > this.mLifespan){
            this.mNumRemains = 0;
        }
    }
}
export default FlameEmitter;