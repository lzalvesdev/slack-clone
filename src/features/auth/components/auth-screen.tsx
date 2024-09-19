'use client';

import { useState } from "react";
import { SignInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-[#2e2d5f] via-[#1c1b40] to-black
">
      <div className="md:h-auto md:w-[420px]">
        {state == 'signIn' ?
          <SignInCard setState={setState} /> :
          <SignUpCard setState={setState} />}
      </div>
    </div>
  );
};