import ParticleEmitter from "./particle_emitter.js";

class FlameEmitter extends ParticleEmitter{
    constructor(px, py, num, createrFunc, lifespan) {
        super(px, py, num, createrFunc);
        this.lifespan = Date.now() + lifespan;
    }
    emitParticles(pSet){
        let numToEmit = this.mNumRemains;
        let i, p;
        for (i = 0; i < numToEmit; i++) {
            p = this.mParticleCreator(this.mEmitPosition[0], this.mEmitPosition[1]);
            pSet.addToSet(p);
        }
        if (Date.now() > this.lifespan){
            this.mNumRemains = 0;
        }
    }
}
export default FlameEmitter;