// Cart Elements
const openCart = document.getElementById("openCart");
const cartPopup = document.getElementById("cartPopup");
const closeCart = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartSubtotalEl = document.getElementById("cartSubtotal");
const clearCartBtn = document.getElementById("clearCart");
const checkoutBtn = document.getElementById("checkoutBtn");

// Cart data
let cart = [];

// Toggle cart popup
openCart.addEventListener("click", function (e) {
    e.preventDefault();
    cartPopup.style.display = cartPopup.style.display === "block" ? "none" : "block";
});

// Close cart popup
closeCart.addEventListener("click", () => {
    cartPopup.style.display = "none";
});

// Add item to cart
function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Clear cart
clearCartBtn.addEventListener("click", () => {
    cart = [];
    updateCartUI();
});

// Update cart UI
function updateCartUI() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartSubtotalEl.innerText = "0";
        document.querySelector(".cart_quantity").innerText = "0";
        document.querySelector(".cart_text_quantity").innerText = "Rs. 0";
        return;
    }

    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;

        const itemEl = document.createElement("div");
        itemEl.classList.add("cart_item");
        itemEl.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>Rs. ${item.price * item.quantity}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    cartSubtotalEl.innerText = subtotal;
    document.querySelector(".cart_quantity").innerText = cart.reduce((acc, i) => acc + i.quantity, 0);
    document.querySelector(".cart_text_quantity").innerText = `Rs. ${subtotal}`;

    // Update checkout link
    checkoutBtn.href = `https://wa.me/YourNumberHere?text=${encodeURIComponent(generateWhatsAppMessage())}`;
}

// Generate WhatsApp message
function generateWhatsAppMessage() {
    if (cart.length === 0) return "Hello, I want to order nothing yet.";
    let message = "Hello, I want to order:\n";
    cart.forEach(item => {
        message += `- ${item.name} x ${item.quantity} = Rs.${item.price * item.quantity}\n`;
    });
    message += `Subtotal: Rs.${cart.reduce((acc, i) => acc + i.price * i.quantity, 0)}`;
    return message;
}

// Example usage: addToCart({id: 1, name: "Gold Ring", price: 500});