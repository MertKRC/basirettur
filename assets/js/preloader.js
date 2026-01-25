// preloader.js (Beyaz arka plan, kapanma devre dışı)
(function() {
  var textElement = document.getElementById("preloader-text");
  var progressBar = document.getElementById("progress-bar");
  var progressPercent = document.getElementById("progress-percent");

  var texts = [
    "Niyet edildi.",
    "Hazırlanıyoruz.",
    "Yola çıkıyoruz.",
    "Basiret Turizm ile sünnet üzere Umre..."
  ];

  var index = 0;

  // Metin değişimi
  if(textElement) {
    setInterval(function() {
      textElement.style.opacity = 0;
      setTimeout(function() {
        index = (index + 1) % texts.length;
        textElement.textContent = texts[index];
        textElement.style.opacity = 1;
      }, 500);
    }, 3000);
  }

  // Gerçek yüklemeye göre progress (kapanma devre dışı)
  var simulateProgress = 0;
  var updateProgress = setInterval(function() {
    var loaded = 0;
    if(document.readyState === "loading") loaded = 40;
    else if(document.readyState === "interactive") loaded = 70;
    else if(document.readyState === "complete") loaded = 100;

    if(simulateProgress < loaded) simulateProgress++;
    
    if(progressBar) progressBar.style.width = simulateProgress + '%';
    if(progressPercent) progressPercent.textContent = simulateProgress + '%';

    // Kapanma devre dışı
    // if(simulateProgress >= 100 && preloader) preloader.classList.add('loaded');
  }, 20);
})();
