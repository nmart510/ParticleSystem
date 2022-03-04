
import engine from "../../engine/index.js";
import FlameParticle from "./flame_particle.js";
import RainParticle from "./rain_particle.js";

class ParticlePreset{
    Basic(){
        return _createParticle;
    }
    Flame(){
        return _createFlame;
    }
    Rain(){
        return _createRain;
    }
}
function _createParticle(atX, atY, colorStart, colorEnd) {
    let life = 30 + Math.random() * 200;
    let p = new engine.Particle(engine.defaultResources.getDefaultPSTexture(), atX, atY, life);
    p.setColor([colorStart[0],colorStart[1],colorStart[2],colorStart[3]]);
    // size of the particle
    let r = 5.5 + Math.random() * 0.5;
    p.setSize(r, r);
    // final color
    let fr = 3.5 + Math.random();
    let fg = 0.4 + 0.1 * Math.random();
    let fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor(colorEnd);
    
    // velocity on the particle
    let fx = 10 - 20 * Math.random();
    let fy = 10 * Math.random();
    p.setVelocity(fx, fy);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
}
function _createFlame(atX, atY, climb, spread, colorStart, colorEnd, wind) {
    let life = 30 + Math.random() * 40;
    let p = new FlameParticle(engine.defaultResources.getDefaultPSTexture(), atX, atY, life);
    p.setColor([colorStart[0],colorStart[1],colorStart[2],colorStart[3]]);
    // size of the particle
    let r = 1.5 + Math.random() * 0.5;
    p.setSize(r, r);
    // final color
    p.setFinalColor(colorEnd);
    
    // velocity on the particle
    let fx = 5 - 10 * Math.random();
    let fy = 10 * Math.random();
    p.setVelocity(fx, fy);
    p.setAcceleration(wind,climb);
    p.setSpread(spread);
    // size delta
    p.setSizeDelta(.985);
    
    return p;
}
function _createRain(colorStart, colorEnd, wind) {
    let life = 120;
    let x = (Math.random()-.5) * 200;
    let y = 81;
    let p = new RainParticle(engine.defaultResources.getDefaultPSTexture(), x, y, life);
    p.setColor([colorStart[0],colorStart[1],colorStart[2],colorStart[3]]);
    // size of the particle
    let r = .5;
    p.setSize(r, r);
    // final color
    p.setFinalColor(colorEnd);
    
    // velocity on the particle
    let fx = wind;
    let fy = -100;
    p.setVelocity(fx, fy);
    p.setAcceleration(2*wind,2*fy);
    // size delta
    p.setSizeDelta(1);
    
    return p;
}
export default ParticlePreset;