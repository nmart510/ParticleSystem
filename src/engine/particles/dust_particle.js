import Particle from "./particle.js";

class DustParticle extends Particle{
    constructor(texture, x, y, life){
        super(texture, x, y, life);
        this.mSpread = .02;
        this.mTargetTime = life * .8;
        this.mTargetColor = [1,1,.6,1];
    }
    update(){
        super.update();
        let p = this.getPosition();
        this.setPosition(p[0], p[1]+(Math.random()-.5)*this.mSpread);
    }
    
    setFinalColor = function(f) {    
        vec4.sub(this.mDeltaColor, f, this.getColor());
        if (this.mCyclesToLive !== 0) {
            vec4.scale(this.mDeltaColor, this.mDeltaColor, 1/this.mCyclesToLive);
        }
    }
}
export default DustParticle;