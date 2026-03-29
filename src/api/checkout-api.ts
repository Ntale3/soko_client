// Mock API — simulates network delay.
// Replace each function body with a real fetch() call to your FastAPI endpoints.
// All function signatures stay the same — no component changes needed.

import { CheckoutPayload, DeliveryAddress, Order, PaymentMethod } from "@/types";

const delay = (ms = 1200) => new Promise((r) => setTimeout(r, ms));

// ─── Create order ─────────────────────────────────────────────────────────────
// POST /api/orders
// FastAPI receives CheckoutPayload, creates order, returns Order

export async function createOrder(payload: CheckoutPayload): Promise<Order> {
  await delay();

  // ── MOCK ──────────────────────────────────────────────────────────────────
  return {
    id: `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    status: "pending",
    items: [], // backend fills this from payload
    deliveryAddress: payload.deliveryAddress,
    paymentMethod: payload.paymentMethod,
    subtotal: payload.totalAmount - 15_000,
    deliveryFee: 15_000,
    total: payload.totalAmount,
    currency: "UGX",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  };

  // ── REAL (uncomment when FastAPI is ready) ───────────────────────────────
  // const res = await fetch("/api/orders", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${getToken()}`,
  //   },
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) {
  //   const err = await res.json().catch(() => ({}));
  //   throw new Error(err?.detail ?? "Failed to create order");
  // }
  // return res.json();
}

// ─── Initiate PesaPal payment ─────────────────────────────────────────────────
// POST /api/payments/pesapal/initiate
// FastAPI calls PesaPal API, returns a redirect URL

export interface PesaPalInitiateResponse {
  redirectUrl: string; // user is sent here to complete payment
  orderTrackingId: string; // used to verify payment status later
  merchantReference: string;
}

export async function initiatePesaPalPayment(
  orderId: string,
  amount: number,
  customerPhone: string,
  customerEmail?: string
): Promise<PesaPalInitiateResponse> {
  await delay(800);

  // ── MOCK ──────────────────────────────────────────────────────────────────
  return {
    redirectUrl: `https://pay.pesapal.com/iframe/PesapalIframe3/Index?OrderTrackingId=MOCK-${orderId}`,
    orderTrackingId: `MOCK-${orderId}-${Date.now()}`,
    merchantReference: orderId,
  };

  // ── REAL ─────────────────────────────────────────────────────────────────
  // const res = await fetch("/api/payments/pesapal/initiate", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${getToken()}`,
  //   },
  //   body: JSON.stringify({ orderId, amount, customerPhone, customerEmail }),
  // });
  // if (!res.ok) throw new Error("Failed to initiate payment");
  // return res.json();
}

// ─── Initiate Mobile Money payment ────────────────────────────────────────────
// POST /api/payments/mobile-money/initiate
// FastAPI triggers MTN/Airtel push USSD prompt to customer phone

export interface MobileMoneyResponse {
  transactionId: string;
  message: string; // "Payment prompt sent to +256..."
  status: "pending";
}

export async function initiateMobileMoneyPayment(
  orderId: string,
  amount: number,
  phoneNumber: string,
  provider: "MTN" | "Airtel"
): Promise<MobileMoneyResponse> {
  await delay(1000);

  // ── MOCK ──────────────────────────────────────────────────────────────────
  return {
    transactionId: `MM-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
    message: `Payment prompt of UGX ${amount.toLocaleString()} sent to ${phoneNumber}. Please approve on your phone.`,
    status: "pending",
  };

  // ── REAL ─────────────────────────────────────────────────────────────────
  // const res = await fetch("/api/payments/mobile-money/initiate", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${getToken()}`,
  //   },
  //   body: JSON.stringify({ orderId, amount, phoneNumber, provider }),
  // });
  // if (!res.ok) throw new Error("Failed to initiate mobile money payment");
  // return res.json();
}

// ─── Poll order payment status ────────────────────────────────────────────────
// GET /api/orders/:id/status
// Used to poll after mobile money prompt

export async function fetchOrderStatus(
  orderId: string
): Promise<{ status: string; paid: boolean }> {
  await delay(600);

  // ── MOCK — always returns paid after first poll ───────────────────────────
  return { status: "confirmed", paid: true };

  // ── REAL ─────────────────────────────────────────────────────────────────
  // const res = await fetch(`/api/orders/${orderId}/status`, {
  //   headers: { Authorization: `Bearer ${getToken()}` },
  // });
  // return res.json();
}

// ─── Validate delivery address ────────────────────────────────────────────────
// POST /api/delivery/validate
// Optional — checks if delivery is available in the district

export async function validateDeliveryAddress(
  address: DeliveryAddress
): Promise<{ available: boolean; estimatedDays: number; fee: number }> {
  await delay(400);
  return { available: true, estimatedDays: 3, fee: 15_000 };
}
