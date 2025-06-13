"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Product } from "@/types/product";
import { fetcher } from "@/utils/fetcher";

export type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({
  children,
  initialCart,
}: {
  children: ReactNode;
  initialCart?: CartItem[];
}) => {
  const [cart, setCart] = useState<CartItem[]>(initialCart || []);
  useEffect(() => {
    if (!initialCart) {
      const fetchCart = async () => {
        try {
          const { data } = await fetcher.get<{ data: { items: CartItem[] } }>(
            "/cart"
          );
          setCart(data.items);
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        }
      };
      fetchCart();
    }
  }, [initialCart]);

  const addToCart = async (productId?: string, quantity?: number) => {
    try {
      await fetcher.post("/cart", { productId, quantity });
      const { data } = await fetcher.get<{ data: { items: CartItem[] } }>(
        "/cart"
      );
      setCart(data.items);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await fetcher.delete(`/cart/${productId}`);
      const { data } = await fetcher.get<{ data: { items: CartItem[] } }>(
        "/cart"
      );
      setCart(data.items);
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      await fetcher.put("/cart", { productId, quantity });
      const { data } = await fetcher.get<{ data: { items: CartItem[] } }>(
        "/cart"
      );
      setCart(data.items);
    } catch (error) {
      console.error("Failed to update cart quantity:", error);
    }
  };

  const clearCart = async () => {
    try {
      await fetcher.delete("/cart");
      setCart([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
