/**
 * Switch tabs between Adobe Illustrator and Adobe Photoshop portfolio grids
 */
function switchTab(tab) {
    const illGal = document.getElementById('gallery-illustrator');
    const psGal = document.getElementById('gallery-photoshop');
    const illBtn = document.getElementById('tab-illustrator');
    const psBtn = document.getElementById('tab-photoshop');

    if (tab === 'illustrator') {
        illGal.classList.remove('hidden');
        psGal.classList.add('hidden');
        illBtn.className = "px-6 py-2.5 rounded-xl font-semibold border transition border-sky-500 bg-sky-500 text-white shadow-lg shadow-sky-500/20";
        psBtn.className = "px-6 py-2.5 rounded-xl font-semibold border border-slate-700 bg-slate-800 text-slate-300 hover:border-sky-500 transition";
    } else {
        psGal.classList.remove('hidden');
        illGal.classList.add('hidden');
        psBtn.className = "px-6 py-2.5 rounded-xl font-semibold border transition border-sky-500 bg-sky-500 text-white shadow-lg shadow-sky-500/20";
        illBtn.className = "px-6 py-2.5 rounded-xl font-semibold border border-slate-700 bg-slate-800 text-slate-300 hover:border-sky-500 transition";
    }
}

/**
 * Universal PDF Modal Controls (removes editing toolbar & shrinks to fit screen)
 */
function openPdfModal(pdfPath, title) {
    // Check if user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

    if (isMobile) {
        // Direct open triggers mobile browser's native, high-speed, pinch-to-zoom PDF viewer
        window.open(pdfPath, '_blank');
    } else {
        // Desktop iframe modal view
        const modal = document.getElementById('pdfModal');
        const frame = document.getElementById('pdfFrame');
        const titleElem = document.getElementById('pdfTitle');

        if (titleElem) titleElem.textContent = title || 'Document Preview';
        if (frame) frame.src = pdfPath;
        if (modal) modal.classList.remove('hidden');
    }
}

function closePdfModal() {
    const modal = document.getElementById('pdfModal');
    const frame = document.getElementById('pdfFrame');
    
    if (modal) modal.classList.add('hidden');
    if (frame) frame.src = ''; // Clear iframe source to prevent lag
}

/**
 * Profile Picture Lightbox Modal Controls (Shrink to fit responsive)
 */
function openImageModal(imgSrc) {
    document.getElementById('imageModalSrc').src = imgSrc;
    document.getElementById('imageModal').classList.remove('hidden');
}

function closeImageModal() {
    document.getElementById('imageModal').classList.add('hidden');
    document.getElementById('imageModalSrc').src = '';
}

// Close modals when pressing the Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closePdfModal();
        closeImageModal();
    }
});

// Click on profile picture to enlarge
document.addEventListener('DOMContentLoaded', function () {
    const profileImg = document.querySelector('.profile-pic');
    if (profileImg) {
        profileImg.addEventListener('click', function () {
            openImageModal(this.src);
        });
    }
});
// Add or replace at the bottom of js/main.js
function openPdfModal(pdfPath, title) {
    window.open(pdfPath, '_blank');
}
// Theme Toggle & LocalStorage Logic
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeUI(newTheme);
}

