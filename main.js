(function ($) {
  "use strict";

  /* WOW Animation */
  new WOW().init();

  /* ================= CART ================= */
  $(".cart_link > a").on("click", function (e) {
    e.preventDefault();
    $(".mini_cart").addClass("active");
  });

  $(".mini_cart_close > a").on("click", function (e) {
    e.preventDefault();
    $(".mini_cart").removeClass("active");
  });

  /* ================= STICKY HEADER ================= */
  $(window).on("scroll", function () {
    if ($(this).scrollTop() < 100) {
      $(".sticky-header").removeClass("sticky");
    } else {
      $(".sticky-header").addClass("sticky");
    }
  });

  /* ================= BACKGROUND IMAGE ================= */
  $("[data-bgimg]").each(function () {
    $(this).css("background-image", "url(" + $(this).data("bgimg") + ")");
  });

  /* ================= SLIDER ================= */
  $(".slider_area").owlCarousel({
    animateOut: "fadeOut",
    autoplay: true,
    loop: true,
    nav: false,
    autoplayTimeout: 6000,
    items: 1,
    dots: true,
  });

  /* ================= PRODUCT COLUMN ================= */
  $(".product_column3").slick({
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 5,
    arrows: true,
    prevArrow: '<button class="prev_arrow"><i class="ion-chevron-left"></i></button>',
    nextArrow: '<button class="next_arrow"><i class="ion-chevron-right"></i></button>',
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 400, settings: { slidesToShow: 1 } },
    ],
  });

  /* ================= TOOLTIP ================= */
  $('[data-toggle="tooltip"]').tooltip();

  $(".action_links ul li a, .quick_button a").tooltip({
    placement: "top",
    container: "body",
  });

  /* ================= BLOG ================= */
  $(".blog_column3").owlCarousel({
    autoplay: true,
    loop: true,
    nav: true,
    autoplayTimeout: 5000,
    items: 3,
    margin: 30,
    dots: false,
    navText: [
      '<i class="ion-chevron-left"></i>',
      '<i class="ion-chevron-right"></i>',
    ],
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 },
    },
  });

  /* ================= PRODUCT NAV ================= */
  $(".product_navactive").owlCarousel({
    loop: true,
    nav: true,
    items: 4,
    dots: false,
    navText: [
      '<i class="ion-chevron-left"></i>',
      '<i class="ion-chevron-right"></i>',
    ],
    responsive: {
      0: { items: 1 },
      480: { items: 2 },
      768: { items: 3 },
      992: { items: 4 },
    },
  });

  $(".product_navactive a").on("click", function (e) {
    e.preventDefault();
    $(".product_navactive a").removeClass("active");
    $(this).addClass("active");
    $(".product-details-large .tab-pane").removeClass("active show");
    $($(this).attr("href")).addClass("active show");
  });

})(jQuery);


/* ======================================================
   🔥 FINAL SUBSCRIBE FIX – NO PAGE JUMP – FULL UX
====================================================== */
$(document).on("submit", "#subscribe_form", function (e) {
  e.preventDefault(); // 🚫 STOP page reload / top jump

  const $form = $(this);
  const $email = $form.find('input[type="email"]');
  const $btn = $form.find("button");

  if ($email.val().trim() === "") {
    alert("Boss email likho 😄");
    return;
  }

  // UX: subscribing
  $btn.prop("disabled", true).text("Subscribing...");

  setTimeout(function () {
    alert("Thanks boss! You are subscribed ✅");

    $btn.text("✔ Subscribed").addClass("subscribed");

    setTimeout(function () {
      $btn.prop("disabled", false).text("Subscribe");
      $btn.removeClass("subscribed");
      $form[0].reset();
    }, 2000);

  }, 1000);
});

// ===== Boss: Horizontal Product Carousel Fix =====
$(".product_column3").slick({
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 5,
    arrows: true,
    rows: 1,            // boss horizontal layout
    prevArrow:
      '<button class="prev_arrow"><i class="ion-chevron-left"></i></button>',
    nextArrow:
      '<button class="next_arrow"><i class="ion-chevron-right"></i></button>',
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 400, settings: { slidesToShow: 1 } }
    ],
});

$(".product_row1").slick({
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 5,
    arrows: true,
    rows: 1,            // boss horizontal layout
    prevArrow:
      '<button class="prev_arrow"><i class="ion-chevron-left"></i></button>',
    nextArrow:
      '<button class="next_arrow"><i class="ion-chevron-right"></i></button>',
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 400, settings: { slidesToShow: 1 } }
    ],
});