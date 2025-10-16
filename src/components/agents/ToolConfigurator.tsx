import { useState } from "react";
import { ToolConfig } from "@/types/agent";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Settings } from "lucide-react";
import { toast } from "sonner";

interface ToolConfiguratorProps {
  tools: ToolConfig[];
  onChange: (tools: ToolConfig[]) => void;
}

export const ToolConfigurator = ({ tools, onChange }: ToolConfiguratorProps) => {
  const [isAddingTool, setIsAddingTool] = useState(false);
  const [newTool, setNewTool] = useState<Partial<ToolConfig>>({
    name: "",
    description: "",
    type: "api",
    configuration: {},
  });

  const addTool = () => {
    if (!newTool.name || !newTool.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    const tool: ToolConfig = {
      id: `tool-${Date.now()}`,
      name: newTool.name,
      description: newTool.description,
      type: newTool.type as any,
      configuration: newTool.configuration || {},
    };

    onChange([...tools, tool]);
    setNewTool({ name: "", description: "", type: "api", configuration: {} });
    setIsAddingTool(false);
    toast.success("Tool added successfully");
  };

  const removeTool = (id: string) => {
    onChange(tools.filter(t => t.id !== id));
    toast.success("Tool removed");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Tool Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Configure external tools and APIs for your agent
          </p>
        </div>
        <Button onClick={() => setIsAddingTool(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Tool
        </Button>
      </div>

      {tools.length === 0 && !isAddingTool && (
        <Card className="p-8 text-center">
          <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No tools configured yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add tools to extend your agent's capabilities
          </p>
        </Card>
      )}

      <div className="space-y-3">
        {tools.map((tool) => (
          <Card key={tool.id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold">{tool.name}</h4>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-secondary px-2 py-1 rounded">
                    {tool.type}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeTool(tool.id)}
              >
                <Trash2 className="h-4 w-4 text-error" />
              </Button>
            </div>
          </Card>
        ))}

        {isAddingTool && (
          <Card className="p-4 border-primary">
            <div className="space-y-4">
              <div>
                <Label>Tool Name</Label>
                <Input
                  value={newTool.name}
                  onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                  placeholder="e.g., Weather API"
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={newTool.description}
                  onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
                  placeholder="Describe what this tool does..."
                  rows={2}
                />
              </div>

              <div>
                <Label>Type</Label>
                <Select
                  value={newTool.type}
                  onValueChange={(value) => setNewTool({ ...newTool, type: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="api">API</SelectItem>
                    <SelectItem value="lambda">Lambda Function</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsAddingTool(false)}
                >
                  Cancel
                </Button>
                <Button onClick={addTool}>
                  Add Tool
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
