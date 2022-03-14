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

## Tutorials
## link api docs here
