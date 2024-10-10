import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./index.css";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
});
createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <StrictMode>
      <App  />
    </StrictMode>
  </ChakraProvider>
);
