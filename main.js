import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1200 / 800, 0.1, 1000);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(1200, 800);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const dvdTexture = textureLoader.load("R.png");

const geometry = new THREE.PlaneGeometry(3, 1.5);
const material = new THREE.MeshBasicMaterial({
  map: dvdTexture,
  transparent: true,
});
const dvdLogo = new THREE.Mesh(geometry, material);
scene.add(dvdLogo);

let velocityX = 0.06;
let velocityY = 0.05;
let bounceCount = 0;

const boundaryX = 5.5;
const boundaryY = 3.5;

function animate() {
  requestAnimationFrame(animate);

  dvdLogo.position.x += velocityX;
  dvdLogo.position.y += velocityY;

  if (dvdLogo.position.x > boundaryX || dvdLogo.position.x < -boundaryX) {
    velocityX = -velocityX;
    onBounce();
  }
  if (dvdLogo.position.y > boundaryY || dvdLogo.position.y < -boundaryY) {
    velocityY = -velocityY;
    onBounce();
  }

  if (dvdLogo.scale.x < 0.05) {
    dvdLogo.visible = false;
  }

  renderer.render(scene, camera);
}

function onBounce() {
  bounceCount++;

  const hue = Math.random();
  dvdLogo.material.color.setHSL(hue, 1, 0.5);

  dvdLogo.scale.multiplyScalar(0.9);
}

animate();
