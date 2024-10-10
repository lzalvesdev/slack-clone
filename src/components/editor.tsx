import Quill, { type QuillOptions } from "quill"
import { PiTextAa } from "react-icons/pi"
import { MdSend } from "react-icons/md"
import "quill/dist/quill.snow.css"
import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Button } from "./ui/button";
import { ImageIcon, Smile } from "lucide-react";
import { Hint } from "./hint"
import { Delta, Op } from "quill/core"

type EditorValue = {
  image: File | null;
  body: string;
}

interface IEditorProps {
  onSubmit: ({ image, body }: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
  variant?: "create" | "update"
}

export const Editor = ({
  onSubmit,
  onCancel,
  placeholder = "Escreva algo aqui...",
  defaultValue = [],
  disabled = false,
  innerRef,
  variant = "create"
}: IEditorProps) => {
  const [text, setText] = useState("");

  const submitRef = useRef(onSubmit)
  const placeholderRef = useRef(placeholder)
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue)
  const containerRef = useRef<HTMLDivElement>(null);
  const disabledRef = useRef(disabled)

  useLayoutEffect(() => {
    submitRef.current = onSubmit
    placeholderRef.current = placeholder
    defaultValueRef.current = defaultValue
    disabledRef.current = disabled
  })

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div"),
    );

    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
    }

    const quill = new Quill(editorContainer, options);
    quillRef.current = quill
    quillRef.current.focus();

    if (innerRef)
      innerRef.current = quill

    return () => {
      if (container)
        container.innerHTML = '';
    }

  }, [])

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm bg-white">
        <div ref={containerRef} className="h-full ql-custom" />
        <div className="flex px-2 pb-2 z-[4]">
          <Hint label="Ocultar formatação">
            <Button
              disabled={false}
              size="iconSm"
              variant="ghost"
              onClick={() => { }}
            >
              <PiTextAa className="size-5" />
            </Button>
          </Hint>
          <Hint label="Emoji">
            <Button
              disabled={false}
              size="iconSm"
              variant="ghost"
              onClick={() => { }}
            >
              <Smile className="size-5" />
            </Button>
          </Hint>
          {variant === "create" && (
            <Hint label="Adicionar imagem">
              <Button
                disabled={false}
                size="iconSm"
                variant="ghost"
                onClick={() => { }}
              >
                <ImageIcon className="size-5" />
              </Button>
            </Hint>
          )}
          {variant === "update" && (
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => { }}
                disabled={false}
              >
                Cancelar
              </Button>
              <Button
                className=" bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
                size="sm"
                onClick={() => { }}
                disabled={false}
              >
                Salvar
              </Button>
            </div>
          )}
          {variant === "create" && (
            <Button
              disabled={false}
              size="iconSm"
              className="ml-auto bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              onClick={() => { }}
            >
              <MdSend className="size-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="p-2 text-[10px] text-muted-foreground flex justify-end">
        <p>
          <strong>Shift + Enter</strong> para quebra de linha
        </p>
      </div>
    </div>
  )
}

export default Editor;