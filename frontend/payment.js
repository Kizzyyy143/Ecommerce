async function startQrPayment() {
    const items = (window.cart || []).map(item => ({
        productId: item.id,
        quantity: item.qty || item.quantity
    }));

    if (!items.length) {
        alert('សូមបញ្ចូលទំនិញក្នុងកន្ត្រកជាមុនសិន។');
        return;
    }

    try {
        const response = await fetch('/api/payments/qr', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items })
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Payment request failed');

        document.getElementById('paymentAmount').textContent = `$${result.data.amount.toFixed(2)} ${result.data.currency}`;
        document.getElementById('paymentQr').src = result.data.qrDataUrl;
        document.getElementById('paymentReference').textContent = `Reference: ${result.data.reference}`;
        document.getElementById('paymentModal').classList.remove('hidden');
        document.getElementById('paymentModal').classList.add('flex');
    } catch (error) {
        alert(error.message);
    }
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}
