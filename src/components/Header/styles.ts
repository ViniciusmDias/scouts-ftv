import { styled } from "@pegasus-ui/react";
import Link from "next/link";

export const HeaderContainer = styled("div", {
  maxWidth: "1600px",
  margin: "$10 auto 0",
  padding: "0 $6",
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

export const LinkTo = styled(Link, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 $10",
});
