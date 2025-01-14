import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { Terrain } from "./terrain";

const gui = new GUI();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const controls = new OrbitControls(camera, renderer.domElement);

const terrain = new Terrain(10, 10);
scene.add(terrain);

const sun = new THREE.DirectionalLight();
sun.intensity = 3;
sun.position.set(1, 2, 3);
scene.add(sun);

const ambient = new THREE.AmbientLight();
ambient.intensity = 0.5;
scene.add(ambient);

const stats = new Stats();
document.body.appendChild(stats.dom);

camera.position.set(10, 2, 10);

function animate() {
  controls.update();

  renderer.render(scene, camera);

  stats.update();
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const terrainFolder = gui.addFolder("Terrain");
terrainFolder.add(terrain, "width", 1, 20, 1).name("Width");
terrainFolder.add(terrain, "height", 1, 20, 1).name("Height");
terrainFolder.addColor(terrain.terrain.material, "color").name("Color");
terrainFolder.onChange(() => {
  terrain.createTerrain();
});
