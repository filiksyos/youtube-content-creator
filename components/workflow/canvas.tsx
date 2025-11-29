"use client";

import { useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  type Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  nodesAtom,
  edgesAtom,
  onNodesChangeAtom,
  onEdgesChangeAtom,
} from "@/lib/workflow-store";
import { TriggerNode } from "./nodes/trigger-node";
import { ActionNode } from "./nodes/action-node";
import { AddNode } from "./nodes/add-node";

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  add: AddNode,
};

export function WorkflowCanvas() {
  const [nodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);
  const onNodesChange = useSetAtom(onNodesChangeAtom);
  const onEdgesChange = useSetAtom(onEdgesChangeAtom);
  const { fitView } = useReactFlow();

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => [
        ...eds,
        {
          id: `${connection.source}-${connection.target}`,
          source: connection.source!,
          target: connection.target!,
          type: "default",
        },
      ]);
    },
    [setEdges]
  );

  useEffect(() => {
    setTimeout(() => fitView(), 100);
  }, [fitView]);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
