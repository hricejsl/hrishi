// ======= Cart JS =======

const cartPopup = document.getElementById("cartPopup");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const clearCartBtn = document.getElementById("clearCart");
const checkoutBtn = document.getElementById("checkoutBtn");
const emptyCartMessage = document.getElementById("emptyCartMessage");

let cart = [];

// Show cart popup
openCart.addEventListener("click", () => {
    cartPopup.style.display = "block";
    renderCart();
});

// Close cart popup
closeCart.addEventListener("click", () => {
    cartPopup.style.display = "none";
});

// Add product to cart (example function, you call this when user clicks "Add to Cart")
function addToCart(product) {
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
function removeFromCart(id){
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

// Change quantity
function changeQty(id, delta){
    const product = cart.find(item => item.id === id);
    if(product){
        product.qty += delta;
        if(product.qty < 1) removeFromCart(id);
    }
    renderCart();
}

// Clear all
clearCartBtn.addEventListener("click", () => {
    cart = [];
    renderCart();
});

// Render cart
function renderCart(){
    cartItemsContainer.innerHTML = "";
    if(cart.length === 0){
        emptyCartMessage.style.display = "block";
        document.getElementById("cartFooter").style.display = "none";
    } else {
        emptyCartMessage.style.display = "none";
        document.getElementById("cartFooter").style.display = "flex";
        cart.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("cart_item");
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart_item_img">
                <div class="cart_item_details">
                    <p class="cart_item_name">${item.name}</p>
                    <p class="cart_item_price">Rs. ${item.price}</p>
                    <div class="cart_item_qty">
                        <button onclick="changeQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove_item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });
    }

    // Update subtotal
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    cartSubtotal.textContent = subtotal;

    // Update WhatsApp checkout link
    checkoutBtn.href = `https://wa.me/XXXXXXXXXXXX?text=${encodeURIComponent(
        cart.map(p => `${p.name} x${p.qty} Rs.${p.price * p.qty}`).join("\n")
    )}`;
}