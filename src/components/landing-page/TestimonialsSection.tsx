import { Icon } from "@/components/landing-page/icon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
  { name: "Okello James",    role: "Maize Farmer · Gulu",    text: "Before Shamba I was selling to middlemen at half price. Now I get market price and know exactly when to sell based on AI forecasts. My income has tripled.", av: "OJ", ac: "#166534" },
  { name: "Nakato Sarah",    role: "Tomato Farmer · Wakiso", text: "The disease detection feature saved my entire harvest. I uploaded a photo and within seconds got a diagnosis and treatment plan. Remarkable.", av: "NS", ac: "#1E40AF" },
  { name: "Tumuhaise Peter", role: "Organic Honey · Mbarara", text: "I export to Kampala supermarkets now. Shamba connected me to buyers I never would have reached. The blog also helped me improve my processing quality.", av: "TP", ac: "var(--shamba-amber)" },
];

export function TestimonialsSection() {
  return (
    <section className="px-6 py-24 bg-background">
      <div className="max-w-300 mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 font-body text-xs font-semibold rounded-full px-3.5 py-1 text-primary" style={{ background: "var(--shamba-emerald-soft)" }}>
            ✦ Farmer Stories
          </Badge>
          <h2 className="font-display font-black leading-[1.1] tracking-tight text-foreground" style={{ fontSize: "clamp(32px,5vw,52px)" }}>
            Real farmers,<br />
            <em style={{ color: "var(--shamba-emerald)" }}>real results</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Card
              key={i}
              className="relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300"
              style={{ borderRadius: 20 }}
            >
              <CardContent className="p-8">
                <div className="absolute top-6 right-7 opacity-[0.06]">
                  <Icon name="quote" size={48} color="var(--foreground)" />
                </div>
                <div className="flex gap-1 mb-5">
                  {[1,2,3,4,5].map(s => <Icon key={s} name="star" size={16} color="var(--shamba-amber)" />)}
                </div>
                <p className="italic leading-[1.8] mb-7 text-[15px] text-card-foreground">"{t.text}"</p>
                <div className="flex gap-3 items-center">
                  <div
                    className="w-12 h-12 rounded-[14px] flex items-center justify-center font-display text-base font-extrabold text-white shrink-0"
                    style={{ background: t.ac }}
                  >
                    {t.av}
                  </div>
                  <div>
                    <p className="font-display font-bold text-[15px]" style={{ color: "var(--foreground)" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "var(--shamba-muted)" }}>{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}