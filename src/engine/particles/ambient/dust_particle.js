import Particle from "../particle.js";

class DustParticle extends Particle{
    /**
     * @constructor DustParticle
     * @param {float} x - The x coordinate of the position
     * @param {float} y - The y coordinate of the position
     * @param {float} life - The lifespan of the particle
     */
    constructor(x, y, life){
        super(x, y, life);
        this.mSpread = .02;
        this.mTargetTime = life * .8;
        this.mTargetColor = [1,1,.6,1];
    }
    /**
     * @function update() - Uses the position and color control variables to update the particle based on the update interval
     */
    update(){
        super.update();
        let p = this.getPosition();
        this.setPosition(p[0], p[1]+(Math.random()-.5)*this.mSpread);
    }
    /**
     * @function setFinalColor() - Sets the final color of the particle
     * @param {vec2} f - the vector to subtract from the current color
     */
    setFinalColor = function(f) {    
        vec4.sub(this.mDeltaColor, f, this.getColor());
        if (this.mCyclesToLive !== 0) {
            vec4.scale(this.mDeltaColor, this.mDeltaColor, 1/this.mCyclesToLive);
        }
    }
}
export default DustParticle;