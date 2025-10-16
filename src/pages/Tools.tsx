import { Card } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function Tools() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tools</h1>
        <p className="text-muted-foreground mt-1">
          Configure tools and integrations for your agents
        </p>
      </div>

      <Card className="p-12 text-center">
        <Wrench className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Tool Management</h3>
        <p className="text-muted-foreground">
          Set up APIs, Lambda functions, and custom tools
        </p>
      </Card>
    </div>
  );
}
