import { BedrockModel } from "@/types/agent";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelSelectorProps {
  models: BedrockModel[];
  selectedModel?: BedrockModel;
  onSelect: (model: BedrockModel) => void;
}

export const ModelSelector = ({ models, selectedModel, onSelect }: ModelSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {models.map((model) => {
        const isSelected = selectedModel?.id === model.id;
        return (
          <Card
            key={model.id}
            className={cn(
              "p-5 cursor-pointer transition-all duration-300 hover:shadow-elegant border-2 group",
              isSelected
                ? "border-primary bg-gradient-primary/5 shadow-elegant ring-2 ring-primary/20"
                : "border-border hover:border-primary/40"
            )}
            onClick={() => onSelect(model)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold">{model.name}</h4>
                <p className="text-xs text-muted-foreground">{model.provider}</p>
              </div>
              {isSelected && (
                <div className="p-1 rounded-full bg-primary">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-3">
              {model.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {model.capabilities.map((cap) => (
                <Badge key={cap} variant="secondary" className="text-xs">
                  {cap}
                </Badge>
              ))}
            </div>

            <div className="space-y-1 pt-3 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-accent">
                <Zap className="h-3 w-3" />
                <span className="font-medium">Optimization Hints:</span>
              </div>
              <ul className="space-y-1 ml-5">
                {model.optimizationHints.map((hint, idx) => (
                  <li key={idx} className="text-xs text-muted-foreground">
                    • {hint}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Context: <span className="font-medium text-foreground">
                  {model.contextWindow.toLocaleString()} tokens
                </span>
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
