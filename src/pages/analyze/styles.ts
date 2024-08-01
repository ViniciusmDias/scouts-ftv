import { Box, Heading, Text, styled } from "@pegasus-ui/react";

export const ListContainer = styled("div", {
  maxWidth: "650px",
  display: "flex",
  flexDirection: `column`,
  justifyContent: "space-around",
  margin: "$10 auto",
  flexWrap: "wrap",

  [`${Heading}`]: {
    width: "100%",
    marginBottom: "$2",
    textAlign: "center",
  },
});

export const Content = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: "$2",
  padding: "$2",
  backgroundColor: "$galactic500",
  borderRadius: "1rem",
});

export const Teams = styled("div", {
  display: "flex",
  marginTop: "$2",
  justifyContent: "center",

  [`${Text}`]: {
    width: "100%",
    margin: "0 $2",
    textAlign: "center",
  },
});

export const Scouts = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: "$2",
});

export const Row = styled("div", {
  display: "flex",
  marginTop: "$2",
  alignItems: "center",

  [`${Text}`]: {
    width: "100%",
    margin: "0 $2",
    textAlign: "center",
  },
});

export const Points = styled("p", {
  display: "flex",
  flexDirection: "column",
  marginTop: "$2",
  width: "100%",
  margin: "0 $2",
  textAlign: "center",
});
