// this is the fragment (or pixel) shader that 
// attempts to render a pixel particle.

precision mediump float; 
    // sets the precision for floating point computation

// Color of pixel
uniform vec4 uPixelColor;  

void main(void)  {
    // for every pixel called sets to the user specified color
    gl_FragColor = uPixelColor;
}