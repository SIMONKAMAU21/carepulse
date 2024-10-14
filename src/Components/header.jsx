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
import logo from "../assets/i.mp4";
import log from "../assets/i (2).mp4";


import Sidebar from "../Pages/layout/sidebar";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const Header = ({ width, title, subTitle }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();
  return (
    <>
      <HStack
        borderRadius={"10px"}
        w={width}
        p={4}
        bg={colorMode === "light" ? theme.colors.primary.light : theme.colors.primary.dark}
        position={{ base: "fixed", md: "relative" }}
      >
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={isOpen ? onClose : onOpen}
          position={"absolute"}
          bg={"none"}
          color={colorMode === "light" ? "black" : "white"}
          zIndex={"1000"}
          left={{ base: "70%", md: "20%" }}
        />
       
        <video
          src={colorMode==="dark" ? log : logo}
          onClick={isOpen ? onClose : onOpen}
          cursor="pointer"
          autoPlay
          loop
          muted
          style={{ width: "150px",height: "50px", objectFit:"cover",  cursor: "pointer" }}
        />
        <Spacer />
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          w={{ base: "40px" }}
          h={{ base: "40px" }}
          bg={"none"}
          color={colorMode === "light" ? "black" : "white"}
          //  color={textStyles.color}
        />{" "}
      </HStack>

      <VStack
        // bg={"#131619"}
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
      </VStack>

      {isOpen && <Sidebar onClose={onClose} />}
    </>
  );
};

export default Header;
