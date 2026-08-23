// Complete Products Master Data Array
const products = [
    {
        id: 1,
        title: "កាសស្តាប់ត្រចៀក Wireless Noise-Canceling",
        category: "electronics",
        price: 89.00,
        oldPrice: 120.00,
        rating: 4.8,
        reviewsCount: 124,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500",
        description: "កាសស្តាប់ត្រចៀកឥតខ្សែដែលមានប្រព័ន្ធកាត់បន្ថយសំឡេងរំខានពីខាងក្រៅបានយ៉ាងល្អ សំឡេងបាសធ្ងន់ និងថ្មកាន់បាន 30 ម៉ោង។"
    },
    {
        id: 2,
        title: "នាឡិកាឆ្លាតវៃ Smart Watch Series 8",
        category: "electronics",
        price: 150.00,
        oldPrice: 180.00,
        rating: 4.9,
        reviewsCount: 89,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500",
        description: "នាឡិកាឆ្លាតវៃវាស់ចង្វាក់បេះដូង ជំហានដើរ និងតាមដានសុខភាព 24 ម៉ោង ព្រមទាំងការពារជម្រាបទឹកកម្រិត IP68។"
    },
    {
        id: 3,
        title: "កាបូបស្ពាយខ្នងទាន់សម័យ Waterproof",
        category: "accessories",
        price: 35.00,
        oldPrice: 45.00,
        rating: 4.5,
        reviewsCount: 56,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500",
        description: "កាបូបស្ពាយរចនាម៉ូដទាន់សម័យ ការពារជម្រាបទឹក មានថតដាក់ Laptop ទំហំ 15.6 អ៊ីញបានយ៉ាងងាយស្រួល។"
    },
    {
        id: 4,
        title: "ស្បែកជើងរត់ប្រណាំង Sport Shoes Pro",
        category: "fashion",
        price: 65.00,
        oldPrice: 85.00,
        rating: 4.7,
        reviewsCount: 210,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500",
        description: "ស្បែកជើងកីឡាស្រាល ស្រួលពាក់ មិនឈឺជើង ស័ក្តិសមសម្រាប់ការរត់ កីឡា និងការពាក់ដើរកម្សាន្តប្រចាំថ្ងៃ។"
    },
    {
        id: 5,
        title: "អាវយឺតបុរស Cotton Premium 100%",
        category: "fashion",
        price: 18.00,
        oldPrice: 25.00,
        rating: 4.3,
        reviewsCount: 45,
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=500",
        description: "អាវយឺតផលិតពីសាច់ក្រណាត់ Cotton 100% ទន់ល្មើយ ត្រជាក់ស្រួលពាក់ និងមិនបែកព្រុយពេលបោកគក់។"
    },
    {
        id: 6,
        title: "វ៉ែនតាការពារពន្លឺថ្ងៃ Classic Sunglasses",
        category: "accessories",
        price: 28.00,
        oldPrice: 40.00,
        rating: 4.6,
        reviewsCount: 78,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=500",
        description: "វ៉ែនតាកពារ UV400 ម៉ូដទាន់សម័យ ស័ក្តិសមទាំងបុរស និងស្ត្រី ជួយការពារភ្នែកពីពន្លឺព្រះអាទិត្យខ្លាំង។"
    },
    {
        id: 7,
        title: "កាមេរ៉ាថតរូប Mirrorless 4K Camera",
        category: "electronics",
        price: 750.00,
        oldPrice: 850.00,
        rating: 5.0,
        reviewsCount: 32,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500",
        description: "កាមេរ៉ាថតរូប និងវីដេអូកម្រិត 4K ច្បាស់ល្អឥតខ្ចោះ ជាមួយប្រព័ន្ធ Focus រហ័ស ទំហំតូចល្មមងាយយកតាមខ្លួន។"
    },
    {
        id: 8,
        title: "មួកកាសកែច្នៃ Style Vintage Cap",
        category: "fashion",
        price: 15.00,
        oldPrice: 20.00,
        rating: 4.4,
        reviewsCount: 19,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500",
        description: "មួកម៉ូដ Vintage ស្អាតប្លែកគេ សាច់ក្រណាត់ធន់មាំ និងអាចកែសម្រួលទំហំតាមក្បាលបាន។"
    }
];

