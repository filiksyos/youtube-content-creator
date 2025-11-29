"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { X } from "lucide-react";
import {
  selectedNodeAtom,
  nodesAtom,
  updateNodeDataAtom,
  deleteNodeAtom,
} from "@/lib/workflow-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PropertiesPanel() {
  const [selectedNodeId, setSelectedNodeId] = useAtom(selectedNodeAtom);
  const nodes = useAtomValue(nodesAtom);
  const updateNodeData = useSetAtom(updateNodeDataAtom);
  const deleteNode = useSetAtom(deleteNodeAtom);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  if (!selectedNode) {
    return null;
  }

  const config = selectedNode.data.config || {};
  const actionType = config.actionType as string | undefined;

  const handleClose = () => {
    setSelectedNodeId(null);
  };

  const handleDelete = () => {
    if (selectedNodeId) {
      deleteNode(selectedNodeId);
      setSelectedNodeId(null);
    }
  };

  const updateConfig = (key: string, value: unknown) => {
    updateNodeData({
      id: selectedNode.id,
      data: {
        config: { ...config, [key]: value },
      },
    });
  };

  return (
    <div className="w-80 border-l bg-card p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Properties</h2>
        <Button variant="ghost" size="sm" onClick={handleClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Label</label>
          <Input
            value={selectedNode.data.label}
            onChange={(e) =>
              updateNodeData({
                id: selectedNode.id,
                data: { label: e.target.value },
              })
            }
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Description</label>
          <Input
            value={selectedNode.data.description || ""}
            onChange={(e) =>
              updateNodeData({
                id: selectedNode.id,
                data: { description: e.target.value },
              })
            }
          />
        </div>

        {actionType === "generateScript" && (
          <>
            <div>
              <label className="text-sm font-medium mb-2 block">Topic</label>
              <Input
                value={(config.topic as string) || ""}
                onChange={(e) => updateConfig("topic", e.target.value)}
                placeholder="Enter video topic"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Style</label>
              <Input
                value={(config.style as string) || "informative"}
                onChange={(e) => updateConfig("style", e.target.value)}
                placeholder="e.g., informative, entertaining"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Duration (minutes)
              </label>
              <Input
                type="number"
                value={(config.duration as string) || "5"}
                onChange={(e) => updateConfig("duration", e.target.value)}
              />
            </div>
          </>
        )}

        {actionType === "generateThumbnail" && (
          <>
            <div>
              <label className="text-sm font-medium mb-2 block">Topic</label>
              <Input
                value={(config.topic as string) || ""}
                onChange={(e) => updateConfig("topic", e.target.value)}
                placeholder="Enter video topic"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Style</label>
              <Input
                value={(config.style as string) || "bold"}
                onChange={(e) => updateConfig("style", e.target.value)}
                placeholder="e.g., bold, minimal, colorful"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Emotion</label>
              <Input
                value={(config.emotion as string) || "excited"}
                onChange={(e) => updateConfig("emotion", e.target.value)}
                placeholder="e.g., excited, shocked, curious"
              />
            </div>
          </>
        )}

        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          className="w-full"
        >
          Delete Node
        </Button>
      </div>
    </div>
  );
}
