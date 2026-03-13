import { useState } from "react";
import { CircleUserRound, Search, SlidersHorizontal, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const candidates = [
  { id: 1, readiness: 95, skills: ["Python", "Cloud Architecture", "Agile", "SQL"], roadmap: "Data Analytics Transition", experience: "8+ years", location: "Remote-Friendly" },
  { id: 2, readiness: 92, skills: ["React", "TypeScript", "Node.js", "AWS"], roadmap: "Full-Stack Engineering", experience: "6+ years", location: "Hybrid" },
  { id: 3, readiness: 88, skills: ["Product Management", "Scrum", "Analytics"], roadmap: "Product Manager Re-entry", experience: "10+ years", location: "Remote-Friendly" },
  { id: 4, readiness: 85, skills: ["UX Design", "Figma", "User Research", "Prototyping"], roadmap: "UX Design Refresh", experience: "5+ years", location: "On-site" },
  { id: 5, readiness: 91, skills: ["Machine Learning", "Python", "TensorFlow"], roadmap: "AI/ML Specialist Path", experience: "7+ years", location: "Remote-Friendly" },
  { id: 6, readiness: 79, skills: ["Marketing", "SEO", "Content Strategy"], roadmap: "Digital Marketing Transition", experience: "4+ years", location: "Hybrid" },
];

export default function RecruiterPortal() {
  const [search, setSearch] = useState("");
  const [minScore, setMinScore] = useState(0);
  const { toast } = useToast();

  const filtered = candidates.filter(
    (c) =>
      c.readiness >= minScore &&
      (search === "" || c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())))
  );

  const handleConnect = (id: number) => {
    toast({
      title: "Connection Request Sent! ✉️",
      description: `Candidate #${id} has been notified. Their contact info: candidate${id}@reentry-platform.com`,
    });
  };

  return (
    <div className="container py-8">
      {/* Filters */}
      <div className="mb-8 rounded-xl border bg-surface p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search skills (e.g., Python, React)..."
              className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <label className="text-sm font-medium text-muted-foreground">Min Readiness:</label>
            <select
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value={0}>Any</option>
              <option value={70}>70%+</option>
              <option value={80}>80%+</option>
              <option value={90}>90%+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.25 }}
            className="card-hover rounded-xl border bg-surface p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <CircleUserRound className="h-7 w-7 text-muted-foreground" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-muted-foreground">Readiness Score</p>
                <p className={`text-2xl font-bold ${c.readiness >= 90 ? "text-accent" : "text-primary"}`}>
                  {c.readiness}%
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {c.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              <p className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {c.location}
              </p>
              <p>Completed: <span className="font-medium text-foreground">{c.roadmap}</span></p>
              <p>Experience: {c.experience}</p>
            </div>

            <button
              onClick={() => handleConnect(c.id)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Mail className="h-4 w-4" />
              Request to Connect
            </button>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center text-muted-foreground">
          <p className="text-lg font-medium">No candidates match your filters.</p>
          <p className="text-sm">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
}
