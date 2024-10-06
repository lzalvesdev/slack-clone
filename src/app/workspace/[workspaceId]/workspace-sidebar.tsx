import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { AlertTriangle, Loader, MessageSquare, MessageSquareText, SendHorizonal, SendHorizontal } from "lucide-react"
import { WorkspaceHeader } from "./workspace-header";
import { SidebarItem } from "./sidebar-item";

export const WokrspaceSideBar = () => {
  const workspaceId = useWorkspaceId();

  const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });

  if (workspaceLoading || memberLoading) {
    return (
      <div className="flex flex-col bg-[#6a6dcc] h-full items-center justify-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    )
  }

  if (!workspace || !member) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#6a6dcc] h-full items-center justify-center">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">Workspace não encontrado</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-[#595ab2] h-full">
      <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"} />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem
          label="Conversas"
          icon={MessageSquareText}
          id="threads"
        />
        <SidebarItem
          label="Rascunhos e Enviados"
          icon={SendHorizontal}
          id="draft"
        />
      </div>
    </div>
  )
}