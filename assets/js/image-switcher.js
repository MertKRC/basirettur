document.addEventListener("DOMContentLoaded", function() {
    // Akordiyon butonları seçiliyor
    const buttons = document.querySelectorAll('.accordion-button');
  
    // Soldaki resim elementi
    const mainImage = document.getElementById('mainImage');
  
    // Her butona tıklama eventi ekle
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const target = button.textContent.trim();
  
        switch(target) {
          case 'Harem-i Şerif & Kâbe':
            mainImage.src = 'assets/images/hizmetler/hizmet-1.jpg';
            break;
          case 'Arafat & Mina':
            mainImage.src = 'assets/images/hizmetler/hizmet-2.jpg';
            break;
          case 'Hira & Sevr Mağarası':
            mainImage.src = 'assets/images/hizmetler/hizmet-3.jpg';
            break;
          case 'Cennetü’l-Muallâ':
            mainImage.src = 'assets/images/hizmetler/hizmet-4.jpg';
            break;
          case 'Bagaj Harici Zemzem':
            mainImage.src = 'assets/images/hizmetler/hizmet-5.jpg';
            break;
          case 'Mescid-i Nebevi':
            mainImage.src = 'assets/images/hizmetler/hizmet-6.jpg';
            break;
          case 'Uhud Şehitliği':
            mainImage.src = 'assets/images/hizmetler/hizmet-7.jpg';
            break;
          case 'Kuba Mescidi':
            mainImage.src = 'assets/images/hizmetler/hizmet-8.jpg';
            break;
          case 'Cennetü’l-Baki':
            mainImage.src = 'assets/images/hizmetler/hizmet-9.jpg';
            break;
          case 'Bedir Savaşı Alanı':
            mainImage.src = 'assets/images/hizmetler/hizmet-10.jpg';
            break;
          default:
            mainImage.src = 'assets/images/hizmet-1.jpg'; // varsayılan resim
        }
      });
    });
  });
  