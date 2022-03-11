//presets for colors to make things easier
"use strict";

class Color {
    static RED = vec4.fromValues(1, 0, 0, 1); //red
    static YELLOW = vec4.fromValues(1, 0.92, 0.016, 1); // it's fucking yellow!
    static GREEN = vec4.fromValues(0, 1, 0, 1); // it's goddamn green
    static BLUE = vec4.fromValues(0, 0, 1, 1);
    static MAGENTA = vec4.fromValues(1, 0, 1, 1);
    static BLACK = vec4.fromValues(0, 0, 0, 1);
    static WHITE = vec4.fromValues(1, 1, 1, 1);
    static CLEAR = vec4.fromValues(0, 0, 0, 0);
}
export default Color;