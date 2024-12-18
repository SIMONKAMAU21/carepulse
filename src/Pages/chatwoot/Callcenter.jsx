import {
  Box,
  Text,
  Button,
  VStack,
  useToast,
  Image,
  useColorMode,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AuthWrapper from "../../Components/OnboarndingWrapper";
import callcenter from "../../assets/call.jpg";
import Header from "../../Components/header";
import { useLocation } from "react-router-dom";
import PatientHeader from "../../Patient/components/PatientHeader";
import { MdCall } from "react-icons/md";
const Callcenter = () => {
  const [isChatwootLoaded, setIsChatwootLoaded] = useState(false);
  const toast = useToast();
  const location = useLocation();
  const { colorMode } = useColorMode();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userLoggedIn = !!user;
    if (userLoggedIn) {
      (function (d, t) {
        const BASE_URL = "https://app.chatwoot.com";
        const g = d.createElement(t),
          s = d.getElementsByTagName(t)[0];
        g.src = BASE_URL + "/packs/js/sdk.js";
        g.async = true;
        g.defer = true;
        s.parentNode.insertBefore(g, s);
        g.onload = function () {
          window.chatwootSettings = {
            position: "center",
            type: "standard",
            launcherTitle: "Chat with us",
          };
          window.chatwootSDK.run({
            websiteToken: "y3UBr9K1hNusY3hknPK6TGGa",
            baseUrl: BASE_URL,
            locale: "en",
          });

          setTimeout(() => {
            if (window.$chatwoot) {
              setIsChatwootLoaded(true);
              window.$chatwoot.toggle();

              // Add fullscreen class
              const chatwootIframe = document.querySelector(
                "iframe[title='chatwoot-web-widget']"
              );
              if (chatwootIframe) {
                chatwootIframe.classList.add("chatwoot-fullscreen");
              }
            }
          }, 200);
        };
      })(document, "script");
    }

    return () => {
      const chatwootScript = document.querySelector(
        `script[src="https://app.chatwoot.com/packs/js/sdk.js"]`
      );
      if (chatwootScript) {
        chatwootScript.remove();
      }
    };
  }, []);

  const handleStartChat = () => {
    if (window.$chatwoot) {
      window.$chatwoot.toggle();
    } else {
      toast({
        title: "Chat widget not ready.",
        description: "Please wait for the chat widget to load.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const currentHeader =
    location.pathname === "/simoCare/callcenter" ? (
      <PatientHeader width={{ base: "100%", md: "50%" }} position={"fixed"}/>
    ) : (
      <Header width={{ base: "100%", md: "98%" }} />
    );
  return (
    <AuthWrapper
      leftChildren={
        <>
          <Box p={{ base: 0, md: 4 }} mt={{ base: "none", md: "1%" }}>
            {currentHeader}
          </Box>
          <Box
            p={3}
            h={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
          >
            <VStack justifyContent={"center"} h={{base:"70%",md:"40%"}} boxShadow={"dark-lg"} spacing={6} borderRadius={"10px"}>
              <Text
                color={colorMode === "dark" ? "green.400" : "rgb(36,174,124)"}
                fontSize={{ base: "2xl", md: "4xl" }}
                fontWeight="bold"
              >
                <Icon as={MdCall} /> Welcome to the Callcenter
              </Text>
              <Text fontSize={{base:"10px",md:"18px"}} p={"10px"} color="gray.400">
                We're here to assist you with any questions or issues. Start a
                chat with our support team or browse through FAQs for quick
                solutions.
              </Text>
              <Button colorScheme="blue" onClick={handleStartChat}>
                {isChatwootLoaded ? "Start Chat" : "Loading Chat..."}
              </Button>
              <Text
                fontSize="sm"
                color={isChatwootLoaded ? "green.500" : "red.500"}
              >
                {isChatwootLoaded
                  ? "Chat widget loaded successfully!"
                  : "Chat widget is loading..."}
              </Text>
            </VStack>
          </Box>
        </>
      }
      rightChildren={
        <Box height="100vh" width="100%">
          <Image
            src={callcenter}
            alt="callcenter"
            height="100%"
            width="100%"
            objectFit="cover"
          />
        </Box>
      }
    />
  );
};

export default Callcenter;
