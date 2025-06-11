import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import ProgressBar from "./components/ProgressBar";
import AddBirthdayModal from "./components/AddBirthdayModal"; // New modal component
import getDaysUntilBirthday from "./utils.js";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
//  console.log(import.meta.env.VITE_RMP_PROGRESS_API)

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

  const birthdayEmojis = ["🎊🎂", "🍬🎉", "🧁🎈", "🍬🍰", "🎊", "🧁🎉", "🎂🥳", "🍬"];

const sortedEventBars = [...dynamicUserEvents]
  .sort((a, b) => a.diffDays - b.diffDays)
  .map((e, idx) => {
    const emoji = birthdayEmojis[idx % birthdayEmojis.length];
    return {
      title: `${emoji} ${e.title.replace(/^[^ ]*/, '').trim()}`, // remove existing emoji if any
      label: e.isToday ? "🎉 Today!" : `${e.diffDays} days left`,
      progress: e.progress,
    };
  });

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
        w={"100%"}
        p={5}
      >
        <Heading
        textAlign="center"
        as="h1"
        fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
        w="full"
      >
        TimeTillCake 🎂
      </Heading>
      </Flex>
      <VStack
        w={{ base: "90%", lg: "75%" }}
        m={"auto"}
        mt={10}
        position={"relative"}
      >

<Text fontSize={{ base: "md", md: "xl" }} textAlign="center" px={4} mt={2} mb={5}>
  Welcome to <strong>TimeTillCake</strong> — where every second counts... literally! ⏳
  We track time down to the last tick so you never miss a chance to shout "🎉 Happy Birthday!" to your friends. 
  Just hit <em>"Add Your Birthday"</em> above and join our sweet little <strong>BdayCircle</strong>. 
  Want to see how close you are to your big day? Scroll down the <strong>BirthdayMeter</strong> and see the countdown bars tick in real-time.
  Whether you're waiting for cake or curious about your friend's special day, it's always <strong>Time2Wish</strong>!
</Text>

        <Button
          colorScheme="teal"
          size="lg"
          onClick={onOpen}
          my="5"
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
        
        <Button
          colorScheme="teal"
          size="lg"
          onClick={onOpen}
          my="5"
        >
          Add Your Birthday 🎉🎂
        </Button>

      </VStack>
      <Flex
        as="footer"
        bg="tomato"
        color="white"
        justify="center"
        align="center"
        h="60px"
        mt={10}
        fontSize={{ base: "sm", md: "md" }}
        fontWeight="bold"
        px={4}
        textAlign="center"
      >
        © {new Date().getFullYear()} • Made experimentally by AK Murmu 🧪💡 with ❤️ & 🎂
      </Flex>

    </Box>
  );
}

export default App;
