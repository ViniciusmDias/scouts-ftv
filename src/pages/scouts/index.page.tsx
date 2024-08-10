import { Button, Text } from "@pegasus-ui/react";
import { CheckCircle, MinusCircle, PlusCircle } from "phosphor-react";
import * as S from "./styles";

import { api } from "@/lib/axios";
import { updateGamePoints } from "@/utils/updateGamePoints";
import { updateTeamPoints } from "@/utils/updateTeam";
import { NextSeo } from "next-seo";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

export default function Scouts() {
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

  const [option, setOption] = useState("attack");

  const playersMap = {
    player1,
    player2,
    player3,
    player4,
  };

  const setPlayersMap: { [key: string]: Dispatch<SetStateAction<Player>> } = {
    player1: setPlayer1,
    player2: setPlayer2,
    player3: setPlayer3,
    player4: setPlayer4,
  };

  const selectedPlayer = playersMap[playerSelected];
  const setSelectedPlayer = setPlayersMap[playerSelected];

  async function handleSubmit() {
    const players = [player1, player2, player3, player4];
    const teams = [team1, team2];

    const updatedGame = updateGamePoints(game, players, teams);

    const updatedTeams = updateTeamPoints(game, teams);
    try {
      const response = await fetch("/api/game/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ players, updatedGame, updatedTeams }),
      });

      if (response.ok) {
        console.log("Players and game updated successfully");
      } else {
        console.error("Failed to update players or game");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const adjustPoints = (
    player: "player1" | "player2" | "player3" | "player4",
    type: "attack",
    delta: 1 | -1
  ) => {
    setGame((prevGame) => {
      const isTeam1 = ["player1", "player2"].includes(player);
      const isTeam2 = ["player3", "player4"].includes(player);

      if (type === "attack") {
        if (isTeam1) {
          const newTeam1AttackPoints = Math.max(
            0,
            prevGame.team1AttackPoints + delta
          );
          const newTeam1TotalPoints = Math.max(
            0,
            prevGame.team1TotalPoints + delta
          );
          return {
            ...prevGame,
            team1AttackPoints: newTeam1AttackPoints,
            team1TotalPoints: newTeam1TotalPoints,
          };
        } else if (isTeam2) {
          const newTeam2AttackPoints = Math.max(
            0,
            prevGame.team2AttackPoints + delta
          );
          const newTeam2TotalPoints = Math.max(
            0,
            prevGame.team2TotalPoints + delta
          );
          return {
            ...prevGame,
            team2AttackPoints: newTeam2AttackPoints,
            team2TotalPoints: newTeam2TotalPoints,
          };
        }
      }

      return prevGame;
    });
  };

  const adjustAttack = (attribute: keyof Player, amount: number) => {
    setSelectedPlayer((prevPlayer: Player) => {
      const currentAmount = prevPlayer[attribute] as number;
      const newAmount = currentAmount + amount;

      return {
        ...prevPlayer,
        [attribute]: newAmount < 0 ? 0 : newAmount,
      };
    });
  };

  const adjustErrors = (attribute: keyof Player, amount: number) => {
    setSelectedPlayer((prevPlayer: Player) => {
      const currentAmount = prevPlayer[attribute] as number;
      const newAmount = currentAmount + amount;

      return {
        ...prevPlayer,
        [attribute]: newAmount < 0 ? 0 : newAmount,
      };
    });
  };

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
      <NextSeo title="Scouts de uma partida | Scoutsftv" />
      <S.Container>
        <Text align="center">Atletas da partida</Text>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <S.Players>
              <Button
                variant={playerSelected === "player1" ? "primary" : "secondary"}
                onClick={() => setPlayerSelected("player1")}
              >
                {player1.name}
              </Button>
              <Button
                variant={playerSelected === "player2" ? "primary" : "secondary"}
                onClick={() => setPlayerSelected("player2")}
              >
                {player2.name}
              </Button>
              <Button
                variant={playerSelected === "player3" ? "primary" : "secondary"}
                onClick={() => setPlayerSelected("player3")}
              >
                {player3.name}
              </Button>
              <Button
                variant={playerSelected === "player4" ? "primary" : "secondary"}
                onClick={() => setPlayerSelected("player4")}
              >
                {player4.name}
              </Button>
            </S.Players>
            <Text align="center">Placar</Text>
            <S.PlacarContainer>
              <Text align="center">{game.team1TotalPoints}</Text>
              <Text align="center">x</Text>
              <Text align="center">{game.team2TotalPoints}</Text>
            </S.PlacarContainer>
            <Text align="center">Opções</Text>
            <S.ButtonType>
              <Button
                variant={option === "attack" ? "primary" : "secondary"}
                onClick={() => setOption("attack")}
              >
                Ataques
              </Button>
              <Button
                variant={option === "errors" ? "primary" : "secondary"}
                onClick={() => setOption("errors")}
              >
                Erros
              </Button>
            </S.ButtonType>
            {selectedPlayer && option === "attack" ? (
              <S.AttacksContainer>
                <S.Attribute>
                  <Text size="sm">
                    Shark ataque: {selectedPlayer.sharkAttack}/
                    {selectedPlayer.sharkAttackAttempts}
                  </Text>

                  <Button
                    onClick={() => {
                      adjustAttack("sharkAttack", -1);
                      adjustPoints(playerSelected, "attack", -1);
                      adjustAttack("sharkAttackAttempts", -1);
                    }}
                  >
                    <MinusCircle />
                  </Button>

                  <Button
                    onClick={() => {
                      adjustAttack("sharkAttack", 1);
                      adjustPoints(playerSelected, "attack", 1);
                      adjustAttack("sharkAttackAttempts", 1);
                    }}
                  >
                    <CheckCircle />
                  </Button>
                  <Button
                    onClick={() => adjustAttack("sharkAttackAttempts", 1)}
                  >
                    <PlusCircle />
                  </Button>
                </S.Attribute>
                <S.Attribute>
                  <Text size="sm">
                    Paralela: {selectedPlayer.parallel}/
                    {selectedPlayer.parallelAttempts}
                  </Text>

                  <Button
                    onClick={() => {
                      adjustAttack("parallel", -1);
                      adjustPoints(playerSelected, "attack", -1);
                      adjustAttack("parallelAttempts", -1);
                    }}
                  >
                    <MinusCircle />
                  </Button>

                  <Button
                    onClick={() => {
                      adjustAttack("parallel", 1);
                      adjustPoints(playerSelected, "attack", 1);
                      adjustAttack("parallelAttempts", 1);
                    }}
                  >
                    <CheckCircle />
                  </Button>
                  <Button onClick={() => adjustAttack("parallelAttempts", 1)}>
                    <PlusCircle />
                  </Button>
                </S.Attribute>
                <S.Attribute>
                  <Text size="sm">
                    Meio fundo: {selectedPlayer.longMiddle}/
                    {selectedPlayer.longMiddleAttempts}
                  </Text>
                  <Button
                    onClick={() => {
                      adjustAttack("longMiddle", -1);
                      adjustAttack("longMiddleAttempts", -1);
                      adjustPoints(playerSelected, "attack", -1);
                    }}
                  >
                    <MinusCircle />
                  </Button>
                  <Button
                    onClick={() => {
                      adjustAttack("longMiddle", 1);
                      adjustAttack("longMiddleAttempts", 1);
                      adjustPoints(playerSelected, "attack", 1);
                    }}
                  >
                    <CheckCircle />
                  </Button>
                  <Button onClick={() => adjustAttack("longMiddleAttempts", 1)}>
                    <PlusCircle />
                  </Button>
                </S.Attribute>
                <S.Attribute>
                  <Text size="sm">
                    Diagonal longa: {selectedPlayer.longDiagonal}/
                    {selectedPlayer.longDiagonalAttempts}
                  </Text>

                  <Button
                    onClick={() => {
                      adjustAttack("longDiagonal", -1);
                      adjustAttack("longDiagonalAttempts", -1);
                      adjustPoints(playerSelected, "attack", -1);
                    }}
                  >
                    <MinusCircle />
                  </Button>
                  <Button
                    onClick={() => {
                      adjustAttack("longDiagonal", 1);
                      adjustAttack("longDiagonalAttempts", 1);
                      adjustPoints(playerSelected, "attack", 1);
                    }}
                  >
                    <CheckCircle />
                  </Button>
                  <Button
                    onClick={() => adjustAttack("longDiagonalAttempts", 1)}
                  >
                    <PlusCircle />
                  </Button>
                </S.Attribute>
                <S.Attribute>
                  <Text size="sm">
                    Diagonal curta: {selectedPlayer.shortDiagonal}/
                    {selectedPlayer.shortDiagonalAttempts}
                  </Text>

                  <Button
                    onClick={() => {
                      adjustAttack("shortDiagonal", -1);
                      adjustAttack("shortDiagonalAttempts", -1);
                      adjustPoints(playerSelected, "attack", -1);
                    }}
                  >
                    <MinusCircle />
                  </Button>
                  <Button
                    onClick={() => {
                      adjustAttack("shortDiagonal", 1);
                      adjustAttack("shortDiagonalAttempts", 1);
                      adjustPoints(playerSelected, "attack", 1);
                    }}
                  >
                    <CheckCircle />
                  </Button>
                  <Button
                    onClick={() => adjustAttack("shortDiagonalAttempts", 1)}
                  >
                    <PlusCircle />
                  </Button>
                </S.Attribute>
                <S.Attribute>
                  <Text size="sm">
                    Pingo de meio: {selectedPlayer.shortMiddle}/
                    {selectedPlayer.shortMiddleAttempts}
                  </Text>
                  <Button
                    onClick={() => {
                      adjustAttack("shortMiddle", -1);
                      adjustAttack("shortMiddleAttempts", -1);
                      adjustPoints(playerSelected, "attack", -1);
                    }}
                  >
                    <MinusCircle />
                  </Button>
                  <Button
                    onClick={() => {
                      adjustAttack("shortMiddle", 1);
                      adjustAttack("shortMiddleAttempts", 1);
                      adjustPoints(playerSelected, "attack", 1);
                    }}
                  >
                    <CheckCircle />
                  </Button>
                  <Button
                    size="small"
                    onClick={() => adjustAttack("shortMiddleAttempts", 1)}
                  >
                    <PlusCircle />
                  </Button>
                </S.Attribute>
                <S.Attribute>
                  <Text size="sm">
                    Pingo pra trás: {selectedPlayer.backDrop}/
                    {selectedPlayer.backDropAttempts}
                  </Text>

                  <Button
                    onClick={() => {
                      adjustAttack("backDrop", -1);
                      adjustAttack("backDropAttempts", -1);
                      adjustPoints(playerSelected, "attack", -1);
                    }}
                  >
                    <MinusCircle />
                  </Button>
                  <Button
                    onClick={() => {
                      adjustAttack("backDrop", 1);
                      adjustAttack("backDropAttempts", 1);
                      adjustPoints(playerSelected, "attack", 1);
                    }}
                  >
                    <CheckCircle />
                  </Button>
                  <Button onClick={() => adjustAttack("backDropAttempts", 1)}>
                    <PlusCircle />
                  </Button>
                </S.Attribute>
                <S.Attribute>
                  <Text size="sm">
                    Bloqueio: {selectedPlayer.block}/
                    {selectedPlayer.blockAttempts}
                  </Text>

                  <Button
                    onClick={() => {
                      adjustAttack("block", -1);
                      adjustAttack("blockAttempts", -1);
                      adjustPoints(playerSelected, "attack", -1);
                    }}
                  >
                    <MinusCircle />
                  </Button>
                  <Button
                    onClick={() => {
                      adjustAttack("block", 1);
                      adjustAttack("blockAttempts", 1);
                      adjustPoints(playerSelected, "attack", 1);
                    }}
                  >
                    <CheckCircle />
                  </Button>
                  <Button onClick={() => adjustAttack("blockAttempts", 1)}>
                    <PlusCircle />
                  </Button>
                </S.Attribute>

                <S.Attribute>
                  <Text size="sm">
                    De graça: {selectedPlayer.free}/
                    {selectedPlayer.freeAttempts}
                  </Text>
                  <Button
                    onClick={() => {
                      adjustAttack("free", -1);
                      adjustAttack("freeAttempts", -1);
                      adjustPoints(playerSelected, "attack", -1);
                    }}
                  >
                    <MinusCircle />
                  </Button>

                  <Button
                    onClick={() => {
                      adjustAttack("free", 1);
                      adjustAttack("freeAttempts", 1);
                      adjustPoints(playerSelected, "attack", 1);
                    }}
                  >
                    <CheckCircle />
                  </Button>
                  <Button onClick={() => adjustAttack("freeAttempts", 1)}>
                    <PlusCircle />
                  </Button>
                </S.Attribute>
                <S.Attribute>
                  <Text size="sm">Ace: {selectedPlayer.ace}</Text>

                  <Button
                    onClick={() => {
                      adjustAttack("ace", -1);
                      adjustPoints(playerSelected, "attack", -1);
                    }}
                  >
                    <MinusCircle />
                  </Button>
                  <Button
                    onClick={() => {
                      adjustAttack("ace", 1);
                      adjustPoints(playerSelected, "attack", 1);
                    }}
                  >
                    <CheckCircle />
                  </Button>
                </S.Attribute>
              </S.AttacksContainer>
            ) : (
              <S.ErrorsContainer>
                <S.Attribute>
                  <Text size="sm">
                    Erro de ataque: {selectedPlayer.attackError}
                  </Text>

                  <Button onClick={() => adjustErrors("attackError", -1)}>
                    <MinusCircle />
                  </Button>
                  <Button onClick={() => adjustErrors("attackError", 1)}>
                    <PlusCircle />
                  </Button>
                </S.Attribute>
                <S.Attribute>
                  <Text size="sm">
                    Erro de defesa: {selectedPlayer.defenseError}
                  </Text>

                  <Button onClick={() => adjustErrors("defenseError", -1)}>
                    <MinusCircle />
                  </Button>
                  <Button onClick={() => adjustErrors("defenseError", 1)}>
                    <PlusCircle />
                  </Button>
                </S.Attribute>
                <S.Attribute>
                  <Text size="sm">
                    Encostou na rede: {selectedPlayer.netTouchError}
                  </Text>

                  <Button onClick={() => adjustErrors("netTouchError", -1)}>
                    <MinusCircle />
                  </Button>
                  <Button onClick={() => adjustErrors("netTouchError", 1)}>
                    <PlusCircle />
                  </Button>
                </S.Attribute>
                <S.Attribute>
                  <Text size="sm">
                    Erro de saque: {selectedPlayer.serveError}
                  </Text>

                  <Button onClick={() => adjustErrors("serveError", -1)}>
                    <MinusCircle />
                  </Button>
                  <Button onClick={() => adjustErrors("serveError", 1)}>
                    <PlusCircle />
                  </Button>
                </S.Attribute>
                <S.Attribute>
                  <Text size="sm">
                    Erro de levantada: {selectedPlayer.setError}
                  </Text>

                  <Button onClick={() => adjustErrors("setError", -1)}>
                    <MinusCircle />
                  </Button>
                  <Button onClick={() => adjustErrors("setError", 1)}>
                    <PlusCircle />
                  </Button>
                </S.Attribute>
                <S.Attribute>
                  <Text size="sm">
                    Erro de recepção: {selectedPlayer.receptionError}
                  </Text>

                  <Button onClick={() => adjustErrors("receptionError", -1)}>
                    <MinusCircle />
                  </Button>
                  <Button onClick={() => adjustErrors("receptionError", 1)}>
                    <PlusCircle />
                  </Button>
                </S.Attribute>
              </S.ErrorsContainer>
            )}
            <S.ButtonZero>
              <Button onClick={handleSubmit} variant="primary">
                Enviar os scouts
              </Button>
            </S.ButtonZero>
          </>
        )}
      </S.Container>
    </>
  );
}
