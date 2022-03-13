
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";

class Torch extends engine.GameObject {
    constructor(spriteTexture, atX, atY, color) {
        super();
        this.mRenderComponent = new engine.SpriteRenderable(spriteTexture);
        this.mRenderComponent.setColor(color);
        this.mRenderComponent.getXform().setPosition(atX, atY);
        this.mRenderComponent.getXform().setSize(16, 16);
        this.mRenderComponent.setElementPixelPositions(0, 256, 0, 256);
    }
}

export default Torch;