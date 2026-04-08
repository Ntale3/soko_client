import { ReactElement, ReactNode } from "react";

import { C } from "@/constants/colors";
import { Ic } from "@/constants/crisp-svg";

import { Logo } from "../landing-page/logo";

const AuthLayout = ({ children, panel }: { children: ReactNode; panel: ReactElement }) => (
  <div className="flex min-h-screen">
    {/* ── Left panel — decorative ── */}
    <div
      className="hidden lg:flex flex-col flex-none w-120 relative overflow-hidden p-10"
      style={{ background: C.forest }}
    >
      {/* Radial gradient texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, ${C.emerald}15, transparent 50%),
            radial-gradient(circle at 80% 80%, ${C.amber}08, transparent 45%)
          `,
        }}
      />

      {/* SVG cross pattern texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300C471' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo */}
        <div className="cursor-pointer mb-12">
          <Logo dark size="md" />
        </div>

        {/* Panel slot */}
        {panel}

        {/* Testimonial — pushed to bottom */}
        <div className="my-8 pt-12">
          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.10)",
            }}
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-3.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Ic key={s} n="star" s={14} c={C.amber} />
              ))}
            </div>

            {/* Quote */}
            <p
              className="fraunces italic text-base leading-relaxed mb-4"
              style={{ color: "rgba(255,255,255,.80)" }}
            >
              "Soko changed everything. I now sell directly to Kampala buyers at full market price.
              My family's income has never been better."
            </p>

            {/* Attribution */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold shrink-0 fraunces"
                style={{ background: C.emerald, color: C.forest }}
              >
                NS
              </div>
              <div>
                <div className="text-white text-sm font-semibold">Nakato Sarah</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,.45)" }}>
                  Tomato Farmer · Wakiso
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* ── Right panel — form ── */}
    <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 overflow-y-auto bg-background">
      <div className="w-full max-w-105">{children}</div>
    </div>
  </div>
);

export default AuthLayout;
