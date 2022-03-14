import Particle from "../particle.js";

class ElectricParticle extends Particle{
    /**
     * @constructor ElectricParticle
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
        let p = this.getPosition();
        this.setPosition(p[0]+(Math.random()-.5)*this.mSpread, p[1]+(Math.random()-.5)*this.mSpread);
    }
    /**
     * @function getSpread() - Gets the spread of the electricity
     * @returns {float} mSpread - The spread of the electricity
     */
    getSpread(){
        return this.mSpread;
    }
    /**
     * @function setSpread() - Sets the spread of the electricity
     * @param {float} val - The new value for electricity
     */
    setSpread(val){
        this.mSpread = val;
    }
    /**
     * @function hit() - Contains the behavior for when the particle collides with an object. Increases size.
     */
    hit(){
        //Unrealistic, but showcases hit working
        this.mSizeDelta = 1.2;
    }
}
export default ElectricParticle;