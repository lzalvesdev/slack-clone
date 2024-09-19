"use client"

import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";

interface IWorkspaceLayoutProps {
  children: React.ReactNode
};

const WorkspaceLayout = ({ children }: IWorkspaceLayoutProps) => {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default WorkspaceLayout;