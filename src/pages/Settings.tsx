import { Card } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure application settings and preferences
        </p>
      </div>

      <Card className="p-12 text-center">
        <SettingsIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Application Settings</h3>
        <p className="text-muted-foreground">
          Manage AWS credentials, regions, and other configurations
        </p>
      </Card>
    </div>
  );
}
