import { Users, CheckCircle2, TrendingUp, Clock } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const stats = [
  { label: "Total Active Returners", value: "2,847", change: "+12%", icon: Users, color: "text-primary" },
  { label: "Successful Matches", value: "1,203", change: "+8%", icon: CheckCircle2, color: "text-accent" },
  { label: "Top Career Path", value: "Data Analytics", change: "↑ Trending", icon: TrendingUp, color: "text-secondary" },
  { label: "Avg. Upskill Duration", value: "6.2 Weeks", change: "-0.5 wk", icon: Clock, color: "text-primary" },
];

const skillsData = [
  { skill: "Python", demand: 89 },
  { skill: "Cloud/AWS", demand: 76 },
  { skill: "React", demand: 72 },
  { skill: "Data Analysis", demand: 68 },
  { skill: "Agile/Scrum", demand: 63 },
  { skill: "UX Design", demand: 55 },
];

const growthData = [
  { month: "Aug", users: 820, matches: 180 },
  { month: "Sep", users: 1100, matches: 290 },
  { month: "Oct", users: 1450, matches: 420 },
  { month: "Nov", users: 1820, matches: 610 },
  { month: "Dec", users: 2200, matches: 780 },
  { month: "Jan", users: 2500, matches: 950 },
  { month: "Feb", users: 2847, matches: 1203 },
];

export default function AdminDashboard() {
  return (
    <div className="container py-8">
      {/* Metric Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.25 }}
            className="card-hover rounded-xl border bg-surface p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <span className="text-xs font-medium text-accent">{stat.change}</span>
            </div>
            <p className="mt-3 text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="rounded-xl border bg-surface p-6 shadow-sm"
        >
          <h3 className="mb-4 font-semibold text-secondary">Skills in High Demand</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={skillsData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} stroke="hsl(215,16%,47%)" />
              <YAxis dataKey="skill" type="category" tick={{ fontSize: 12 }} stroke="hsl(215,16%,47%)" width={90} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(214,32%,91%)" }} />
              <Bar dataKey="demand" fill="hsl(217,91%,60%)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="rounded-xl border bg-surface p-6 shadow-sm"
        >
          <h3 className="mb-4 font-semibold text-secondary">Platform Growth</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215,16%,47%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215,16%,47%)" />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(214,32%,91%)" }} />
              <Line type="monotone" dataKey="users" stroke="hsl(217,91%,60%)" strokeWidth={2.5} dot={{ r: 4 }} name="Users" />
              <Line type="monotone" dataKey="matches" stroke="hsl(160,84%,39%)" strokeWidth={2.5} dot={{ r: 4 }} name="Matches" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
