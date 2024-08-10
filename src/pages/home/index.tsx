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

const registerFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome precisa ter pelo menos 3 letras." }),
  side: z
    .string()
    .min(3, { message: "O nome do time precisa ter pelo menos 3 letras." }),
  teamName: z
    .string()
    .min(3, { message: "O nome do time precisa ter pelo menos 3 letras." }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Home() {
  const [toast, setToast] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post("/player/create", {
        name: data.name,
        side: data.side,
        teamName: data.teamName,
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
        <Text align="center">Adicionar jogadores</Text>
        <S.Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Nome</Text>
            <TextInput placeholder="Seu nome" {...register("name")} />
            {errors.name && (
              <S.FormError size="sm">{errors.name.message}</S.FormError>
            )}
          </label>
          <label>
            <Text size="sm">Lado que joga</Text>
            <TextInput placeholder="Escolha o lado" {...register("side")} />
            {errors.side && (
              <S.FormError size="sm">{errors.side.message}</S.FormError>
            )}
          </label>
          <label>
            <Text size="sm">Time</Text>
            <TextInput placeholder="Escolha o time" {...register("teamName")} />
            {errors.teamName && (
              <S.FormError size="sm">{errors.teamName.message}</S.FormError>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting}>
            {!toast && "Cadastrar"}
            {!toast && <ArrowRight />}

            {toast && "Registrado com sucesso!"}
          </Button>
        </S.Form>
      </S.Container>
    </>
  );
}
