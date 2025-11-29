import type { WorkflowNode, ExecutionLogEntry } from "./workflow-store";

export async function executeWorkflow(
  nodes: WorkflowNode[],
  edges: Array<{ source: string; target: string }>,
  apiKey: string
): Promise<ExecutionLogEntry[]> {
  const logs: ExecutionLogEntry[] = [];

  // Find trigger node
  const triggerNode = nodes.find((n) => n.data.type === "trigger");
  if (!triggerNode) {
    throw new Error("No trigger node found");
  }

  // Build execution order using edges
  const executionOrder = buildExecutionOrder(nodes, edges, triggerNode.id);

  // Execute nodes in order
  for (const nodeId of executionOrder) {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) continue;

    const log: ExecutionLogEntry = {
      nodeId: node.id,
      nodeName: node.data.label || "Untitled",
      nodeType: node.data.type,
      status: "running",
      timestamp: new Date().toISOString(),
    };

    logs.push(log);

    try {
      if (node.data.type === "action") {
        const output = await executeActionNode(node, apiKey);
        log.status = "success";
        log.output = output;
      } else {
        log.status = "success";
      }
    } catch (error) {
      log.status = "error";
      log.error = error instanceof Error ? error.message : "Unknown error";
      throw error;
    }
  }

  return logs;
}

function buildExecutionOrder(
  nodes: WorkflowNode[],
  edges: Array<{ source: string; target: string }>,
  startNodeId: string
): string[] {
  const order: string[] = [];
  const visited = new Set<string>();

  function visit(nodeId: string) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    order.push(nodeId);

    // Find all edges from this node
    const outgoingEdges = edges.filter((e) => e.source === nodeId);
    for (const edge of outgoingEdges) {
      visit(edge.target);
    }
  }

  visit(startNodeId);
  return order;
}

async function executeActionNode(
  node: WorkflowNode,
  apiKey: string
): Promise<unknown> {
  const config = node.data.config || {};
  const actionType = config.actionType as string;

  switch (actionType) {
    case "generateScript":
      return await generateScript(config, apiKey);
    case "generateThumbnail":
      return await generateThumbnail(config, apiKey);
    default:
      throw new Error(`Unknown action type: ${actionType}`);
  }
}

async function generateScript(
  config: Record<string, unknown>,
  apiKey: string
): Promise<{ script: string }> {
  const response = await fetch("/api/ai/generate-script", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      topic: config.topic || "",
      style: config.style || "informative",
      duration: config.duration || "5",
      apiKey,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate script");
  }

  return await response.json();
}

async function generateThumbnail(
  config: Record<string, unknown>,
  apiKey: string
): Promise<{ concept: string }> {
  const response = await fetch("/api/ai/generate-thumbnail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      topic: config.topic || "",
      style: config.style || "bold",
      emotion: config.emotion || "excited",
      apiKey,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate thumbnail");
  }

  return await response.json();
}
