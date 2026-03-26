import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";

// Stat pill shown inside the banner
function StatPill({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: "up" | "down";
}) {
  return (
    <div className="flex flex-col gap-0.5 bg-white/10 backdrop-blur-sm rounded-2xl px-3.5 py-2.5 border border-white/20 min-w-[90px]">
      <span className="text-white/60 text-[10px] uppercase tracking-widest font-medium">
        {label}
      </span>
      <span className="text-white font-bold text-sm leading-none">{value}</span>
      <span
        className={`text-[10px] font-semibold mt-0.5 ${
          trend === "up" ? "text-emerald-300" : "text-red-300"
        }`}
      >
        {trend === "up" ? "↑" : "↓"} {trend === "up" ? "+37%" : "-12%"} 2 wks
      </span>
    </div>
  );
}

const AiBanner = () => {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl">
      {/* ── Background layers ──────────────────────────────────────────── */}
      {/* Base gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-primary via-emerald-600 to-accent" />

      {/* Mesh overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.2)_0%,transparent_70%)]" />

      {/* Decorative ring — top right */}
      <div className="absolute -top-12 -right-12 size-52 rounded-full border-28 border-white/10" />
      <div className="absolute -top-6 -right-6 size-32 rounded-full border-16 border-white/8" />

      {/* Subtle grain texture via SVG filter */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 p-5 md:p-7">
        {/*
          MOBILE: stacked layout (default)
          DESKTOP (md+): side-by-side — text left, stats right
        */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-8">

          {/* Left: text content */}
          <div className="flex-1 min-w-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 rounded-full px-3 py-1 mb-3 backdrop-blur-sm">
              <Sparkles size={11} className="text-emerald-200" />
              <span className="text-white/90 text-[11px] font-semibold uppercase tracking-widest">
                AI Insights
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-1.5 font-serif">
              Avocado prices rising{" "}
              <span className="text-emerald-200">37%</span>{" "}
              in 2 weeks
            </h2>

            {/* Sub */}
            <p className="text-white/55 text-xs md:text-sm mb-4 max-w-sm">
              Based on Kampala market data & regional seasonal trends
            </p>

            {/* CTA */}
            <Button
              size="sm"
              className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold rounded-xl shadow-lg shadow-black/20 gap-1.5 h-9 px-4 transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              View Prediction
              <ArrowRight size={14} />
            </Button>
          </div>

          {/* Right: stat pills */}
          <div className="flex flex-row md:flex-col gap-2 md:gap-2.5 md:items-end">
            <StatPill label="Avocado" value="UGX 4,200/kg" trend="up" />
            <StatPill label="Tomatoes" value="UGX 1,050/kg" trend="down" />

            {/* Confidence indicator — desktop only */}
            <div className="hidden md:flex flex-col gap-1 bg-white/10 rounded-2xl px-3.5 py-2.5 border border-white/20 min-w-[90px]">
              <span className="text-white/60 text-[10px] uppercase tracking-widest font-medium">Confidence</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
                  <div className="h-full w-[87%] rounded-full bg-emerald-300" />
                </div>
                <span className="text-white font-bold text-sm">87%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip — model label, mobile only */}
        <div className="mt-4 md:hidden flex items-center gap-1.5 text-white/40 text-[10px]">
          <TrendingUp size={10} />
          <span>Powered by Soko AI · Updated 2h ago</span>
        </div>

        {/* Bottom strip — desktop */}
        <div className="hidden md:flex mt-5 pt-4 border-t border-white/10 items-center justify-between text-white/40 text-[11px]">
          <span className="flex items-center gap-1.5">
            <TrendingUp size={11} />
            Powered by Soko AI Market Intelligence
          </span>
          <span>Updated 2 hours ago · Kampala, UG</span>
        </div>
      </div>
    </div>
  );
};

export default AiBanner;