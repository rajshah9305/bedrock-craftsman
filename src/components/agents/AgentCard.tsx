import { Agent } from "@/types/agent";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Edit, Play, Pause, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentCardProps {
  agent: Agent;
  onEdit?: (agent: Agent) => void;
  onToggle?: (agent: Agent) => void;
  onDelete?: (agent: Agent) => void;
}

const statusColors = {
  draft: "bg-muted text-muted-foreground border-border",
  active: "bg-success/10 text-success border-success/50 font-medium",
  inactive: "bg-muted text-muted-foreground border-border",
  deploying: "bg-warning/10 text-warning border-warning/50 font-medium animate-pulse",
  error: "bg-error/10 text-error border-error/50 font-medium",
};

export const AgentCard = ({ agent, onEdit, onToggle, onDelete }: AgentCardProps) => {
  return (
    <Card className="p-6 hover:shadow-elegant hover:border-primary/30 transition-all duration-300 border-2 border-border bg-card group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-xl bg-gradient-primary/10 group-hover:bg-gradient-primary/20 transition-colors">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{agent.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {agent.description}
            </p>
          </div>
        </div>
        <Badge className={cn("capitalize", statusColors[agent.status])}>
          {agent.status}
        </Badge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Model</span>
          <span className="font-medium">{agent.model.name}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tools</span>
          <span className="font-medium">{agent.tools.length}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Action Groups</span>
          <span className="font-medium">{agent.actionGroups.length}</span>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onEdit?.(agent)}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onToggle?.(agent)}
        >
          {agent.status === "active" ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete?.(agent)}
        >
          <Trash2 className="h-4 w-4 text-error" />
        </Button>
      </div>
    </Card>
  );
};