// Active State Filtering Variables
let currentSearch = "";
let currentCategory = "all";
let currentSort = "default";

// Global DOM Elements Initialization
document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
    renderProducts();

    // Event Listeners for Filters and Search
    const searchInput = document.getElementById("filterSearch");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentSearch = e.target.value.toLowerCase().trim();
            renderProducts();
        });
    }

    const categoryRadios = document.querySelectorAll(".category-radio");
    categoryRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            currentCategory = e.target.value;
            renderProducts();
        });
    });

    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            currentSort = e.target.value;
            renderProducts();
        });
    }

    const resetBtn = document.getElementById("resetFilterBtn");
    if (resetBtn) {
        resetBtn.addEventListener("click", resetFilters);
    }
});

// Master Render Products Logic
function renderProducts() {
    const grid = document.getElementById("productsGrid");
    const noProductsMsg = document.getElementById("noProductsFound");
    const countText = document.getElementById("productCountText");

    if (!grid) return;

    // 1. Filter by Search & Category
    let filtered = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(currentSearch);
        const matchesCategory = currentCategory === "all" || product.category === currentCategory;
        return matchesSearch && matchesCategory;
    });

    // 2. Sort Logic
    if (currentSort === "low-to-high") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === "high-to-low") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    // 3. Update Count Indicator Text
    if (countText) {
        countText.textContent = `បង្ហាញ ${filtered.length} នៃ ${products.length} ផលិតផល`;
    }

    // 4. Handle Empty Results UI
    if (filtered.length === 0) {
        grid.innerHTML = "";
        noProductsMsg.classList.remove("d-none");
        return;
    } else {
        noProductsMsg.classList.add("d-none");
    }

    // 5. Generate and Insert HTML Cards
    grid.innerHTML = filtered.map(product => `
        <div class="col-xl-4 col-md-6 col-6">
            <div class="card product-card h-100">
                <div class="product-img-wrapper">
                    ${product.oldPrice ? `<span class="badge-discount">ចុះថ្លៃ</span>` : ''}
                    <a href="product.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.title}">
                    </a>
                </div>
                <div class="card-body d-flex flex-column justify-content-between p-3">
                    <div>
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span class="text-xs text-uppercase text-indigo-600 font-semibold">${product.category}</span>
                            <div class="text-warning text-xs">
                                <i class="fa-solid fa-star"></i>
                                <span class="text-dark font-semibold">${product.rating}</span>
                                <span class="text-gray-400">(${product.reviewsCount})</span>
                            </div>
                        </div>
                        <h6 class="card-title text-sm font-semibold mb-2">
                            <a href="product.html?id=${product.id}" class="text-dark text-decoration-none hover:text-indigo-600">
                                ${product.title}
                            </a>
                        </h6>
                    </div>
                    <div>
                        <div class="d-flex align-items-center gap-2 mb-3">
                            <span class="text-indigo-600 font-bold text-lg">$${product.price.toFixed(2)}</span>
                            ${product.oldPrice ? `<span class="text-muted text-decoration-line-through text-xs">$${product.oldPrice.toFixed(2)}</span>` : ''}
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

// Reset Filters Function
function resetFilters() {
    currentSearch = "";
    currentCategory = "all";
    currentSort = "default";

    const searchInput = document.getElementById("filterSearch");
    if (searchInput) searchInput.value = "";

    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) sortSelect.value = "default";

    const allCatRadio = document.getElementById("catAll");
    if (allCatRadio) allCatRadio.checked = true;

    renderProducts();
}

// Add Item to LocalStorage Cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push({ ...product, quantity: 1 });
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
    alert("ទំនិញត្រូវបានបញ្ចូលទៅក្នុងកន្ត្រកជោគជ័យ!");
}

// Update Header Cart Count Badge
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById("cartCount");
    if (cartCountEl) {
        cartCountEl.textContent = totalCount;
    }
}