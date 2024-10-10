import Home from "./Components/Home";
import { useColorMode } from "@chakra-ui/react";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Home colorMode={colorMode} toggleColorMode={toggleColorMode} />
    </>
  );
}

export default App;
