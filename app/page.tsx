"use client";

import { WorkflowCanvas } from "@/components/workflow/canvas";
import { WorkflowToolbar } from "@/components/workflow/toolbar";
import { PropertiesPanel } from "@/components/workflow/properties-panel";
import { ExecutionPanel } from "@/components/workflow/execution-panel";

const Home = () => {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-background">
      <WorkflowToolbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative">
          <WorkflowCanvas />
        </div>
        <PropertiesPanel />
        <ExecutionPanel />
      </div>
    </div>
  );
};

export default Home;
