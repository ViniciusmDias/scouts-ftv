import { Button, Heading, Text, TextInput } from "@pegasus-ui/react";
import * as S from "./styles";
import {} from "phosphor-react";
import { PlusCircle, MinusCircle, CheckCircle } from "phosphor-react";

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

const resetPlayerAttributesToZero = (player: Player): Player => {
  const resetAttacks = Object.keys(player.attacks).reduce((acc, key) => {
    acc[key as keyof Attacks] = 0;
    return acc;
  }, {} as Attacks);

  const resetErrors = Object.keys(player.errors).reduce((acc, key) => {
    acc[key as keyof Errors] = 0;
    return acc;
  }, {} as Errors);

  return {
    ...player,
    attacks: resetAttacks,
    errors: resetErrors,
  };
};

const resetAllPlayers = (
  setPlayer1: React.Dispatch<React.SetStateAction<Player>>,
  setPlayer2: React.Dispatch<React.SetStateAction<Player>>,
  setPlayer3: React.Dispatch<React.SetStateAction<Player>>,
  setPlayer4: React.Dispatch<React.SetStateAction<Player>>
) => {
  setPlayer1((prev) => resetPlayerAttributesToZero(prev));
  setPlayer2((prev) => resetPlayerAttributesToZero(prev));
  setPlayer3((prev) => resetPlayerAttributesToZero(prev));
  setPlayer4((prev) => resetPlayerAttributesToZero(prev));
};

