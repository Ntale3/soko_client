import { C } from "@/constants/colors";
import { Ic } from "@/constants/crisp-svg";

export const panel = (
  <div>
    {/* Heading */}
    <h2
      className="fraunces text-[36px] font-extrabold leading-[1.1] tracking-[-0.3px] text-white mb-4"
    >
      Your farm market,<br />
      <span
        className="italic"
        style={{ color: C.emerald }}
      >
        always open.
      </span>
    </h2>

    {/* Subtext */}
    <p className="text-sm leading-[1.8] mb-8" style={{ color: "rgba(255,255,255,.5)" }}>
      Sign back in to check today's prices, manage your listings,
      and chat with farmers across Uganda.
    </p>

    {/* Feature list */}
    <div className="flex flex-col gap-3.5">
      {[
        { icon: "trending", label: "Live price updates across 135 districts" },
        { icon: "chat",     label: "Direct messaging with verified farmers"  },
        { icon: "ai",       label: "AI crop disease detection & insights"    },
        { icon: "shield",   label: "Secure, verified transactions"           },
      ].map((f) => (
        <div key={f.label} className="flex items-center gap-3">
          {/* Icon bubble */}
          <div
            className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0"
            style={{ background: `${C.emerald}20` }}
          >
            <Ic n={f.icon} s={15} c={C.emerald} />
          </div>
          {/* Label */}
          <span className="text-[13px]" style={{ color: "rgba(255,255,255,.6)" }}>
            {f.label}
          </span>
        </div>
      ))}
    </div>
  </div>
);