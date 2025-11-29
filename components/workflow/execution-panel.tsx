"use client";

import { useAtomValue } from "jotai";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { executionLogsAtom } from "@/lib/workflow-store";
import { cn } from "@/lib/utils";

export function ExecutionPanel() {
  const logs = useAtomValue(executionLogsAtom);

  if (logs.length === 0) {
    return null;
  }

  return (
    <div className="w-96 border-l bg-card p-4 overflow-y-auto">
      <h2 className="font-semibold mb-4">Execution Logs</h2>
      <div className="space-y-3">
        {logs.map((log, idx) => (
          <div
            key={idx}
            className={cn(
              "rounded-lg border p-3 space-y-2",
              log.status === "success" && "border-green-500/50 bg-green-500/10",
              log.status === "error" && "border-red-500/50 bg-red-500/10",
              log.status === "running" && "border-blue-500/50 bg-blue-500/10"
            )}
          >
            <div className="flex items-center gap-2">
              {log.status === "success" && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
              {log.status === "error" && (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              {log.status === "running" && (
                <Clock className="h-4 w-4 text-blue-500 animate-spin" />
              )}
              <span className="font-medium text-sm">{log.nodeName}</span>
            </div>

            {log.output && (
              <div className="text-xs bg-background/50 rounded p-2 overflow-auto max-h-40">
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(log.output, null, 2)}
                </pre>
              </div>
            )}

            {log.error && (
              <div className="text-xs text-red-500">
                Error: {log.error}
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              {new Date(log.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
