import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Box, HStack, Icon, Text, useColorMode, useTheme } from "@chakra-ui/react";
import {
  MdDashboard,
  MdSettings,
  MdCall,
} from "react-icons/md";

export const sidebarLinks = [
  { path: "/patient/dashbord", label: "Dashboard", icon: MdDashboard },
  { path: "/simoCare/callcenter", label: "call center", icon: MdCall },
  { path:"/patient/setting" , label: "Settings", icon: MdSettings },
];

const PatiendSidebar = () => {
  const location = useLocation();
  const { colorMode } = useColorMode();  
  const theme = useTheme();  

  return (
    <>
      <Box
        p="10px"
        color={colorMode === "light" ? "white" :"white"}
        position="fixed"
        zIndex={"1000"}
        left="0"
        top="0"
        h="100vh"
        w={{base:"250px",md:"400px"}}
        bg={colorMode === 'dark' ? theme.styles.global({ colorMode }).body.bg : "rgba(0,0,0,0.85)"}
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
              _hover={{ bg: "#002E3A", color:"red"}}
            >
              <HStack
                spacing="4"
                fontSize={{base:"15px",md:"18px"}}
                fontWeight={{base:"500",md:"700"}}
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
                      ? "white"
                      : "blue.500"
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



export default PatiendSidebar