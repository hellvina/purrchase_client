import { defineStyle, extendTheme, defineStyleConfig } from "@chakra-ui/react";

const purrchaseTheme = extendTheme({
  colors: {
    raising_black: "#272932ff",
    raising_grey: "#333746",
    tropical_indigo: "#9b7edeff",
    mint_cream: "#eff9f0ff",
  },
  initialColorMode: "dark",
  useSystemColorMode: false,
  styles: {
    global: {
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "underline",
        },
      },
      button: {
        _hover: {
          bg: "#b39ce8",
        },
      },
    },
  },
});

const buttonOnHover = defineStyle({
  _hover: {
    backgroundColor: "#b39ce8",
  },
});

export const badgeTheme = defineStyleConfig({
  variants: { buttonOnHover },
});

export default purrchaseTheme;
