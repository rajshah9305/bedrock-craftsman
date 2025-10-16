import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Plus, Activity, Zap, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Active Agents", value: "3", icon: Bot, color: "text-primary" },
    { label: "Total Requests", value: "12.4K", icon: Activity, color: "text-accent" },
    { label: "Avg Response Time", value: "245ms", icon: Zap, color: "text-success" },
    { label: "Knowledge Bases", value: "5", icon: Database, color: "text-warning" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage your Bedrock agents
          </p>
        </div>
        <Button onClick={() => navigate("/agents/new")} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Create Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 hover:shadow-elegant hover:border-primary/30 transition-all duration-300 border-2 border-border group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-primary/10 group-hover:bg-gradient-primary/20 transition-colors">
                <stat.icon className={`h-7 w-7 ${stat.color}`} />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1 bg-gradient-primary bg-clip-text text-transparent">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 pb-3 border-b border-border last:border-0">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Agent deployment successful</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-gradient-dark">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/agents/new")}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Agent
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/knowledge")}>
              <Database className="h-4 w-4 mr-2" />
              Add Knowledge Base
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/tools")}>
              <Zap className="h-4 w-4 mr-2" />
              Configure Tools
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
