import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { ProductCard } from "@/components/common/product-card";
import {
  FarmerProfileHero,
  FarmerProfileSkeleton,
  FarmerReviewItem,
  FarmerStats,
  RateFarmerCard,
} from "@/components/profile-page/farmer-profile-components";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFarmerListings, useFarmerProfile, useFarmerReviews } from "@/hooks/use-profile";

export const Route = createFileRoute("/(app)/farmers/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: farmer, isLoading, error } = useFarmerProfile(id);
  const { data: listings = [] } = useFarmerListings(id);
  const { data: reviews = [] } = useFarmerReviews(id);

  if (isLoading)
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-24 md:pb-12">
        <FarmerProfileSkeleton />
      </div>
    );

  if (error || !farmer)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Farmer not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-background pt-4 pb-24 md:pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Back */}
        <Link
          to="/search"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={15} /> Back to Search
        </Link>

        {/* Hero */}
        <FarmerProfileHero farmer={farmer} />

        {/* Stats */}
        <FarmerStats farmer={farmer} />

        {/* Rate this farmer */}
        <RateFarmerCard farmer={farmer} />

        <Separator />

        {/* Tabs: listings / reviews */}
        <Tabs defaultValue="listings">
          <TabsList className="w-full sm:w-auto rounded-xl h-10 bg-muted/50 border border-border/50">
            <TabsTrigger value="listings" className="rounded-lg text-sm flex-1 sm:flex-none">
              Listings ({listings.length})
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg text-sm flex-1 sm:flex-none">
              Reviews ({reviews.length})
            </TabsTrigger>
          </TabsList>

          {/* Listings */}
          <TabsContent value="listings" className="mt-6">
            {listings.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-10">
                No active listings from this farmer yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {listings.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews" className="mt-6">
            {reviews.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-10">
                No reviews yet — be the first to rate this farmer.
              </p>
            ) : (
              <div className="space-y-5 divide-y divide-border/40">
                {reviews.map((r) => (
                  <div key={r.id} className="pt-5 first:pt-0">
                    <FarmerReviewItem review={r} />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
