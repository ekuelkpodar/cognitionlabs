export interface WorkflowExecutionContext {
  orgId: string;
  projectId?: string;
  inputs: Record<string, any>;
}

export interface WorkflowNodeResult {
  status: "SUCCESS" | "FAILED" | "RETRY";
  output?: any;
  error?: string;
}

export interface WorkflowNodeHandler {
  type: string;
  execute(ctx: WorkflowExecutionContext): Promise<WorkflowNodeResult>;
}

export interface AgentToolInvocation {
  orgId: string;
  agentId: string;
  params: Record<string, any>;
}

export interface AgentToolResult {
  content: string;
  metadata?: Record<string, any>;
}

export type AgentToolHandler = (invocation: AgentToolInvocation) => Promise<AgentToolResult>;

export class WorkflowNodeRegistry {
  private handlers = new Map<string, WorkflowNodeHandler>();
  register(handler: WorkflowNodeHandler) {
    this.handlers.set(handler.type, handler);
  }
  get(type: string) {
    return this.handlers.get(type);
  }
}

export class AgentToolRegistry {
  private handlers = new Map<string, AgentToolHandler>();
  register(name: string, handler: AgentToolHandler) {
    this.handlers.set(name, handler);
  }
  get(name: string) {
    return this.handlers.get(name);
  }
}
