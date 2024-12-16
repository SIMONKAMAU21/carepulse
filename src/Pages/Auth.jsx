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
  HStack,
} from "@chakra-ui/react";
import { authenticateUser } from "../lib/Actions/patient.actions";
import { ErrorToast, SuccessToast } from "../Components/toaster";
import { NavLink, useNavigate } from "react-router-dom";
import AuthWrapper from "../Components/OnboarndingWrapper";
import illustration from "../assets/doc.png";
import logo from "../assets/i (2).mp4";
import log from "../assets/i.mp4";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [inputPasscode, setInputPasscode] = useState("");
  const [step, setStep] = useState("verifyPasscode"); // We're starting with verifying passcode
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  // Handle form submission for passcode verification
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (step === "verifyPasscode") {
  //     try {
  //       const authResponse = await authenticateUser(email, inputPasscode);
  //       if (authResponse.success) {
  //         SuccessToast("Authentication successful!");
  //         navigate(`/Patient/${authResponse.userId}`);
  //       }
  //     } catch (error) {
  //       console.log('error', error)
  //       ErrorToast(
  //         "Authentication failed. Please check your email and passcode."
  //       );
  //     }
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === "verifyPasscode") {
      try {
        const authResponse = await authenticateUser(email, inputPasscode);
        console.log('first', authResponse)
        if (authResponse.success) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: authResponse.user.name,
              id: authResponse.user.userId,
              email: email, // You can store additional user info if needed
            })
          );
          SuccessToast("Authentication successful!");
          navigate(`/Patient/${authResponse.user.userId}`);
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
            h={"80%"}
            w={"100%"}
          >
            <video
              src={colorMode === "light" ? log : logo}
              cursor="pointer"
              autoPlay
              loop
              muted
              style={{
                width: "30%",
                height: "100px",
                objectFit: "cover",
                cursor: "pointer",
                marginTop: "5%"
              }}
            />
            <Box
              bg={colorMode === "light" ? "gray.100" : ""}
              borderRadius={"10px"}
              boxShadow={"2xl"}
              p={2}
              h={"50%"}
              w={{ base: "90%", md: "50%" }}
              alignItems={"center"}
              margin={"auto"}

              display={{ base: "block", md: "flex" }}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
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
                      <Text></Text>
                    </>
                  )}
                </form>
              </Box>

            </Box>
            <HStack mt={{base:"2%",md:"5%"}} alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}>
              <Text>
                Dont have an account ?
              </Text>
              <Box color={"rgb(74,201,126)"}
                textDecoration={"underline"}>
                <NavLink to={"/"}>register</NavLink>
              </Box>
            </HStack>
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
