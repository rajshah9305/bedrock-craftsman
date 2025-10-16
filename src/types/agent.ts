export type AgentStatus = 'draft' | 'active' | 'inactive' | 'deploying' | 'error';

export type BedrockModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
  contextWindow: number;
  optimizationHints: string[];
  capabilities: string[];
};

export type ToolConfig = {
  id: string;
  name: string;
  description: string;
  type: 'api' | 'lambda' | 'custom';
  configuration: Record<string, any>;
};

export type ActionGroup = {
  id: string;
  name: string;
  description: string;
  actions: Action[];
};

export type Action = {
  id: string;
  name: string;
  description: string;
  parameters: ActionParameter[];
};

export type ActionParameter = {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description: string;
  required: boolean;
};

export type KnowledgeBase = {
  id: string;
  name: string;
  description: string;
  type: 's3' | 'opensearch' | 'pinecone';
  status: 'active' | 'indexing' | 'error';
};

export type Agent = {
  id: string;
  name: string;
  description: string;
  model: BedrockModel;
  status: AgentStatus;
  instructions: string;
  tools: ToolConfig[];
  actionGroups: ActionGroup[];
  knowledgeBases: KnowledgeBase[];
  createdAt: Date;
  updatedAt: Date;
  deploymentConfig?: DeploymentConfig;
};

export type DeploymentConfig = {
  environment: 'development' | 'staging' | 'production';
  region: string;
  memoryMB: number;
  timeoutSeconds: number;
  loggingEnabled: boolean;
  tracingEnabled: boolean;
};
