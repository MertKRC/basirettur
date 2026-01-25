// preloader.js

(function() {
  // Sayfa tamamen yüklendiğinde preloader kapat
  window.addEventListener('load', function() {
    var preloader = document.getElementById('js-preloader');
    if(preloader) {
      preloader.classList.add('loaded');
    }
  });

  // Yazı değişimi ve fade efekti
  var texts = [
    "Sizin için en uygun paketlerimizi düzenliyoruz.",
    "Gezilerinizi kolayca planlıyoruz.",
    "En iyi fiyatları sizin için seçiyoruz.",
    "Unutulmaz deneyimler için hazırlanıyoruz."
  ];

  var index = 0;
  var textElement = document.getElementById("preloader-text");

  if(textElement) {
    setInterval(function() {
      // Fade out
      textElement.style.opacity = 0;

      setTimeout(function() {
        index = (index + 1) % texts.length;
        textElement.textContent = texts[index];
        // Fade in
        textElement.style.opacity = 1;
      }, 500); // 0.5s fade out süresi
    }, 3000);
  }
})();
