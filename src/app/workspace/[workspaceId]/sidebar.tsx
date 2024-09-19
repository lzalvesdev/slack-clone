import UserButton from "@/features/auth/components/user-button";
import { Bell, Home, MessageSquareIcon, MoreHorizontal } from "lucide-react";
import { SidebarButton } from './sidebar-button';
import { WorkspaceSwitcher } from "./workspace-switcher";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[70px] h-full flex flex-col gap-y-4 items-center pt-[9px] pb-4 bg-gradient-to-b from-[#4f52b2] to-[#353d7a]">
      <WorkspaceSwitcher />
      <SidebarButton 
        icon={Home} 
        label="Início" 
        isActive={pathname.includes("/workspace")} />
      <SidebarButton icon={MessageSquareIcon} label="Chats" />
      <SidebarButton icon={Bell} label="Alertas" />
      <SidebarButton icon={MoreHorizontal} label="Mais" />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  )
}