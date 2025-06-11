import { Box, HStack, Progress, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

function ProgressBar({ title, title2, progressVal }) {
  return (
    <Box w={"100%"} p={{base: 2, lg: 5}} bg={"#fff"}>
      <HStack
        align={"flex-end"}
        justifyContent={"space-between"}
        w={"100%"}
        mb={3}
        flexWrap="wrap"
      >
        <Text
          fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl", xl: "4xl" }}
          fontWeight="bold"
        >
          {title}
        </Text>
        <Text
          fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl", xl: "3xl" }}
          fontWeight="bold"
        >
          {title2}
        </Text>
      </HStack>
      <Progress
        value={progressVal}
        colorScheme="green"
        height={{ base: "20px", md: "30px", lg: "50px" }}
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
