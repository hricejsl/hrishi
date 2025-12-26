(function ($) {
  "use strict";

  /* ================= WOW ================= */
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
    if ($(this).scrollTop() > 100) {
      $(".sticky-header").addClass("sticky");
    } else {
      $(".sticky-header").removeClass("sticky");
    }
  });

  /* ================= BACKGROUND IMAGE ================= */
  $("[data-bgimg]").each(function () {
    $(this).css("background-image", "url(" + $(this).data("bgimg") + ")");
  });

  /* ================= HERO SLIDER ================= */
  $(".slider_area").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    dots: true,
    animateOut: "fadeOut",
  });

  /* ================= PRODUCT SLIDER ================= */
  $(".product_column3").slick({
    slidesToShow: 5,
    arrows: true,
    prevArrow:
      '<button class="prev_arrow"><i class="ion-chevron-left"></i></button>',
    nextArrow:
      '<button class="next_arrow"><i class="ion-chevron-right"></i></button>',
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  });

  /* ================= BLOG SLIDER ================= */
  $(".blog_column3").owlCarousel({
    items: 3,
    loop: true,
    autoplay: true,
    margin: 30,
    nav: true,
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

  /* ================= TOOLTIP ================= */
  $('[data-toggle="tooltip"]').tooltip();

  /* ================= QUICK VIEW ================= */
  $(".quick_button a").on("click", function (e) {
    e.preventDefault();

    const product = $(this).closest(".single_product");

    $("#quickview_image").attr(
      "src",
      product.find(".primary_img img").attr("src")
    );
    $("#quickview_title").text(product.find("h3 a").text());
    $("#quickview_price").html(product.find(".price_box").html());

    $("#quickview_modal").modal("show");
  });

  /* ================= SUBSCRIBE ================= */
  $("#subscribe_form").on("submit", function (e) {
    e.preventDefault();
    alert("Thanks boss! You are subscribed ✅");
    this.reset();
  });

  /* ================= PREVENT # SCROLL ================= */
  $('a[href="#"]').on("click", function (e) {
    e.preventDefault();
  });

  /* ================= DISABLE COMPARE (SAFE) ================= */
  $('.action_links a[title="Compare"]').on("click", function (e) {
    e.preventDefault();
    alert("Boss 😄 Compare feature baad me add karenge");
  });

})(jQuery);