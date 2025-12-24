document.addEventListener("DOMContentLoaded", function() {

    const cartLink = document.querySelector(".cart_link > a");
    const cartPopup = document.querySelector(".mini_cart");
    const closeCart = document.querySelector(".mini_cart_close a");
    const cartItemsContainer = document.createElement("div");
    cartItemsContainer.id = "cartItems";
    const cartFooter = cartPopup.querySelector(".mini_cart_footer");
    const checkoutBtn = cartPopup.querySelector(".cart_button.checkout a");
    const emptyCartMessage = document.createElement("p");
    emptyCartMessage.textContent = "Your cart is empty.";
    emptyCartMessage.style.color = "#fff";
    emptyCartMessage.style.textAlign = "center";
    emptyCartMessage.style.marginTop = "50px";
    cartPopup.insertBefore(cartItemsContainer, cartFooter);
    cartPopup.insertBefore(emptyCartMessage, cartFooter);

    let cart = [];

    // Toggle mini cart
    cartLink.addEventListener("click", function(e){
        e.preventDefault();
        cartPopup.classList.toggle("active");
        renderCart();
    });

    // Close mini cart
    closeCart.addEventListener("click", function(e){
        e.preventDefault();
        cartPopup.classList.remove("active");
    });

    // Add product
    window.addToCart = function(product){
        const existing = cart.find(item => item.id === product.id);
        if(existing){
            existing.qty += 1;
        } else {
            product.qty = 1;
            cart.push(product);
        }
        renderCart();
    }

    // Remove product
    window.removeFromCart = function(id){
        cart = cart.filter(item => item.id !== id);
        renderCart();
    }

    // Change quantity
    window.changeQty = function(id, delta){
        const product = cart.find(item => item.id === id);
        if(product){
            product.qty += delta;
            if(product.qty < 1) removeFromCart(id);
        }
        renderCart();
    }

    // Render cart
    function renderCart(){
        cartItemsContainer.innerHTML = "";

        if(cart.length === 0){
            emptyCartMessage.style.display = "block";
            cartFooter.style.display = "none";
        } else {
            emptyCartMessage.style.display = "none";
            cartFooter.style.display = "block";

            cart.forEach(item => {
                const div = document.createElement("div");
                div.classList.add("cart_item");
                div.innerHTML = `
                    <div class="cart_img">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart_info">
                        <a href="#">${item.name}</a>
                        <span>Qty: ${item.qty}</span>
                        <span>Rs. ${item.price}</span>
                        <div class="cart_item_qty">
                            <button onclick="changeQty(${item.id}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button onclick="changeQty(${item.id}, 1)">+</button>
                        </div>
                        <a href="#" class="remove_item" onclick="removeFromCart(${item.id})">Remove</a>
                    </div>
                `;
                cartItemsContainer.appendChild(div);
            });
        }

        // Update checkout link
        checkoutBtn.href = `https://wa.me/XXXXXXXXXXXX?text=${encodeURIComponent(
            cart.map(p => `${p.name} x${p.qty} Rs.${p.price * p.qty}`).join("\n")
        )}`;
    }

});