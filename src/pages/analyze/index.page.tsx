import { api } from '@/lib/axios';
import { Heading, Text } from '@pegasus-ui/react';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import * as S from './styles';

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
      if (searchValue === '') {
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

      <S.ListContainer>
        <Heading as="h1" size="md">
          Estatisticas do jogo por equipe
        </Heading>
        <S.Content>
          <S.Teams>
            <Text>Dudu / Arthur</Text>
            <Text>Estatística do Jogo</Text>
            <Text>Gui / Tavinho</Text>
          </S.Teams>
          <S.Scouts>
            <S.Row>
              <S.Points>16</S.Points>
              <Text>Ataque</Text>
              <S.Points>12</S.Points>
            </S.Row>
            <S.Row>
              <S.Points>0</S.Points>
              <Text>Bloqueio</Text>
              <S.Points>2</S.Points>
            </S.Row>
            <S.Row>
              <S.Points>0</S.Points>
              <Text>Saque</Text>
              <S.Points>0</S.Points>
            </S.Row>
            <S.Row>
              <S.Points>2</S.Points>
              <Text>Erro do adversário</Text>
              <S.Points>6</S.Points>
            </S.Row>
            <S.Row>
              <S.Points>18</S.Points>
              <Text>Total</Text>
              <S.Points>20</S.Points>
            </S.Row>
          </S.Scouts>
        </S.Content>
      </S.ListContainer>
    </>
  );
}
