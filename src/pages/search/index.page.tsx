import { Heading, Text, TextInput } from "@pegasus-ui/react";
import { NextSeo } from "next-seo";
import {
  List,
  ListContainer,
  InputContainer,
  Input,
  LastPeopleContainer,
} from "./styles";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Form } from "react-hook-form";

export default function Search() {
  const [lastPeople, setLastPeople] = useState<Person[]>([]);
  const [people, setPeople] = useState<Person[]>();

  // const { data: allPeople } = useQuery<Person[]>([], async () => {
  //   const response = await api.get(`/person/people`);

  //   setLastPeople(response.data);
  //   return response.data;
  // });

  async function findPerson(searchValue: string) {
    try {
      if (searchValue === "") {
        setPeople([]);
        return;
      }

      const response = await api.get(`/person/${searchValue}`);
      const foundPeople: Person[] = response.data;

      setPeople(foundPeople);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <NextSeo
        title="Encontre uma pessoa | Localiza.rs"
        description="Uma corrente de solidariedade para localizar pessoas prejudicadas
        pelas enchentes no Rio Grande do Sul."
      />

      <ListContainer>
        <Heading as="h1" size="md">
          Busque por um abrigado
        </Heading>
        <Text size="sm">
          Pesquisa de pessoas resgatadas nas enchentes do Rio Grande do Sul que
          estão em abrigos.
        </Text>
        <InputContainer>
          <label>
            <Text size="sm">Digite o nome, CPF ou abrigo</Text>
            <TextInput
              placeholder="Busca por nome, cpf ou nome do abrigo"
              onChange={(event: any) => findPerson(event.target.value)}
            />
          </label>

          <List>
            {people &&
              people.map((person) => {
                return (
                  <Text key={person.cpf} size="xl">
                    {person.name} - {person.temporary_house} -{" "}
                    {person.observations}{" "}
                  </Text>
                );
              })}
          </List>
        </InputContainer>

        <LastPeopleContainer>
          <Heading as="h2" size="md">
            Últimos abrigados
          </Heading>
          <Text size="sm">Lista com os 10 últimos abrigados cadastrados.</Text>
          <List>
            {lastPeople &&
              lastPeople.map((person) => {
                return (
                  <Text key={person.cpf} size="xl">
                    {person.name} - {person.temporary_house} -{" "}
                    {person.observations}
                  </Text>
                );
              })}
          </List>
        </LastPeopleContainer>
      </ListContainer>
    </>
  );
}
