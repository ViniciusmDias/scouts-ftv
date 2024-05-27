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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  async function findPerson(typedCpf: string) {
    try {
      const response = await api.get(`/person/cpf/${typedCpf}`);
      const foundPerson = response.data;

      if (foundPerson) {
        setCpfExists(true);
      }
    } catch (error) {
      setCpfExists(false);
    }
  }

  const router = useRouter();

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post("/person", {
        name: data.name,
        cpf: data.cpf,
        temporary_house: data.temporary_house,
        observations: data.observations,
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
      <NextSeo title="Cadastre uma pessoa | Localiza.rs" />
      <Container>
        <Header>
          <Heading as="strong">Scouts Futevolei</Heading>
          <Text>
            Uma variadades de scouts para você entender seu jogo e aprimorar sua
            evolução!
          </Text>
        </Header>
        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Nome</Text>
            <TextInput placeholder="Seu nome" {...register("name")} />
            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>
          <label>
            <Text size="sm">CPF (Não Obrigatório)</Text>
            <TextInput
              placeholder="CPF"
              {...register("cpf")}
              onChange={(event: any) => findPerson(event.target.value)}
            />
            {cpfExists && (
              <FormError size="sm">
                CPF já cadastrado na nossa base, busque por esse CPF para
                encontrar a pessoa.
              </FormError>
            )}
          </label>
          <label>
            <Text size="sm">Abrigo temporário</Text>
            <TextInput
              placeholder="Nome do abrigo"
              {...register("temporary_house")}
            />
            {errors.temporary_house && (
              <FormError size="sm">{errors.temporary_house.message}</FormError>
            )}
          </label>
          <label>
            <Text size="sm">Observações</Text>
            <TextInput
              placeholder="Observações"
              {...register("observations")}
            />
          </label>
          <Button type="submit" disabled={isSubmitting}>
            {!toast && "Cadastrar"}
            {!toast && <ArrowRight />}

            {toast && "Registrado com sucesso!"}
          </Button>
        </Form>
      </Container>
    </>
  );
}
