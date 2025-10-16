import { BedrockModel } from "@/types/agent";

export const bedrockModels: BedrockModel[] = [
  {
    id: "anthropic.claude-v2",
    name: "Claude 2",
    provider: "Anthropic",
    description: "Most capable model for complex reasoning and analysis",
    contextWindow: 100000,
    optimizationHints: [
      "Best for complex reasoning tasks",
      "Excellent for code generation",
      "Strong safety guardrails"
    ],
    capabilities: ["text", "reasoning", "code"]
  },
  {
    id: "anthropic.claude-instant-v1",
    name: "Claude Instant",
    provider: "Anthropic",
    description: "Fast and cost-effective for simpler tasks",
    contextWindow: 100000,
    optimizationHints: [
      "Lower latency responses",
      "Cost-effective for high volume",
      "Good for straightforward tasks"
    ],
    capabilities: ["text", "reasoning"]
  },
  {
    id: "amazon.titan-text-express-v1",
    name: "Titan Text Express",
    provider: "Amazon",
    description: "Optimized for general text generation",
    contextWindow: 8000,
    optimizationHints: [
      "Native AWS integration",
      "Good for summarization",
      "Balanced cost/performance"
    ],
    capabilities: ["text", "summarization"]
  },
  {
    id: "ai21.j2-ultra-v1",
    name: "Jurassic-2 Ultra",
    provider: "AI21 Labs",
    description: "Advanced model for enterprise applications",
    contextWindow: 8191,
    optimizationHints: [
      "Strong instruction following",
      "Good for business content",
      "Multilingual support"
    ],
    capabilities: ["text", "reasoning", "multilingual"]
  },
  {
    id: "cohere.command-text-v14",
    name: "Command",
    provider: "Cohere",
    description: "Specialized in conversational AI",
    contextWindow: 4096,
    optimizationHints: [
      "Excellent for chatbots",
      "Strong at Q&A",
      "Optimized for conversation"
    ],
    capabilities: ["text", "conversation"]
  }
];
