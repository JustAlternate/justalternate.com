import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const starfieldCanvas = document.getElementById('starfield');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({
  canvas: starfieldCanvas,
  antialias: true,
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const starGeometry = new THREE.BufferGeometry();
const starCount = 2500;
const positions = new Float32Array(starCount * 3);
const colors = new Float32Array(starCount * 3);

for (let i = 0; i < starCount; i++) {
  const i3 = i * 3;
  positions[i3] = (Math.random() - 0.5) * 2000;
  positions[i3 + 1] = (Math.random() - 0.5) * 2000;
  positions[i3 + 2] = (Math.random() - 0.5) * 2000;

  const brightness = 0.5 + Math.random() * 0.5;
  colors[i3] = brightness;
  colors[i3 + 1] = brightness;
  colors[i3 + 2] = brightness;
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const starMaterial = new THREE.PointsMaterial({
  size: 1.5,
  vertexColors: true,
  transparent: true,
  opacity: 0.8,
  sizeAttenuation: true
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

const accentStarGeometry = new THREE.BufferGeometry();
const accentStarCount = 200;
const accentPositions = new Float32Array(accentStarCount * 3);

for (let i = 0; i < accentStarCount; i++) {
  const i3 = i * 3;
  accentPositions[i3] = (Math.random() - 0.5) * 2000;
  accentPositions[i3 + 1] = (Math.random() - 0.5) * 2000;
  accentPositions[i3 + 2] = (Math.random() - 0.5) * 2000;
}

accentStarGeometry.setAttribute('position', new THREE.BufferAttribute(accentPositions, 3));

const accentStarMaterial = new THREE.PointsMaterial({
  size: 2.5,
  color: 0xBC3040,
  transparent: true,
  opacity: 0.9,
  sizeAttenuation: true
});

const accentStars = new THREE.Points(accentStarGeometry, accentStarMaterial);
scene.add(accentStars);

camera.position.z = 500;

let scrollY = 0;
let targetScrollY = 0;

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
});

function animateStars() {
  targetScrollY += (scrollY - targetScrollY) * 0.05;

  stars.rotation.y = targetScrollY * 0.0002;
  stars.rotation.x = targetScrollY * 0.0001;

  accentStars.rotation.y = targetScrollY * 0.00015;
  accentStars.rotation.x = targetScrollY * 0.00005;

  accentStars.position.z = (targetScrollY * 0.3) % 200;

  const positions = stars.geometry.attributes.position.array;
  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    if (positions[i3 + 1] < -1000) {
      positions[i3 + 1] = 1000;
    }
  }
  stars.geometry.attributes.position.needsUpdate = true;
}

function animate() {
  requestAnimationFrame(animate);
  animateStars();
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

const REPO_LIST = [
  'My-Managed-Kubernetes',
  'nixcfg',
  'justalternate.com',
  'justnixvim'
];

const LANGUAGE_COLORS = {
  'JavaScript': '#f1e05a',
  'TypeScript': '#3178c6',
  'Python': '#3572A5',
  'Go': '#00ADD8',
  'Java': '#b07219',
  'C': '#555555',
  'Shell': '#89e051',
  'OCaml': '#EF7A08',
  'PHP': '#4F5D95',
  'Scala': '#c22d40',
  'Nix': '#7e7eff',
  'HTML': '#e34c26',
  'CSS': '#563d7c',
  'Vue': '#41b883',
  'Ruby': '#701516',
  'Rust': '#dea584',
  'Java': '#b07219'
};

async function fetchRepoData(repoName) {
  try {
    const response = await fetch(`https://api.github.com/repos/JustAlternate/${repoName}`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch repo ${repoName}:`, error);
    return null;
  }
}

function updateRepoCard(repoData) {
  if (!repoData) return;

  const card = document.querySelector(`[data-repo="${repoData.name}"]`);
  if (!card) return;

  const nameEl = card.querySelector('.repo-name');
  const descEl = card.querySelector('.repo-description');
  const langNameEl = card.querySelector('.language-name');
  const langDotEl = card.querySelector('.language-dot');
  const starsEl = card.querySelector('.repo-stars');
  const forksEl = card.querySelector('.repo-forks');

  nameEl.textContent = repoData.name;
  descEl.textContent = repoData.description || 'No description available';

  const language = repoData.language || 'Other';
  langNameEl.textContent = language;
  const langColor = LANGUAGE_COLORS[language] || 'var(--accent)';
  langDotEl.style.backgroundColor = langColor;

  starsEl.textContent = `★ ${repoData.stargazers_count}`;
  const forkCountEl = forksEl.querySelector('.fork-count');
  if (forkCountEl) forkCountEl.textContent = repoData.forks_count;
}

async function initGitHubSection() {
  const promises = REPO_LIST.map(repo => fetchRepoData(repo));
  const results = await Promise.all(promises);

  results.forEach(data => {
    if (data) updateRepoCard(data);
  });

  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setFullYear(fromDate.getFullYear() - 1);
  const fromStr = fromDate.toISOString().split('T')[0];
  const toStr = toDate.toISOString().split('T')[0];

  const url = `https://github-contributions-api.deno.dev/JustAlternate.svg?from=${fromStr}&to=${toStr}&bg=1a1a1a&font-color=ffffff&no-legend=true`;

  try {
    const response = await fetch(url);
    let svgText = await response.text();

const customStyles = `
      #deno-github-contributions-graph .pixel {
        width: 10px;
        height: 10px;
        rx: 2px;
        ry: 2px;
        stroke: rgba(27,31,35,0.06);
        stroke-width: 2px;
      }
      #deno-github-contributions-graph text {
        font-family: monospace;
        font-size: 15px;
        fill: #a1a1aa;
      }
      #deno-github-contributions-graph .NONE { fill: #27272a; }
      #deno-github-contributions-graph .FIRST_QUARTILE { fill: rgba(188, 48, 64, 0.5); }
      #deno-github-contributions-graph .SECOND_QUARTILE { fill: rgba(188, 48, 64, 0.7); }
      #deno-github-contributions-graph .THIRD_QUARTILE { fill: rgba(188, 48, 64, 0.9); }
      #deno-github-contributions-graph .FOURTH_QUARTILE { fill: #BC3040; }
    `;

    svgText = svgText.replace(/<style>.*?<\/style>/s, `<style>${customStyles}</style>`);

    const container = document.getElementById('contributions-svg');
    container.innerHTML = svgText;

    const svg = container.querySelector('svg');
    if (svg) {
      svg.style.transform = 'scale(1.5)';
      svg.style.transformOrigin = 'top left';
      svg.style.width = '150%';
      svg.style.height = '150%';
    }

    document.getElementById('contributions-count').textContent = '';
  } catch (error) {
    console.error('Failed to load heatmap:', error);
    document.getElementById('contributions-count').textContent = 'Activity data unavailable';
  }
}

initGitHubSection();
