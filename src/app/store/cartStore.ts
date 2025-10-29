'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: (open: boolean) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      isOpen: false,

      addItem: (item) => {
        const existing = get().cart.find((i) => i.id === item.id);

        if (existing) {
          set({
            cart: get().cart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          });
        } else {
          set({ cart: [...get().cart, item] });
        }

        set({ isOpen: true }); // פותח את העגלה אוטומטית
      },

      removeItem: (id) => set({ cart: get().cart.filter((i) => i.id !== id) }),

      updateQuantity: (id, quantity) =>
        set({
          cart: get().cart.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(quantity, 1) } : i
          ),
        }),

      clearCart: () => set({ cart: [] }),

      toggleCart: (open) => set({ isOpen: open }),
    }),
    { name: 'cart-storage' }
  )
);
