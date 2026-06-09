// Function to load a section dynamically with transition animations
async function loadSection(id, file) {
  const container = document.getElementById(id);
  try {
    // Adding timestamp to force browser to skip cache during local development
    const response = await fetch(`sections/${file}?v=${new Date().getTime()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();
    
    // Add a small artificial delay so the skeleton transition is smooth and visible
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Replace content with animation wrapper
    container.innerHTML = `<div class="section-content animate-in">${html}</div>`;
  } catch (err) {
    console.error(`Failed to load section ${file}:`, err);
    container.innerHTML = `
      <div class="section-error animate-in">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="error-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <p>Error loading section ${file}. Please refresh the page.</p>
      </div>`;
  }
}

// Active Nav highlight using IntersectionObserver
function setupScrollObserver() {
  const sections = document.querySelectorAll('.portfolio-section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const options = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies the active view area
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, options);
  
  sections.forEach(section => observer.observe(section));
}

// Light/Dark Theme management
function setupTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  
  // Check localStorage or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  
  if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
    document.body.classList.add('light-mode');
  }
  
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
  });
}

// Main initialization function
async function init() {
  // Setup theme immediately to avoid flash of dark/light theme
  setupTheme();
  
  // Load sections sequentially to maintain clean transition order
  await loadSection('experience-container', 'experience.html');
  await loadSection('projects-container', 'projects.html');
  await loadSection('skills-container', 'skills.html');
  await loadSection('education-container', 'education.html');
  
  // Setup scroll observer once all sections are rendered
  setupScrollObserver();
}

init();

// Download Resume PDF
function downloadPDF() {
  const btn = document.querySelector('.dl-btn');
  const originalText = btn.innerHTML;
  btn.innerHTML = `
    <svg class="animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 15px; height: 15px; display: inline-block; animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
    Preparing…
  `;
  btn.disabled = true;
  
  // Give time for loading animations or any other UI states to settle
  setTimeout(() => {
    window.print();
    btn.innerHTML = originalText;
    btn.disabled = false;
  }, 600);
}
