import * as THREE from 'three';
import Stats from "three/addons/libs/stats.module";
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {addTextToScene} from './js/addText.js';
import {addCubeToScene} from './js/addCube.js';
import {addPlaneGroupToScene} from "./js/addPlaneGroup";
import {randomColorNearbyGroup} from "./js/randomColor";

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
camera.position.x = 10;
camera.position.z = 10;
camera.position.y = 10;

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
controller.minDistance = 80;
controller.maxDistance = 200;
controller.minAzimuthAngle = 0;
controller.maxAzimuthAngle = Math.PI / 2;
controller.minPolarAngle = 0;
controller.maxPolarAngle = Math.PI / 2;
controller.target.set(-39, -39, -39);



addTextToScene(scene);

// addCubeToScene(scene);

const gs = 5;   // group spacing
const igs = -2.16;  // initial group spacing

for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++){
        let csr = randomColorNearbyGroup(255,0,0,16)
        let csg = randomColorNearbyGroup(0,255,0,16)
        let csb = randomColorNearbyGroup(0,0,255,16)

        addPlaneGroupToScene(scene, "gxy_"+i+"-"+j,
            csr, -i* gs + igs,-j* gs + igs,0);
        addPlaneGroupToScene(scene, "gyz_"+i+"-"+j,
            csb, 0,-i* gs + igs,-j* gs + igs,0, Math.PI / 2,0);
        addPlaneGroupToScene(scene, "gzx_"+i+"-"+j,
            csg, -i* gs + igs,0,-j* gs + igs,-Math.PI/2,0,0);
    }

}

// create a very large ground plane
// const groundGeometry = new THREE.PlaneBufferGeometry(10000, 10000);
// const groundMaterial = new THREE.MeshLambertMaterial({
//     color: 0xffffff,
// });
// const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
// groundMesh.position.set(0, -2, 0);
// groundMesh.rotation.set(Math.PI / -2, 0, 0);
// groundMesh.receiveShadow = true;
//
// scene.add(groundMesh);

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