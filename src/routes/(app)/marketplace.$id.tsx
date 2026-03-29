import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft } from "lucide-react";

import { FarmerCard } from "@/components/product-detail-page/farmer-card";
import { ProductGallery } from "@/components/product-detail-page/product-gallery";
import { ProductInfo } from "@/components/product-detail-page/product-info";
import {
  OrderSummary,
  ProductActions,
  QuantitySelector,
} from "@/components/product-detail-page/product-purchase";
import { ProductTabs } from "@/components/product-detail-page/product-tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { products } from "@/constants/dummy-data";
import { useAddToCart, useSubmitRating } from "@/hooks/use-product-detail";
import { useProductDetailStore } from "@/store/product-detail-store";

export const Route = createFileRoute("/(app)/marketplace/$id")({
  component: RouteComponent,
  //   loader: async ({ params }) => {
  //   const store = useProductDetailStore.getState();
  //   store.setLoading(true);
  //   try {
  //     const product = await fetchProduct(params.id);
  //     store.setProduct(product);
  //   } catch (e) {
  //     store.setError("Product not found.");
  //   } finally {
  //     store.setLoading(false);
  //   }
  // },
});

function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-3">
        <Skeleton className="aspect-square w-full rounded-2xl" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-16 h-16 rounded-xl" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-9 w-3/4 rounded-lg" />
        <Skeleton className="h-5 w-40 rounded" />
        <Skeleton className="h-10 w-48 rounded-lg" />
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>
    </div>
  );
}

function RouteComponent() {
  const {
    product,
    activeImageIndex,
    quantity,
    activeTab,
    isLoading,
    error,
    isAddingToCart,
    setActiveImageIndex,
    setActiveTab,
    increment,
    decrement,
    setQuantity,
    toggleWishlist,
    toggleReviewHelpful,
    submitRating,
    effectivePrice,
    subtotal,
  } = useProductDetailStore();

  const addToCartMutation = useAddToCart();
  const submitRatingMutation = useSubmitRating(product?.id ?? "");

  const handleAddToCart = () => {
    if (!product) return;
    addToCartMutation.mutate({
      productId: product.id,
      quantity,
      price: effectivePrice(),
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product?.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-sm">
          <AlertCircle className="size-10 text-destructive mx-auto" />
          <p className="text-sm text-muted-foreground">{error}</p>
          <Link to="/marketplace">
            <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
              <ArrowLeft size={13} /> Back to Marketplace
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-4 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back */}
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Marketplace
        </Link>

        {isLoading || !product ? (
          <ProductSkeleton />
        ) : (
          <>
            {/*
              Mobile  → single column
              LG+     → two-column: gallery left, purchase panel right
            */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* ── Left: gallery ──────────────────────────────────────── */}
              <div className="lg:sticky lg:top-20">
                <ProductGallery
                  product={product}
                  activeIndex={activeImageIndex}
                  onSelect={setActiveImageIndex}
                />
              </div>

              {/* ── Right: info + purchase ─────────────────────────────── */}
              <div className="space-y-5">
                <ProductInfo
                  product={product}
                  effectivePrice={effectivePrice()}
                  quantity={quantity}
                />

                <FarmerCard product={product} />

                <QuantitySelector
                  quantity={quantity}
                  unit={product.unit}
                  available={product.qty}
                  minimumOrder={product.minimumOrder}
                  onIncrement={() => increment(50, product.qty)}
                  onDecrement={() => decrement(50, product.minimumOrder ?? 1)}
                  onChange={(qty) => setQuantity(qty, product.minimumOrder ?? 1)}
                />

                <OrderSummary
                  quantity={quantity}
                  unit={product.unit}
                  effectivePrice={effectivePrice()}
                  subtotal={subtotal()}
                  originalPrice={product.price}
                />

                <ProductActions
                  isWishlisted={product.isWishlisted ?? false}
                  isAddingToCart={isAddingToCart}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={toggleWishlist}
                  onShare={handleShare}
                />
              </div>
            </div>

            <Separator />

            {/* ── Tabs: details / reviews / similar ──────────────────── */}
            <ProductTabs
              product={product}
              activeTab={activeTab}
              allProducts={products}
              onTabChange={(t) => setActiveTab(t as "details" | "reviews" | "similar")}
              onReviewHelpful={toggleReviewHelpful}
              onSubmitRating={(r) => submitRatingMutation.mutate(r)}
            />
          </>
        )}
      </div>
    </div>
  );
}
