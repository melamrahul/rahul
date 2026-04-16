// ── PAGE NAVIGATION ──
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show selected page
  document.getElementById('page-' + pageId).classList.add('active');

  // Update nav active state
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });

  // Close mobile menu
  document.getElementById('navLinks').classList.remove('open');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  return false;
}

// ── HAMBURGER MENU ──
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Close menu on outside click
document.addEventListener('click', (e) => {
  const nav = document.getElementById('navbar');
  if (!nav.contains(e.target)) {
    document.getElementById('navLinks').classList.remove('open');
  }
});

// ── TASK / CERT CONTENT TOGGLE ──
function toggleTaskContent(el) {
  // el is the upload-area or cert-upload div
  const contentArea = el.nextElementSibling;
  if (!contentArea) return;

  const isOpen = contentArea.style.display === 'block';
  contentArea.style.display = isOpen ? 'none' : 'block';

  if (!isOpen) {
    const ta = contentArea.querySelector('textarea');
    if (ta) ta.focus();
  }
}

// ── CONTACT FORM SUBMIT ──
function handleSubmit() {
  const inputs = document.querySelectorAll('#page-contact .form-group input:not([readonly]), #page-contact .form-group textarea');
  let allFilled = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      allFilled = false;
      input.style.borderColor = 'rgba(255,100,100,0.5)';
      setTimeout(() => input.style.borderColor = '', 2000);
    }
  });

  if (allFilled) {
    const btn = document.querySelector('.submit-btn');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      inputs.forEach(i => i.value = '');
    }, 3000);
  }
}

// ── NAVBAR SCROLL SHADOW ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.boxShadow = window.scrollY > 20
    ? '0 4px 24px rgba(0,0,0,0.4)'
    : 'none';
});

// ── CARD ENTRANCE ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

function observeCards() {
  document.querySelectorAll('.task-card, .about-card, .cream-card, .cert-card, .tip-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.3s ease';
    observer.observe(card);
  });
}

// Run on page load and whenever page switches
document.addEventListener('DOMContentLoaded', observeCards);

// Re-observe when switching pages
const origShowPage = window.showPage;
window.showPage = function(pageId) {
  origShowPage(pageId);
  setTimeout(observeCards, 100);
};
