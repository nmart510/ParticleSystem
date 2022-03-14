/*
 * File: MyGame.js 
 *       This is the logic of our game. 
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import Color from "../engine/color.js";
import engine from "../engine/index.js";
import Torch from "./objects/torch.js";

class MyGame extends engine.Scene {
    constructor() {
        super();
        this.kTorch = "assets/torch_sprite.png";

        // The camera to view the scene
        this.mCamera = null;
        this.mTorches = null;
        this.mPattern = [];
        this.mInputCounter = 0;
        this.mCollisionInfos = [];
        this.mScore = 0;
        this.mOnce = true;
        this.stageTorches = [];

        this.mDisplayCounter = 0;
        this.mDisplayTimer = null;

        this.mContinue = true;
        this.mDisplayPhase = false;
        this.mInputPhase = false;
        this.mStartPhase = true;
        this.mEndPhase = false;

        // Particle Support
        this.mParticles = null;
        this.mPSDrawBounds = false;
        this.mPSCollision = true;
    }

    load() {
        engine.texture.load(this.kTorch);
    }

    unload() {
        engine.texture.unload(this.kTorch);
    }

    init() {
        this.mTorches = new engine.GameObjectSet();
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(50, 40), // position of the camera
            100,                     // width of camera
            [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.6, 0.6, 0.6, 1]);
        // sets the background to gray
        let t = new Torch(this.kTorch,75,40,Color.BLUE);
        let t1 = new Torch(this.kTorch,50,20,Color.RED);
        let t2 = new Torch(this.kTorch,25,40,Color.GREEN);
        let t3 = new Torch(this.kTorch,50,60,Color.YELLOW);
        this.mTorches.addToSet(t);
        this.mTorches.addToSet(t1);
        this.mTorches.addToSet(t2);
        this.mTorches.addToSet(t3);
        // particle systems
        this.mParticles = new engine.ParticleSet();

        this.mMsg = new engine.FontRenderable("Score: 0");
        this.mMsg.setColor([0, 0, 0, 1]);
        this.mMsg.getXform().setPosition(10, 7);
        this.mMsg.setTextHeight(3);

        this.mStartMsg = new engine.FontRenderable("Press SPACE to start");
        this.mStartMsg.setColor([0, 0, 0, 1]);
        this.mStartMsg.getXform().setPosition(33, 40);
        this.mStartMsg.setTextHeight(3);
    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

        this.mCamera.setViewAndCameraMatrix();

        this.mMsg.draw(this.mCamera);

        this.mParticles.draw(this.mCamera);
        if (this.mPSDrawBounds)
            this.mParticles.drawMarkers(this.mCamera);

        // for now draw these ...
        if (this.mCollisionInfos !== null) {
        for (let i = 0; i < this.mCollisionInfos.length; i++)
            this.mCollisionInfos[i].draw(this.mCamera);
        this.mCollisionInfos = [];
        }
        this.mTorches.draw(this.mCamera);
        this.mStartMsg.draw(this.mCamera);
    }

    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {
        if (this.mStartPhase){
            if (this.mOnce){
                for (let i = 0; i < 4; i++){
                    let x = this.mTorches.getObjectAt(i).getXform().getXPos();
                    let y = this.mTorches.getObjectAt(i).getXform().getYPos();
                    let f = this.mParticles.addFlameAt(x,y-2,2,80000000);
                    f.setParticleSize(8);
                    f.setSizeVariance(4);
                    f.setColorStart(Color.YELLOW);
                    f.setColorEnd(Color.RED);
                    f.setClimb(30);
                    f.setSpread(.6);
                    this.stageTorches.push(f);
                }
                this.mOnce = false;
            }
            if (engine.input.isKeyClicked(engine.input.keys.Space)) { 
                this.mStartMsg.setText("        Wait...");
                this.mStartPhase = false;
                this.mDisplayPhase = true;
                this.mScore = 0;
                this.mDisplayTimer = Date.now() + 1000;
                this.mOnce = true;
                for (let i = 0; i < this.stageTorches.length; i++){
                    this.stageTorches[i].terminate();
                }
            }
        }
        if (this.mDisplayPhase){
            if (this.mPattern.length == 0){
                for (let i = 0; i < 4; i++){
                    this.mPattern[this.mPattern.length] = parseInt(Math.random()*4);
                }
            }
            if (this.mDisplayCounter < this.mPattern.length && Date.now() >= this.mDisplayTimer){
                let x = this.mTorches.getObjectAt(this.mPattern[this.mDisplayCounter]).getXform().getXPos();
                let y = this.mTorches.getObjectAt(this.mPattern[this.mDisplayCounter]).getXform().getYPos();
                let f = this.mParticles.addFlameAt(x,y-2,2,800);
                f.setParticleSize(8);
                f.setSizeVariance(4);
                f.setColorStart(Color.YELLOW);
                f.setColorEnd(Color.RED);
                f.setClimb(30);
                f.setSpread(.6);
                this.mDisplayTimer = Date.now() + 1500;
                this.mDisplayCounter++;
            } else if (this.mDisplayCounter >= this.mPattern.length && Date.now() >= this.mDisplayTimer){
                this.mDisplayPhase = false;
                this.mInputPhase = true;
                this.mDisplayCounter = 0;
                this.mStartMsg.setText("         Go");
            }
        }
        if (this.mInputPhase){
            let input = -1;
            if (engine.input.isKeyClicked(engine.input.keys.Left))
                input = 2;
            if (engine.input.isKeyClicked(engine.input.keys.Right))
                input = 0;
            if (engine.input.isKeyClicked(engine.input.keys.Up))
                input = 3;
            if (engine.input.isKeyClicked(engine.input.keys.Down))
                input = 1;
            if (input != -1){
                let color;
                if (this.mPattern[this.mInputCounter] == input){
                    this.mContinue = true;
                    color = Color.GREEN;
                    if (this.mScore == this.mInputCounter)
                        this.mScore++;
                } else {
                    this.mContinue = false;
                    color = Color.RED;
                    let x = this.mTorches.getObjectAt(this.mPattern[this.mInputCounter]).getXform().getXPos();
                    let y = this.mTorches.getObjectAt(this.mPattern[this.mInputCounter]).getXform().getYPos();
                    let f = this.mParticles.addFlameAt(x,y-2,2,1200);
                    f.setParticleSize(8);
                    f.setSizeVariance(4);
                    f.setColorStart(Color.CYAN);
                    f.setColorEnd(Color.BLUE);
                    f.setClimb(30);
                    f.setSpread(.6);
                }
                let x = this.mTorches.getObjectAt(input).getXform().getXPos();
                let y = this.mTorches.getObjectAt(input).getXform().getYPos();
                let f = this.mParticles.addFlameAt(x,y-2,2,1200);
                f.setParticleSize(8);
                f.setSizeVariance(4);
                f.setColorStart(color);
                f.setColorEnd(Color.BLACK);
                f.setClimb(30);
                f.setSpread(.6);
                this.mInputCounter++;
            }
            if (this.mContinue == false){
                this.mInputPhase = false;
                this.mEndPhase = true;
                this.mInputCounter = 0;
                this.mStartMsg.setText("    Game Over");
                this.mContinue = true;
            }
            if (this.mInputCounter >= this.mPattern.length){
                for (let i = 0; i < 2; i++){
                    this.mPattern[this.mPattern.length] = parseInt(Math.random()*4);
                }
                this.mInputPhase = false;
                this.mDisplayPhase = true;
                this.mStartMsg.setText("        Wait...");
                this.mDisplayTimer = Date.now() + 1500;
                this.mInputCounter = 0;
            }
        }
        if (this.mEndPhase){
            if (this.mOnce){
                this.mDisplayTimer = Date.now() + 1500;
                this.mOnce = false;
                this.mPattern = [];
            }
            if (this.mDisplayTimer < Date.now()){
                this.mStartMsg.setText("Press SPACE to start");
                this.mEndPhase = false;
                this.mStartPhase = true;
                this.mOnce = true;
            }
        }
        this.mMsg.setText("Score: " + this.mScore);
        // Particle System
        this.mParticles.update();
    }
}

export default MyGame;