"use client"



import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { WokrspaceSideBar } from "./workspace-sidebar";

interface IWorkspaceLayoutProps {
  children: React.ReactNode
};

const WorkspaceLayout = ({ children }: IWorkspaceLayoutProps) => {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup direction="horizontal" autoSaveId="ca-workspace-layout">
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-[#6a6dcc]" >
            <WokrspaceSideBar />
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel minSize={20}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkspaceLayout;