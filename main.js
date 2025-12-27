(function ($) {
  "use strict";

  /* ================== WOW Animation ================== */
  new WOW().init();

  /* ================== Mini Cart ================== */
  $(".cart_link > a").on("click", function (e) {
    e.preventDefault();
    $(".mini_cart").addClass("active");
  });

  $(".mini_cart_close > a").on("click", function (e) {
    e.preventDefault();
    $(".mini_cart").removeClass("active");
  });

  /* ================== Modal Section ================== */
  $(".open_modal").on("click", function (e) {
    e.preventDefault();
    $(".modal_area").addClass("active");
  });

  $(".modal_close").on("click", function (e) {
    e.preventDefault();
    $(".modal_area").removeClass("active");
  });

  /* ================== Header Submenu Click ================== */
  $("nav.main_menu ul li.has-submenu > a").on("click", function(e) {
    e.preventDefault();
    var $submenu = $(this).siblings(".submenu");
    $(".submenu").not($submenu).slideUp();
    $submenu.slideToggle();
  });

  /* ================== Sticky Header ================== */
  var header = $(".header_bottom");
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 50) {
      header.addClass("sticky");
    } else {
      header.removeClass("sticky");
    }
  });

  /* ================== Background Images ================== */
  $("[data-bgimg]").each(function () {
    $(this).css("background-image", "url(" + $(this).data("bgimg") + ")");
  });

  /* ================== Hero Slider ================== */
  $(".slider_area").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    dots: true,
    animateOut: "fadeOut",
  });

  /* ================== Product Slider ================== */
  $(".product_column3").slick({
    slidesToShow: 5,
    arrows: true,
    prevArrow: '<button class="prev_arrow"><i class="ion-chevron-left"></i></button>',
    nextArrow: '<button class="next_arrow"><i class="ion-chevron-right"></i></button>',
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  });

  /* ================== Blog Slider ================== */
  $(".blog_column3").owlCarousel({
    items: 3,
    loop: true,
    autoplay: true,
    margin: 30,
    nav: true,
    dots: false,
    navText: ['<i class="ion-chevron-left"></i>', '<i class="ion-chevron-right"></i>'],
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 },
    },
  });

  /* ================== Tooltip ================== */
  $('[data-toggle="tooltip"]').tooltip();

  /* ================== Quick View ================== */
  $(".quick_button a").on("click", function (e) {
    e.preventDefault();
    const product = $(this).closest(".single_product");
    $("#quickview_image").attr("src", product.find(".primary_img img").attr("src"));
    $("#quickview_title").text(product.find("h3 a").text());
    $("#quickview_price").html(product.find(".price_box").html());
    $("#quickview_modal").modal("show");
  });

  /* ================== Subscribe ================== */
  $("#subscribe_form").on("submit", function (e) {
    e.preventDefault();
    alert("Thanks boss! You are subscribed ✅");
    this.reset();
  });

  /* ================== Prevent # Scroll ================== */
  $('a[href="#"]').on("click", function (e) {
    e.preventDefault();
  });

  /* ================== Disable Compare safely ================== */
  $('.action_links a[title="Compare"]').on("click", function (e) {
    e.preventDefault();
    alert("Boss 😄 Compare feature baad me add karenge");
  });

})(jQuery);