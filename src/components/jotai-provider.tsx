"use client";

import { Provider } from "jotai";

interface IJotaiProviderProps {
  children: React.ReactNode;
}

export const JotaiProvider = ({ children }: IJotaiProviderProps) => {
  return (
    <Provider>
      {children}
    </Provider>
  )
}