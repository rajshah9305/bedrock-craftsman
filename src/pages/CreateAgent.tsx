import { useState } from "react";
import { Agent, BedrockModel, ToolConfig, DeploymentConfig } from "@/types/agent";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModelSelector } from "@/components/agents/ModelSelector";
import { ToolConfigurator } from "@/components/agents/ToolConfigurator";
import { DeploymentPanel } from "@/components/agents/DeploymentPanel";
import { bedrockModels } from "@/data/bedrockModels";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

export default function CreateAgent() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  
  const [agentData, setAgentData] = useState<Partial<Agent>>({
    name: "",
    description: "",
    instructions: "",
    tools: [],
    actionGroups: [],
    knowledgeBases: [],
  });

  const [selectedModel, setSelectedModel] = useState<BedrockModel | undefined>(bedrockModels[0]);
  
  const [deploymentConfig, setDeploymentConfig] = useState<DeploymentConfig>({
    environment: "development",
    region: "us-east-1",
    memoryMB: 1024,
    timeoutSeconds: 60,
    loggingEnabled: true,
    tracingEnabled: false,
  });

  const handleSave = () => {
    if (!agentData.name || !agentData.description || !selectedModel) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Agent created successfully!");
    navigate("/agents");
  };

  const handleDeploy = () => {
    toast.success("Deploying agent...");
    setTimeout(() => {
      toast.success("Agent deployed successfully!");
      navigate("/agents");
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/agents")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Create Agent</h1>
            <p className="text-muted-foreground mt-1">
              Configure your new Bedrock agent
            </p>
          </div>
        </div>
        <Button onClick={handleSave} size="lg">
          <Save className="h-5 w-5 mr-2" />
          Save Agent
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="model">Model</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="deploy">Deploy</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card className="p-6 space-y-4">
            <div>
              <Label>Agent Name *</Label>
              <Input
                value={agentData.name}
                onChange={(e) => setAgentData({ ...agentData, name: e.target.value })}
                placeholder="e.g., Customer Support Agent"
              />
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea
                value={agentData.description}
                onChange={(e) => setAgentData({ ...agentData, description: e.target.value })}
                placeholder="Describe what this agent does..."
                rows={3}
              />
            </div>

            <div>
              <Label>System Instructions</Label>
              <Textarea
                value={agentData.instructions}
                onChange={(e) => setAgentData({ ...agentData, instructions: e.target.value })}
                placeholder="You are a helpful AI assistant that..."
                rows={6}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Define the agent's behavior, personality, and guidelines
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="model">
          <ModelSelector
            models={bedrockModels}
            selectedModel={selectedModel}
            onSelect={setSelectedModel}
          />
        </TabsContent>

        <TabsContent value="tools">
          <ToolConfigurator
            tools={agentData.tools || []}
            onChange={(tools) => setAgentData({ ...agentData, tools })}
          />
        </TabsContent>

        <TabsContent value="actions">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              Action group builder coming soon...
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="deploy">
          <DeploymentPanel
            config={deploymentConfig}
            onChange={setDeploymentConfig}
            onDeploy={handleDeploy}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
