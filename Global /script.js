const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show'); // toggles the display
});

document.addEventListener("DOMContentLoaded", function() {
  const goTopBtn = document.getElementById("goTopBtn");

  goTopBtn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
