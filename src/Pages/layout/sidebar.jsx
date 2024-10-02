import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import {
  MdDashboard,
  MdMonetizationOn,
  MdAssessment,
  MdReceipt,
  MdSettings,
} from "react-icons/md";

export const sidebarLinks = [
  { path: "/admin", label: "Dashboard", icon: MdDashboard },
  { path: "/doctor", label: "Add doctor", icon: MdMonetizationOn },
  { path: "/Patients", label: "Patients", icon: MdAssessment },
  { path: "/statements", label: "Statements", icon: MdReceipt },
  { path: "/settings", label: "Settings", icon: MdSettings },
];

const Sidebar = () => {
  const location = useLocation();

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
        w="250px"
        bg={"#131619"}
        filter={"auto"}
        mt={"20px"}
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
              bg={location.pathname.includes(link.path) ? "#002E3A" : "none"}
              p="3"
              _hover={{ bg: "#002E3A" }}
            >
              <HStack
                spacing="4"
                alignItems="center"
                color={
                  location.pathname.includes(link.path) ? "white" : "gray.500"
                }
              >
                <Icon
                  as={link.icon}
                  boxSize="6"
                  color={
                    location.pathname.includes(link.path)
                      ? "rgb(130,186,38)"
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
