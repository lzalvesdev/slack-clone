import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { TriangleAlert } from "lucide-react"
import { useAuthActions } from "@convex-dev/auth/react"

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

interface ISignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: ISignUpCardProps) => {
  const { signIn } = useAuthActions()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")

  const handleProviderSignUp = (value: "github" | "google") => {
    setPending(true);
    signIn(value)
      .finally(() => {
        setPending(false);
      })
  }

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não correspondem');
      return;
    }
    setPending(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch(() => {
        setError('Algo deu errado');
      })
      .finally(() => {
        setPending(false);
      })
  }

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0 text-center">
        <CardTitle>
          Cadastre-se
        </CardTitle>
        <CardDescription>
          Crie sua conta usando seu e-mail ou escolha um dos serviços abaixo
        </CardDescription>
      </CardHeader>

      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignUp} className="space-y-2.5">
          <Input
            disabled={pending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome completo"
            required
          />
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme a Senha"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size='lg' disabled={pending}>
            Cadastrar-se
          </Button>
        </form>
        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => { handleProviderSignUp('google') }}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Cadastrar-se com o Google
          </Button>

          <Button
            disabled={pending}
            onClick={() => { handleProviderSignUp('github') }}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-3 left-2.5" />
            Cadastrar-se com o GitHub
          </Button>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Tem uma conta?
          <span
            onClick={() => setState('signIn')}
            className="text-[#0E9BF7] hover:text-[#0e9af7c0] cursor-pointer">
            &nbsp;Conecte-se
          </span>
        </p>
      </CardContent>
    </Card>
  )
}
