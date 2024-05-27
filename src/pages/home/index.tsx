import { Button, Heading, Text, TextInput } from "@pegasus-ui/react";
import { Container, Form, FormError, Header } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { api } from "../../lib/axios";
import { AxiosError } from "axios";
import { NextSeo } from "next-seo";
import { useState } from "react";

const registerFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome precisa ter pelo menos 3 letras." }),
  cpf: z.string(),
  temporary_house: z.string().min(3, {
    message: "O abrigo temporário precisa ter pelo menos 3 letras.",
  }),
  observations: z.string(),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Home() {
  const [cpfExists, setCpfExists] = useState(false);
  const [toast, setToast] = useState(false);
  const [attack, setAttack] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  return (
    <>
      <NextSeo title="Cadastre uma pessoa | Localiza.rs" />
      <Container>
        <Header>
          <Heading as="strong">Scouts Futevolei</Heading>
          <Text>
            Uma variadades de scouts para você entender seu jogo e aprimorar sua
            evolução!
          </Text>
        </Header>
        <label>
          <Text size="sm">Attack</Text>
          <p>You clicked {attack} times</p>

          <button
            style={{
              top: "20vh",
              backgroundColor: "green",
              borderRadius: "8%",
              color: "white",
            }}
            onClick={() => setAttack(attack + 1)}
          >
            Increment
          </button>
          <button
            style={{
              top: "20vh",
              backgroundColor: "red",
              borderRadius: "8%",
              color: "white",
            }}
            onClick={() => setAttack(attack - 1)}
          >
            Decrement
          </button>
        </label>
      </Container>
    </>
  );
}
