import { AppProps } from "next/app";
import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import purrchaseTheme from "../purrchase-theme";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <ChakraProvider theme={purrchaseTheme}>
        <CSSReset />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
};

export default App;
