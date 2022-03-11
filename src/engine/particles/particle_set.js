/* 
 * File: particle_set.js
 * a set of Particles
 * 
 * Subclass of GameObjectSet: 
 *     GameObjectSet: a set of objects that support: update() and draw() functions
 *                     Particle satisfies!
 */
"use strict";

import * as glSys from "../core/gl.js";
import GameObjectSet from "../game_objects/game_object_set.js";
import FlameEmitter from "./flame_emitter.js";
import ParticleEmitter from "./particle_emitter.js";
import RainEmitter from "./rain_emitter.js";
import BurstEmitter from "./burst_emitter.js";

class ParticleSet extends GameObjectSet {
    constructor() {
        super();
        this.mEmitterSet = [];
    }

    draw(aCamera) {
        let gl = glSys.get();
        gl.blendFunc(gl.ONE, gl.ONE);  // for additive blending!
        super.draw(aCamera);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); // restore alpha blending
    }

    addEmitterAt(x, y, n, func) {
        let e = new ParticleEmitter(x, y, n, func);
        this.mEmitterSet.push(e);
        return e;
    }
    addFlameAt(x,y,n,func,life) {
        let e = new FlameEmitter(x, y, n, func, life);
        this.mEmitterSet.push(e);
        return e;
    }
    addRain(n,func,life) {
        let e = new RainEmitter(n, func, life);
        this.mEmitterSet.push(e);
        return e;
    }
    addBurstAt(x,y,n,func, r, p, s) {
        let e = new BurstEmitter(x, y, n, func, r, p, s);
        this.mEmitterSet.push(e);
        return e;
    }

    drawMarkers(aCamera) {
        let i;
        for (i = 0; i < this.mSet.length; i++) {
            this.mSet[i].drawMarker(aCamera);
        }
    }

    update() {
        super.update();
        // Cleanup Particles
        let i, obj;
        for (i = 0; i < this.size(); i++) {
            obj = this.getObjectAt(i);
            if (obj.hasExpired()) {
                this.removeFromSet(obj);
            }
        }

        // Emit new particles
        for (i = 0; i < this.mEmitterSet.length; i++) {
            let e = this.mEmitterSet[i];
            e.emitParticles(this);
            if (e.expired()) {  // delete the emitter when done
                this.mEmitterSet.splice(i, 1);
            }
        }
    }
}

export default ParticleSet;