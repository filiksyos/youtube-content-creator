"use client";

import type { WorkflowNode } from "@/lib/workflow-store";
import { Plus } from "lucide-react";

export function AddNode({ data }: WorkflowNode) {
  return (
    <button
      onClick={data.onClick}
      className="rounded-lg border-2 border-dashed border-muted-foreground/50 bg-muted/50 p-8 hover:border-primary hover:bg-muted transition-all cursor-pointer"
    >
      <div className="flex flex-col items-center gap-2">
        <Plus className="h-8 w-8 text-muted-foreground" />
        <div className="text-sm text-muted-foreground">Add First Node</div>
      </div>
    </button>
  );
}
