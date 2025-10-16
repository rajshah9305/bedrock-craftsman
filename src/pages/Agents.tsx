import { useState } from "react";
import { Agent } from "@/types/agent";
import { AgentCard } from "@/components/agents/AgentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { bedrockModels } from "@/data/bedrockModels";
import { toast } from "sonner";

export default function Agents() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock agents data
  const [agents] = useState<Agent[]>([
    {
      id: "1",
      name: "Customer Support Agent",
      description: "Handles customer inquiries and provides product information",
      model: bedrockModels[0],
      status: "active",
      instructions: "You are a helpful customer support agent...",
      tools: [],
      actionGroups: [],
      knowledgeBases: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "Code Review Assistant",
      description: "Reviews code and provides optimization suggestions",
      model: bedrockModels[1],
      status: "draft",
      instructions: "You are an expert code reviewer...",
      tools: [],
      actionGroups: [],
      knowledgeBases: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (agent: Agent) => {
    navigate(`/agents/${agent.id}/edit`);
  };

  const handleToggle = (agent: Agent) => {
    toast.success(
      agent.status === "active" 
        ? `${agent.name} deactivated` 
        : `${agent.name} activated`
    );
  };

  const handleDelete = (agent: Agent) => {
    toast.success(`${agent.name} deleted`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agents</h1>
          <p className="text-muted-foreground mt-1">
            Manage your Bedrock AI agents
          </p>
        </div>
        <Button onClick={() => navigate("/agents/new")} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Create Agent
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search agents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onEdit={handleEdit}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No agents found</p>
        </div>
      )}
    </div>
  );
}
