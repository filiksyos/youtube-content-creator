"use client";

import { Handle, Position } from "@xyflow/react";
import type { WorkflowNode } from "@/lib/workflow-store";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function ActionNode({ data, selected }: WorkflowNode) {
  const status = data.status || "idle";

  return (
    <div
      className={cn(
        "rounded-lg border-2 bg-card p-4 shadow-lg transition-all min-w-[200px]",
        selected && "border-primary",
        !selected && "border-border",
        status === "running" && "ring-2 ring-blue-500",
        status === "success" && "ring-2 ring-green-500",
        status === "error" && "ring-2 ring-red-500"
      )}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2 mb-2">
        <Zap className="h-4 w-4 text-yellow-500" />
        <div className="font-medium text-sm">Action</div>
      </div>
      <div className="text-foreground font-medium">
        {data.label || "Action Node"}
      </div>
      {data.description && (
        <div className="text-xs text-muted-foreground mt-1">
          {data.description}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
