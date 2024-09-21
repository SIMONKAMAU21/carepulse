import React, { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  PinInput,
  PinInputField,
  HStack,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ErrorToast } from "../Components/toaster";

const PasskeyModal = ({ isOpen, onClose }) => {
  const [otp, setOtp] = useState("");
  const cancelRef = useRef();
  const navigate = useNavigate();
  const SECRET_KEY = import.meta.env.VITE_SECRETKEY;

  const handleSubmit = () => {
    if (otp === SECRET_KEY) {
      navigate("/admin");
    } else {
      ErrorToast("Invalid passkey. Please try again.");
      navigate("/")
    }
    onClose();
  };

  const cancel = () => {
    navigate("/");
    onClose();
  };

  const handlePinChange = (value) => {
    setOtp(value);
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <Center h="100vh">
          <AlertDialogContent
            w={{ base: "90%", sm: "80%", md: "50%" }}
            p={4}
            background="rgb(27,30,34)"
            color="white"
            borderRadius="md"
          >
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Access Verification
            </AlertDialogHeader>

            <AlertDialogBody>
              To access the admin page, please enter the passkey:
              <HStack mt={4} spacing={4} justifyContent="center">
                <PinInput size="lg" onChange={handlePinChange} otp>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                bgColor={"rgb(74,201,126)"}
                color={"white"}
                onClick={handleSubmit}
              >
                Enter Admin Panel
              </Button>
              <Button ref={cancelRef} onClick={cancel} ml={3}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </Center>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default PasskeyModal;
