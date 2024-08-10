import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextInput } from "@pegasus-ui/react";
import { AxiosError } from "axios";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as S from "./styles";

const registerGameFormSchema = z.object({
  teamName1: z
    .string()
    .min(3, { message: "O nome precisa ter pelo menos 3 letras." }),
  teamName2: z
    .string()
    .min(3, { message: "O nome do time precisa ter pelo menos 3 letras." }),
  matchNumber: z.string(),
});

type RegisterGameFormData = z.infer<typeof registerGameFormSchema>;

export default function Matches() {
  const [toast, setToast] = useState(false);

  const {
    register: registerGame,
    handleSubmit: handleSubmitGame,
    formState: { errors: errorsGame, isSubmitting: isSubmittingGame },
  } = useForm<RegisterGameFormData>({
    resolver: zodResolver(registerGameFormSchema),
  });

  const router = useRouter();

  async function handleRegisterGame(data: RegisterGameFormData) {
    try {
      await api.post("/game/create", {
        teamName1: data.teamName1,
        teamName2: data.teamName2,
        matchNumber: data.matchNumber,
      });

      await router.push("/");
      setToast(true);

      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message);
        return;
      }
      console.error(err);
    }
  }

  return (
    <>
      <NextSeo title="Scouts de uma partida | Scoutsftv" />
      <S.Container>
        <Text align="center">Criar partida</Text>
        <S.Form as="form" onSubmit={handleSubmitGame(handleRegisterGame)}>
          <label>
            <Text size="sm">Time 1</Text>
            <TextInput
              placeholder="Nome do time 1"
              {...registerGame("teamName1")}
            />
            {errorsGame.teamName1 && (
              <S.FormError size="sm">
                {errorsGame.teamName1.message}
              </S.FormError>
            )}
          </label>
          <label>
            <Text size="sm">Time 2</Text>
            <TextInput
              placeholder="Nome do time 2"
              {...registerGame("teamName2")}
            />
            {errorsGame.teamName2 && (
              <S.FormError size="sm">
                {errorsGame.teamName2.message}
              </S.FormError>
            )}
          </label>
          <label>
            <Text size="sm">Número da partida</Text>
            <TextInput
              placeholder="Qual o número da partida"
              {...registerGame("matchNumber")}
            />
            {errorsGame.matchNumber && (
              <S.FormError size="sm">
                {errorsGame.matchNumber.message}
              </S.FormError>
            )}
          </label>

          <Button type="submit" disabled={isSubmittingGame}>
            {!toast && "Criar partida"}
            {!toast && <ArrowRight />}

            {toast && "Registrado com sucesso!"}
          </Button>
        </S.Form>
      </S.Container>
    </>
  );
}
