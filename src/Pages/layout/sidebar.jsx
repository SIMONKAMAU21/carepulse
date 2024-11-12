import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Box, HStack, Icon, Text, useColorMode, useTheme } from "@chakra-ui/react";
import {
  MdDashboard,
  // MdReceipt,
  MdSettings,
  MdAdd,
  MdPerson,
  MdCall,
} from "react-icons/md";

export const sidebarLinks = [
  { path: "/admin", label: "Dashboard", icon: MdDashboard },
  { path: "/doctor", label: "Add doctor", icon: MdAdd },
  { path: "/Patients", label: "Patients", icon: MdPerson },
  { path: "/callcenter", label: "call center", icon: MdCall },
  { path: "/settings", label: "Settings", icon: MdSettings },
];

const Sidebar = () => {
  const location = useLocation();
  const { colorMode } = useColorMode();  
  const theme = useTheme();  

  return (
    <>
      <Box
        p="10px"
        color="#6F7E84"
        position="fixed"
        zIndex={"1000"}
        left="0"
        top="0"
        h="100vh"
        w={{base:"250px",md:"400px"}}
        // bg={colorMode === 'dark' ? theme.styles.global({ colorMode }).body.bg : "rgba(0,0,0,0.85)"}
        bg={colorMode === 'dark' ? "rgba(10,10,10,0.85)" : "rgba(0,0,0,0.85)"}
        filter={"auto"}
      >
        {sidebarLinks.map((link, index) => (
          <NavLink
            to={link.path}
            key={index}
            style={{
              textDecoration: "none",
              display: "block",
              marginBottom: "20px",
            }}
          >
            <Box
              borderRadius="md"
              w="100%"
              bg={location.pathname.includes(link.path) ? "blue.400" : "none"}
              p="3"
              _hover={{ bg: "blue.300" }}
            >
              <HStack
                spacing="4"
                alignItems="center"
                color={
                  location.pathname.includes(link.path) ? "white" : "white"
                }
              >
                <Icon
                  as={link.icon}
                  boxSize="6"
                  color={
                    location.pathname.includes(link.path)
                      ? "yellow"
                      : "gray.500"
                  }
                />
                <Text>{link.label}</Text>
              </HStack>
            </Box>
          </NavLink>
        ))}
      </Box>
    </>
  );
};

export default Sidebar;
