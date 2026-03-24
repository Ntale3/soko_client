import React from "react";

import { Icon, type IconName } from "@/components/landing-page/icon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const FEATURES: { icon: IconName; title: string; desc: string; color: string }[] = [
  {
    icon: "shop",
    title: "Live Marketplace",
    desc: "Post, browse and purchase fresh produce from verified Ugandan farmers. Zero middlemen, maximum value.",
    color: "var(--shamba-emerald)",
  },
  {
    icon: "trending",
    title: "Price Intelligence",
    desc: "Real-time crop prices across 135 districts with 30-day AI forecasts so you always sell at the right time.",
    color: "var(--shamba-amber)",
  },
  {
    icon: "chat",
    title: "Direct Farmer Chat",
    desc: "Message or call any farmer inside the app. Build relationships and arrange delivery seamlessly.",
    color: "#818CF8",
  },
  {
    icon: "ai",
    title: "Shamba AI Assistant",
    desc: "Upload a leaf photo for disease diagnosis. Ask about planting seasons, market trends, and weather risks.",
    color: "#34D399",
  },
  {
    icon: "chart",
    title: "Blog & Community",
    desc: "Learn from 12,000+ farmers. Share knowledge, read market insights, connect with Uganda's agri community.",
    color: "#FB923C",
  },
  {
    icon: "shield",
    title: "Verified & Secure",
    desc: "Every farmer is KYC-verified. Every transaction is protected. Trust is the foundation of Shamba.",
    color: "#F472B6",
  },
];

export function FeaturesSection() {
  return (
    <section className="px-6 pb-24 bg-background">
      <div className="max-w-300 mx-auto">
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 font-body text-xs font-semibold rounded-full px-3.5 py-1"
            style={{ background: "var(--shamba-emerald-soft)", color: "#166534" }}
          >
            ✦ Everything You Need
          </Badge>
          <h2
            className="font-display font-black leading-[1.1] tracking-tight mb-4 mx-auto text-primary"
            style={{ fontSize: "clamp(32px,5vw,52px)", maxWidth: 600 }}
          >
            Built for every farmer, every buyer
          </h2>
          <p
            className="leading-[1.7] mx-auto"
            style={{ color: "var(--shamba-muted)", fontSize: 17, maxWidth: 480 }}
          >
            One platform handles your entire agricultural commerce journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <Card
              key={i}
              className="hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:border-[rgba(0,196,113,0.3)] transition-all duration-300 cursor-default"
              style={{ borderRadius: 20 }}
            >
              <CardContent className="p-7">
                <div
                  className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5"
                  style={{ width: 52, height: 52, background: f.color + "18" }}
                >
                  <Icon name={f.icon} size={24} color={f.color} />
                </div>
                <h3
                  className="font-display font-bold mb-2.5"
                  style={{ fontSize: 20, color: "var(--foreground)" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-[1.75] text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
