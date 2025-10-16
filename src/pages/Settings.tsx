import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiKeyCard } from "@/components/settings/ApiKeyCard";
import { Switch } from "@/components/ui/switch";
import { Globe, Shield, Bell, Palette } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [region, setRegion] = useState("us-east-1");
  const [loggingEnabled, setLoggingEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoDeployEnabled, setAutoDeployEnabled] = useState(false);

  const handleRegionChange = (value: string) => {
    setRegion(value);
    toast.success(`Region changed to ${value}`);
  };

  const regions = [
    { value: "us-east-1", label: "US East (N. Virginia)" },
    { value: "us-east-2", label: "US East (Ohio)" },
    { value: "us-west-1", label: "US West (N. California)" },
    { value: "us-west-2", label: "US West (Oregon)" },
    { value: "eu-west-1", label: "EU (Ireland)" },
    { value: "eu-west-2", label: "EU (London)" },
    { value: "eu-central-1", label: "EU (Frankfurt)" },
    { value: "ap-southeast-1", label: "Asia Pacific (Singapore)" },
    { value: "ap-southeast-2", label: "Asia Pacific (Sydney)" },
    { value: "ap-northeast-1", label: "Asia Pacific (Tokyo)" },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure API keys, regions, and application preferences
        </p>
      </div>

      <Tabs defaultValue="api-keys" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="api-keys">
            <Shield className="h-4 w-4 mr-2" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="regions">
            <Globe className="h-4 w-4 mr-2" />
            Regions
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Palette className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys" className="space-y-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">AWS Credentials</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Securely store your AWS credentials for Bedrock API access
              </p>
            </div>

            <ApiKeyCard
              title="AWS Access Key ID"
              description="Your AWS access key for authentication"
              keyName="aws_access_key"
            />

            <ApiKeyCard
              title="AWS Secret Access Key"
              description="Your AWS secret key (keep this secure)"
              keyName="aws_secret_key"
            />

            <Card className="p-6 bg-muted/30 border-2">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Security Best Practices
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Never share your AWS credentials with anyone</li>
                <li>• Use IAM roles with minimal required permissions</li>
                <li>• Rotate your credentials regularly (every 90 days)</li>
                <li>• Enable MFA on your AWS account</li>
                <li>• Monitor AWS CloudTrail for unusual activity</li>
              </ul>
            </Card>

            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-4">Additional API Keys</h3>
            </div>

            <ApiKeyCard
              title="OpenAI API Key"
              description="Optional: For comparing with OpenAI models"
              keyName="openai_key"
            />

            <ApiKeyCard
              title="Anthropic API Key"
              description="Optional: For direct Claude API access"
              keyName="anthropic_key"
            />
          </div>
        </TabsContent>

        <TabsContent value="regions" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Default AWS Region</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select the default region for deploying your Bedrock agents
                </p>
              </div>

              <div className="space-y-3">
                <Label>Primary Region</Label>
                <Select value={region} onValueChange={handleRegionChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Card className="bg-primary/5 border-primary/20 p-4">
                <h4 className="font-semibold mb-2">Current Region</h4>
                <p className="text-sm text-muted-foreground">
                  {regions.find((r) => r.value === region)?.label}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  All new agents will be deployed to this region by default
                </p>
              </Card>

              <div className="pt-4 space-y-4">
                <h4 className="font-semibold">Region Considerations</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Choose a region close to your users for lower latency</li>
                  <li>• Check Bedrock model availability per region</li>
                  <li>• Consider data residency requirements</li>
                  <li>• Pricing may vary between regions</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Application Preferences</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <Label className="text-base">Enable Logging</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Log all agent interactions and API calls
                  </p>
                </div>
                <Switch
                  checked={loggingEnabled}
                  onCheckedChange={(checked) => {
                    setLoggingEnabled(checked);
                    toast.success(checked ? "Logging enabled" : "Logging disabled");
                  }}
                />
              </div>

              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <Label className="text-base">Auto-Deploy on Save</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Automatically deploy agents after saving changes
                  </p>
                </div>
                <Switch
                  checked={autoDeployEnabled}
                  onCheckedChange={(checked) => {
                    setAutoDeployEnabled(checked);
                    toast.success(checked ? "Auto-deploy enabled" : "Auto-deploy disabled");
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Show Debug Info</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Display detailed debug information in the UI
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Advanced Settings</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Default Model</Label>
                <Select defaultValue="anthropic.claude-v2">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anthropic.claude-v2">Claude 2</SelectItem>
                    <SelectItem value="anthropic.claude-instant-v1">Claude Instant</SelectItem>
                    <SelectItem value="amazon.titan-text-express-v1">Titan Text Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Request Timeout (seconds)</Label>
                <Select defaultValue="60">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="60">60</SelectItem>
                    <SelectItem value="120">120</SelectItem>
                    <SelectItem value="300">300</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Notification Settings</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <Label className="text-base">Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Receive notifications for agent activity
                  </p>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={(checked) => {
                    setNotificationsEnabled(checked);
                    toast.success(checked ? "Notifications enabled" : "Notifications disabled");
                  }}
                />
              </div>

              {notificationsEnabled && (
                <>
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <Label className="text-base">Deployment Alerts</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Get notified when agents are deployed or updated
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <Label className="text-base">Error Notifications</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Alert me when agents encounter errors
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Performance Warnings</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Notify when agents exceed latency thresholds
                      </p>
                    </div>
                    <Switch />
                  </div>
                </>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-6 bg-gradient-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-2">Security Notice</h3>
            <p className="text-sm text-muted-foreground">
              All API keys and credentials are stored securely using industry-standard encryption.
              Your sensitive data never leaves your browser and is encrypted before being stored locally.
              For production deployments, consider using AWS IAM roles and Secrets Manager.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
