import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;
    const productId = Number(product.id);

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => Number(item.id) === productId);
      if (existingIndex > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIndex] = {
          ...nextCart[existingIndex],
          quantity: nextCart[existingIndex].quantity + quantity
        };
        return nextCart;
      } else {
        return [
          ...prevCart,
          {
            id: productId,
            title: product.title || product.name || 'ទំនិញ',
            price: Number(product.price) || 0,
            image: product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
            quantity
          }
        ];
      }
    });

    showToast(`បានបន្ថែម "${product.title || 'ទំនិញ'}" ទៅក្នុងកន្ត្រក!`);
  };

  const updateQuantity = (id, change) => {
    const productId = Number(id);
    setCart(prevCart => {
      return prevCart
        .map(item => {
          if (Number(item.id) === productId) {
            const nextQty = item.quantity + change;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    const productId = Number(id);
    setCart(prevCart => prevCart.filter(item => Number(item.id) !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCount = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const totalPrice = cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (Number(item.quantity) || 0)), 0);

  const toggleCartDrawer = () => setIsCartOpen(prev => !prev);
  const openPaymentModal = () => {
    setIsCartOpen(false);
    setIsPaymentOpen(true);
  };
  const closePaymentModal = () => setIsPaymentOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCount,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        toggleCartDrawer,
        isPaymentOpen,
        setIsPaymentOpen,
        openPaymentModal,
        closePaymentModal,
        quickViewProduct,
        setQuickViewProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
