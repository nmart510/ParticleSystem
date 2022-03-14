import ParticleEmitter from "../particle_emitter.js";
import RainParticle from "./rain_particle.js";
import engine from "../../../engine/index.js";

class RainEmitter extends ParticleEmitter{
    /**
     * @constructor RainEmitter
     * @param {int} num - The number of particles to emit
     * @param {float} lifespan - The life of the emitter
     */
    constructor(num, lifespan) {
        super(0, 0, num);
        this.mLifespan = Date.now() + lifespan;
        this.mWind = 0;
    }
    /**
     * @function getWind() - Gets the current horizontal acceleration
     * @returns {float} mWind - The current horizontal acceleration
     */
    getWind(){
        return this.mWind;
    }
    /**
     * @function setWind() - Sets the horizontal acceleration
     * @param {float} val - The new horizontal acceleration
     */
    setWind(val){
        this.mWind = val;
    }
    /**
     * @function emitParticles() - Creates and emits particles based on the creator function
     * @param {ParticleSet} pSet - The set of particles
     */
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
    /**
     * @function createRain() - Creates rain particles
     * @param {vec4} colorStart - The starting color
     * @param {vec4} colorEnd - The ending color 
     * @param {float} wind - The horizontal acceleration of the rain particles
     * @returns {RainParticle} p - The new rain particle to be added to the set
     */   
    createRain(colorStart, colorEnd, wind) {
        let life = 60;
        let x = (Math.random()-.5) * 200;
        let y = 80 + Math.random();
        let p = new RainParticle(engine.defaultResources.getDefaultPSTexture(), x, y, life);
        p.setColor([colorStart[0],colorStart[1],colorStart[2],colorStart[3]]);
        // size of the particle
        let r = this.size + (Math.random()-.5) * this.variance;
        p.setSize(r, r);
        // final color
        p.setFinalColor(colorEnd);
        
        // velocity on the particle
        let fx = wind;
        let fy = -80;
        p.setVelocity(fx, fy);
        p.setAcceleration(0,0);
        // size delta
        p.setSizeDelta(1);
        p.setDrag(1)
        
        return p;
    }
}
export default RainEmitter;