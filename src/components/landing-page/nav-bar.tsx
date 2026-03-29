import { useNavigate } from "@tanstack/react-router";
import { useState, useSyncExternalStore } from "react";

import { Button } from "../ui/button";
import { Icon } from "./icon";
import { Logo } from "./logo";

interface NavbarProps {
  onSignIn?: () => void;
  onSignUp?: () => void;
}

const scrollStore = {
  subscribe: (cb: () => void) => {
    window.addEventListener("scroll", cb, { passive: true });
    return () => window.removeEventListener("scroll", cb);
  },
  getSnapshot: () => window.scrollY > 40,
  // getServerSnapshot must return false (no window on the server)
  getServerSnapshot: () => false,
};

const LINKS = ["Marketplace", "Blog", "Prices", "AI Assistant"];

const NavBar = ({ onSignIn, onSignUp }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  const scrolled = useSyncExternalStore(
    scrollStore.subscribe,
    scrollStore.getSnapshot,
    scrollStore.getServerSnapshot
  );

  const navigate = useNavigate();

  return (
    <nav
      className={`fixed top-0 inset-x-0  px-6 transition-all duration-300 ${scrolled ? "bg-[#0b2618f5] border-b backdrop-filter-[16px]" : "transparent border-b-none backdrop-filter-none"}`}
    >
      <div className="max-w-310 mx-auto h-17 flex items-center justify-between">
        <Logo dark />

        {/* Desktop CTAs — shadcn Button with variant overrides via style */}
        <div className="hidden md:flex items-center gap-2.5">
          <Button
            variant="outline"
            onClick={() => {
              navigate({ to: "/auth/sign-in" });
            }}
            className="hover:border-(--shamba-emerald) hover:bg-white/8 hover:-translate-y-0.5 transition-all font-body"
            style={{
              background: "transparent",
              color: "white",
              borderColor: "rgba(255,255,255,0.25)",
              borderRadius: 14,
              height: "auto",
              padding: "9px 22px",
              fontSize: 14,
            }}
          >
            Sign In
          </Button>

          <Button
            onClick={() => {
              navigate({ to: "/auth/sign-up" });
            }}
            className="hover:-translate-y-0.5 transition-all font-body"
            style={{
              background: "var(--shamba-emerald)",
              color: "var(--shamba-forest)",
              borderRadius: 14,
              height: "auto",
              padding: "9px 22px",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Get Started
          </Button>
        </div>
        {/* Mobile toggle */}
        <Button
          className="md:hidden bg-transparent border-none cursor-pointer text-white"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} size={24} color="white" />
        </Button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden px-5 py-5 border-t border-white/10"
          style={{ background: "var(--shamba-forest)" }}
        >
          <div className="flex gap-2.5 mt-3">
            <Button
              variant="outline"
              onClick={() => navigate({ to: "/auth/sign-in", from: "/" })}
              className="flex-1"
              style={{
                background: "transparent",
                color: "white",
                borderColor: "rgba(255,255,255,0.25)",
                borderRadius: 14,
                height: "auto",
                padding: "12px",
              }}
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate({ to: "/auth/sign-up", from: "/auth/sign-in" })}
              className="flex-1"
              style={{
                background: "var(--shamba-emerald)",
                color: "var(--shamba-forest)",
                borderRadius: 14,
                height: "auto",
                padding: "12px",
                fontWeight: 700,
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
