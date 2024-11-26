import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  VStack,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { authenticateUser } from "../lib/Actions/patient.actions";
import { ErrorToast, SuccessToast } from "../Components/toaster";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "../Components/OnboarndingWrapper";
import illustration from "../assets/doc.png";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [inputPasscode, setInputPasscode] = useState("");
  const [step, setStep] = useState("verifyPasscode"); // We're starting with verifying passcode
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  // Handle form submission for passcode verification
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === "verifyPasscode") {
      try {
        const authResponse = await authenticateUser(email, inputPasscode);
        if (authResponse.success) {
          SuccessToast("Authentication successful!");
          navigate("/Patient/dashbord");
        }
      } catch (error) {
        ErrorToast(
          "Authentication failed. Please check your email and passcode."
        );
      }
    }
  };

  return (
    <AuthWrapper
      leftChildren={
        <>
          <Box
            color={colorMode === "light" ? "black" : "white"}
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
            h={"80%"}
            w={"100%"}
          >
            <Box
              bg={colorMode === "light" ? "gray.100" : ""}
              borderRadius={"10px"}
              boxShadow={"dark-lg"}
              p={2}
              h={"50%"}
              w={{ base: "90%", md: "50%" }}
              alignItems={"center"}
              display={{ base: "block", md: "flex" }}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <Text fontSize={{base:"xl",md:"2xl"}} fontWeight="bold">
                Enter Your Email and Passcode
              </Text>
              <Box w={"100%"} mt={"10%"} p={2}>
                <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                  {step === "verifyPasscode" && (
                    <>
                      <FormControl w={"100%"} id="email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                        />
                      </FormControl>

                      <FormControl id="passcode" isRequired mt={4}>
                        <FormLabel>Passcode</FormLabel>
                        <Input
                          type="password"
                          value={inputPasscode}
                          onChange={(e) => setInputPasscode(e.target.value)}
                          placeholder="Enter passcode"
                        />
                      </FormControl>
                      <Button
                        colorScheme="teal"
                        mt={4}
                        type="submit"
                        isFullWidth
                      >
                        Verify Account
                      </Button>
                    </>
                  )}
                </form>
              </Box>
            </Box>
          </Box>
        </>
      }
      rightChildren={
        <>
          <Image
            src={illustration}
            alt="Illustration"
            height="100%"
            width="100%"
            objectFit="cover"
          />
        </>
      }
    />
  );
};

export default Auth;
