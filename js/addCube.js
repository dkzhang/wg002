import * as THREE from "three";

// Create a cube
const cubeGeometry = new THREE.BoxGeometry(2,2,2);
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 5, 0);


// Create a plane
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

// Position the plane on the desired face of the cube
plane.position.set(0, 1.001, 0); // This binds the plane to the front face of the cube (positive Z-axis)
plane.rotation.set(Math.PI / 2,0, 0,); // Rotate the plane so that it is facing the front face of the cube

export function addCubeToScene(scene){
    scene.add(cube);
    cube.add(plane);
}