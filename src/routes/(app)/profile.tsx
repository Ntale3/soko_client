import { createFileRoute, Link } from "@tanstack/react-router";
import { PenLine, Plus, ShoppingBag } from "lucide-react";

import {
  BuyerStatsRow,
  EarningsPanel,
  FarmerStatsRow,
  OrderHistory,
  OwnProfileHero,
  SettingsPanel,
} from "@/components/profile-page/own-profile-components";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/auth-store";

export const Route = createFileRoute("/(app)/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, isFarmer, isBuyer } = useAuthStore();
  const farmer = isFarmer();
  const buyer = isBuyer();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-sm">
          <p className="text-lg font-semibold text-foreground">You're not signed in</p>
          <p className="text-sm text-muted-foreground">Sign in to view your profile.</p>
          <Link to="/auth/sign-in">
            <Button className="rounded-xl">Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  // ── Build tabs dynamically based on role ─────────────────────────────────

  const tabs = [
    ...(buyer ? [{ value: "orders", label: "Orders", icon: <ShoppingBag size={13} /> }] : []),
    ...(farmer ? [{ value: "earnings", label: "Earnings", icon: null }] : []),
    ...(farmer ? [{ value: "listings", label: "Listings", icon: null }] : []),
    { value: "settings", label: "Settings", icon: null },
  ];

  return (
    <div className="min-h-screen bg-background pt-4 pb-24 md:pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground font-serif">My Profile</h1>
          <Button size="sm" variant="outline" className="rounded-xl gap-1.5 h-9 text-xs">
            <PenLine size={13} /> Edit Profile
          </Button>
        </div>

        {/* Hero card */}
        <OwnProfileHero />

        {/* Stats — role-aware */}
        {buyer && <BuyerStatsRow />}
        {farmer && <FarmerStatsRow />}

        {/* Quick actions for farmers */}
        {farmer && (
          <div className="flex gap-3">
            <Link to="/sell" className="flex-1">
              <Button className="w-full h-10 rounded-xl gap-2 font-semibold text-sm">
                <Plus size={14} /> List New Product
              </Button>
            </Link>
            <Link to="/marketplace" className="flex-1">
              <Button variant="outline" className="w-full h-10 rounded-xl gap-2 text-sm">
                <ShoppingBag size={14} /> View My Listings
              </Button>
            </Link>
          </div>
        )}

        <Separator />

        {/* Tabs */}
        <Tabs defaultValue={tabs[0]?.value}>
          <TabsList
            className={`w-full rounded-xl h-10 bg-muted/50 border border-border/50 grid grid-cols-${tabs.length}`}
          >
            {tabs.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className="rounded-lg text-xs capitalize">
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Orders — buyer */}
          {buyer && (
            <TabsContent value="orders" className="mt-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">Order History</h3>
                <span className="text-xs text-muted-foreground">
                  UGX {(user.totalSpent ?? 0).toLocaleString()} total spent
                </span>
              </div>
              <OrderHistory />
            </TabsContent>
          )}

          {/* Earnings — farmer */}
          {farmer && (
            <TabsContent value="earnings" className="mt-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">Earnings & Payouts</h3>
                <span className="text-xs text-muted-foreground">
                  UGX {(user.pendingPayout ?? 0).toLocaleString()} pending
                </span>
              </div>
              {/* Pending payout banner */}
              {(user.pendingPayout ?? 0) > 0 && (
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl px-4 py-3">
                  <p className="text-xs text-amber-700 dark:text-amber-400">
                    💰 <strong>UGX {(user.pendingPayout ?? 0).toLocaleString()}</strong> will be
                    released to your mobile number once buyers confirm delivery.
                  </p>
                </div>
              )}
              <EarningsPanel />
            </TabsContent>
          )}

          {/* Listings — farmer */}
          {farmer && (
            <TabsContent value="listings" className="mt-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">My Listings</h3>
                <Link to="/sell">
                  <Button size="sm" className="h-7 text-xs rounded-lg gap-1">
                    <Plus size={11} /> Add
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground text-center py-8">
                Listing management coming soon.
              </p>
            </TabsContent>
          )}

          {/* Settings */}
          <TabsContent value="settings" className="mt-5 space-y-3">
            <h3 className="text-sm font-bold text-foreground">Account Settings</h3>
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
