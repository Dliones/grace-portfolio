// main.js - runs on every page: mobile menu, footer year, video helper

// 1. Mobile navigation toggle (event handling + DOM manipulation)
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });
}

// 2. Footer year updates itself (dynamic content)
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// 3. Greeting based on the visitor's local time (dynamic content, function + conditionals)
function getGreeting(hour) {
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
const greetingEl = document.getElementById('greeting');
if (greetingEl) {
  greetingEl.textContent = getGreeting(new Date().getHours()) + '! Welcome to my space.';
}

// 4. Transcript toggle for the intro video (accessibility)
const transcriptBtn = document.getElementById('transcriptBtn');
const transcript = document.getElementById('transcript');
if (transcriptBtn && transcript) {
  transcriptBtn.addEventListener('click', function () {
    const hidden = transcript.hidden;
    transcript.hidden = !hidden;
    transcriptBtn.textContent = hidden ? 'Hide transcript' : 'Read transcript';
  });
}

// 5. Open all external links in a new tab
const externalLinks = document.querySelectorAll('a[href^="http"]');

externalLinks.forEach(function (link) {
  if (link.hostname !== window.location.hostname) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
});