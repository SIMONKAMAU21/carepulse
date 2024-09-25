import { Heading, HStack, IconButton, Image, Spacer, Text, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import logo from "../assets/Logo.svg";
import Sidebar from "../Pages/layout/sidebar";
import { IconBase } from "react-icons/lib";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Header = ({width,title,subTitle}) => {
    const { isOpen, onOpen, onClose } = useDisclosure(); 


  return (
    <>
      <HStack
        borderRadius={"10px"}
        w={width}
        p={4}
        bg={"black"}
        position={{ base: "fixed", md: "relative" }}
      >
        <IconButton
        icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>}
        onClick={isOpen ? onClose:onOpen}
        position={"absolute"}
        zIndex={"1000"}
        left={{base:"80%",md:"20%"}}
        />
        <Image src={logo} onClick={isOpen? onClose : onOpen} cursor="pointer" /> 
        <Spacer />
      </HStack>

      <VStack
        bg={"#131619"}
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
