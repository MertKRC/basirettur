// copyright.js
const startYear = 2025;
const currentYear = new Date().getFullYear();
const yearText = currentYear > startYear ? `${startYear} - ${currentYear}` : `${startYear}`;
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('copyright-year');
  if (el) {
    el.textContent = yearText;
  }
});
