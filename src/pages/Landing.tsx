import { useNavigate } from "react-router-dom";
import { Briefcase, Sparkles, ArrowRight, Users, ShieldCheck, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Sparkles, title: "AI-Powered Guidance", desc: "Get personalized career roadmaps tailored to your experience and goals." },
  { icon: ShieldCheck, title: "Bias-Free Hiring", desc: "Blind candidate profiles ensure fair evaluation based on skills alone." },
  { icon: TrendingUp, title: "Track Your Progress", desc: "Monitor your readiness score and skill development in real-time." },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b bg-surface/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-secondary">SheReturns</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="rounded-lg px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container py-20 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl lg:text-6xl"
          >
            Your Career Break{" "}
            <span className="text-primary">Doesn't Define You</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            ReEntry uses AI to build personalized re-entry roadmaps, helping women return to the workforce with confidence — and connecting them with bias-free hiring opportunities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <button
              onClick={() => navigate("/register")}
              className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Log In
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/50 py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-2xl font-bold text-secondary">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className="card-hover rounded-xl border bg-surface p-8 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ReEntry. Empowering career comebacks.
      </footer>
    </div>
  );
}
