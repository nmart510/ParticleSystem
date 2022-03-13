import Particle from "./particle.js";

class RainParticle extends Particle{
    constructor(texture, x, y, life){
        super(texture, x, y, life);
        this.mSpread = .3;
    }
    update(){
        super.update();
    }
    hit(){
        this.terminate();
    }
}
export default RainParticle;