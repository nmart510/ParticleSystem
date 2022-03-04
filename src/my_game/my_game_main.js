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
        this.mCurrentParticle = "Default";

        this.mAllObjs = null;
        this.mCollisionInfos = [];
        this.mHero = null;

        // Draw controls
        this.mDrawCollisionInfo = false;
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

        if (engine.input.isKeyClicked(engine.input.keys.P)) {
            engine.physics.togglePositionalCorrection();
        }
        if (engine.input.isKeyClicked(engine.input.keys.V)) {
            engine.physics.toggleHasMotion();
        }
        if (engine.input.isKeyClicked(engine.input.keys.H)) {
            this.randomizeVelocity();
        }

        if (engine.input.isKeyClicked(engine.input.keys.G)) {
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
        
        // Particle System
        this.mParticles.update();
        if (engine.input.isKeyClicked(engine.input.keys.E))
            this.mPSDrawBounds = !this.mPSDrawBounds;
        if (engine.input.isKeyClicked(engine.input.keys.Q)) {
            if (this.mCamera.isMouseInViewport()) {
                let flame = this.mParticles.addFlameAt(this.mCamera.mouseWCX(), this.mCamera.mouseWCY(),1,this.mPPreset.Flame(),4000);
                flame.setColorStart(1,0,0,1);
                flame.setColorEnd(1,.7,.3,.6);
            }
        }
        if (engine.input.isKeyClicked(engine.input.keys.One))
            this.mPSCollision = !this.mPSCollision;
        if (this.mPSCollision) {
            engine.particleSystem.resolveRigidShapeSetCollision(this.mAllObjs, this.mParticles);
            engine.particleSystem.resolveRigidShapeCollision(this.mHero, this.mParticles);
            //engine.particleSystem.resolveRigidShapeSetCollision(this.mPlatforms, this.mParticles);
        }

        this.mHero.keyControl();

        if (this.mDrawCollisionInfo)
            this.mCollisionInfos = [];
        else
            this.mCollisionInfos = null;
        //engine.physics.processObjToSet(this.mHero, this.mPlatforms, this.mCollisionInfos);
        //engine.physics.processSetToSet(this.mAllObjs, this.mPlatforms, this.mCollisionInfos);
        engine.physics.processSet(this.mAllObjs, this.mCollisionInfos);

        msg += "  Object Count(" + this.mAllObjs.size() + ")" +
            " Velocity(" + engine.physics.getHasMotion() + ")" +
            " Particle(" + this.mCurrentParticle + ")";
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