import { Button, Heading, Text, TextInput } from "@pegasus-ui/react";
import * as S from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextSeo } from "next-seo";
import { Dispatch, SetStateAction, useState } from "react";
import { newPlayer1, newPlayer2, newPlayer3, newPlayer4 } from "./players";

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
  const [player1, setPlayer1] = useState(newPlayer1);
  const [player2, setPlayer2] = useState(newPlayer2);
  const [player3, setPlayer3] = useState(newPlayer3);
  const [player4, setPlayer4] = useState(newPlayer4);
  const [playerSelected, setPlayerSelected] = useState<
    "player1" | "player2" | "player3" | "player4"
  >("player1");
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const adjustAttack = (attribute: keyof Attacks, amount: number) => {
    setSelectedPlayer((prevPlayer: Player) => ({
      ...prevPlayer,
      attacks: {
        ...prevPlayer.attacks,
        [attribute]: prevPlayer.attacks[attribute] + amount,
      },
    }));
  };

  const adjustErrors = (attribute: keyof Errors, amount: number) => {
    setSelectedPlayer((prevPlayer: Player) => ({
      ...prevPlayer,
      errors: {
        ...prevPlayer.errors,
        [attribute]: prevPlayer.errors[attribute] + amount,
      },
    }));
  };

  return (
    <>
      <NextSeo title="Scouts de uma partida | Scoutsftv" />
      <S.Container>
        <Text align="center">Atletas da partida</Text>
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
        {option === "attack" ? (
          <S.AttacksContainer>
            <S.Attribute>
              <Text size="sm">
                Shark ataque: {selectedPlayer.attacks.sharkAttack}
              </Text>

              <Button
                size="small"
                onClick={() => adjustAttack("sharkAttack", 1)}
              >
                +
              </Button>
              <Button
                size="small"
                onClick={() => adjustAttack("sharkAttack", -1)}
              >
                -
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">Paralela: {selectedPlayer.attacks.parallel}</Text>

              <Button size="small" onClick={() => adjustAttack("parallel", 1)}>
                +
              </Button>
              <Button size="small" onClick={() => adjustAttack("parallel", -1)}>
                -
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Meio fundo: {selectedPlayer.attacks.halfBottom}
              </Text>

              <Button
                size="small"
                onClick={() => adjustAttack("halfBottom", 1)}
              >
                +
              </Button>
              <Button
                size="small"
                onClick={() => adjustAttack("halfBottom", -1)}
              >
                -
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Diagonal longa: {selectedPlayer.attacks.longDiagonal}
              </Text>

              <Button
                size="small"
                onClick={() => adjustAttack("longDiagonal", 1)}
              >
                +
              </Button>
              <Button
                size="small"
                onClick={() => adjustAttack("longDiagonal", -1)}
              >
                -
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Diagonal curta: {selectedPlayer.attacks.shortDiagonal}
              </Text>

              <Button
                size="small"
                onClick={() => adjustAttack("shortDiagonal", 1)}
              >
                +
              </Button>
              <Button
                size="small"
                onClick={() => adjustAttack("shortDiagonal", -1)}
              >
                -
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Pingo de meio: {selectedPlayer.attacks.halfDrop}
              </Text>

              <Button size="small" onClick={() => adjustAttack("halfDrop", 1)}>
                +
              </Button>
              <Button size="small" onClick={() => adjustAttack("halfDrop", -1)}>
                -
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Pingo pra trás: {selectedPlayer.attacks.dropBack}
              </Text>

              <Button size="small" onClick={() => adjustAttack("dropBack", 1)}>
                +
              </Button>
              <Button size="small" onClick={() => adjustAttack("dropBack", 1)}>
                -
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">Bloqueio: {selectedPlayer.attacks.block}</Text>

              <Button size="small" onClick={() => adjustAttack("block", 1)}>
                +
              </Button>
              <Button size="small" onClick={() => adjustAttack("block", -1)}>
                -
              </Button>
            </S.Attribute>

            <S.Attribute>
              <Text size="sm">Ace: {selectedPlayer.attacks.ace}</Text>

              <Button size="small" onClick={() => adjustAttack("ace", 1)}>
                +
              </Button>
              <Button size="small" onClick={() => adjustAttack("ace", -1)}>
                -
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">De graça: {selectedPlayer.attacks.forFree}</Text>

              <Button size="small" onClick={() => adjustAttack("forFree", 1)}>
                +
              </Button>
              <Button size="small" onClick={() => adjustAttack("forFree", -1)}>
                -
              </Button>
            </S.Attribute>
          </S.AttacksContainer>
        ) : (
          <S.ErrorsContainer>
            <S.Attribute>
              <Text size="sm">
                Erro de ataque: {selectedPlayer.errors.attack}
              </Text>

              <Button size="small" onClick={() => adjustErrors("attack", 1)}>
                +
              </Button>
              <Button size="small" onClick={() => adjustErrors("attack", -1)}>
                -
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Erro de defesa: {selectedPlayer.errors.defense}
              </Text>

              <Button size="small" onClick={() => adjustErrors("defense", 1)}>
                +
              </Button>
              <Button size="small" onClick={() => adjustErrors("defense", -1)}>
                -
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Encostou na rede: {selectedPlayer.errors.netTouch}
              </Text>

              <Button size="small" onClick={() => adjustErrors("netTouch", 1)}>
                +
              </Button>
              <Button size="small" onClick={() => adjustErrors("netTouch", -1)}>
                -
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Erro de saque: {selectedPlayer.errors.serve}
              </Text>

              <Button size="small" onClick={() => adjustErrors("serve", 1)}>
                +
              </Button>
              <Button size="small" onClick={() => adjustErrors("serve", -1)}>
                -
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Erro de levantada: {selectedPlayer.errors.set}
              </Text>

              <Button size="small" onClick={() => adjustErrors("set", 1)}>
                +
              </Button>
              <Button size="small" onClick={() => adjustErrors("set", -1)}>
                -
              </Button>
            </S.Attribute>
          </S.ErrorsContainer>
        )}
      </S.Container>
    </>
  );
}
