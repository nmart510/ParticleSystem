import Particle from "./particle.js";

class ElectricParticle extends Particle{
    constructor(texture, x, y, life){
        super(texture, x, y, life);
        this.mSpread = .3;
    }
    update(){
        super.update();
        let p = this.getPosition();
        this.setPosition(p[0]+(Math.random()-.5)*this.mSpread, p[1]+(Math.random()-.5)*this.mSpread);
    }
    getSpread(){
        return this.mSpread;
    }
    setSpread(val){
        this.mSpread = val;
    }
}
export default ElectricParticle;