
import engine from "../../engine/index.js";
import FlameParticle from "./flame_particle.js";

class ParticlePreset{
    Basic(){
        return _createParticle;
    }
    Flame(){
        return _createFlame;
    }
}
function _createParticle(atX, atY) {
    let life = 30 + Math.random() * 200;
    let p = new engine.Particle(engine.defaultResources.getDefaultPSTexture(), atX, atY, life);
    p.setColor([1, 0, 0, 1]);
    // size of the particle
    let r = 5.5 + Math.random() * 0.5;
    p.setSize(r, r);
    // final color
    let fr = 3.5 + Math.random();
    let fg = 0.4 + 0.1 * Math.random();
    let fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);
    
    // velocity on the particle
    let fx = 10 - 20 * Math.random();
    let fy = 10 * Math.random();
    p.setVelocity(fx, fy);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
}
function _createFlame(atX, atY) {
    let life = 30 + Math.random() * 200;
    let p = new FlameParticle(engine.defaultResources.getDefaultPSTexture(), atX, atY, life);
    p.setColor([1, 0, 0, 1]);
    // size of the particle
    let r = 2.5 + Math.random() * 0.5;
    p.setSize(r, r);
    // final color
    p.setFinalColor([1, .8, .3, 0.6]);
    
    // velocity on the particle
    let fx = 10 - 20 * Math.random();
    let fy = 10 * Math.random();
    p.setVelocity(fx, fy);
    p.setAcceleration(0,20);
    p.setSpread(.5);
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
}
export default ParticlePreset;