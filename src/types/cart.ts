export interface CartItem {
  id: string; // unique composite key: `${productId}-${variantId}-${sizeId}`
  productId: string;
  productName: string;
  productSlug: string;
  brandName: string;
  variantId: string;
  colorName: string;
  colorHex: string;
  imageUrl: string;
  sizeId: string;
  size: string;
  price: number;
  quantity: number;
  maxStock: number;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}
