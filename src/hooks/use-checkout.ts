// ─────────────────────────────────────────────────────────────────────────────
// hooks/use-checkout.ts
// ─────────────────────────────────────────────────────────────────────────────

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import {
  createOrder,
  initiateMobileMoneyPayment,
  initiatePesaPalPayment,
} from "@/api/checkout-api";
import { useCartStore } from "@/store/cart-store";
import { CheckoutPayload } from "@/types";

// ─── Place order ──────────────────────────────────────────────────────────────

export function usePlaceOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    getSelectedItems,
    getSummary,
    deliveryAddress,
    paymentMethod,
    setPlacedOrderId,
    setCheckoutStep,
    clearCart,
  } = useCartStore();

  return useMutation({
    mutationFn: async () => {
      if (!deliveryAddress || !paymentMethod) {
        throw new Error("Missing delivery address or payment method");
      }

      const items = getSelectedItems();
      const summary = getSummary();

      const payload: CheckoutPayload = {
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          subtotal: i.subtotal,
        })),
        deliveryAddress,
        paymentMethod,
        totalAmount: summary.total,
        currency: "UGX",
      };

      return createOrder(payload);
    },

    onSuccess: async (order) => {
      setPlacedOrderId(order.id);

      // Trigger payment based on chosen method
      if (paymentMethod?.type === "mobile_money" && paymentMethod.phoneNumber) {
        await initiateMobileMoneyPayment(
          order.id,
          order.total,
          paymentMethod.phoneNumber,
          paymentMethod.provider ?? "MTN"
        );
      } else if (paymentMethod?.type === "mobile_money") {
        // PesaPal redirect
        const { redirectUrl } = await initiatePesaPalPayment(
          order.id,
          order.total,
          deliveryAddress?.phone ?? ""
        );
        window.location.href = redirectUrl;
        return;
      }

      // Invalidate orders list cache
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      // Clear cart and navigate to confirmation
      clearCart();
      setCheckoutStep("confirmation");
      //vigate({ to: "/checkout/confirmation", search: { orderId: order.id } });
    },
  });
}

// ─── Initiate PesaPal directly ────────────────────────────────────────────────

export function useInitiatePesaPal() {
  return useMutation({
    mutationFn: ({ orderId, amount, phone }: { orderId: string; amount: number; phone: string }) =>
      initiatePesaPalPayment(orderId, amount, phone),

    onSuccess: ({ redirectUrl }) => {
      window.location.href = redirectUrl;
    },
  });
}

// ─── Initiate Mobile Money ────────────────────────────────────────────────────

export function useInitiateMobileMoney() {
  return useMutation({
    mutationFn: ({
      orderId,
      amount,
      phoneNumber,
      provider,
    }: {
      orderId: string;
      amount: number;
      phoneNumber: string;
      provider: "MTN" | "Airtel";
    }) => initiateMobileMoneyPayment(orderId, amount, phoneNumber, provider),
  });
}
