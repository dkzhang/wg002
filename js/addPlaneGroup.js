import * as THREE from "three";

const size = 1;
const spacing = 1.1;
const row = 4;
const col = 4;


function NewPlaneGroup(name, colors){
    // const group = new THREE.Group();
    const bpx = spacing * (row-1) + size;
    const bpy = spacing * (col-1) + size;
    let planeGeometry = new THREE.PlaneGeometry(bpx, bpy);
    let planeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.FrontSide});
    let planeGroup = new THREE.Mesh(planeGeometry, planeMaterial);
    planeGroup.name = name;
    
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            let x = size/2 + r * spacing - bpx/2;
            let y = size/2 + c * spacing - bpy/2

            let planeGeometry = new THREE.PlaneGeometry(size, size);
            let planeMaterial = new THREE.MeshBasicMaterial({color: colors[r+row*c], side: THREE.FrontSide});
            let plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.position.set(x, y, 0.01);
            planeGroup.add(plane);
        }
    }
    
    return planeGroup;
}


export function addPlaneGroupToScene(scene, name,colors,
                               x = 0,y = 0,z = 0,
                               rx= 0,ry= 0,rz= 0){
    let g = NewPlaneGroup(name, colors);
    g.position.set(x,y,z);
    g.rotation.set(rx,ry,rz);
    scene.add(g);
}