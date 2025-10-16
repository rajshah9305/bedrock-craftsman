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
  draft: "bg-muted text-muted-foreground",
  active: "bg-success/20 text-success border-success/30",
  inactive: "bg-muted text-muted-foreground",
  deploying: "bg-warning/20 text-warning border-warning/30",
  error: "bg-error/20 text-error border-error/30",
};

export const AgentCard = ({ agent, onEdit, onToggle, onDelete }: AgentCardProps) => {
  return (
    <Card className="p-6 hover:shadow-elegant transition-all duration-300 border-border bg-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
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
