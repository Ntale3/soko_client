// Zustand + persist — cart survives page refresh.
// Server state (order creation, payment) lives in TanStack Query mutations.

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AddToCartPayload, CartItem, CartSummary, DeliveryAddress, PaymentMethod } from "@/types";

const DELIVERY_FEE = 15_000; // change when backend is ready

// ─── Checkout steps ───────────────────────────────────────────────────────────

export type CheckoutStep = "cart" | "address" | "payment" | "confirmation";

// ─── Store shape ──────────────────────────────────────────────────────────────

interface CartStore {
  // ── Data ──────────────────────────────────────────────────────────────────
  items: CartItem[];
  isDrawerOpen: boolean;
  checkoutStep: CheckoutStep;
  deliveryAddress: DeliveryAddress | null;
  paymentMethod: PaymentMethod | null;
  placedOrderId: string | null; // set after successful order

  // ── Cart actions ──────────────────────────────────────────────────────────
  addItem: (payload: AddToCartPayload) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  toggleSelected: (cartItemId: string) => void;
  selectAll: () => void;
  clearCart: () => void;

  // ── Drawer ────────────────────────────────────────────────────────────────
  openDrawer: () => void;
  closeDrawer: () => void;

  // ── Checkout flow ─────────────────────────────────────────────────────────
  setCheckoutStep: (step: CheckoutStep) => void;
  setDeliveryAddress: (address: DeliveryAddress) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setPlacedOrderId: (id: string) => void;
  resetCheckout: () => void;

  // ── Derived (computed inline — never stale) ───────────────────────────────
  getSummary: () => CartSummary;
  getSelectedItems: () => CartItem[];
  isInCart: (productId: string | number) => boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildCartItem(payload: AddToCartPayload): CartItem {
  const { product, quantity, unitPrice } = payload;
  return {
    cartItemId: `${product.id}-${Date.now()}`,
    productId: product.id,
    name: product.name,
    image: product.image,
    farmer: product.farmer,
    district: product.district,
    verified: product.verified,
    unit: product.unit,
    category: product.category,
    unitPrice,
    quantity,
    subtotal: unitPrice * quantity,
    minimumOrder: product.minimumOrder ?? 1,
    availableQty: product.qty,
    addedAt: new Date().toISOString(),
    isSelected: true,
  };
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      checkoutStep: "cart",
      deliveryAddress: null,
      paymentMethod: null,
      placedOrderId: null,

      // ── Cart actions ───────────────────────────────────────────────────
      addItem: (payload) => {
        const existing = get().items.find((i) => i.productId === payload.product.id);

        if (existing) {
          // Increase quantity if already in cart
          set((s) => ({
            items: s.items.map((i) =>
              i.productId === payload.product.id
                ? {
                    ...i,
                    quantity: i.quantity + payload.quantity,
                    subtotal: i.unitPrice * (i.quantity + payload.quantity),
                  }
                : i
            ),
          }));
        } else {
          set((s) => ({ items: [...s.items, buildCartItem(payload)] }));
        }
        // Auto-open drawer so user sees feedback
        set({ isDrawerOpen: true });
      },

      removeItem: (cartItemId) =>
        set((s) => ({
          items: s.items.filter((i) => i.cartItemId !== cartItemId),
        })),

      updateQuantity: (cartItemId, quantity) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.cartItemId === cartItemId
              ? {
                  ...i,
                  quantity: Math.min(i.availableQty, Math.max(i.minimumOrder, quantity)),
                  subtotal:
                    i.unitPrice * Math.min(i.availableQty, Math.max(i.minimumOrder, quantity)),
                }
              : i
          ),
        })),

      toggleSelected: (cartItemId) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.cartItemId === cartItemId ? { ...i, isSelected: !i.isSelected } : i
          ),
        })),

      selectAll: () => set((s) => ({ items: s.items.map((i) => ({ ...i, isSelected: true })) })),

      clearCart: () => set({ items: [] }),

      // ── Drawer ──────────────────────────────────────────────────────────
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),

      // ── Checkout ────────────────────────────────────────────────────────
      setCheckoutStep: (step) => set({ checkoutStep: step }),
      setDeliveryAddress: (address) => set({ deliveryAddress: address }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      setPlacedOrderId: (id) => set({ placedOrderId: id }),

      resetCheckout: () =>
        set({
          checkoutStep: "cart",
          deliveryAddress: null,
          paymentMethod: null,
          placedOrderId: null,
        }),

      // ── Derived ─────────────────────────────────────────────────────────
      getSummary: (): CartSummary => {
        const { items } = get();
        const selected = items.filter((i) => i.isSelected);
        const subtotal = items.reduce((sum, i) => sum + i.subtotal, 0);
        const selectedSubtotal = selected.reduce((sum, i) => sum + i.subtotal, 0);
        return {
          itemCount: items.length,
          totalUnits: items.reduce((sum, i) => sum + i.quantity, 0),
          subtotal,
          deliveryFee: items.length > 0 ? DELIVERY_FEE : 0,
          total: subtotal + (items.length > 0 ? DELIVERY_FEE : 0),
          selectedCount: selected.length,
          selectedSubtotal,
        };
      },

      getSelectedItems: () => get().items.filter((i) => i.isSelected),

      isInCart: (productId) => get().items.some((i) => i.productId === productId),
    }),
    {
      name: "soko-cart",
      // Exclude UI state from persistence
      partialize: (s) => ({
        items: s.items,
        deliveryAddress: s.deliveryAddress,
      }),
    }
  )
);
