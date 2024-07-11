// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import ProgressBar from "./components/ProgressBar";
import { useEffect, useRef, useState } from "react";

function App() {
  const [progress, setProgress] = useState(55);
  const timerId = useRef();

  const date = new Date();
  useEffect(() => {
    console.log("date", date.getHours());
  }, []);
  // console.log("data: ", date);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setProgress((prev) => (prev == 59 ? 0 : prev + 1));
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    console.log("Current:", progress);
  }, [progress]);
  return (
    <Box bg={"#f3f3f3"}>
      <Flex
        bg={"tomato"}
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
          Progress
        </Heading>
        <VStack w={"100%"} mt={5}>
          <ProgressBar
            title="🕐Next minute"
            title2={`${60 - progress} second left`}
            progressVal={(progress / 60) * 100}
          />
          <ProgressBar title="🕐Next hour" title2={"second left"} />
        </VStack>
      </Box>
    </Box>
  );
}

export default App;
