/*
 * File: MyGame.js 
 *       This is the logic of our game. 
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";
import Hero from "./objects/hero.js";
import Minion from "./objects/minion.js";

class MyGame extends engine.Scene {
    constructor() {
        super();
        this.kMinionSprite = "assets/minion_sprite.png";

        // The camera to view the scene
        this.mCamera = null;

        this.mMsg = null;
        
        this.mParticleOptions = ["Default", "Flame", "Dust"];
        this.mCurrentOption = 0;

        this.mAllObjs = null;
        this.mCollisionInfos = [];
        this.mHero = null;

        // Draw controls
        this.mDrawTexture = false;
        this.mDrawRigidShape = true;

        // Particle Support
        this.mParticles = null;
        this.mPSDrawBounds = false;
        this.mPSCollision = true;
        this.mPPreset = null;
    }



    load() {
        engine.texture.load(this.kMinionSprite);
    }

    unload() {
        engine.texture.unload(this.kMinionSprite);
    }

    init() {
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(50, 40), // position of the camera
            100,                     // width of camera
            [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.2, 0.2, 0.2, 1]);
        // sets the background to gray
        engine.defaultResources.setGlobalAmbientIntensity(3);

        this.mAllObjs = new engine.GameObjectSet();

        this.mHero = new Hero(this.kMinionSprite);
        //this.mAllObjs.addToSet(this.mHero);
                
        // particle systems
        this.mParticles = new engine.ParticleSet();

        // let y = 70;
        // let x = 10;
        // for (let i = 1; i <= 5; i++) {
        //     let m = new Minion(this.kMinionSprite, x, y, ((i % 2) !== 0));
        //     this.mParticles.addEmitterAt(x, y, 200, _createParticle);
        //     x += 20;
        //     this.mAllObjs.addToSet(m);
        // }

        this.mMsg = new engine.FontRenderable("Status Message");
        this.mMsg.setColor([0.5, 0.5, 0.5, 1]);
        this.mMsg.getXform().setPosition(0, 7);
        this.mMsg.setTextHeight(3);

        //TODO: Make this a util class that the particle emitter base calls upon rather than something called from main
        this.mPPreset = new engine.ParticlePreset();
    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

        this.mCamera.setViewAndCameraMatrix();

        this.mAllObjs.draw(this.mCamera);
        this.mHero.draw(this.mCamera);

        this.mParticles.draw(this.mCamera);
        if (this.mPSDrawBounds)
            this.mParticles.drawMarkers(this.mCamera);

        // for now draw these ...
        if (this.mCollisionInfos !== null) {
        for (let i = 0; i < this.mCollisionInfos.length; i++)
            this.mCollisionInfos[i].draw(this.mCamera);
        this.mCollisionInfos = [];
        }

        this.mMsg.draw(this.mCamera);   
    }

    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {
        let msg = "";

        this.mAllObjs.update(this.mCamera);
        this.mHero.update(this.mCamera);

        // if (engine.input.isKeyClicked(engine.input.keys.P)) {
        //     engine.physics.togglePositionalCorrection();
        // }
        if (engine.input.isKeyClicked(engine.input.keys.V)) {
            engine.physics.toggleHasMotion();
        }
        if (engine.input.isKeyClicked(engine.input.keys.F)) {
            this.randomizeVelocity();
        }
        if (engine.input.isKeyClicked(engine.input.keys.R)) {
            let newRain = this.mParticles.addRain(20,this.mPPreset.Rain(),12000);
            newRain.setColorStart(0,0,1,1);
            newRain.setColorEnd(.7,.7,.7,.6);
            newRain.setWind(20);
        }

        if (engine.input.isKeyClicked(engine.input.keys.C)) {
            let x = 20 + Math.random() * 60;
            let y = 10 + Math.random() * 60;
            let t = Math.random() > 0.5;
            let m = new Minion(this.kMinionSprite, x, y, t);
            if (this.mDrawTexture) // default is false
                m.toggleDrawRenderable();
            if (!this.mDrawRigidShape) // default is true
                m.toggleDrawRigidShape();
            this.mAllObjs.addToSet(m);

            this.mParticles.addEmitterAt(x, y, 200, this.mPPreset.Basic());
        }
        
        if (engine.input.isKeyClicked(engine.input.keys.Left)) {
            if (this.mCurrentOption > 0) {
                this.mCurrentOption--;
            } 
        }
        if (engine.input.isKeyClicked(engine.input.keys.Right)) {
            if (this.mCurrentOption < this.mParticleOptions.length - 1) {
                this.mCurrentOption++;
            }
        }
        
        // Particle System
        this.mParticles.update();
        if (engine.input.isKeyClicked(engine.input.keys.E)) {
            this.mPSDrawBounds = !this.mPSDrawBounds;
        }
            
        if (engine.input.isButtonClicked(engine.input.eMouseButton.eLeft)) {
            if (this.mCamera.isMouseInViewport()) {
                switch(this.mCurrentOption) {
                    case 0: //Default
                        let newDefault = this.mParticles.addEmitterAt(this.mCamera.mouseWCX(), this.mCamera.mouseWCY(),100,this.mPPreset.Basic());
                        newDefault.setColorStart(0,0,1,1);
                        newDefault.setColorEnd(0,.7,.3,.6);
                        break;
                    case 1: //Flame
                        let newFlame = this.mParticles.addFlameAt(this.mCamera.mouseWCX(), this.mCamera.mouseWCY(),1,this.mPPreset.Flame(),4000);
                        newFlame.setColorStart(1,0,0,1);
                        newFlame.setColorEnd(1,.7,.3,.6);
                        break;
                    case 2: //Dust
                        let newDust = this.mParticles.addEmitterAt(this.mCamera.mouseWCX(), this.mCamera.mouseWCY(),100,this.mPPreset.Dust());
                        newDust.setColorStart(0,1,0,1);
                        newDust.setColorEnd(1,0,.3,.6);
                        break;
                }
                
            }
        }
        if (engine.input.isKeyClicked(engine.input.keys.Q))
            this.mPSCollision = !this.mPSCollision;
        if (this.mPSCollision) {
            engine.particleSystem.resolveRigidShapeSetCollision(this.mAllObjs, this.mParticles);
            engine.particleSystem.resolveRigidShapeCollision(this.mHero, this.mParticles);
            //engine.particleSystem.resolveRigidShapeSetCollision(this.mPlatforms, this.mParticles);
        }

        this.mHero.keyControl();

        if (engine.input.isKeyClicked(engine.input.keys.H)) {
            this.randomizeVelocity();
        }

        //engine.physics.processObjToSet(this.mHero, this.mPlatforms, this.mCollisionInfos);
        //engine.physics.processSetToSet(this.mAllObjs, this.mPlatforms, this.mCollisionInfos);
        engine.physics.processSet(this.mAllObjs, this.mCollisionInfos);

        msg += "  Object Count(" + this.mAllObjs.size() + ")" +
            " Velocity(" + engine.physics.getHasMotion() + ")" +
            " Particle(" + this.mParticleOptions[this.mCurrentOption] + ")";
        this.mMsg.setText(msg);
    }
}

let kSpeed = 40;
MyGame.prototype.randomizeVelocity = function()
{
    let i = 0;
    for (i = 0; i<this.mAllObjs.size(); i++) {
        let obj = this.mAllObjs.getObjectAt(i);
        let rigidShape = obj.getRigidBody();
        let x = (Math.random() - 0.5) * kSpeed;
        let y = (Math.random() - 0.5) * kSpeed;
        rigidShape.setVelocity(x, y);
        let c = rigidShape.getCenter();
        this.mParticles.addEmitterAt(c[0], c[1], 20, this.mPPreset.Basic());
    }
}

export default MyGame;