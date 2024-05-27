import { globalCss } from "@pegasus-ui/react";

export const globalStyles = globalCss({
  "*": {
    boxSizing: "border-box",
    padding: 0,
    margin: 0,
  },

  body: {
    width: "100vw",
    backgroundColor: "$gray900",
    color: "$gray100",
    "-webkit-font-smoothing": "antialiased",
  },
});
