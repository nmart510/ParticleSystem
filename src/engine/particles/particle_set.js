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
import FlameEmitter from "./localized/flame_emitter.js";
import ParticleEmitter from "./particle_emitter.js";
import RainEmitter from "./ambient/rain_emitter.js";
import SnowEmitter from "./ambient/snow_emitter.js";
import DustEmitter from "./ambient/dust_emitter.js";
import BurstEmitter from "./localized/burst_emitter.js";
import ElectricityEmitter from "./localized/electricity_emitter.js";

/**
 * @constructor ParticleSet
 */
class ParticleSet extends GameObjectSet {
    constructor() {
        super();
        this.mEmitterSet = [];
    }
    /**
     * @function draw() - Draws to the given camera.
     * @param {Camera} aCamera - The camera to draw to
     */
    draw(aCamera) {
        let gl = glSys.get();
        gl.blendFunc(gl.ONE, gl.ONE);  // for additive blending!
        super.draw(aCamera);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); // restore alpha blending
    }
    /**
     * @function addEmitterAt() - Adds a default emitter to the given position
     * @param {float} x - The x coordinate of the emitter position
     * @param {float} y - The y coordinate of the emitter position
     * @param {int} n - The number of particles to create in the emitter
     * @returns {ParticleEmitter} e - The newly added default emitter
     */
    addEmitterAt(x, y, n) {
        let e = new ParticleEmitter(x, y, n);
        this.mEmitterSet.push(e);
        return e;
    }
    /**
     * @function addFlameAt() - Adds a new flame emitter to the given position
     * @param {float} x - The x coordinate of the emitter position
     * @param {float} y - The y coordinate of the emitter position
     * @param {int} n - The number of particles to create in the emitter
     * @param {float} life - The lifespan of the emitter
     * @returns {FlameEmitter} e - The newly added flame emitter
     */
    addFlameAt(x,y,n,life) {
        let e = new FlameEmitter(x, y, n, life);
        this.mEmitterSet.push(e);
        return e;
    }
    /**
     * @function addRain() - Creates a new rain emitter
     * @param {int} n - The number of particles to emit
     * @param {float} life - The lifespan of the emitter
     * @returns {RainEmitter} e - The newly added rain emitter
     */
    addRain(n,life) {
        let e = new RainEmitter(n, life);
        this.mEmitterSet.push(e);
        return e;
    }
    /**
     * @function addSnow() - Creates a new snow emitter
     * @param {int} n - The number of particles to emit
     * @param {float} life - The lifespan of the emitter
     * @returns {SnowEmitter} e - The newly added snow emitter
     */
    addSnow(n,life) {
        let e = new SnowEmitter(n, life);
        this.mEmitterSet.push(e);
        return e;
    }
    /**
     * @function addDust() - Creates a new dust emitter
     * @param {int} n - The number of particles to emit
     * @param {float} life - The lifespan of the emitter
     * @returns {DustEmitter} e - The newly added dust emitter
     */
    addDust(n,life) {
        let e = new DustEmitter(n, life);
        this.mEmitterSet.push(e);
        return e;
    }
    /**
     * @function addBurstAt() - Adds a new burst emitter at the given position
     * @param {float} x - The x coordinate of the emitter position
     * @param {float} y - The y coordinate of the emitter position
     * @param {int} n - The number of particles to create in the emitter
     * @returns {BurstEmitter} e - The newly created burst emitter
     */
    addBurstAt(x,y,n) {
        let e = new BurstEmitter(x, y, n);
        this.mEmitterSet.push(e);
        return e;
    }
    /**
     * @function addElectricityAt() - Adds a new electric emitter at the given position
     * @param {float} x - The x coordinate of the emitter position
     * @param {float} y - The y coordinate of the emitter position
     * @param {int} n - The number of particles to create in the emitter
     * @returns {ElectricityEmitter} e - The newly created electric emitter
     */
    addElectricityAt(x,y,n) {
        let e = new ElectricityEmitter(x, y, n);
        this.mEmitterSet.push(e);
        return e;
    }

    drawMarkers(aCamera) {
        let i;
        for (i = 0; i < this.mSet.length; i++) {
            this.mSet[i].drawMarker(aCamera);
        }
    }

    /**
     * @function update() - Cleans up and emits particles in the set
     */
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