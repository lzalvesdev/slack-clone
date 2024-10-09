import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useCreateChannelModal } from "../store/use-create-channel-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateChannel } from "../api/use-create-channels";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { toast } from "sonner";

export const CreateChannelModal = () => {
  const workspaceId = useWorkspaceId()
  const { mutate, isPending } = useCreateChannel();

  const [open, setOpen] = useCreateChannelModal()
  const [name, setName] = useState('')

  const handleClose = () => {
    setName('');
    setOpen(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, '-').toLowerCase()
    setName(value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { name, workspaceId },
      {
        onSuccess: () => {
          toast.success("Canal criado com sucesso!");
          handleClose();
        }
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Criar um novo canal
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            disabled={isPending}
            onChange={handleChange}
            required
            autoFocus
            minLength={3}
            maxLength={80}
            placeholder="Por exemplo, plano-de-estudos"
          />
          <div className="flex justify-end">
            <Button disabled={isPending}>
              Criar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}