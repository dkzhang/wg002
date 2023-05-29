import * as THREE from 'three';
import Stats from "three/addons/libs/stats.module";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// basic scene setup
const scene = new THREE.Scene();
scene.backgroundColor = 0xffffff;

// setup camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.x = -3;
camera.position.z = 8;
camera.position.y = 2;

// setup the renderer and attach to canvas
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

// add lights
scene.add(new THREE.AmbientLight(0x666666));
const dirLight = new THREE.DirectionalLight(0xaaaaaa);
dirLight.position.set(5, 12, 8);
dirLight.castShadow = true;
dirLight.intensity = 1;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 200;
dirLight.shadow.camera.right = 10;
dirLight.shadow.camera.left = -10;
dirLight.shadow.camera.top = 10;
dirLight.shadow.camera.bottom = -10;
dirLight.shadow.mapSize.width = 512;
dirLight.shadow.mapSize.height = 512;
dirLight.shadow.radius = 4;
dirLight.shadow.bias = -0.0005;

scene.add(dirLight);

// add orbitcontrols
const controller = new OrbitControls(camera, renderer.domElement);
controller.enableDamping = true;
controller.dampingFactor = 0.05;
controller.minDistance = 3;
controller.maxDistance = 10;
controller.minPolarAngle = Math.PI / 4;
controller.maxPolarAngle = (3 * Math.PI) / 4;

// create a cube and add them to the scene

const cubeGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const materials = [
    new THREE.MeshBasicMaterial({ color: 0xffffff }), // White
    new THREE.MeshBasicMaterial({ color: 0xffffff }), // White
    new THREE.MeshBasicMaterial({ color: 0xffffff }), // White
    new THREE.MeshBasicMaterial({ color: 0xffffff }), // White
    new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red
    new THREE.MeshBasicMaterial({ color: 0xffffff })  // White
];

const cube = new THREE.Mesh(cubeGeometry, materials);

cube.position.x = -2;
cube.position.y = -2;
cube.position.z = -2;
scene.add(cube);

function addCube() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const cubeClone = cube.clone();
            cubeClone.position.x = -1 + i * 0.15;
            cubeClone.position.y = -1 + j * 0.15;
            scene.add(cubeClone);
        }
    }
}

addCube();

// create a very large ground plane
const groundGeometry = new THREE.PlaneBufferGeometry(10000, 10000);
const groundMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.position.set(0, -2, 0);
groundMesh.rotation.set(Math.PI / -2, 0, 0);
groundMesh.receiveShadow = true;

scene.add(groundMesh);

// add stats
const stats = Stats();
document.body.appendChild(stats.dom);

renderer.render(scene, camera);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    stats.update();

    controller.update();
}
animate();