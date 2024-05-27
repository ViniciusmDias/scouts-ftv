import { HeaderContainer, LinkTo } from "./styles";
import { Heading } from "@pegasus-ui/react";

export function Header() {
  return (
    <HeaderContainer>
      <LinkTo href="/">
        <Heading as="h3">Analisar partida</Heading>
      </LinkTo>
      <LinkTo href="/search">
        <Heading as="h3">Cadastrar partida</Heading>
      </LinkTo>
    </HeaderContainer>
  );
}
