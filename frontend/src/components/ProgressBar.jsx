import { Box, HStack, Progress, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

function ProgressBar({ title, title2, progressVal }) {
  return (
    <Box w={"100%"} p={5} bg={"#fff"}>
      <HStack
        align={"flex-end"}
        justifyContent={"space-between"}
        w={"100%"}
        mb={3}
      >
        <Text fontSize={"xx-large"} as={"b"}>
          {title}
        </Text>
        <Text fontSize={"x-large"} as={"b"}>
          {title2}
        </Text>
      </HStack>
      <Progress
        value={progressVal}
        colorScheme="green"
        height={"50px"}
        borderRadius={5}
        isAnimated
        css={{ transition: "width 0.5s ease-in-out" }}
        hasStripe
      />
    </Box>
  );
}

export default ProgressBar;

ProgressBar.propTypes = {
  title: PropTypes.string.isRequired,
  title2: PropTypes.string.isRequired,
  progressVal: PropTypes.number,
};
