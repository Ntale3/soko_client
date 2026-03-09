"use client";
import React, { useRef, useSyncExternalStore } from "react";

// ── useInView ────────────────────────────────────────────────────────────────
// Wraps IntersectionObserver in useSyncExternalStore so no useEffect is needed.
// Once the element enters the viewport the observer disconnects — fires once only.
//
// subscribe   → creates the observer, attaches it to the element, returns cleanup
// getSnapshot → returns the current boolean from the shared ref
//
// We keep `seen` outside in a WeakMap keyed by element so each instance
// has its own slot without needing component-level state.

const seenMap = new WeakMap<Element, boolean>()

function useInView(ref: React.RefObject<Element | null>, threshold = 0.3) {
  return useSyncExternalStore(
    // subscribe — called once by React on mount
    (notify) => {
      const el = ref.current
      if (!el) return () => {}

      // Already visible from a previous render (e.g. HMR) — nothing to do
      if (seenMap.get(el)) { notify(); return () => {} }

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            seenMap.set(el, true)
            obs.disconnect()   // fire once then stop observing
            notify()           // tell React to re-read the snapshot
          }
        },
        { threshold }
      )
      obs.observe(el)
      return () => obs.disconnect()
    },
    // getSnapshot — called on every render to read current value
    () => (ref.current ? (seenMap.get(ref.current) ?? false) : false),
    // getServerSnapshot — SSR returns false (element doesn't exist yet)
    () => false,
  )
}

// ── Counter ──────────────────────────────────────────────────────────────────
// Replaces setInterval + useEffect with requestAnimationFrame via
// useSyncExternalStore. The store holds the animated value in a plain object
// (outside React state) and notifies React on each frame until done.

function Counter({ end, suffix, active }: { end: number; suffix: string; active: boolean }) {
  // Each Counter instance gets its own store so they animate independently
  const storeRef = useRef<{
    value: number
    listeners: Set<() => void>
    started: boolean
  } | null>(null)

  if (!storeRef.current) {
    storeRef.current = { value: 0, listeners: new Set(), started: false }
  }

  const store = storeRef.current

  const value = useSyncExternalStore(
    // subscribe
    (notify) => {
      store.listeners.add(notify)

      // Kick off the rAF loop the first time active becomes true
      if (active && !store.started) {
        store.started = true
        const duration = 1800
        const startTime = performance.now()

        const tick = (now: number) => {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          // Ease-out: progress² feels natural for counting up
          store.value = Math.floor(easeOut(progress) * end)

          store.listeners.forEach((l) => l()) // notify all subscribers

          if (progress < 1) requestAnimationFrame(tick)
          else store.value = end  // ensure exact final value
        }

        requestAnimationFrame(tick)
      }

      return () => { store.listeners.delete(notify) }
    },
    // getSnapshot
    () => store.value,
    // getServerSnapshot
    () => 0,
  )

  return <span>{value.toLocaleString()}{suffix}</span>
}

// Ease-out cubic — slows down at the end
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

// ── StatsSection ─────────────────────────────────────────────────────────────

const STATS = [
  { val: 12400, suffix: "+", label: "Verified Farmers",  dark: true  },
  { val: 135,   suffix: "",  label: "Districts Covered", dark: false },
  { val: 48000, suffix: "+", label: "Products Listed",   dark: false },
  { val: 98,    suffix: "%", label: "Satisfaction Rate", dark: false },
]

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref)

  return (
    <section className="py-20 px-6 bg-background" >
      <div
        ref={ref}
        className="max-w-300 mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            className={`py-8 px-5 rounded-[24px] ${s.dark?'bg-(--shamba-forest)  ':'text-primary border'}`}
            // style={{
            //   background: s.dark ? "var(--shamba-forest)" : "",
            //   border: s.dark ? "none" : "1px solid var(--shamba-border)",
            // }}

          >
            <p
              className="font-display font-black leading-none"
              style={{ fontSize: "clamp(32px,4vw,52px)", color: s.dark ? "var(--shamba-emerald)" : "var(--foreground)" }}
            >
              <Counter end={s.val} suffix={s.suffix} active={visible} />
            </p>
            <p
              className="text-sm font-medium mt-2"
              style={{ color: s.dark ? "rgba(255,255,255,0.55)" : "var(--shamba-muted)" }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}