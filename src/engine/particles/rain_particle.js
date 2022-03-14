import Particle from "./particle.js";

class RainParticle extends Particle{
    /**
     * @constructor - Represents a RainParticle
     * @param {string} texture - A path to the texture that the particle will have
     * @param {float} x - The x coordinate of the position
     * @param {float} y - The y coordinate of the position
     * @param {float} life - The lifespan of the particle
     */
    constructor(texture, x, y, life){
        super(texture, x, y, life);
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