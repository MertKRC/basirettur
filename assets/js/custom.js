(function ($) {
	
	"use strict";

	// Page loading animation
	$(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });


	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	})

	$('.owl-banner').owlCarousel({
	  center: true,
      items:1,
      loop:true,
      nav: true,
	  dots:true,
	  navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
      margin:30,
      responsive:{
        992:{
            items:1
        },
		1200:{
			items:1
		}
      }
	});

	var width = $(window).width();
		$(window).resize(function() {
		if (width > 767 && $(window).width() < 767) {
			location.reload();
		}
		else if (width < 767 && $(window).width() > 767) {
			location.reload();
		}
	})

	const elem = document.querySelector('.properties-box');
	const filtersElem = document.querySelector('.properties-filter');
	if (elem) {
		const rdn_events_list = new Isotope(elem, {
			itemSelector: '.properties-items',
			layoutMode: 'masonry'
		});
		if (filtersElem) {
			filtersElem.addEventListener('click', function(event) {
				if (!matchesSelector(event.target, 'a')) {
					return;
				}
				const filterValue = event.target.getAttribute('data-filter');
				rdn_events_list.arrange({
					filter: filterValue
				});
				filtersElem.querySelector('.is_active').classList.remove('is_active');
				event.target.classList.add('is_active');
				event.preventDefault();
			});
		}
	}


	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});
    


})(window.jQuery);

/* =========================================================
   GENEL JS DOSYASI
   - Scroll animasyonları
   - Accordion
   - Sosyal medya popup
   - Reels slider
   - Mobil menü davranışları
   ========================================================= */


/* =========================================================
   1️⃣ UMRE ADIMLARI
   Scroll ile kartları görünür yapma
   ========================================================= */
const umreCards = document.querySelectorAll('.umre-card');

if (umreCards.length > 0) {
  const umreObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        umreObserver.unobserve(entry.target); // Tekrar tetiklenmesin
      }
    });
  }, { threshold: 0.2 });

  umreCards.forEach(card => umreObserver.observe(card));
}


/* =========================================================
   2️⃣ SSS (FAQ) ACCORDION
   - İlk soru default açık
   - Aynı anda sadece 1 soru açık
   ========================================================= */
const sssCards = document.querySelectorAll(".sss-card");

if (sssCards.length > 0) {

  // İlk kartı default açık yap
  sssCards[0].classList.add("active");

  sssCards.forEach(card => {
    const button = card.querySelector(".sss-question");

    if (!button) return;

    button.addEventListener("click", () => {

      // Zaten açıksa kapat
      if (card.classList.contains("active")) {
        card.classList.remove("active");
        return;
      }

      // Diğer tüm kartları kapat
      sssCards.forEach(other => other.classList.remove("active"));

      // Tıklanan kartı aç
      card.classList.add("active");
    });
  });
}


/* =========================================================
   3️⃣ SOSYAL MEDYA POPUP
   - Sayfa %60 scroll olunca çıkar
   - Sadece 1 kere gösterilir
   - X ve ESC ile kapanır
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  const popupOverlay = document.getElementById("socialPopup");
  const popupClose = document.getElementById("popupClose");

  if (!popupOverlay || !popupClose) return;

  let popupShown = false;

  function checkScrollPercentage() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (scrollPercent >= 60 && !popupShown) {
      popupOverlay.style.display = "block";
      popupShown = true;

      // Popup açıldıktan sonra scroll dinleyicisini kapat
      window.removeEventListener("scroll", checkScrollPercentage);
    }
  }

  window.addEventListener("scroll", checkScrollPercentage);

  // X ile kapatma
  popupClose.addEventListener("click", () => {
    popupOverlay.style.display = "none";
  });

  // ESC ile kapatma
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      popupOverlay.style.display = "none";
    }
  });
});


/* =========================================================
   4️⃣ INSTAGRAM REELS / HIGHLIGHTS SLIDER
   - Otomatik akar
   - Mouse ile sürüklenebilir
   - Ortadaki item "active"
   - Görünürken çalışır
   ========================================================= */
(() => {
  const wrapper = document.getElementById("reelsWrapper");
  const track = document.getElementById("reelsTrack");

  if (!wrapper || !track) return;

  const items = [...track.children];
  let x = 0;
  let velocity = 0;
  let isDragging = false;
  let lastX = 0;
  let auto = true;
  let raf = null;

  const GAP = 28;
  const itemW = () => items[0].offsetWidth + GAP;
  const totalW = () => itemW() * items.length;

  function resetPosition() {
    if (x <= -totalW()) x += totalW();
    if (x > 0) x -= totalW();
  }

  function setActiveItem() {
    const center = Math.abs(x) + wrapper.offsetWidth / 2;
    const index = Math.floor(center / itemW()) % items.length;

    items.forEach((el, i) =>
      el.classList.toggle("active", i === index)
    );
  }

  function animationLoop() {
    if (auto && !isDragging) x -= 0.5;

    x += velocity;
    velocity *= 0.85;

    resetPosition();
    track.style.transform = `translate3d(${x}px, 0, 0)`;
    setActiveItem();

    raf = requestAnimationFrame(animationLoop);
  }

  function dragStart(clientX) {
    isDragging = true;
    lastX = clientX;
    velocity = 0;
  }

  function dragMove(clientX) {
    if (!isDragging) return;
    const delta = clientX - lastX;
    x += delta;
    velocity = delta * 0.3;
    lastX = clientX;
  }

  function dragEnd() {
    isDragging = false;
  }

  wrapper.addEventListener("mousedown", e => dragStart(e.clientX));
  window.addEventListener("mousemove", e => dragMove(e.clientX));
  window.addEventListener("mouseup", dragEnd);

  wrapper.addEventListener("mouseenter", () => auto = false);
  wrapper.addEventListener("mouseleave", () => auto = true);

  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !raf) {
      animationLoop();
    } else {
      cancelAnimationFrame(raf);
      raf = null;
    }
  }, { threshold: 0.4 }).observe(wrapper);
})();


/* =========================================================
   5️⃣ MOBİL MENÜ
   - Menü linkine basınca menüyü kapat
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  const menuTrigger = document.querySelector(".menu-trigger");
  const nav = document.querySelector(".main-nav .nav");
  const navLinks = document.querySelectorAll(".main-nav .nav a");

  if (!menuTrigger || !navLinks.length) return;

  navLinks.forEach(link => {
    link.addEventListener("click", () => {

      // Menü açıksa kapat
      if (menuTrigger.classList.contains("active")) {
        menuTrigger.classList.remove("active");
        nav.style.display = "none";
      }

    });
  });
});
