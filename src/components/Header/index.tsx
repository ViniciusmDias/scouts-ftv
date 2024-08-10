import { Heading } from "@pegasus-ui/react";
import { HeaderContainer, LinkTo } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <LinkTo href="/">
        <Heading as="h3">Home</Heading>
      </LinkTo>
      <LinkTo href="/matches">
        <Heading as="h3">Matches</Heading>
      </LinkTo>
      <LinkTo href="/scouts">
        <Heading as="h3">Scouts</Heading>
      </LinkTo>
      <LinkTo href="/analyze">
        <Heading as="h3">Resultado</Heading>
      </LinkTo>
    </HeaderContainer>
  );
}
