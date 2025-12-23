/* ===========================
   SIMPLE CART SYSTEM
   =========================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* DOM ELEMENTS */
const cartCount   = document.getElementById("cartCount");
const cartItems   = document.getElementById("cartItems");
const cartTotal   = document.getElementById("cartTotal");
const clearCartBtn = document.getElementById("clearCart");
const checkoutBtn  = document.getElementById("checkoutBtn");

/* ===========================
   UPDATE CART COUNT
   =========================== */
function updateCartCount() {
    let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartCount) cartCount.innerText = totalQty;
}

/* ===========================
   SAVE CART
   =========================== */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

/* ===========================
   ADD TO CART
   =========================== */
function addToCart(id, name, price, image) {
    let item = cart.find(p => p.id === id);

    if (item) {
        item.qty += 1;
    } else {
        cart.push({
            id,
            name,
            price,
            image,
            qty: 1
        });
    }

    saveCart();
    renderCart();
}

/* ===========================
   CHANGE QUANTITY
   =========================== */
function changeQty(id, amount) {
    let item = cart.find(p => p.id === id);
    if (!item) return;

    item.qty += amount;

    if (item.qty <= 0) {
        cart = cart.filter(p => p.id !== id);
    }

    saveCart();
    renderCart();
}

/* ===========================
   REMOVE ITEM
   =========================== */
function removeItem(id) {
    cart = cart.filter(p => p.id !== id);
    saveCart();
    renderCart();
}

/* ===========================
   CLEAR CART
   =========================== */
if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
        cart = [];
        saveCart();
        renderCart();
    });
}

/* ===========================
   RENDER CART POPUP
   =========================== */
function renderCart() {
    if (!cartItems) return;

    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p style='text-align:center'>Cart is empty</p>";
        cartTotal.innerText = "₹0";
        return;
    }

    cart.forEach(item => {
        total += item.price * item.qty;

        cartItems.innerHTML += `
            <div class="cart_item">
                <img src="${item.image}" width="60">
                <div>
                    <p>${item.name}</p>
                    <p>₹${item.price}</p>
                    <div>
                        <button onclick="changeQty(${item.id}, -1)">−</button>
                        <span>${item.qty}</span>
                        <button onclick="changeQty(${item.id}, 1)">+</button>
                        <button onclick="removeItem(${item.id})">✕</button>
                    </div>
                </div>
            </div>
        `;
    });

    cartTotal.innerText = "₹" + total;
}

/* ===========================
   CHECKOUT (DEMO)
   =========================== */
if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Cart is empty!");
            return;
        }
        alert("Proceeding to checkout...");
        console.log(cart);
    });
}

/* ===========================
   INIT
   =========================== */
updateCartCount();
renderCart();
