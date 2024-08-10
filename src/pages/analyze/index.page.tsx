import { api } from "@/lib/axios";
import { Heading, Text } from "@pegasus-ui/react";
import { NextSeo } from "next-seo";
import { useCallback, useEffect, useState } from "react";
import * as S from "./styles";

export default function Analyze() {
  const [loading, setLoading] = useState(true);
  const [player1, setPlayer1] = useState({} as Player);
  const [player2, setPlayer2] = useState({} as Player);
  const [player3, setPlayer3] = useState({} as Player);
  const [player4, setPlayer4] = useState({} as Player);
  const [playerSelected, setPlayerSelected] = useState<
    "player1" | "player2" | "player3" | "player4"
  >("player1");

  const [game, setGame] = useState({} as Game);
  const [team1, setTeam1] = useState({} as Team);
  const [team2, setTeam2] = useState({} as Team);

  const gameId = "998c424a-37ad-430a-8ee2-61d4b91621cf";

  const getGameInfo = useCallback(async () => {
    try {
      const response = await api.get(`/game/${gameId}`);

      const game: Game = response.data;

      const sortedTeams = game.teams.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      const team1 = sortedTeams[0];
      const team2 = sortedTeams[1];

      const player1 = team1.Player[0];
      const player2 = team1.Player[1];
      const player3 = team2.Player[0];
      const player4 = team2.Player[1];

      setPlayer1(player1);
      setPlayer2(player2);
      setPlayer3(player3);
      setPlayer4(player4);
      setTeam1(team1);
      setTeam2(team2);
      setPlayerSelected("player1");
      setGame(game);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getGameInfo();
  }, [getGameInfo]);

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
            <Text>{team1.name}</Text>
            <Text>Estatística do Jogo</Text>
            <Text>{team2.name}</Text>
          </S.Teams>
          <S.Scouts>
            <S.Row>
              <S.Points>{game.team1AttackPoints}</S.Points>
              <Text>Ataque</Text>
              <S.Points>{game.team2AttackPoints}</S.Points>
            </S.Row>
            <S.Row>
              <S.Points>{game.team1BlockPoints}</S.Points>
              <Text>Bloqueio</Text>
              <S.Points>{game.team2BlockPoints}</S.Points>
            </S.Row>
            <S.Row>
              <S.Points>{game.team1ServePoints}</S.Points>
              <Text>Saque</Text>
              <S.Points>{game.team2ServePoints}</S.Points>
            </S.Row>
            <S.Row>
              <S.Points>{game.team1Errors}</S.Points>
              <Text>Erro do adversário</Text>
              <S.Points>{game.team2Errors}</S.Points>
            </S.Row>
            <S.Row>
              <S.Points>{game.team1TotalPoints}</S.Points>
              <Text>Total</Text>
              <S.Points>{game.team2TotalPoints}</S.Points>
            </S.Row>
          </S.Scouts>
        </S.Content>
      </S.ListContainer>
    </>
  );
}
