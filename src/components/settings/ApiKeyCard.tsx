import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Copy, Check, Key } from "lucide-react";
import { toast } from "sonner";

interface ApiKeyCardProps {
  title: string;
  description: string;
  keyName: string;
  savedKey?: string;
}

export const ApiKeyCard = ({ title, description, keyName, savedKey }: ApiKeyCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [keyValue, setKeyValue] = useState(savedKey || "");
  const [isSaved, setIsSaved] = useState(!!savedKey);
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    if (!keyValue.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    setIsSaved(true);
    toast.success(`${title} saved successfully`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(keyValue);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const displayValue = keyValue
    ? isVisible
      ? keyValue
      : "•".repeat(Math.min(keyValue.length, 40))
    : "";

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Key className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor={keyName}>{title}</Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              id={keyName}
              type={isVisible ? "text" : "password"}
              value={keyValue}
              onChange={(e) => {
                setKeyValue(e.target.value);
                setIsSaved(false);
              }}
              placeholder={`Enter your ${title.toLowerCase()}`}
              className="pr-20 font-mono text-sm"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setIsVisible(!isVisible)}
                disabled={!keyValue}
              >
                {isVisible ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
              {keyValue && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaved}
            className="min-w-[100px]"
          >
            {isSaved ? "Saved" : "Save"}
          </Button>
        </div>
        {isSaved && (
          <p className="text-xs text-success flex items-center gap-1">
            <Check className="h-3 w-3" />
            Key saved securely
          </p>
        )}
      </div>
    </Card>
  );
};
