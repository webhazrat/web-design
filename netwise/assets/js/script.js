(function ($) {
  "use script";

  // Navigation scroll effect
  $(window).on("scroll", function () {
    let scroll = $(window).scrollTop();
    if (scroll > 120) {
      $(".header-section").addClass("sticky-menu");
    } else {
      $(".header-section").removeClass("sticky-menu");
    }
  });

  // Mobile navigation
  $(".mobile-navigation .nav-link").on("click", function (e) {
    e.preventDefault();
    $(this).closest(".dropdown").children(".dropdown-menu").slideToggle(300);
    $(".mobile-navigation .dropdown-menu").not($(this).next("ul")).slideUp(300);
    $(this).children("i").toggleClass("transform");
    $(".mobile-navigation .nav-link i")
      .not($(this).children("i"))
      .removeClass("transform");
  });

  // Services slider
  $(".services-slick-slider").slick({
    infinite: true,
    slidesToShow: 3,
    arrows: true,
    // autoplay: true,
    prevArrow: '<i class="fa-solid arrow arrow-prev fa-arrow-left"></i>',
    nextArrow: '<i class="fa-solid arrow arrow-next fa-arrow-right"></i>',
  });

  // Odometer initialization
  $(document).ready(function () {
    $(".counter-items").appear(function (e) {
      var odo = $(".odometer");
      odo.each(function () {
        $(this).html(0);
        var countNumber = $(this).data("count");
        $(this).html(countNumber);
      });
    });
  });

  // Team items and images covert to gsap array
  const teamItems = gsap.utils.toArray(".team-item");
  const hoverTeamImage = gsap.utils.toArray(".hover-image");

  // Function to move the object
  function moveObject(event, item) {
    const objectBox = item.getBoundingClientRect();
    const dx = (event.clientX - objectBox.x - objectBox.width / 1) / 3;
    const dy = (event.clientY - objectBox.y - objectBox.height / 1) / 10;
    hoverTeamImage.forEach(function (image) {
      gsap.to(image, {
        x: dx,
        y: dy,
      });
    });
  }

  // Mouse over and leave animation
  if (window.innerWidth > 767) {
    teamItems.forEach(function (item, i) {
      item.addEventListener("mousemove", function (event) {
        moveObject(event, item);
      });

      item.addEventListener("mouseleave", function () {
        hoverTeamImage.forEach(function (image) {
          gsap.to(image, {
            x: 0,
            y: 0,
          });
        });
      });
    });
  }

  // Team active class add and remove
  $(".team-item").hover(function () {
    $(".team-item").removeClass("active");
    $(this).addClass("active");
  });

  // Testimonial slider
  $(".testimonial-slider").slick({
    arrows: false,
    autoplay: true,
  });

  document.addEventListener("DOMContentLoaded", function () {
    // gsap split text animation implementation
    let st = $(".split-text");
    if (st.length > 0) {
      gsap.registerPlugin(SplitText);
      st.each(function (index, el) {
        el.split = new SplitText(el, {
          type: "lines,words,chars",
          linesClass: "nt-split-line",
        });

        gsap.set(el, {
          perspective: 400,
        });

        if ($(el).hasClass("right")) {
          gsap.set(el.split.chars, {
            opacity: 0,
            x: "50",
            ease: "Back.easeOut",
          });
        }

        el.anim = gsap.to(el.split.chars, {
          scrollTrigger: {
            trigger: el,
            start: "Top 90%",
          },
          x: "0",
          y: "0",
          rotateX: "0",
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.02,
        });
      });
    }

    // Image reveal animation implemetation
    let revealItems = document.querySelectorAll(".reveal");
    revealItems.forEach(function (item) {
      console.log({ item });
      let image = item.querySelector("img");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          toggleActions: "play none none none",
        },
      });

      tl.set(item, {
        autoAlpha: 1,
      });

      if (item.classList.contains("zoom-out")) {
        // Zoom-out effect
        tl.from(image, 1.5, {
          scale: 1.4,
          ease: Power2.out,
        });
      } else if (
        item.classList.contains("left") ||
        item.classList.contains("right")
      ) {
        let xPercent = item.classList.contains("left") ? -100 : 100;
        tl.from(item, 1.5, {
          xPercent,
          ease: Power2.out,
        });
        tl.from(image, 1.5, {
          xPercent: -xPercent,
          scale: 1,
          delay: -1.5,
          ease: Power2.out,
        });
      }
    });
  });
})(jQuery);
