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
  const [lastPeople, setLastPeople] = useState<Player[]>([]);
  const [people, setPeople] = useState<Player[]>();

  // const { data: allPeople } = useQuery<Player[]>([], async () => {
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
      const foundPeople: Player[] = response.data;

      setPeople(foundPeople);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <NextSeo
        title="Análise de uma partida | Scouts.ftv"
        description="Uma variadades de scouts para você entender seu jogo e aprimorar sua
        evolução!"
      />

      <ListContainer>
        <Heading as="h1" size="md">
          Em desenvolvimento!!!
        </Heading>
        <Text size="sm">
          Uma variadades de scouts para você entender seu jogo e aprimorar sua
          evolução!
        </Text>
      </ListContainer>
    </>
  );
}
