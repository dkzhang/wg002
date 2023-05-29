export {randomColor, randomColorNearby, randomColorNearbyGroup};
function randomColor(r,g,b) {
    // origin color in RGB: (r, g, b)
    const color = [r, g, b];
    // White color in RGB: (255, 255, 255)
    const white = [255, 255, 255];

    // Generate a random number between 0 and 1
    const t = Math.random();

    // Interpolate between red and white RGB values
    const rv = Math.floor(color[0] + t * (white[0] - color[0]));
    const gv = Math.floor(color[1] + t * (white[1] - color[1]));
    const bv = Math.floor(color[2] + t * (white[2] - color[2]));

    // Convert RGB to a single integer
    const colorInt = (rv << 16) + (gv << 8) + bv;

    return colorInt;
}

function randomColorNearby(r,g,b, color) {
    // origin color in RGB: (r, g, b)
    const color0 = [r, g, b];
    const color1 = [color>> 16, (color >> 8) & 0xff, color & 0xff];
    // White color in RGB: (255, 255, 255)
    const white = [255, 255, 255];

    // Generate a random number between 0 and 1
    const t = (Math.random()*2 -1) * 0.1;

    // Interpolate between red and white RGB values
    let rv = Math.floor(color1[0] + t * (white[0] - color0[0]));
    let gv = Math.floor(color1[1] + t * (white[1] - color0[1]));
    let bv = Math.floor(color1[2]+ t * (white[2] - color0[2]));

    if (rv < 0) rv = 0;
    if (gv < 0) gv = 0;
    if (bv < 0) bv = 0;
    if (rv > 255) rv = 255;
    if (gv > 255) gv = 255;
    if (bv > 255) bv = 255;

    // Convert RGB to a single integer
    return (rv << 16) + (gv << 8) + bv;
}

function randomColorNearbyGroup(r,g,b,n) {
    const cs = [];
    let color =randomColor(r,g,b,n);
    cs.push(color);
    for (let i = 1; i < n; i++) {
        cs.push(randomColorNearby(r,g,b,color));
    }
    return cs;
}