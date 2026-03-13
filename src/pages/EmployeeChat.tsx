import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Bot, User, Briefcase, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "ai" | "user";
  text: string;
}

const initialMessages: Message[] = [
  {
    role: "ai",
    text: "Hi there! 👋 I'm your AI Career Counselor. I'm here to help you chart your path back into the workforce.\n\nTo get started, could you tell me about your most recent role before your career break?",
  },
];

const aiResponses = [
  "That's great experience! How long was your career break, and what prompted it?",
  "Thank you for sharing. What kind of role or industry are you hoping to transition into?",
  "Wonderful! Based on what you've told me, I can see some strong transferable skills. Let me think about the best path forward for you.\n\nI'd recommend focusing on updating your technical skills while leveraging your existing expertise. Would you like me to create a personalized roadmap?",
  "Perfect! I'll prepare a comprehensive re-entry plan for you. Click **Proceed** when you're ready to see your personalized roadmap and skills assessment.",
];

export default function EmployeeChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim() || isTyping) return;
    const userMsg: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiText = aiResponses[responseIndex] || "That's very helpful context. Click **Proceed** whenever you're ready to see your personalized plan!";
      setMessages((prev) => [...prev, { role: "ai", text: aiText }]);
      setResponseIndex((i) => i + 1);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-surface/80 backdrop-blur-md">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold text-secondary">ReEntry</span>
          </div>
          <button
            onClick={() => navigate("/portal")}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Proceed <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="container max-w-3xl py-6">
            {/* Welcome badge */}
            <div className="mb-6 flex items-center justify-center">
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                AI Career Counselor
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                  >
                    {msg.role === "ai" && (
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "ai"
                          ? "bg-muted text-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {msg.text.split("\n").map((line, li) => (
                        <span key={li}>
                          {line.split(/(\*\*.*?\*\*)/).map((part, pi) =>
                            part.startsWith("**") && part.endsWith("**") ? (
                              <strong key={pi}>{part.slice(2, -2)}</strong>
                            ) : (
                              <span key={pi}>{part}</span>
                            )
                          )}
                          {li < msg.text.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                    {msg.role === "user" && (
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                        <User className="h-4 w-4 text-secondary" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="rounded-2xl bg-muted px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="border-t bg-surface/80 backdrop-blur-md">
          <div className="container max-w-3xl py-4">
            <div className="flex gap-3 rounded-xl border bg-background p-2 shadow-sm">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                disabled={isTyping}
                className="flex-1 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={isTyping || !input.trim()}
                className="flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              AI Career Counselor can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
