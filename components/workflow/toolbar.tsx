"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Play, Plus, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  nodesAtom,
  edgesAtom,
  isExecutingAtom,
  addNodeAtom,
  updateNodeDataAtom,
  executionLogsAtom,
} from "@/lib/workflow-store";
import { executeWorkflow } from "@/lib/workflow-executor";
import { generateId } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function WorkflowToolbar() {
  const nodes = useAtomValue(nodesAtom);
  const edges = useAtomValue(edgesAtom);
  const [isExecuting, setIsExecuting] = useAtom(isExecutingAtom);
  const addNode = useSetAtom(addNodeAtom);
  const updateNodeData = useSetAtom(updateNodeDataAtom);
  const setExecutionLogs = useSetAtom(executionLogsAtom);
  const { theme, setTheme } = useTheme();

  const handleAddTrigger = () => {
    const id = generateId();
    addNode({
      id,
      type: "trigger",
      position: { x: 250, y: 50 },
      data: {
        label: "Manual Trigger",
        description: "Start workflow manually",
        type: "trigger",
        config: { triggerType: "Manual" },
        status: "idle",
      },
    });
  };

  const handleAddScriptGenerator = () => {
    const id = generateId();
    addNode({
      id,
      type: "action",
      position: { x: 250, y: 200 },
      data: {
        label: "Script Generator",
        description: "Generate YouTube script",
        type: "action",
        config: {
          actionType: "generateScript",
          topic: "How to build an app",
          style: "informative",
          duration: "5",
        },
        status: "idle",
      },
    });
  };

  const handleAddThumbnailGenerator = () => {
    const id = generateId();
    addNode({
      id,
      type: "action",
      position: { x: 250, y: 350 },
      data: {
        label: "Thumbnail Designer",
        description: "Generate thumbnail concept",
        type: "action",
        config: {
          actionType: "generateThumbnail",
          topic: "Amazing tutorial",
          style: "bold",
          emotion: "excited",
        },
        status: "idle",
      },
    });
  };

  const handleExecute = async () => {
    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
    if (!apiKey) {
      toast.error("OpenRouter API key not found. Please set NEXT_PUBLIC_OPENROUTER_API_KEY in .env.local");
      return;
    }

    setIsExecuting(true);
    setExecutionLogs([]);

    // Reset all node statuses
    nodes.forEach((node) => {
      updateNodeData({ id: node.id, data: { status: "idle" } });
    });

    try {
      const logs = await executeWorkflow(nodes, edges, apiKey);
      setExecutionLogs(logs);

      // Update node statuses based on logs
      logs.forEach((log) => {
        updateNodeData({ id: log.nodeId, data: { status: log.status } });
      });

      toast.success("Workflow executed successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Execution failed");
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="flex items-center justify-between border-b bg-card px-4 py-2">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">YouTube Content Creator</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddTrigger}
          disabled={isExecuting}
        >
          <Plus className="h-4 w-4 mr-1" />
          Trigger
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddScriptGenerator}
          disabled={isExecuting}
        >
          <Plus className="h-4 w-4 mr-1" />
          Script
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddThumbnailGenerator}
          disabled={isExecuting}
        >
          <Plus className="h-4 w-4 mr-1" />
          Thumbnail
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        <Button
          variant="default"
          size="sm"
          onClick={handleExecute}
          disabled={isExecuting || nodes.length === 0}
        >
          <Play className="h-4 w-4 mr-1" />
          {isExecuting ? "Running..." : "Execute"}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
