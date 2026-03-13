import { useState } from "react";
import { Send, Bot, User, BookOpen, Clock, ClipboardCheck, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "ai" | "user";
  text: string;
}

const initialMessages: Message[] = [
  { role: "ai", text: "Welcome back! 👋 I'm your AI Career Counselor. I'm here to help you create a personalized re-entry roadmap. Let's start — what was your most recent role before your career break?" },
];

const roadmapSteps = [
  {
    title: "Refresh Core Skills",
    description: "Update your Python and data analysis knowledge with a focused refresher course.",
    duration: "2 Weeks",
    icon: BookOpen,
    status: "current" as const,
  },
  {
    title: "Learn Cloud Fundamentals",
    description: "Complete AWS Cloud Practitioner certification to meet modern infrastructure demands.",
    duration: "4 Weeks",
    icon: Clock,
    status: "upcoming" as const,
  },
  {
    title: "Agile & Collaboration Tools",
    description: "Get certified in Agile methodology and learn modern project management tools.",
    duration: "2 Weeks",
    icon: ClipboardCheck,
    status: "upcoming" as const,
  },
  {
    title: "Take Skill Assessment",
    description: "Validate your learning with our comprehensive assessment to earn your Readiness Score.",
    duration: "1 Week",
    icon: CheckCircle2,
    status: "upcoming" as const,
  },
];

const metrics = [
  { label: "Capability Score", value: 78, color: "text-primary" },
  { label: "Reliability", value: 92, color: "text-accent" },
  { label: "Adaptability", value: 85, color: "text-secondary" },
];

function CircularProgress({ value, color, size = 100 }: { value: number; color: string; size?: number }) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} fill="none" className="stroke-muted" />
        <circle
          cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${color.replace("text-", "stroke-")} transition-all duration-700 ease-out`}
        />
      </svg>
      <span className={`absolute text-xl font-bold ${color}`}>{value}%</span>
    </div>
  );
}

export default function ReturnerPortal() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [showRoadmap, setShowRoadmap] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "That's great experience! Based on your background in data analytics and your 3-year gap, I've identified key areas to focus on. Let me generate your personalized roadmap now...",
        },
      ]);
      setTimeout(() => setShowRoadmap(true), 800);
    }, 1000);
  };

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Chat */}
          <div className="rounded-xl border bg-surface shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 border-b px-5 py-3">
              <Bot className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-secondary">AI Career Counselor</h2>
              <span className="ml-auto flex items-center gap-1 text-xs text-accent font-medium">
                <span className="h-2 w-2 rounded-full bg-accent" /> Online
              </span>
            </div>

            <div className="flex flex-col gap-3 p-5 min-h-[320px] max-h-[400px] overflow-y-auto">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === "ai" ? "bg-primary/10" : "bg-secondary/10"}`}>
                      {msg.role === "ai" ? <Bot className="h-4 w-4 text-primary" /> : <User className="h-4 w-4 text-secondary" />}
                    </div>
                    <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${msg.role === "ai" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"}`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Tell me about your experience..."
                  className="flex-1 rounded-lg border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button onClick={sendMessage} className="flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-primary-foreground transition-colors hover:bg-primary/90">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Roadmap */}
          <AnimatePresence>
            {showRoadmap && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="mb-4 text-lg font-semibold text-secondary">Your Personalized Re-entry Roadmap</h3>
                <div className="relative space-y-0">
                  {roadmapSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15, duration: 0.3 }}
                      className="relative flex gap-4 pb-8 last:pb-0"
                    >
                      {/* Timeline line */}
                      {i < roadmapSteps.length - 1 && (
                        <div className="absolute left-[19px] top-10 h-full w-0.5 bg-border" />
                      )}
                      {/* Icon */}
                      <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${step.status === "current" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        <step.icon className="h-5 w-5" />
                      </div>
                      {/* Card */}
                      <div className="card-hover flex-1 rounded-xl border bg-surface p-4 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-foreground">{step.title}</h4>
                            <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                          </div>
                          <span className="ml-4 shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            {step.duration}
                          </span>
                        </div>
                        {step.title === "Take Skill Assessment" && (
                          <button className="mt-3 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90">
                            Take Assessment
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-surface p-6 shadow-sm">
            <h3 className="mb-6 font-semibold text-secondary">Profile Metrics</h3>
            <div className="flex flex-col items-center gap-6">
              {metrics.map((m) => (
                <div key={m.label} className="flex flex-col items-center gap-2">
                  <CircularProgress value={m.value} color={m.color} />
                  <span className="text-sm font-medium text-muted-foreground">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
