import { HeaderContainer, LinkTo } from "./styles";
import { Heading } from "@pegasus-ui/react";

export function Header() {
  return (
    <HeaderContainer>
      <LinkTo href="/">
        <Heading as="h3">Fazer scouts de uma partida</Heading>
      </LinkTo>
      <LinkTo href="/search">
        <Heading as="h3">Análise da partida</Heading>
      </LinkTo>
    </HeaderContainer>
  );
}
