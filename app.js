// Sample Dynamic Product Data for Home Page
const featuredProducts = [
    {
        id: 1,
        title: "កាសស្តាប់ត្រចៀក Wireless Noise-Canceling",
        price: 89.00,
        oldPrice: 120.00,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500"
    },
    {
        id: 2,
        title: "នាឡិកាឆ្លាតវៃ Smart Watch Series 8",
        price: 150.00,
        oldPrice: 180.00,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500"
    },
    {
        id: 3,
        title: "កាបូបស្ពាយខ្នងទាន់សម័យ Waterproof",
        price: 35.00,
        oldPrice: 45.00,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500"
    },
    {
        id: 4,
        title: "ស្បែកជើងរត់ប្រណាំង Sport Shoes Pro",
        price: 65.00,
        oldPrice: 85.00,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500"
    }
];

// Initialize Home Page Functions
document.addEventListener("DOMContentLoaded", () => {
    renderFeaturedProducts();
    updateCartBadge();
});

// Render Featured Products
function renderFeaturedProducts() {
    const container = document.getElementById("featuredProductsContainer");
    if (!container) return;

    container.innerHTML = featuredProducts.map(product => `
        <div class="col-lg-3 col-md-6 col-6">
            <div class="card product-card h-100">
                <div class="product-img-wrapper">
                    <span class="badge-discount">-20%</span>
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="card-body d-flex flex-column justify-content-between p-3">
                    <div>
                        <div class="text-warning text-sm mb-1">
                            <i class="fa-solid fa-star"></i>
                            <span class="text-dark font-semibold ms-1">${product.rating}</span>
                        </div>
                        <h6 class="card-title text-sm font-semibold mb-2 text-truncate">${product.title}</h6>
                    </div>
                    <div>
                        <div class="d-flex align-items-center gap-2 mb-3">
                            <span class="text-indigo-600 font-bold text-lg">$${product.price.toFixed(2)}</span>
                            <span class="text-muted text-decoration-line-through text-xs">$${product.oldPrice.toFixed(2)}</span>
                        </div>
                        <button onclick="addToCart(${product.id})" class="btn btn-indigo w-100 rounded-pill text-sm py-2">
                            <i class="fa-solid fa-cart-plus me-1"></i> បញ្ចូលកន្ត្រក
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
}

// Add Item to LocalStorage Cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        const product = featuredProducts.find(p => p.id === productId);
        if (product) {
            cart.push({ ...product, quantity: 1 });
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
    
    // Quick Feedback
    alert("ទំនិញត្រូវបានបញ្ចូលទៅក្នុងកន្ត្រកជោគជ័យ!");
}

// Update Cart Count Badge
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById("cartCount");
    if (cartCountEl) {
        cartCountEl.textContent = totalCount;
    }
}