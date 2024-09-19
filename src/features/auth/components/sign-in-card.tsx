import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SignInFlow } from "../types"


interface ISignInCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: ISignInCardProps) => {
  const { signIn } = useAuthActions()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")

  const handleProviderSignIn = (value: "github" | "google") => {
    setPending(true);
    signIn(value)
      .finally(() => {
        setPending(false);
      })
  }

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPending(true);
    signIn("password", { email, password, flow: "signIn" })
      .catch(() => {
        setError('E-mail ou senha incorretos. Por favor, verifique e tente novamente.')
      })
      .finally(() => {
        setPending(false)
      })
  }

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0 text-center">
        <CardTitle >
          Acesse a plataforma
        </CardTitle>
        <CardDescription>
          Insira seu e-mail ou escolha um dos serviços abaixo para continuar
        </CardDescription>
      </CardHeader>

      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignIn} className="space-y-2.5">
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            type="email"
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size='lg' disabled={pending}>
            Entrar
          </Button>
        </form>
        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => { handleProviderSignIn("google") }}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Entrar com o Google
          </Button>

          <Button
            disabled={pending}
            onClick={() => { handleProviderSignIn("github") }}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-3 left-2.5" />
            Entrar com o GitHub
          </Button>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          Ainda não tem uma conta?
          <span
            onClick={() => setState('signUp')}
            className="text-[#0E9BF7] hover:text-[#0e9af7c0] cursor-pointer">
            &nbsp;Inscreva-se
          </span>
        </p>
      </CardContent>
    </Card>
  )
}