export default function Scouts() {
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

  const handleResetAllPlayers = () => {
    resetAllPlayers(setPlayer1, setPlayer2, setPlayer3, setPlayer4);
  };

  const adjustAttack = (attribute: keyof Attacks, amount: number) => {
    setSelectedPlayer((prevPlayer: Player) => {
      const currentAmount = prevPlayer.attacks[attribute];
      const newAmount = currentAmount + amount;

      return {
        ...prevPlayer,
        attacks: {
          ...prevPlayer.attacks,
          [attribute]: newAmount < 0 ? 0 : newAmount,
        },
      };
    });
  };

  const adjustErrors = (attribute: keyof Errors, amount: number) => {
    setSelectedPlayer((prevPlayer: Player) => {
      const currentAmount = prevPlayer.errors[attribute];
      const newAmount = currentAmount + amount;

      return {
        ...prevPlayer,
        errors: {
          ...prevPlayer.errors,
          [attribute]: newAmount < 0 ? 0 : newAmount,
        },
      };
    });
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
                Shark ataque: {selectedPlayer.attacks.sharkAttack}/
                {selectedPlayer.attacks.sharkAttackAttempts}
              </Text>

              <Button
                onClick={() => {
                  adjustAttack("sharkAttack", -1);
                  adjustAttack("sharkAttackAttempts", -1);
                }}
              >
                <MinusCircle />
              </Button>

              <Button
                onClick={() => {
                  adjustAttack("sharkAttack", 1);
                  adjustAttack("sharkAttackAttempts", 1);
                }}
              >
                <CheckCircle />
              </Button>
              <Button onClick={() => adjustAttack("sharkAttackAttempts", 1)}>
                <PlusCircle />
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Paralela: {selectedPlayer.attacks.parallel}/
                {selectedPlayer.attacks.parallelAttempts}
              </Text>

              <Button
                onClick={() => {
                  adjustAttack("parallel", -1);
                  adjustAttack("parallelAttempts", -1);
                }}
              >
                <MinusCircle />
              </Button>

              <Button
                onClick={() => {
                  adjustAttack("parallel", 1);
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
                Meio fundo: {selectedPlayer.attacks.halfBottom}/
                {selectedPlayer.attacks.halfBottomAttempts}
              </Text>
              <Button
                onClick={() => {
                  adjustAttack("halfBottom", -1);
                  adjustAttack("halfBottomAttempts", -1);
                }}
              >
                <MinusCircle />
              </Button>
              <Button
                onClick={() => {
                  adjustAttack("halfBottom", 1);
                  adjustAttack("halfBottomAttempts", 1);
                }}
              >
                <CheckCircle />
              </Button>
              <Button onClick={() => adjustAttack("halfBottomAttempts", 1)}>
                <PlusCircle />
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Diagonal longa: {selectedPlayer.attacks.longDiagonal}/
                {selectedPlayer.attacks.longDiagonalAttempts}
              </Text>

              <Button
                onClick={() => {
                  adjustAttack("longDiagonal", -1);
                  adjustAttack("longDiagonalAttempts", -1);
                }}
              >
                <MinusCircle />
              </Button>
              <Button
                onClick={() => {
                  adjustAttack("longDiagonal", 1);
                  adjustAttack("longDiagonalAttempts", 1);
                }}
              >
                <CheckCircle />
              </Button>
              <Button onClick={() => adjustAttack("longDiagonalAttempts", 1)}>
                <PlusCircle />
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Diagonal curta: {selectedPlayer.attacks.shortDiagonal}/
                {selectedPlayer.attacks.shortDiagonalAttempts}
              </Text>

              <Button
                onClick={() => {
                  adjustAttack("shortDiagonal", -1);
                  adjustAttack("shortDiagonalAttempts", -1);
                }}
              >
                <MinusCircle />
              </Button>
              <Button
                onClick={() => {
                  adjustAttack("shortDiagonal", 1);
                  adjustAttack("shortDiagonalAttempts", 1);
                }}
              >
                <CheckCircle />
              </Button>
              <Button onClick={() => adjustAttack("shortDiagonalAttempts", 1)}>
                <PlusCircle />
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Pingo de meio: {selectedPlayer.attacks.halfDrop}/
                {selectedPlayer.attacks.halfDropAttempts}
              </Text>
              <Button
                onClick={() => {
                  adjustAttack("halfDrop", -1);
                  adjustAttack("halfDropAttempts", -1);
                }}
              >
                <MinusCircle />
              </Button>
              <Button
                onClick={() => {
                  adjustAttack("halfDrop", 1);
                  adjustAttack("halfDropAttempts", 1);
                }}
              >
                <CheckCircle />
              </Button>
              <Button
                size="small"
                onClick={() => adjustAttack("halfDropAttempts", 1)}
              >
                <PlusCircle />
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Pingo pra trás: {selectedPlayer.attacks.dropBack}/
                {selectedPlayer.attacks.dropBackAttempts}
              </Text>

              <Button
                onClick={() => {
                  adjustAttack("dropBack", -1);
                  adjustAttack("dropBackAttempts", -1);
                }}
              >
                <MinusCircle />
              </Button>
              <Button
                onClick={() => {
                  adjustAttack("dropBack", 1);
                  adjustAttack("dropBackAttempts", 1);
                }}
              >
                <CheckCircle />
              </Button>
              <Button onClick={() => adjustAttack("dropBackAttempts", 1)}>
                <PlusCircle />
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Bloqueio: {selectedPlayer.attacks.block}/
                {selectedPlayer.attacks.blockAttempts}
              </Text>

              <Button
                onClick={() => {
                  adjustAttack("block", -1);
                  adjustAttack("blockAttempts", -1);
                }}
              >
                <MinusCircle />
              </Button>
              <Button
                onClick={() => {
                  adjustAttack("block", 1);
                  adjustAttack("blockAttempts", 1);
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
                De graça: {selectedPlayer.attacks.forFree}/
                {selectedPlayer.attacks.forFreeAttempts}
              </Text>
              <Button
                onClick={() => {
                  adjustAttack("forFree", -1);
                  adjustAttack("forFreeAttempts", -1);
                }}
              >
                <MinusCircle />
              </Button>

              <Button
                onClick={() => {
                  adjustAttack("forFree", 1);
                  adjustAttack("forFreeAttempts", 1);
                }}
              >
                <CheckCircle />
              </Button>
              <Button onClick={() => adjustAttack("forFreeAttempts", 1)}>
                <PlusCircle />
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">Ace: {selectedPlayer.attacks.ace}</Text>

              <Button onClick={() => adjustAttack("ace", -1)}>
                <MinusCircle />
              </Button>
              <Button onClick={() => adjustAttack("ace", 1)}>
                <CheckCircle />
              </Button>
            </S.Attribute>
          </S.AttacksContainer>
        ) : (
          <S.ErrorsContainer>
            <S.Attribute>
              <Text size="sm">
                Erro de ataque: {selectedPlayer.errors.attack}
              </Text>

              <Button onClick={() => adjustErrors("attack", -1)}>
                <MinusCircle />
              </Button>
              <Button onClick={() => adjustErrors("attack", 1)}>
                <PlusCircle />
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Erro de defesa: {selectedPlayer.errors.defense}
              </Text>

              <Button onClick={() => adjustErrors("defense", -1)}>
                <MinusCircle />
              </Button>
              <Button onClick={() => adjustErrors("defense", 1)}>
                <PlusCircle />
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Encostou na rede: {selectedPlayer.errors.netTouch}
              </Text>

              <Button onClick={() => adjustErrors("netTouch", -1)}>
                <MinusCircle />
              </Button>
              <Button onClick={() => adjustErrors("netTouch", 1)}>
                <PlusCircle />
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Erro de saque: {selectedPlayer.errors.serve}
              </Text>

              <Button onClick={() => adjustErrors("serve", -1)}>
                <MinusCircle />
              </Button>
              <Button onClick={() => adjustErrors("serve", 1)}>
                <PlusCircle />
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Erro de levantada: {selectedPlayer.errors.set}
              </Text>

              <Button onClick={() => adjustErrors("set", -1)}>
                <MinusCircle />
              </Button>
              <Button onClick={() => adjustErrors("set", 1)}>
                <PlusCircle />
              </Button>
            </S.Attribute>
            <S.Attribute>
              <Text size="sm">
                Erro de recepção: {selectedPlayer.errors.receive}
              </Text>

              <Button onClick={() => adjustErrors("receive", -1)}>
                <MinusCircle />
              </Button>
              <Button onClick={() => adjustErrors("receive", 1)}>
                <PlusCircle />
              </Button>
            </S.Attribute>
          </S.ErrorsContainer>
        )}
        <S.ButtonZero>
          <Button variant="primary" onClick={handleResetAllPlayers}>
            Zerar os scouts
          </Button>
        </S.ButtonZero>
      </S.Container>
    </>
  );
}
