"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface IHintProps {
  label: string,
  children: React.ReactNode,
  side?: "top" | "bottom" | "left" | "right",
  align?: "start" | "center" | "end",
}

export const Hint = ({
  label,
  children,
  side,
  align,
}: IHintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent
          className="bg-black text-white border border-white/5"
          side={side}
          align={align}
        >
          <p className="font-medium text-xs">
            {label}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}