function updateThemeUI(theme) {
    const icon = document.getElementById('themeIcon');
    const text = document.getElementById('themeText');
    
    if (icon && text) {
        if (theme === 'light') {
            icon.className = 'fa-solid fa-sun text-amber-500';
            text.textContent = 'Light Mode';
        } else {
            icon.className = 'fa-solid fa-moon text-indigo-400';
            text.textContent = 'Dark Mode';
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initTheme);
const canvas = document.getElementById('swarmCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = canvas.parentElement.clientWidth;
let height = canvas.height = canvas.parentElement.clientHeight;

let particles = [];
const mouse = { x: null, y: null, radius: 100 };

// Capture mouse position for particle interaction
window.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

window.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

window.addEventListener('resize', () => {
  width = canvas.width = canvas.parentElement.clientWidth;
  height = canvas.height = canvas.parentElement.clientHeight;
  initSwarm();
});

class SwarmParticle {
  constructor(targetX, targetY) {
    // Initial random explosion / scattered starting coordinates
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    
    // Target coordinate (where particle rebuilds the shape)
    this.targetX = targetX;
    this.targetY = targetY;
    
    this.size = Math.random() * 2 + 1.5;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.ease = 0.05; // Swarm attraction speed
    this.friction = 0.9;
  }

  draw() {
    ctx.fillStyle = '#6366f1'; // Premium Accent Color (Indigo / Cyber Cyan)
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    // Calculate distance to mouse cursor for swarm disturbance
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (mouse.x !== null && distance < mouse.radius) {
      // Repel/Disperse when mouse hovers over particles
      let force = (mouse.radius - distance) / mouse.radius;
      let angle = Math.atan2(dy, dx);
      this.vx -= Math.cos(angle) * force * 5;
      this.vy -= Math.sin(angle) * force * 5;
    } else {
      // Rebuild / Swarm towards target position
      let targetDx = this.targetX - this.x;
      let targetDy = this.targetY - this.y;
      this.vx += targetDx * this.ease;
      this.vy += targetDy * this.ease;
    }

    // Apply friction & update position
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.x += this.vx;
    this.y += this.vy;

    this.draw();
  }
}

function initSwarm() {
  particles = [];
  
  // Render temporary hidden text onto canvas to sample pixel targets
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('VIVEK KUMAR', width / 2, height / 2);

  // Scan pixel data to generate swarm target points
  const imgData = ctx.getImageData(0, 0, width, height);
  ctx.clearRect(0, 0, width, height); // Clear temporary text

  // Sample every 4th pixel for performance optimization
  for (let y = 0; y < height; y += 4) {
    for (let x = 0; x < width; x += 4) {
      const alphaIndex = (y * width + x) * 4 + 3;
      if (imgData.data[alphaIndex] > 128) {
        particles.push(new SwarmParticle(x, y));
      }
    }
  }
}

function animateSwarm() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
  }
  requestAnimationFrame(animateSwarm);
}

// Start animation sequence
initSwarm();
animateSwarm();
// ==========================================
// FULL-WEBSITE INTERACTIVE SWARM EFFECT
// ==========================================
(function initGlobalSwarm() {
    const canvas = document.getElementById('swarmCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = 75; // Adjust count for performance & density
    const mouse = { x: null, y: null, radius: 150 };

    // Track mouse position across the entire page
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    class GlobalParticle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.baseX = this.x;
            this.baseY = this.y;
            this.size = Math.random() * 2 + 1;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            // Colors matching your portfolio theme (Indigo / Pink / Gold)
            const colors = ['#6366F1', '#EC4899', '#FBBF24', '#38BDF8'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.ease = 0.05;
            this.friction = 0.92;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            ctx.shadowBlur = 0; // Reset blur for optimal performance
        }

        update() {
            // Check distance to mouse for swarm interaction
            if (mouse.x !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    // Swarm towards the cursor when close
                    let force = (mouse.radius - distance) / mouse.radius;
                    let angle = Math.atan2(dy, dx);
                    this.vx += Math.cos(angle) * force * 1.2;
                    this.vy += Math.sin(angle) * force * 1.2;
                }
            }

            // Return towards original ambient path (Rebuild behavior)
            let homeDx = this.baseX - this.x;
            let homeDy = this.baseY - this.y;
            this.vx += homeDx * 0.001;
            this.vy += homeDy * 0.001;

            // Apply friction & movement
            this.vx *= this.friction;
            this.vy *= this.friction;
            this.x += this.vx;
            this.y += this.vy;

            // Wrap around screen boundaries
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;

            this.draw();
        }
    }

    // Initialize full-screen swarm particle cluster
    for (let i = 0; i < particleCount; i++) {
        particles.push(new GlobalParticle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }
        requestAnimationFrame(animate);
    }

    animate();
})();