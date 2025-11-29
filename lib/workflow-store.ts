import type { Edge, EdgeChange, Node, NodeChange } from "@xyflow/react";
import { applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { atom } from "jotai";

export type WorkflowNodeType = "trigger" | "action" | "add";

export type WorkflowNodeData = {
  label: string;
  description?: string;
  type: WorkflowNodeType;
  config?: Record<string, unknown>;
  status?: "idle" | "running" | "success" | "error";
  onClick?: () => void;
};

export type WorkflowNode = Node<WorkflowNodeData>;
export type WorkflowEdge = Edge;

// Workflow state atoms
export const nodesAtom = atom<WorkflowNode[]>([]);
export const edgesAtom = atom<WorkflowEdge[]>([]);
export const selectedNodeAtom = atom<string | null>(null);
export const isExecutingAtom = atom(false);

// Execution log entry type
export type ExecutionLogEntry = {
  nodeId: string;
  nodeName: string;
  nodeType: string;
  status: "pending" | "running" | "success" | "error";
  output?: unknown;
  error?: string;
  timestamp: string;
};

export const executionLogsAtom = atom<ExecutionLogEntry[]>([]);

// Derived atoms for node/edge operations
export const onNodesChangeAtom = atom(
  null,
  (get, set, changes: NodeChange[]) => {
    const currentNodes = get(nodesAtom);
    const newNodes = applyNodeChanges(changes, currentNodes) as WorkflowNode[];
    set(nodesAtom, newNodes);

    const selectedNode = newNodes.find((n) => n.selected);
    if (selectedNode) {
      set(selectedNodeAtom, selectedNode.id);
    }
  }
);

export const onEdgesChangeAtom = atom(
  null,
  (get, set, changes: EdgeChange[]) => {
    const currentEdges = get(edgesAtom);
    const newEdges = applyEdgeChanges(changes, currentEdges) as WorkflowEdge[];
    set(edgesAtom, newEdges);
  }
);

export const addNodeAtom = atom(null, (get, set, node: WorkflowNode) => {
  const currentNodes = get(nodesAtom);
  const updatedNodes = currentNodes.map((n) => ({ ...n, selected: false }));
  const newNode = { ...node, selected: true };
  set(nodesAtom, [...updatedNodes, newNode]);
  set(selectedNodeAtom, node.id);
});

export const updateNodeDataAtom = atom(
  null,
  (get, set, { id, data }: { id: string; data: Partial<WorkflowNodeData> }) => {
    const currentNodes = get(nodesAtom);
    const newNodes = currentNodes.map((node) =>
      node.id === id ? { ...node, data: { ...node.data, ...data } } : node
    );
    set(nodesAtom, newNodes);
  }
);

export const deleteNodeAtom = atom(null, (get, set, nodeId: string) => {
  const currentNodes = get(nodesAtom);
  const currentEdges = get(edgesAtom);

  const newNodes = currentNodes.filter((node) => node.id !== nodeId);
  const newEdges = currentEdges.filter(
    (edge) => edge.source !== nodeId && edge.target !== nodeId
  );

  set(nodesAtom, newNodes);
  set(edgesAtom, newEdges);

  if (get(selectedNodeAtom) === nodeId) {
    set(selectedNodeAtom, null);
  }
});
