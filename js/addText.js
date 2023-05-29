import * as THREE from "three";
import {FontLoader} from "three/addons/loaders/FontLoader";
import {TextGeometry} from "three/addons/geometries/TextGeometry";

let group1, textMesh1, textGeo, materials;

// Load a font
let font = undefined,
    fontName = 'optimer', // helvetiker, optimer, gentilis, droid sans, droid serif
    fontWeight = 'regular'; // normal bold

const height = 0.3,
    size = 2,
    hover = 2,
    curveSegments = 12;

function createGroup(position){
    group1 = new THREE.Group();
    group1.position.set(position.x, position.y, position.z);
    return group1;
}


function loadFont(text, rotation, materials, group) {

    const loader = new FontLoader();
    loader.load( 'https://threejs.org/examples/fonts/' + fontName + '_' + fontWeight + '.typeface.json', function ( response ) {

        font = response;

        textGeo = new TextGeometry( text, {

            font: font,

            size: size,
            height: height,
            curveSegments: curveSegments,
        } );

        textGeo.computeBoundingBox();

        const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

        textMesh1 = new THREE.Mesh( textGeo, materials );

        textMesh1.position.x = centerOffset;
        textMesh1.position.y = hover;
        textMesh1.position.z = 0;

        textMesh1.rotation.set(rotation.x, rotation.y, rotation.z);

        group.add( textMesh1 );

    } );
    return group
}

export function addTextToScene(scene) {
    let text1 = 'CPU';
    let rotation1 = new THREE.Euler(0, 0, 0);
    let materials1 = [
        new THREE.MeshPhongMaterial( { color: 0xff0000, flatShading: false} ), // front
        new THREE.MeshPhongMaterial( { color: 0xffffff} ) // side
    ];
    let group1 = createGroup(new THREE.Vector3(-40,0, 3));
    scene.add(group1);
    loadFont(text1, rotation1, materials1, group1);


    let text2 = 'MEM';
    let rotation2 = new THREE.Euler(0, Math.PI * 0.5, 0);
    let materials2 = [
        new THREE.MeshPhongMaterial( { color: 0x0000ff, flatShading: false} ), // front
        new THREE.MeshPhongMaterial( { color: 0xffffff} ) // side
    ];
    let group2 = createGroup(new THREE.Vector3(3,3, -40));
    scene.add(group2);
    loadFont(text2, rotation2, materials2, group2);

    let text3 = 'IO';
    let rotation3 = new THREE.Euler(Math.PI * 0.5, 0, Math.PI * -0.25);
    let materials3 = [
        new THREE.MeshPhongMaterial( { color: 0x00ff00, flatShading: false} ), // front
        new THREE.MeshPhongMaterial( { color: 0xffffff} ) // side
    ];
    let group3 = createGroup(new THREE.Vector3(-80,3, -80));
    scene.add(group3);
    loadFont(text3, rotation3, materials3, group3);
}
