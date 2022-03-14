# ParticleSystem
Nicholas Martin, Brendan Frye, Antoinette Calkins

UWB CSS 452

## Overview

This is an API that allows users to create various effects with particles in 2D games. Presets for both colors and particle effects are included for ease of use, and the presets and particles themselves allow the user to modify the fields with getters and setters for further customization.

Currently, the system supports the following effects:

- Burst
- Flame
- Electricity
- Rain
- Dust
- Snow
- Basic

The particles were originally texture renderables, but with our modifications they are now pixel renderables, and are less expensive than the previous version. In addition, the system is much easier to use than it was previously, with the creator function parameter removed from the basic particle emitter, and instead each effect having its own emitter with the creator function built in.

The PixelRenderable class uses a PointShader, for which we have defined a point fragment shader that simply sets the color of every pixel to the one specified by the user. The PointShader uses the simple vertex shader that contains references to the position and the point size, which allows the size and position of the pixel to be manipulated.

## Tutorial
**Using the particle effects**

In the example below, a new default emitter is created when the left mouse button is clicked. ``` mParticles ``` is a particle set in the scene's main class, calling ``` addEmitterAt() ``` creates the default emitter and returns it. As specified by the arguments, the emitter is being created at the mouse position, and 100 particles are to be created and added to the set. The other emitter types work identically, with a varying number of parameters.

```
if (engine.input.isButtonClicked(engine.input.eMouseButton.eLeft))
  let newDefault = this.mParticles.addEmitterAt(this.mCamera.mouseWCX(), this.mCamera.mouseWCY(),100);
```
The user then has the option of modifying the particle fields through the new emitter. For example:

```
newDefault.setColorEnd([0,.7,.3,.6]);
newDefault.setParticleSize(10);
newDefault.setSizeVariance(5);
newDefault.setGrowth(-0.02);
```
This block of statements will modify the ending color, set the particle size to 10, size variance to 5, and set the particle growth to -0.02. When the growth is negative, the particles will shrink over time, if positive, they will get larger over time.

This allows the user to fine tune the presets to get their desired effects, without having to set up special effects from scratch.

Each effect has its own emitter, so the user will use specific emitter functions for those effects as opposed to the generic one shown here. For example, if a user wanted to create fire, they would call ``` addFlameAt() ``` instead. See documentation for a full list of particle set emitter functions.
## Documentation
Documentation for this API can be found here:
[ParticleSystem JSDocs](https://nmart510.github.io/ParticleSystem/docs/)

## Demo Programs
Demo games using this API can be found here:

[Demo 1 - Basic Functionality](https://nmart510.github.io/ParticleSystem/)

[Demo 2 - Simon Says](https://nmart510.github.io/ParticleSystem/index_second.html)

##Conclusion
The goal we have set out to accomplish is to create a library of presets which users can choose from allowing for ease of access when creating particles in our game engine. Given the scope of this project we’ve accomplished the main goal of improving the current particle system. 

Our final release expands upon the presets shown in our demo and implements a pixel renderable to help with performance issues. Our goal of allowing for multiple textured particles simply cannot be accomplished with this current implementation. 

One of the visions we have for the future of this particle system is reworking the particle sets to allow particles to group together to form complex objects. Minecraft does an excellent job of displaying complex shapes such as this with limited graphical quality. 

One final idea that we have decided to shelf for the time is custom creator functions. Without a deep understanding of the particle system it can be hard to modify the features of a particle on their most basic level. While we would like to support custom particle presets which can be defined by more advanced users it doesn’t fit the scope of this project. 
