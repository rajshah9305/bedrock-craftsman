import { Card } from "@/components/ui/card";
import { Database } from "lucide-react";

export default function Knowledge() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Knowledge Bases</h1>
        <p className="text-muted-foreground mt-1">
          Manage your knowledge bases and data sources
        </p>
      </div>

      <Card className="p-12 text-center">
        <Database className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Knowledge Base Management</h3>
        <p className="text-muted-foreground">
          Configure and manage knowledge bases for your agents
        </p>
      </Card>
    </div>
  );
}
