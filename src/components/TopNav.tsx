import { Briefcase, Users, BarChart3, Sparkles } from "lucide-react";

type View = "returner" | "recruiter" | "admin";

interface TopNavProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

const tabs: { id: View; label: string; icon: React.ElementType }[] = [
  { id: "returner", label: "Returner Portal", icon: Sparkles },
  { id: "recruiter", label: "Recruiter Portal", icon: Users },
  { id: "admin", label: "Admin Dashboard", icon: BarChart3 },
];

export default function TopNav({ activeView, onViewChange }: TopNavProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-surface/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-secondary">ReEntry</span>
        </div>

        <nav className="flex gap-1 rounded-lg bg-muted p-1">
          {tabs.map((tab) => {
            const active = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onViewChange(tab.id)}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-150 ${
                  active
                    ? "bg-surface text-secondary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="w-24" />
      </div>
    </header>
  );
}
