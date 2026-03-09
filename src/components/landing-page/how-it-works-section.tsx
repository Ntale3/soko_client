import { Icon, type IconName } from "@/components/landing-page/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


const STEPS: { n: string; title: string; desc: string; icon: IconName }[] = [
  { n: "01", icon: "user",     title: "Create Your Account",  desc: "Sign up as a buyer or farmer in under 2 minutes. Verify your identity once and you're live." },
  { n: "02", icon: "shop",     title: "Post or Browse",        desc: "Farmers list produce with photos and prices. Buyers search by crop, district and price range." },
  { n: "03", icon: "chat",     title: "Connect & Negotiate",   desc: "Chat or call directly. Agree on quantity, price and delivery without ever leaving Shamba." },
  { n: "04", icon: "trending", title: "Harvest Your Growth",   desc: "Track earnings, read AI insights, access price forecasts and grow your agricultural business." },
];

const HowItWorksSection = ({ onSignUp }: { onSignUp?: () => void }) => {

  return (
    <section className="px-6 py-24 relative overflow-hidden " style={{background: "var(--shamba-forest)"}}>

      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 10% 80%, rgba(0,196,113,0.06), transparent 50%)" }} />

      <div className="max-w-300 mx-auto relative">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 font-body text-xs font-semibold rounded-full px-3.5 py-1" style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}>
            ✦ Simple Process
          </Badge>
          <h2 className="font-display font-black text-white leading-[1.1] tracking-tight" style={{ fontSize: "clamp(32px,5vw,52px)" }}>
            From signup to first<br />
            <em style={{ color: "var(--shamba-emerald)" }}>sale in minutes</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div key={i} className="text-center relative">
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-7.5 left-[60%] right-[-40%] h-px" style={{ background: "linear-gradient(90deg, rgba(0,196,113,0.5), transparent)" }} />
              )}
              <div
                className="w-15 h-15 rounded-[20px] flex items-center justify-center mx-auto mb-5"
                style={{
                  background: i === 0 ? "var(--shamba-emerald)" : "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Icon name={step.icon} size={26} color={i === 0 ? "var(--shamba-forest)" : "rgba(255,255,255,0.7)"} />
              </div>
              <p className="font-data text-[11px] font-medium tracking-widest mb-2.5" style={{ color: "var(--shamba-emerald)" }}>{step.n}</p>
              <h3 className="font-display font-bold text-white mb-2.5" style={{ fontSize: 18 }}>{step.title}</h3>
              <p className="text-[13px] leading-[1.75]" style={{ color: "rgba(255,255,255,0.5)" }}>{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            onClick={onSignUp}
            className="animate-glow hover:-translate-y-0.5 transition-all gap-2 font-body font-bold"
            style={{ background: "var(--shamba-emerald)", color: "var(--shamba-forest)", padding: "16px 48px", fontSize: 17, borderRadius: 18, height: "auto" }}
          >
            Join Shamba Today <Icon name="arrow" size={20} color="var(--shamba-forest)" />
          </Button>
        </div>
      </div>

    </section>
  )
}

export default HowItWorksSection