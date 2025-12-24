// Elements
const cartPopup = document.getElementById("cartPopup");
const openCart = document.querySelector(".cart_link > a");
const closeCart = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const clearCartBtn = document.getElementById("clearCart");
const checkoutBtn = document.getElementById("checkoutBtn");
const emptyCartMessage = document.getElementById("emptyCartMessage");
const cartFooter = document.getElementById("cartFooter");

let cart = [];

// Toggle Mini Cart
openCart.addEventListener("click", (e)=>{
    e.preventDefault();
    cartPopup.classList.toggle("active");
    renderCart();
});

// Close Mini Cart
closeCart.addEventListener("click", (e)=>{
    e.preventDefault();
    cartPopup.classList.remove("active");
});

// Add product to cart
function addToCart(product){
    const existing = cart.find(item=>item.id===product.id);
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
    const product = cart.find(item=>item.id===id);
    if(product){
        product.qty += delta;
        if(product.qty < 1) removeFromCart(id);
    }
    renderCart();
}

// Clear all
clearCartBtn.addEventListener("click", ()=>{
    cart = [];
    renderCart();
});

// Render cart
function renderCart(){
    cartItemsContainer.innerHTML = "";
    if(cart.length === 0){
        emptyCartMessage.style.display = "block";
        cartFooter.style.display = "none";
    } else {
        emptyCartMessage.style.display = "none";
        cartFooter.style.display = "block";
        cart.forEach(item=>{
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
                    <button onclick="changeQty(${item.id}, -1)">-</button>
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                    <a href="#" class="remove_item" onclick="removeFromCart(${item.id})">Remove</a>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });
    }

    // Update subtotal
    const subtotal = cart.reduce((sum, item)=>sum + item.price*item.qty, 0);
    cartSubtotal.textContent = subtotal;

    // Update WhatsApp checkout link (example number)
    checkoutBtn.href = `https://wa.me/XXXXXXXXXXXX?text=${encodeURIComponent(
        cart.map(p=>`${p.name} x${p.qty} Rs.${p.price*p.qty}`).join("\n")
    )}`;
}