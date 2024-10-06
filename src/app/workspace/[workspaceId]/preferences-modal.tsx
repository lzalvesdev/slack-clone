import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRemoveWorkspace } from "@/features/workspaces/api/use-delete-workspace";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface IPreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

export const PreferencesModal = ({
  open,
  setOpen,
  initialValue
}: IPreferencesModalProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [ConfirmDialog, confirm] = useConfirm(
    "Tem certeza que deseja remover este workspace?",
    "Essa ação nao pode ser desfeita."
  );

  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } = useUpdateWorkspace();
  const { mutate: removeWorkspace, isPending: isRemovingWorkspace } = useRemoveWorkspace();

  const handleRemove = async () => {
    const ok = await confirm();

    if (!ok) return;

    removeWorkspace({
      id: workspaceId
    }, {
      onSuccess: () => {
        toast.success("Workspace removido com sucesso");
        router.replace("/");
      },
      onError: () => {
        toast.error("Ocorreu um erro ao remover o workspace");
      }
    });
  }

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateWorkspace({
      id: workspaceId,
      name: value,
    }, {
      onSuccess: () => {
        toast.success("Workspace renomeado com sucesso");
        setEditOpen(false);
      },
      onError: () => {
        toast.error("Ocorreu um erro ao renomear o workspace");
      }
    });
  }

  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle>
              {value}
            </DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">
                      Nome do workspace
                    </p>
                    <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                      editar
                    </p>
                  </div>
                  <p className="text-sm">
                    {value}
                  </p>
                </div>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Renomerar esse Workspace</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleEdit}>
                  <Input
                    value={value}
                    disabled={isUpdatingWorkspace}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={800}
                    placeholder="Digite um nome único e fácil de lembrar para o seu workspace."
                  />
                </form>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" disabled={isUpdatingWorkspace}>Cancelar</Button>
                  </DialogClose>
                  <Button disabled={isUpdatingWorkspace}>Salvar</Button>
                </DialogFooter>

              </DialogContent>
            </Dialog>
            <button
              disabled={isRemovingWorkspace}
              onClick={handleRemove}
              className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
            >
              <TrashIcon className="size-4" />
              <p className="text-sm font-semibold">Excluir Workspace</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}