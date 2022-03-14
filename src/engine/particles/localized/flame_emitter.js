import ParticleEmitter from "../particle_emitter.js";
import FlameParticle from "./flame_particle.js";
import engine from "../../../engine/index.js";

class FlameEmitter extends ParticleEmitter{
    /** Class FlameEmitter
     *  Creates and emits flame effects.
     *  @constructor
     *  @param {float} px - The x coordinate of the emitter's position
     *  @param {float} py - the y coordinate of the emitter's position
     *  @param {int} num - The number of particles to emit
     *  @param {float} lifespan - The lifespan of the emitter
     */
    constructor(px, py, num, lifespan) {
        super(px, py, num);
        this.mLifespan = Date.now() + lifespan;
        this.mSpread = .3;
        this.mClimb = 20;
        this.mWind = 0;
    }
    /**
     * @function getSpread() - Gets the spread of the particles
     * @returns {float} mSpread - the spread of the particles
     */
    getSpread(){
        return this.mSpread;
    }
    /**
     * @function setSpread() - Sets the current particle spread to a new value
     * @param {float} val - The new particle spread 
     */
    setSpread(val){
        this.mSpread = val;
    }
    /**
     * @function getClimb() - gets the current vertical acceleration
     * @returns {float} mClimb - The vertical acceleration
     */
    getClimb(){
        return this.mClimb;
    }
    /**
     * @function setClimb() - sets the vertical acceleration
     * @param {float} val - the new vertical acceleration
     */
    setClimb(val){
        this.mClimb = val;
    }
    /**
     * @function getWind() - Returns the current horizontal acceleration
     * @returns {float} mWind - The current horizontal acceleration
     */
    getWind(){
        return this.mWind;
    }
    /**
     * @function setWind() - Sets the horizontal acceleration
     * @param {float} val - the new horizontal acceleration 
     */
    setWind(val){
        this.mWind = val;
    }
    /**
     * @function getIntensity() - gets the number of remaining particles
     * @returns {int} mNumRemains - The number of remaining particles
     */
    getIntensity(){
        return this.mNumRemains; 
    }
    /**
     * @function setIntensity() - Sets the number of remaining particles
     * @param {int} num - The new number of remaining particles
     */
    setIntensity(num){
        this.mNumRemains = num; 
    }

    /**
     * @function emitParticles() - uses the creator function to create and emit particles
     * @param {ParticleSet} pSet - The set of particles to emit
     */
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
    /**
     * @function createFlame() - The creator function of the emitter. Creates a flame effect.
     * @param {float} atX - x coordinate of the particle position
     * @param {float} atY - y coordinate of the particle position
     * @param {*} climb - The vertical acceleration of the flame
     * @param {*} spread - the spread of the particle
     * @param {*} colorStart - starting color
     * @param {*} colorEnd - ending color
     * @param {*} wind - Horizontal acceleration of the flame
     * @returns {FlameParticle} p - The newly created flame particle
     */
    createFlame(atX, atY, climb, spread, colorStart, colorEnd, wind) {
        let life = 30 + Math.random() * 40;
        let p = new FlameParticle(engine.defaultResources.getDefaultPSTexture(), atX, atY, life);
        p.setColor([colorStart[0],colorStart[1],colorStart[2],colorStart[3]]);
        // size of the particle
        let r = this.size + (Math.random()-.5) * this.variance;
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