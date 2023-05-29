import * as THREE from "three";
import {FontLoader} from "three/addons/loaders/FontLoader";
import {TextGeometry} from "three/addons/geometries/TextGeometry";

let group, textMesh1, textGeo, materials;

// Load a font
let text = 'CPU',
    font = undefined,
    fontName = 'optimer', // helvetiker, optimer, gentilis, droid sans, droid serif
    fontWeight = 'regular'; // normal bold

const height = 0.3,
    size = 2,
    hover = 2,
    curveSegments = 12;

materials = [
    new THREE.MeshPhongMaterial( { color: 0xff0000, flatShading: false} ), // front
    new THREE.MeshPhongMaterial( { color: 0xffffff} ) // side
];

group = new THREE.Group();
group.position.y = 0;
group.position.x = -40;
group.position.z = 3;



function loadFont() {

    const loader = new FontLoader();
    loader.load( 'https://threejs.org/examples/fonts/' + fontName + '_' + fontWeight + '.typeface.json', function ( response ) {

        font = response;

        refreshText();

    } );

}

function refreshText() {
    group.remove( textMesh1 );
    if ( ! text ) return;
    createText();

}
function createText() {

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

    textMesh1.rotation.x = 0;
    textMesh1.rotation.y = Math.PI * 2;

    group.add( textMesh1 );
}

export function addTextToScene(scene) {
    scene.add(group);

    loadFont();
}
