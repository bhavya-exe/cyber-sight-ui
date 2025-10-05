import { Shield, AlertTriangle, Activity, CheckCircle } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { mockChartData, mockVulnerabilities } from "@/data/mockData";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Dashboard = () => {
  const criticalCount = mockVulnerabilities.filter((v) => v.severity === "Critical").length;
  const totalScans = 12;
  const activeScans = 2;
  const resolvedIssues = 45;

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold mb-2">Security Dashboard</h1>
          <p className="text-muted-foreground">Monitor your infrastructure security in real-time</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Scans"
            value={totalScans}
            icon={Shield}
            trend="+3 this week"
          />
          <StatCard
            title="Active Scans"
            value={activeScans}
            icon={Activity}
            variant="default"
          />
          <StatCard
            title="Critical Vulnerabilities"
            value={criticalCount}
            icon={AlertTriangle}
            variant="critical"
            trend="Requires immediate attention"
          />
          <StatCard
            title="Resolved Issues"
            value={resolvedIssues}
            icon={CheckCircle}
            variant="success"
            trend="+12 this month"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Vulnerabilities by Severity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={{ stroke: "hsl(var(--foreground))" }}
                    label={(entry) => {
                      return (
                        <text
                          x={entry.x}
                          y={entry.y}
                          fill="hsl(var(--foreground))"
                          textAnchor={entry.x > entry.cx ? 'start' : 'end'}
                          dominantBaseline="central"
                        >
                          {`${entry.name}: ${entry.value}`}
                        </text>
                      );
                    }}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Weekly Scan Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { day: "Mon", scans: 4 },
                    { day: "Tue", scans: 3 },
                    { day: "Wed", scans: 5 },
                    { day: "Thu", scans: 2 },
                    { day: "Fri", scans: 6 },
                    { day: "Sat", scans: 1 },
                    { day: "Sun", scans: 0 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="day" 
                    stroke="hsl(var(--foreground))" 
                    tick={{ fill: "hsl(var(--foreground))" }}
                  />
                  <YAxis 
                    stroke="hsl(var(--foreground))"
                    tick={{ fill: "hsl(var(--foreground))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Bar dataKey="scans" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Vulnerabilities */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Recent Vulnerabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockVulnerabilities.slice(0, 3).map((vuln) => (
                <div
                  key={vuln.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold">{vuln.cve_id}</p>
                    <p className="text-sm text-muted-foreground">{vuln.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono">CVSS: {vuln.cvss}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      vuln.severity === "Critical" ? "bg-critical text-white" :
                      vuln.severity === "High" ? "bg-high text-white" :
                      "bg-medium text-white"
                    }`}>
                      {vuln.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
