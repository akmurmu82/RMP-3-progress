
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import ProgressBar from "./components/ProgressBar";
import AddBirthdayModal from "./components/AddBirthdayModal"; // New modal component
import getDaysUntilBirthday from "./utils.js";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
 console.log(import.meta.env.VITE_RMP_PROGRESS_API)

function App() {
  const [seconds, setSeconds] = useState(new Date().getSeconds());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [hours, setHours] = useState(new Date().getHours());
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Months are 0-indexed
  const [year, setYear] = useState(new Date().getFullYear());
    const biniya = getDaysUntilBirthday(13, 6); // June 13
    const My = getDaysUntilBirthday(13, 6); // June 13

    const [userBirthdays, setUserBirthdays] = useState([]);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Fetch all birthdays on load
useEffect(() => {
  const fetchBirthdays = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_RMP_PROGRESS_API}/get-birthdays`);
      // console.log("Fetched birthdays:", res.data);
      setUserBirthdays(res.data); // if you plan to store them in state
    } catch (err) {
      console.error("Error fetching birthdays:", err);
      toast({
        title: "Failed to fetch birthdays",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  fetchBirthdays();
}, []);

// dynamic users
  const dynamicUserEvents = (userBirthdays || []).map(b => ({
    title: `🎉 ${b.name}'s Birthday`,
    ...getDaysUntilBirthday(b.day, b.month),
  }));

  const sortedEventBars = [...dynamicUserEvents]
    .sort((a, b) => a.diffDays - b.diffDays)
    .map((e) => ({
      title: e.title,
      label: e.isToday ? "🎉 Today!" : `${e.diffDays} days left`,
      progress: e.progress,
    }));
    // console.log(sortedEventBars)

  const timerId = useRef();

  useEffect(() => {
    timerId.current = setInterval(() => {
      setSeconds((prev) => (prev === 59 ? 0 : prev + 1));
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      setMinutes((prev) => (prev === 59 ? 0 : prev + 1));
    }
  }, [seconds]);

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      setHours((prev) => (prev === 23 ? 0 : prev + 1));
    }
  }, [minutes, seconds]);

  useEffect(() => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      const lastDayOfMonth = new Date(year, month, 0).getDate();
      setDay((prev) => (prev === lastDayOfMonth ? 1 : prev + 1));
    }
  }, [hours, minutes, seconds]);

  useEffect(() => {
    if (day === 1 && hours === 0 && minutes === 0 && seconds === 0) {
      setMonth((prev) => (prev === 12 ? 1 : prev + 1));
    }
  }, [day, hours, minutes, seconds]);

  useEffect(() => {
    if (month === 1 && day === 1 && hours === 0 && minutes === 0 && seconds === 0) {
      setYear((prev) => prev + 1);
    }
  }, [month, day, hours, minutes, seconds]);

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

        <Button
          colorScheme="teal"
          size="lg"
          onClick={onOpen}
          mb={4}
        >
          Add Your Birthday 🎉🎂
        </Button>

        
        {/* 🕐 Clock-based Progress Bars (Static Order) */}
        <VStack w={"100%"} mt={5}>
          <ProgressBar
            title="🕐 Next minute"
            title2={`${60 - seconds} seconds left`}
            progressVal={(seconds / 60) * 100}
          />
          <ProgressBar
            title="🕐 Next hour"
            title2={`${60 - minutes} minutes left`}
            progressVal={(minutes / 60) * 100}
          />
          <ProgressBar
            title="🕐 Next day"
            title2={`${24 - hours} hours left`}
            progressVal={(hours / 24) * 100}
          />
          <ProgressBar
            title="🕐 Next month"
            title2={`${new Date(year, month, 0).getDate() - day} days left`}
            progressVal={(day / new Date(year, month, 0).getDate()) * 100}
          />
          <ProgressBar
            title="🕐 Next year"
            title2={`${12 - month} months left`}
            progressVal={(month / 12) * 100}
          />

          {/* 🎉 Event-based Progress Bars (Dynamic & Sorted) */}
          {sortedEventBars.map((event, idx) => (
            <ProgressBar
              key={idx}
              title={event.title}
              title2={event.label}
              progressVal={event.progress}
            />
          ))}
        </VStack>
        <AddBirthdayModal
          isOpen={isOpen}
          onClose={onClose}
          onBirthdayAdded={(b) => setUserBirthdays(prev => [...prev, b])}
        />


      </Box>
    </Box>
  );
}

export default App;
