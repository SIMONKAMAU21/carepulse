import {
  Heading,
  HStack,
  IconButton,
  Image,
  Spacer,
  Text,
  useColorMode,
  useDisclosure,
  useTheme,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import logo from "../../assets/i.mp4";
import log from "../../assets/i (2).mp4";

import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import PatiendSidebar from "./patientSidebar";

const PatientHeader = ({ width, title, subTitle }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();
  return (
    <>
      <HStack
        borderRadius={{ base: "0px", md: "10px" }}
        w={width}
        display={"flex"}
        p={4}
        bg={colorMode === "light" ? "#3182CE" : theme.colors.primary.dark}
        position={{ base: "fixed", md: "relative" }}
      >
        <IconButton
          boxShadow={"dark-lg"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={isOpen ? onClose : onOpen}
          position={"absolute"}
          bg={"none"}
          color={colorMode === "light" ? "white" : "white"}
          zIndex={"1000"}
          left={{ base: "70%", md: "20%" }}
        />
        <video
          src={colorMode === "dark" ? log : logo}
          onClick={isOpen ? onClose : onOpen}
          cursor="pointer"
          autoPlay
          loop
          muted
          style={{
            boxShadow: "rgba(0,0,0,0.25)",
            width: "150px",
            height: "50px",
            objectFit: "cover",
            cursor: "pointer",
          }}
        />
        <Spacer />
        <IconButton
          boxShadow={"dark-lg"}
          aria-label="Toggle color mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          w={{ base: "40px" }}
          h={{ base: "40px" }}
          bg={"none"}
          color={colorMode === "light" ? "black" : "white"}
        />{" "}
      </HStack>

      {/* <VStack
          // bg={"#131619"}
          bg={colorMode === "light" ? "white" : theme.colors.primary.dark}
          color={colorMode === "light" ? "black" : "white"}
  
          position={{ base: "fixed", md: "relative" }}
          mt={{ base: "20%", md: "0%" }}
          spacing={4}
          w={width}
          align="start"
          p={4}
        >
          <Heading>{title}</Heading>
          <Text>{subTitle}</Text>
        </VStack> */}

      {isOpen && <PatiendSidebar onClose={onClose} />}
    </>
  );
};

export default PatientHeader;
