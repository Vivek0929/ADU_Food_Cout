import { useState, useCallback } from "react";
import { useCanteen } from "../context/CanteenContext";
import { calcCartTotal, calcCartCount } from "../utils/helpers";

export const useCart = () => {
  const { cart, setCart } = useCanteen();

  const addToCart = useCallback((item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, [setCart]);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, [setCart]);

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((c) => c.id !== id));
    } else {
      setCart((prev) =>
        prev.map((c) => (c.id === id ? { ...c, quantity: qty } : c))
      );
    }
  }, [setCart]);

  const clearCart = useCallback(() => setCart([]), [setCart]);

  const isInCart = (id) => cart.some((c) => c.id === id);
  const getQty = (id) => cart.find((c) => c.id === id)?.quantity || 0;

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    isInCart,
    getQty,
    total: calcCartTotal(cart),
    count: calcCartCount(cart),
  };
};
