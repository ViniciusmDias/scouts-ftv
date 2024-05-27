import { Box, Heading, styled } from "@pegasus-ui/react";

export const Container = styled("div", {
  maxWidth: "calc(100vw - (100vw - 1160px) / 2)",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  gap: "$20",
});

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
  },
});

export const Form = styled(Box, {
  marginTop: "$6",
  display: "flex",
  flexDirection: "column",
  gap: "$4",
});

export const InputContainer = styled("div", {
  maxWidth: "650px",
  display: "flex",
  flexDirection: `column`,
  justifyContent: "space-around",
  margin: "$4 0",
  flexWrap: "wrap",
  borderRadius: "$xs",
  backgroundColor: "$gray800",
  border: "1px solid $gray",
  padding: "$4",
});

export const Input = styled("input", {
  width: "$40",
  padding: "$2",
});

export const LastPeopleContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: "$10",
});

export const List = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: "$2",
});
