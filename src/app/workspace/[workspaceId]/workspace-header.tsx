import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"

export const WorkspaceHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="transparent" className="w-8 h-8 p-2">
            a
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
}