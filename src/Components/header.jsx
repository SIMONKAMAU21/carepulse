import {
  Button,
  Heading,
  HStack,
  Icon,
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
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, } from "@chakra-ui/icons";
import { MdNotifications, MdSunny } from "react-icons/md";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = ({ width, title, subTitle }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();

  const text = colorMode === "light" ? "dark mode" : "lightmode";

  return (
    <>
      <HStack
        borderRadius={{ base: "0", md: "10px" }}
        w={width}
        boxShadow='dark-lg'
        p={2}
        bg={
          colorMode === "light"
            ? theme.colors.primary.light
            : theme.colors.primary.dark
        }
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
          src={colorMode === "dark" ? log : logo}
          onClick={isOpen ? onClose : onOpen}
          cursor="pointer"
          autoPlay
          loop
          muted
          style={{
            width: "150px",
            height: "50px",
            objectFit: "cover",
            cursor: "pointer",
          }}
        />
        <Spacer />


        <Icon onClick={toggleColorMode} as={colorMode === "dark" ? MdSunny : FaMoon} />
        <Icon as={MdNotifications} />

      </HStack>

      <VStack
        bg={colorMode === "light" ? "white" : theme.colors.primary.dark}
        color={colorMode === "light" ? "black" : "white"}
        position={{ base: "fixed", md: "relative" }}
        mt={{ base: "18%", md: "0%" }}
        spacing={4}
        w={width}
        align="start"
        p={{ base: 0, md: 4 }}
      >
        <Heading p={{ base: 1, md: 0 }} fontFamily={"sans-serif"}>{title}</Heading>
        <Text p={{ base: 1, md: 0 }} >{subTitle}</Text>
      </VStack>

      {isOpen && <Sidebar onClose={onClose} />}
    </>
  );
};

export default Header;
