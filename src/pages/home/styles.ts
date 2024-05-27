import {
  Box,
  Button,
  Heading,
  Text,
  TextInput,
  styled,
} from "@pegasus-ui/react";

export const Container = styled("main", {
  maxWidth: "650px",
  margin: "$4 auto $4",
  padding: "0 $4",
});

export const ButtonZero = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  [`${Button}`]: {
    marginTop: "$6",
  },
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

  input: {
    margin: "$2",
    border: "2px solid $galactic500",
    borderRadius: "10%",
    backgroundColor: "transparent",
    color: "$galactic500",
    padding: "$2",
    width: "$16",
    height: "$8",
    cursor: "pointer",

    "&:focus": {
      backgroundColor: "$galactic500",
      color: "white",
    },
  },
});

export const ButtonType = styled("div", {
  display: "flex",
  justifyContent: "center",

  [`${Button}`]: {
    margin: "$2",
    minWidth: "auto",
    width: "$20",
    height: "$8",
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
    backgroundColor: "#c60f13",
    minWidth: "auto",
    width: "$20",
    height: "$8",
    opacity: 0.8,

    "&:hover": {
      opacity: 1,
      backgroundColor: "#c60f13 !important",
    },
  },

  [`${Button} + ${Button}`]: {
    backgroundColor: "$galactic500",
    "&:hover": {
      backgroundColor: "$galactic500 !important",
    },

    [`${Button}:hover`]: {},
  },
  [`${Button} + ${Button} + ${Button}`]: {
    backgroundColor: "$gray200",

    "&:hover": {
      backgroundColor: "$gray200 !important",
    },
  },
});
