// ------------------------------
// Kibriya MediTonic – app.js
// ------------------------------

// Global product list (loaded later)
let products = [];
let visibleCount = 20;

// Load local product list JSON (productList.js)
async function loadProducts() {
    try {
        const response = await fetch("products.json"); 
        products = await response.json();
        renderProducts(products.slice(0, visibleCount));
    } catch (error) {
        console.error("Product Load Error:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
});

// Render product cards
function renderProducts(list) {
    const container = document.getElementById("productList");

    if (!container) return;

    list.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${p.name}</h3>
            <p>${p.generic}</p>
            <p><b>৳${p.price}</b></p>
            <button onclick="addToCart('${p.name}', ${p.price})" class="btn btn-primary">Add</button>
        `;
        container.appendChild(card);
    });
}

// Load More button
document.getElementById("loadMore").addEventListener("click", () => {
    visibleCount += 20;
    renderProducts(products.slice(0, visibleCount));
});

// Search filter
document.getElementById("searchInput").addEventListener("input", e => {
    const text = e.target.value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(text) ||
        p.generic.toLowerCase().includes(text)
    );

    document.getElementById("productList").innerHTML = "";
    renderProducts(filtered.slice(0, visibleCount));
});

// Category filter (Not used but ready)
document.getElementById("categoryFilter").addEventListener("change", e => {
    const val = e.target.value;

    if (val === "all") {
        document.getElementById("productList").innerHTML = "";
        renderProducts(products.slice(0, visibleCount));
        return;
    }

    const filtered = products.filter(p => p.category === val);
    document.getElementById("productList").innerHTML = "";
    renderProducts(filtered.slice(0, visibleCount));
});

// Sorting system
document.getElementById("sortBy").addEventListener("change", e => {
    const val = e.target.value;

    let sorted = [...products];

    if (val === "name") {
        sorted.sort((a,b) => a.name.localeCompare(b.name));
    } 
    else if (val === "price_low") {
        sorted.sort((a,b) => a.price - b.price);
    }
    else if (val === "price_high") {
        sorted.sort((a,b) => b.price - a.price);
    }

    document.getElementById("productList").innerHTML = "";
    renderProducts(sorted.slice(0, visibleCount));
});

// ------------------------------
// Cart System
// ------------------------------

let cart = [];

function addToCart(name, price) {
    const item = cart.find(i => i.name === name);

    if (item) {
        item.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    updateCartCount();
    showCartBar();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById("cartCount").innerText = count;
}

function showCartBar() {
    document.getElementById("cartBar").style.display = "block";
}

// ------------------------------
// View Cart
// ------------------------------

document.getElementById("viewCart").addEventListener("click", () => {
    let msg = "🛒 *Your Order List*\n\n";

    cart.forEach(i => {
        msg += `• ${i.name} x ${i.qty} = ৳${i.price * i.qty}\n`;
    });

    msg += `\nTotal = ৳${cart.reduce((s,i)=>s+(i.price*i.qty),0)}`;

    alert(msg);
});

// ------------------------------
// WhatsApp Order
// ------------------------------

document.getElementById("checkoutWA").addEventListener("click", () => {
    let message = "🛒 *Order List*\n";

    cart.forEach(i => {
        message += `• ${i.name} x ${i.qty} = ৳${i.price * i.qty}\n`;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    message += `\nTotal = ৳${total}\n\nDelivery: Inside City 20৳ | Outside 120৳`;

    const url = `https://wa.me/8801XXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
});

// ------------------------------
// Reload button
// ------------------------------

document.getElementById("refreshBtn").addEventListener("click", () => {
    location.reload();
});
