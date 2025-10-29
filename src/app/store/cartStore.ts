'use client';
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addItem: (item) => {
        const existing = get().cart.find((i) => i.id === item.id);

        if (existing) {
          // אם המוצר כבר קיים בעגלה → נעדכן רק את הכמות
          set({
            cart: get().cart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          });
        } else {
          // אם המוצר חדש → נוסיף אותו לעגלה
          set({ cart: [...get().cart, item] });
        }
      },

      removeItem: (id) =>
        set({ cart: get().cart.filter((i) => i.id !== id) }),

      increaseQuantity: (id) =>
        set({
          cart: get().cart.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }),

      decreaseQuantity: (id) =>
        set({
          cart: get().cart.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(i.quantity - 1, 1) } : i
          ),
        }),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // שם המפתח ב-localStorage
    }
  )
);
