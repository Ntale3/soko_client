import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { CheckoutStepper } from "@/components/cart/checkout-stepper";
import { DeliveryAddressForm } from "@/components/cart/delivery-address-form";
import { OrderSummaryPanel } from "@/components/cart/order-summary-panel";
import { PaymentMethodSelector } from "@/components/cart/payment-method-selector";
import { useCartStore } from "@/store/cart-store";

export const Route = createFileRoute("/(app)/checkout/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { items, checkoutStep, setCheckoutStep, getSummary } = useCartStore();
  const summary = getSummary();

  // Guard — redirect to cart if empty
  if (items.length === 0) {
    navigate({ to: "/cart" });
    return null;
  }
  return (
    <div className="min-h-screen bg-background pt-4 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page title */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground font-serif">Checkout</h1>
          <p className="text-sm text-muted-foreground">
            Complete your order from verified Ugandan farmers
          </p>
        </div>

        {/* Stepper */}
        <CheckoutStepper currentStep={checkoutStep === "cart" ? "address" : checkoutStep} />

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ── Main form area ────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {(checkoutStep === "cart" || checkoutStep === "address") && (
              <DeliveryAddressForm
                onNext={() => setCheckoutStep("payment")}
                onBack={() => navigate({ to: "/cart" })}
              />
            )}
            {checkoutStep === "payment" && (
              <PaymentMethodSelector onBack={() => setCheckoutStep("address")} />
            )}
          </div>

          {/* ── Order summary sidebar ─────────────────────────────────── */}
          <div className="w-full lg:w-80 shrink-0">
            <OrderSummaryPanel items={items} summary={summary} />
          </div>
        </div>
      </div>
    </div>
  );
}
