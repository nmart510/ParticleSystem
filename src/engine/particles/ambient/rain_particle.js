import Particle from "../particle.js";

class RainParticle extends Particle{
    /**
     * @constructor RainParticle
     * @param {float} x - The x coordinate of the position
     * @param {float} y - The y coordinate of the position
     * @param {float} life - The lifespan of the particle
     */
    constructor(x, y, life){
        super(x, y, life);
        this.mSpread = .3;
    }
    /**
     * @function update() - Uses the position and color control variables to update the particle based on the update interval
     */
    update(){
        super.update();
    }
    /**
     * @function hit() - the behavior of the rain particle when it collides with an object. Destroys the particle
     */
    hit(){
        this.terminate();
    }
}
export default RainParticle;