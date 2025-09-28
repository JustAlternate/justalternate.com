
import * as THREE from './node_modules/three/build/three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 30000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

camera.position.setX(-1);
camera.position.setY(0);
camera.position.setZ(3);
camera.rotation.x = 0;
camera.rotation.y = 0;
camera.rotation.z = 0;

renderer.render(scene, camera);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


function addStar() {
  const geometry = new THREE.SphereGeometry(0.5, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => Math.random()*6000);

  star.position.set(Math.random()*1600 - 800, Math.random()*1600 -800,z -1000);
  scene.add(star);
}

// Background

Array(800).fill().forEach(addStar);

// Earth

const earthTexture = new THREE.TextureLoader().load('assets/earth.webp');
earthTexture.minFilter = THREE.NearestFilter;
earthTexture.magFilter = THREE.NearestFilter;
const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), new THREE.MeshBasicMaterial({ map: earthTexture }));
scene.add(earth);
earth.position.x = -0.5;
earth.position.y = 0;
earth.position.z = -2.5;
earth.rotation.x = 1;
earth.rotation.z = 0.3;
earth.rotation.y = -1.5;

// Moon
const moonTexture = new THREE.TextureLoader().load('assets/moon.webp');
moonTexture.minFilter = THREE.NearestFilter;
moonTexture.magFilter = THREE.NearestFilter;
const moon = new THREE.Mesh(new THREE.SphereGeometry(0.8, 64, 64), new THREE.MeshBasicMaterial({ map: moonTexture }));
scene.add(moon);
moon.position.x = 3;
moon.position.y = 3;
moon.position.z = -2.5;
moon.rotation.x = 1;
moon.rotation.z = 0.3;
moon.rotation.y = -1.5;

// Mercury
const mercuryTexture = new THREE.TextureLoader().load('assets/mercury.webp');
mercuryTexture.minFilter = THREE.NearestFilter;
mercuryTexture.magFilter = THREE.NearestFilter;
const mercury = new THREE.Mesh(new THREE.SphereGeometry(1.2, 64, 64), new THREE.MeshBasicMaterial({ map: mercuryTexture }));
scene.add(mercury);
mercury.position.x = 3.45;
mercury.position.y = -3.5;
mercury.position.z = 23.6;

// Mars
const marsTexture = new THREE.TextureLoader().load('assets/mars.webp');
marsTexture.minFilter = THREE.NearestFilter;
marsTexture.magFilter = THREE.NearestFilter;
const mars = new THREE.Mesh(new THREE.SphereGeometry(1.75, 64, 64), new THREE.MeshBasicMaterial({ map: marsTexture }));
scene.add(mars);
mars.position.x = -1.22;
mars.position.y = 3.5;
mars.position.z = 60.9;

// Venus
const venusTexture = new THREE.TextureLoader().load('assets/venus.jpg');
venusTexture.minFilter = THREE.NearestFilter;
venusTexture.magFilter = THREE.NearestFilter;
const venus = new THREE.Mesh(new THREE.SphereGeometry(3, 64, 64), new THREE.MeshBasicMaterial({ map: venusTexture }));
scene.add(venus);
venus.position.x = -3;
venus.position.y = -3;
venus.position.z = 119;

// Neptune
const neptuneTexture = new THREE.TextureLoader().load('assets/neptune.webp');
neptuneTexture.minFilter = THREE.NearestFilter;
neptuneTexture.magFilter = THREE.NearestFilter;
const neptune = new THREE.Mesh(new THREE.SphereGeometry(12, 64, 64), new THREE.MeshBasicMaterial({ map: neptuneTexture }));
scene.add(neptune);
neptune.position.x = 16;
neptune.position.y = 8;
neptune.position.z = 213;

// Uranus
const uranusTexture = new THREE.TextureLoader().load('assets/uranus.webp');
uranusTexture.minFilter = THREE.NearestFilter;
uranusTexture.magFilter = THREE.NearestFilter;
const uranus = new THREE.Mesh(new THREE.SphereGeometry(12, 64, 64), new THREE.MeshBasicMaterial({ map: uranusTexture }));
scene.add(uranus);
uranus.position.x = -10;
uranus.position.y = -14;
uranus.position.z = 277;


