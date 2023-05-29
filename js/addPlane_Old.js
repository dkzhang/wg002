// create a SquarePlane and add them to the scene
function createSquarePlane(size, x, y, z, rX =0, rY = 0, color = 0x0000ff) {
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshBasicMaterial({ color, side: THREE.FrontSide });
    const plane = new THREE.Mesh(geometry, material);

    plane.position.set(x, y, z);
    plane.rotation.set(rX, rY, 0);

    scene.add(plane);
}

// function create3SP(size, row, col, colorR, colorG, colorB) {
//     createSquarePlane(size, row, col, 0,  0, 0, randomColorNearby(255,0,0, colorR));
//     createSquarePlane(size, col, 0, row,  -Math.PI / 2, 0, randomColorNearby(0,255,0, colorG));
//     createSquarePlane(size, 0, row, col,  0, Math.PI / 2, randomColorNearby(0,0,255, colorB));
// }

function createXYsp(size, row, col, color) {
    createSquarePlane(size, row, col, 0,  0, 0, color);
}

function createZXsp(size, row, col, color) {
    createSquarePlane(size, col, 0, row,  -Math.PI / 2, 0, color);
}

function createYZsp(size, row, col, color) {
    createSquarePlane(size, 0, row, col,  0, Math.PI / 2, color);
}

function addSquarePlanes() {
    const planeSize = 1;
    const groupSpacing = 0.5;
    const planeSpacing = 1.1;

    for (let gx = 0; gx < 16; gx++) {
        for (let gy = 0; gy < 16; gy++) {
            let mainColorR = randomColor(255,0,0)
            let mainColorG = randomColor(0,255,0)
            let mainColorB = randomColor(0,0,255)

            for (let ix = 0; ix < 4; ix++) {
                for (let iy = 0; iy < 4; iy++) {
                    let row = -(planeSize/2 + (gx*4 +ix) * planeSpacing + gx * groupSpacing);
                    let col = -(planeSize/2 + (gy*4 +iy) * planeSpacing + gy * groupSpacing);

                    createXYsp(planeSize, row, col, randomColorNearby(255,0,0, mainColorR));
                    createZXsp(planeSize, row, col, randomColorNearby(0,255,0, mainColorG));
                    createYZsp(planeSize, row, col, randomColorNearby(0,0,255, mainColorB));

                }
            }
            // create3SP(planeSize, -(planeSize/2 + gx * planeSpacing), -(planeSize/2 + gy * planeSpacing), 0xff0000)
        }
    }
}

addSquarePlanes()