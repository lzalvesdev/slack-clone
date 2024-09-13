import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

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
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle >
          Acesse a plataforma
        </CardTitle>
        <CardDescription>
          Use seu email ou outro serviço para continuar
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <Input
            disabled={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            type="email"
            required
          />
          <Input
            disabled={false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size='lg' disabled={false}>
            Entrar
          </Button>
        </form>
        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={false}
            onClick={() => { }}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Entrar com o Google
          </Button>

          <Button
            disabled={false}
            onClick={() => { }}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-3 left-2.5" />
            Entrar com o GitHub
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Não tem uma conta?
          <span
            onClick={() => setState('signUp')}
            className="text-[#0E9BF7] hover:text-[#0e9af7c0] cursor-pointer">
            &nbsp;Cadastrar-se
          </span>
        </p>
      </CardContent>
    </Card>
  )
}
