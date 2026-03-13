import { useState } from "react";
import TopNav from "@/components/TopNav";
import ReturnerPortal from "@/components/ReturnerPortal";
import RecruiterPortal from "@/components/RecruiterPortal";
import AdminDashboard from "@/components/AdminDashboard";

type View = "returner" | "recruiter" | "admin";

export default function Index() {
  const [activeView, setActiveView] = useState<View>("returner");

  return (
    <div className="min-h-screen bg-background">
      <TopNav activeView={activeView} onViewChange={setActiveView} />
      {activeView === "returner" && <ReturnerPortal />}
      {activeView === "recruiter" && <RecruiterPortal />}
      {activeView === "admin" && <AdminDashboard />}
    </div>
  );
}
