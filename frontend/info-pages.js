document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    if (page === 'discount') loadDiscounts();
    if (page === 'contact') setupContactForm();
});

async function loadDiscounts() {
    const container = document.getElementById('discountGrid');
    if (!container) return;

    try {
        const response = await fetch('/api/discounts');
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Unable to load discounts');

        container.innerHTML = result.data.map(product => `
            <article class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <img src="${product.image}" alt="${product.title}" class="w-full h-52 object-cover">
                <div class="p-5">
                    <div class="flex items-center justify-between mb-2">
                        <span class="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">-${product.discountPercent}%</span>
                        <span class="text-amber-500 text-sm"><i class="fa-solid fa-star"></i> ${product.rating}</span>
                    </div>
                    <h3 class="font-bold text-slate-800 min-h-12">${product.title}</h3>
                    <div class="mt-4 flex items-center gap-2">
                        <span class="text-xl font-bold text-brand-600">$${product.price.toFixed(2)}</span>
                        <span class="text-sm text-slate-400 line-through">$${product.oldPrice.toFixed(2)}</span>
                    </div>
                    <a href="product.html?id=${product.id}" class="mt-4 block text-center bg-slate-900 hover:bg-brand-600 text-white rounded-xl py-2.5 text-sm font-semibold transition">មើលផលិតផល</a>
                </div>
            </article>
        `).join('');
    } catch (error) {
        container.innerHTML = `<p class="col-span-full text-center text-red-600">${error.message}</p>`;
    }
}

function setupContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('contactStatus');
    if (!form || !status) return;

    form.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());
        status.textContent = 'កំពុងផ្ញើ...';
        status.className = 'text-sm text-slate-500';

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'ការផ្ញើមិនបានជោគជ័យ');
            form.reset();
            status.textContent = 'សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ។';
            status.className = 'text-sm text-emerald-600';
        } catch (error) {
            status.textContent = error.message;
            status.className = 'text-sm text-red-600';
        }
    });
}
