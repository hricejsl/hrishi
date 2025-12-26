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
// ===== Boss-ready Compare Feature =====
(function() {
    const maxCompare = 3; // maximum products to compare
    let compareList = [];

    // function to create popup HTML
    function showComparePopup() {
        let popup = document.getElementById('compare_popup');
        if(!popup) {
            popup = document.createElement('div');
            popup.id = 'compare_popup';
            popup.style.position = 'fixed';
            popup.style.bottom = '20px';
            popup.style.right = '20px';
            popup.style.background = '#fff';
            popup.style.padding = '20px';
            popup.style.border = '1px solid #ccc';
            popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
            popup.style.zIndex = '9999';
            popup.style.maxWidth = '400px';
            popup.style.display = 'none';
            document.body.appendChild(popup);
        }

        // generate HTML content
        let html = '<h4>Compare Products</h4><ul style="list-style:none;padding:0;">';
        compareList.forEach(item => {
            html += `<li>${item.name} - Rs.${item.price}</li>`;
        });
        html += '</ul>';
        html += '<button id="clear_compare" style="margin-top:10px;">Clear</button>';
        popup.innerHTML = html;
        popup.style.display = 'block';

        // clear button
        document.getElementById('clear_compare').addEventListener('click', function(){
            compareList = [];
            popup.style.display = 'none';
        });
    }

    // handle compare icon click
    document.querySelectorAll('.compare-icon').forEach(icon => {
        icon.addEventListener('click', function(e){
            e.preventDefault();
            const product = this.closest('.single_product');
            const name = product.querySelector('h3 a').textContent;
            const price = product.querySelector('.current_price').textContent;

            // avoid duplicates
            if(compareList.find(p => p.name === name)) {
                alert('Boss! This product is already in compare list 😎');
                return;
            }

            if(compareList.length >= maxCompare) {
                alert('Boss! Max 3 products can be compared at once.');
                return;
            }

            compareList.push({name, price});
            showComparePopup();
        });
    });
})();
// Quick View JS
$(document).ready(function() {
  $(".quick_button a").on("click", function(e) {
    e.preventDefault();
    
    var product = $(this).closest(".single_product");

    var img = product.find(".primary_img img").attr("src");
    var title = product.find(".product_content h3 a").text();
    var desc = product.find(".product_desc p").text();
    var price = product.find(".price_box").html();

    $("#quickview_image").attr("src", img);
    $("#quickview_title").text(title);
    $("#quickview_desc").text(desc);
    $("#quickview_price").html(price);

    $("#quickview_modal").modal("show");
  });
});

document.querySelectorAll('.quick_button a').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();

    const product = this.closest('.single_product');
    const img = product.querySelector('.primary_img img').src;
    const title = product.querySelector('.product_content h3 a').textContent;
    const desc = product.querySelector('.product_desc p') ? product.querySelector('.product_desc p').textContent : '';
    const price = product.querySelector('.price_box') ? product.querySelector('.price_box').innerHTML : '';

    // Set modal content
    document.getElementById('quickview_image').src = img;
    document.getElementById('quickview_title').textContent = title;
    document.getElementById('quickview_desc').textContent = desc;
    document.getElementById('quickview_price').innerHTML = price;

    // Show modal
    $('#quickview_modal').modal('show');
  });
});
let compareList = [];

function addToCompare(product) {
  // Check duplicate
  if(compareList.find(p => p.id === product.id)) {
    alert('Product already in compare!');
    return;
  }

  compareList.push(product);
  alert('Product added to compare!');

  if(compareList.length > 1) {
    showCompareModal();
  }
}

function showCompareModal() {
  const container = document.getElementById('compare_table');
  container.innerHTML = '';

  compareList.forEach(p => {
    const card = document.createElement('div');
    card.style.minWidth = '200px';
    card.style.border = '1px solid #ccc';
    card.style.padding = '10px';
    card.style.textAlign = 'center';

    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" style="width:100%; height:auto; margin-bottom:5px;">
      <h6>${p.title}</h6>
      <p>${p.price}</p>
      <button class="btn btn-sm btn-danger remove-compare" data-id="${p.id}">Remove</button>
    `;
    container.appendChild(card);
  });

  // Add remove buttons
  container.querySelectorAll('.remove-compare').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = btn.getAttribute('data-id');
      compareList = compareList.filter(p => p.id != id);
      showCompareModal(); // refresh modal
    });
  });

  // Show modal
  const compareModal = new bootstrap.Modal(document.getElementById('compare_modal'));
  compareModal.show();
}

// Clear all button
document.getElementById('clear_compare').addEventListener('click', () => {
  compareList = [];
  showCompareModal();
});

document.querySelectorAll('.compare-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const product = {
      id: btn.getAttribute('data-id'),
      img: btn.getAttribute('data-img'),
      title: btn.getAttribute('data-title'),
      price: btn.getAttribute('data-price')
    };
    addToCompare(product);
  });
});
const compareProducts = []; // selected products

// Add click on compare buttons
document.querySelectorAll('.compare-btn').forEach(btn => {
  btn.addEventListener('click', function(e){
    e.preventDefault(); // boss, page top scroll rok diya

    const product = {
      id: this.getAttribute('data-id'),
      img: this.getAttribute('data-img'),
      title: this.getAttribute('data-title'),
      price: this.getAttribute('data-price')
    };

    // Check duplicates
    if(compareProducts.find(p => p.id === product.id)) {
      alert('Boss! Ye product already add ho chuka hai.');
      return;
    }

    compareProducts.push(product);
    updateCompareModal();
    openCompareModal();
  });
});

// Update modal content
function updateCompareModal() {
  const container = document.querySelector('.compare_items');
  container.innerHTML = ''; // clear
  compareProducts.forEach(p => {
    container.innerHTML += `
      <div class="compare_item">
        <img src="${p.img}" alt="${p.title}">
        <h4>${p.title}</h4>
        <p>${p.price}</p>
      </div>
    `;
  });
}

// Open modal
function openCompareModal() {
  document.getElementById('compare_modal').style.display = 'flex';
}

// Close modal
document.querySelector('.close_compare').addEventListener('click', function(){
  document.getElementById('compare_modal').style.display = 'none';
});