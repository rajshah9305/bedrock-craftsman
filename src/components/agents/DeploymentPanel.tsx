import { DeploymentConfig } from "@/types/agent";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Rocket, AlertTriangle } from "lucide-react";

interface DeploymentPanelProps {
  config: DeploymentConfig;
  onChange: (config: DeploymentConfig) => void;
  onDeploy?: () => void;
}

export const DeploymentPanel = ({ config, onChange, onDeploy }: DeploymentPanelProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Deployment Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Configure deployment settings and monitoring options
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Environment</Label>
            <Select
              value={config.environment}
              onValueChange={(value) => onChange({ ...config, environment: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
                <SelectItem value="production">Production</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>AWS Region</Label>
            <Select
              value={config.region}
              onValueChange={(value) => onChange({ ...config, region: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
                <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Memory (MB)</Label>
            <Select
              value={config.memoryMB.toString()}
              onValueChange={(value) => onChange({ ...config, memoryMB: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="512">512 MB</SelectItem>
                <SelectItem value="1024">1 GB</SelectItem>
                <SelectItem value="2048">2 GB</SelectItem>
                <SelectItem value="4096">4 GB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Timeout (seconds)</Label>
            <Select
              value={config.timeoutSeconds.toString()}
              onValueChange={(value) => onChange({ ...config, timeoutSeconds: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 seconds</SelectItem>
                <SelectItem value="60">1 minute</SelectItem>
                <SelectItem value="120">2 minutes</SelectItem>
                <SelectItem value="300">5 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border">
          <h4 className="font-medium">Monitoring & Logging</h4>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Logging</Label>
              <p className="text-sm text-muted-foreground">
                Log all agent interactions and responses
              </p>
            </div>
            <Switch
              checked={config.loggingEnabled}
              onCheckedChange={(checked) => onChange({ ...config, loggingEnabled: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Tracing</Label>
              <p className="text-sm text-muted-foreground">
                Enable AWS X-Ray tracing for performance monitoring
              </p>
            </div>
            <Switch
              checked={config.tracingEnabled}
              onCheckedChange={(checked) => onChange({ ...config, tracingEnabled: checked })}
            />
          </div>
        </div>

        {config.environment === 'production' && (
          <Card className="bg-warning/10 border-warning/30 p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-warning">Production Deployment</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Ensure all security best practices are followed and testing is complete
                  before deploying to production.
                </p>
              </div>
            </div>
          </Card>
        )}
      </Card>

      <Button onClick={onDeploy} size="lg" className="w-full">
        <Rocket className="h-5 w-5 mr-2" />
        Deploy Agent
      </Button>
    </div>
  );
};
