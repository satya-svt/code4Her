import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Briefcase, ArrowLeft, User, Users } from "lucide-react";
import { motion } from "framer-motion";

type Role = "employee" | "recruiter";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const isRegister = location.pathname === "/register";

  const [step, setStep] = useState<"form" | "role">("role");
  const [role, setRole] = useState<Role | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRoleSelect = (r: Role) => {
    setRole(r);
    setStep("form");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    if (role === "employee") {
      navigate("/chat");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <Briefcase className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-secondary">ThriveReturn</span>
        </div>

        <div className="rounded-xl border bg-surface p-8 shadow-sm">
          {step === "role" ? (
            <>
              <h1 className="mb-2 text-center text-2xl font-bold text-foreground">
                {isRegister ? "Create Account" : "Welcome Back"}
              </h1>
              <p className="mb-8 text-center text-sm text-muted-foreground">
                {isRegister ? "Choose how you'd like to join" : "Log in as"}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleRoleSelect("employee")}
                  className="card-hover flex flex-col items-center gap-3 rounded-xl border-2 border-border p-6 transition-all hover:border-primary"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-7 w-7 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">Employee</span>
                  <span className="text-xs text-muted-foreground text-center">Returning to work</span>
                </button>

                <button
                  onClick={() => handleRoleSelect("recruiter")}
                  className="card-hover flex flex-col items-center gap-3 rounded-xl border-2 border-border p-6 transition-all hover:border-primary"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10">
                    <Users className="h-7 w-7 text-secondary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">Recruiter</span>
                  <span className="text-xs text-muted-foreground text-center">Hiring talent</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep("role")}
                className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>

              <h1 className="mb-1 text-2xl font-bold text-foreground">
                {isRegister ? "Sign Up" : "Log In"} as{" "}
                <span className="text-primary capitalize">{role}</span>
              </h1>
              <p className="mb-6 text-sm text-muted-foreground">
                Enter your credentials to continue
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {isRegister ? "Create Account" : "Log In"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={() => navigate(isRegister ? "/login" : "/register")}
                  className="font-medium text-primary hover:underline"
                >
                  {isRegister ? "Log In" : "Sign Up"}
                </button>
              </p>
            </>
          )}
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 flex w-full items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </button>
      </motion.div>
    </div>
  );
}
