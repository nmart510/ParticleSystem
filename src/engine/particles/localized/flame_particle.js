import Particle from "../particle.js";

class FlameParticle extends Particle{
    /**
     * @constructor FlameParticle
     * @param {string} texture - The texture to be used, contains a path to a file
     * @param {float} x - x coordinate of the particle's position
     * @param {float} y  - y coordinate of the particles position
     * @param {float} life - lifespan of the individual particle
     */
    constructor(texture, x, y, life){
        super(texture, x, y, life);
        this.mSpread = .3;
    }
    /**
     * @function update() - Updates the particle's position
     */
    update(){
        super.update();
        let p = this.getPosition();
        this.setPosition(p[0]+(Math.random()-.5)*this.mSpread, p[1]);
    }
    /**
     * @function getSpread() - Gets the spread of the flame
     * @returns {float} mSpread - The spread of the flame
     */
    getSpread(){
        return this.mSpread;
    }
    /**
     * @function setSpread() - Sets the spread of the flame
     * @param {float} val - The new value for spread
     */
    setSpread(val){
        this.mSpread = val;
    }
}
export default FlameParticle;