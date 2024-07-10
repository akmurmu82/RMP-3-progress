// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Progress,
  Text,
  VStack,
} from "@chakra-ui/react";
import ProgressBar from "./components/ProgressBar";

function App() {
  return (
    <Box bg={"#f3f3f3"}>
      <Flex
        bg={"tomato"}
        // position={"fixed"}
        // left={0}
        // top={0}
        // zIndex={9}
        fontSize={40}
        fontFamily={"'Margarine', sans-serif"}
        color={"#fff"}
        w={"100%"}
        p={5}
      >
        <Text ml={20}>RMP</Text>
      </Flex>
      <Box
        w={{ base: "90%", lg: "75%" }}
        m={"auto"}
        mt={10}
        position={"relative"}
      >
        <Heading textAlign={"center"} p={5} bg={"#fff"} as="h1" size="4xl">
          Life Checklist
        </Heading>
        <VStack w={"100%"} mt={5}>
          <ProgressBar title="🕐Next minute" title2={'10 second left'} progressVal={59}/>
        </VStack>
      </Box>
    </Box>
  );
}

export default App;