// Saturn
const saturnTexture = new THREE.TextureLoader().load('assets/saturn(no ring).webp');
saturnTexture.minFilter = THREE.NearestFilter;
saturnTexture.magFilter = THREE.NearestFilter;
const saturn = new THREE.Mesh(new THREE.SphereGeometry(30, 64, 64), new THREE.MeshBasicMaterial({ map: saturnTexture }));
scene.add(saturn);
saturn.position.x = 40;
saturn.position.y = -10;
saturn.position.z = 444;
// Saturn-ring
const texture = new THREE.TextureLoader().load(
  "https://i.postimg.cc/zz7Gr430/saturn-rings-top.png"
);
texture.minFilter = THREE.NearestFilter;
texture.magFilter = THREE.NearestFilter;
const geometry = new THREE.RingGeometry(30, 70, 64);
var pos = geometry.attributes.position;
var v3 = new THREE.Vector3();
for (let i = 0; i < pos.count; i++){
  v3.fromBufferAttribute(pos, i);
  geometry.attributes.uv.setXY(i, v3.length() < 41 ? 0 : 1, 1);
}
const material = new THREE.MeshBasicMaterial({
  map: texture,
  color: 0xffffff,
  side: THREE.DoubleSide,
  transparent:true,
});
const saturn_ring = new THREE.Mesh(geometry, material);
scene.add(saturn_ring);
saturn_ring.position.x = 40;
saturn_ring.position.y = -10;
saturn_ring.position.z = 444;
saturn_ring.rotation.x = 1.7;
saturn_ring.rotation.y = 0;
saturn_ring.rotation.z = 0;

// Jupyter
const jupyterTexture = new THREE.TextureLoader().load('assets/jupyter.webp');
jupyterTexture.minFilter = THREE.NearestFilter;
jupyterTexture.magFilter = THREE.NearestFilter;
const jupyter = new THREE.Mesh(new THREE.SphereGeometry(35, 64, 64), new THREE.MeshBasicMaterial({ map: jupyterTexture }));
scene.add(jupyter);
jupyter.position.x = -43;
jupyter.position.y = 29;
jupyter.position.z = 735;


// Sun
const sunTexture = new THREE.TextureLoader().load('assets/sun.webp');
sunTexture.minFilter = THREE.NearestFilter;
sunTexture.magFilter = THREE.NearestFilter;
const sun = new THREE.Mesh(new THREE.SphereGeometry(350, 64, 64), new THREE.MeshBasicMaterial({ map: sunTexture }));
scene.add(sun);
sun.position.x = 360;
sun.position.y = 0;
sun.position.z = 2000;

// Scroll Animation

var acceleration = 1;
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * (-0.002 * acceleration);
  acceleration = t*-0.01;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

var orbit_moon = 0;
var moon_orbital_speed = Math.random()/100
var orbit_mars = 5;
var mars_orbital_speed = Math.random()/100
var orbit_mercury = 10;
var mercury_orbital_speed = Math.random()/100
var orbit_saturn = 15;
var saturn_orbital_speed = Math.random()/100
var orbit_venus = 20;
var venus_orbital_speed = Math.random()/100
var orbit_jupyter = 25;
var jupyter_orbital_speed = Math.random()/100
var orbit_uranus = 30;
var uranus_orbital_speed = Math.random()/100
var orbit_neptune = 35;
var neptune_orbital_speed = Math.random()/100

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width  = window.screen.width * pixelRatio | 0;
  const height = window.screen.height * pixelRatio | 0;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function animate_orbit(object,pos,multiplier,speed){
  pos += speed;
  object.position.x = Math.cos(pos) * multiplier;
  object.position.y = Math.sin(pos) * multiplier;
  return pos;
}

function animate() {

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  requestAnimationFrame(animate);

  orbit_moon = animate_orbit(moon,orbit_moon,3,moon_orbital_speed);
  orbit_mercury = animate_orbit(mercury,orbit_mercury,3,mercury_orbital_speed);
  orbit_mars = animate_orbit(mars,orbit_mars,5,mars_orbital_speed);
  orbit_venus = animate_orbit(venus,orbit_venus,6,venus_orbital_speed);
  orbit_neptune = animate_orbit(neptune,orbit_neptune,18,neptune_orbital_speed);
  orbit_uranus = animate_orbit(uranus,orbit_uranus,22,uranus_orbital_speed);
  orbit_saturn = animate_orbit(saturn,orbit_saturn,55,saturn_orbital_speed);
  // For sarturn-ring
  animate_orbit(saturn_ring,orbit_saturn,55,saturn_orbital_speed);
  orbit_jupyter = animate_orbit(jupyter,orbit_jupyter,80,jupyter_orbital_speed);

  earth.rotation.y -= 0.001;
  moon.rotation.y -= 0.001;
  mars.rotation.y += 0.004
  mercury.rotation.y += 0.003;
  saturn.rotation.y -= 0.005;
  saturn_ring.rotation.z += 0.005;
  venus.rotation.y += 0.002;
  jupyter.rotation.y -= 0.002;
  uranus.rotation.y += 0.008;
  neptune.rotation.y -= 0.002;
  sun.rotation.y -= 0.003;



  // controls.update();

  renderer.render(scene, camera);
}
animate()

// Cursor : 
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
  "#3a0989",
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;

});

function animateCircles() {

  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    circle.style.zIndex = (circles.length - index);

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.4;
    y += (nextCircle.y - y) * 0.4;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();

