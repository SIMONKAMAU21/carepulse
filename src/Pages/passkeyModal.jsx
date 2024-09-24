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
import { ErrorToast, LoadingToast, SuccessToast } from "../Components/toaster";

const PasskeyModal = ({ isOpen, onClose }) => {
  const cancelRef = useRef();
  const navigate = useNavigate();
  const SECRET_KEY = import.meta.env.VITE_SECRETKEY;

  const handleSubmit = (value) => {
    if (value === SECRET_KEY) {
      LoadingToast(true)
      setTimeout(()=>{
        navigate("/admin");
        SuccessToast("welcome admin")
        LoadingToast(false)
      },2000)
    } else {
      ErrorToast("Invalid passkey. Please try again.");
      navigate("/")
      onClose()
    }
    LoadingToast(false)

  };

  const cancel = () => {
    navigate("/");
    onClose();
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
                <PinInput size="lg"  onComplete={handleSubmit} otp>
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
