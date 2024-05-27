import { Box, Button, Heading, Text, styled } from "@pegasus-ui/react";

export const Container = styled("main", {
  maxWidth: "650px",
  margin: "$10 auto $4",
  padding: "0 $4",
});

export const Header = styled("div", {
  padding: "0 $6",

  [`> ${Heading}`]: {
    lineHeight: "$base",
  },

  [`> ${Text}`]: {
    color: "$gray200",
    marginBottom: "$6",
  },
});

export const Form = styled(Box, {
  marginTop: "$6",
  display: "flex",
  flexDirection: "column",
  gap: "$4",

  label: {
    display: "flex",
    flexDirection: "column",
    gap: "$2",
  },
});

export const FormError = styled(Text, {
  color: "#f75a68",
});

export const Players = styled("div", {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  overflow: "auto",

  [`${Button}`]: {
    margin: "$2",
    minWidth: "auto",
    width: "$20",
  },
});

export const ButtonType = styled("div", {
  display: "flex",
  justifyContent: "center",

  [`${Button}`]: {
    margin: "$2",
    minWidth: "auto",
    width: "$20",
  },
});

export const AttacksContainer = styled("div", {
  display: "flex",
  flexDirection: "column",

  justifyContent: "center",
  alignItems: "center",
});

export const ErrorsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const Attribute = styled("div", {
  display: "flex",
  marginTop: "$2",
  width: "100%",

  justifyContent: "center",
  alignItems: "center",

  [`${Button}`]: {
    marginLeft: "$2",

    minWidth: "auto",
    width: "$20",
    height: "$8",
  },
});
