import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, CartStore } from "@/types/cart";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (newItem) => {
        const id = `${newItem.productId}-${newItem.variantId}-${newItem.sizeId}`;
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((item) => item.id === id);

        if (existingIndex > -1) {
          const updated = [...currentItems];
          const item = updated[existingIndex];
          const newQty = Math.min(item.quantity + newItem.quantity, item.maxStock);
          updated[existingIndex] = { ...item, quantity: newQty };
          set({ items: updated, isOpen: true });
        } else {
          set({
            items: [...currentItems, { ...newItem, id }],
            isOpen: true,
          });
        }
      },

      removeItem: (id: string) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.min(quantity, item.maxStock) }
              : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "sneakers-cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
