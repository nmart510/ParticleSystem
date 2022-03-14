import Particle from "../particle.js";

class SnowParticle extends Particle{
    /**
     * @constructor SnowParticle
     * @param {string} texture - A path to the texture that the particle will have
     * @param {float} x - The x coordinate of the position
     * @param {float} y - The y coordinate of the position
     * @param {float} life - The lifespan of the particle
     */
    constructor(texture, x, y, life){
        super(texture, x, y, life);
        this.mSpread = .3;
        this.mTargetTime = life * .8;
        this.mTargetColor = [1,1,.6,1];
    }
    /**
     * @function update() - Uses the position and color control variables to update the particle based on the update interval
     */
    update(){
        super.update();
        let p = this.getPosition();
        if (this.mCyclesToLive%8 == 0){
            p[0] += (Math.random()-.5)*this.mSpread;
        }
        if (this.mCyclesToLive%17 == 0){
            p[1] += (Math.random()-.5)*this.mSpread;
        }
        this.setPosition(p[0], p[1]);
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
export default SnowParticle;