import { AuthProvider } from "../lib/auth";
import "../styles/globals.scss";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "Open Sans",
      },
    },
  },
});
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <CSSReset />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
