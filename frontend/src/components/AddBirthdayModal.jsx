import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, ModalFooter,
  Button, Input, FormLabel, VStack, useToast
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
console.log(import.meta.env.VITE_RMP_PROGRESS_API)

function AddBirthdayModal({ isOpen, onClose, onBirthdayAdded }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 👈 Loading state
  const toast = useToast();

  const handleSubmit = async () => {
    if (!name || !date) {
      toast({
        title: "All fields are required!",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const birthdayDate = new Date(date);
    const payload = {
      name,
      day: birthdayDate.getDate(),
      month: birthdayDate.getMonth() + 1,
    };

    try {
      setIsLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_RMP_PROGRESS_API}/add-birthday`, payload);
      // console.log(res);

      toast({
        title: "🎉 Birthday Added!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onBirthdayAdded(payload); // update frontend
      setName("");
      setDate("");
      onClose();
    } catch (err) {
      toast({
        title: "Failed to add birthday.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // 👈 End loading
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Your Birthday 🎂</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <div style={{ width: "100%" }}>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div style={{ width: "100%" }}>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={handleSubmit}
            isLoading={isLoading} // 👈 Button loading indicator
            loadingText="Adding..."
          >
            Add My Birthday
          </Button>
          <Button onClick={onClose} isDisabled={isLoading}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddBirthdayModal;
