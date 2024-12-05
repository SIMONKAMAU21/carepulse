import React from "react";
import { Box, Button, Icon, Text, useColorMode, VStack } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import PatientHeader from "./components/PatientHeader";
import AuthWrapper from "../Components/OnboarndingWrapper";
import logo from "../assets/i (2).mp4";
import log from "../assets/i.mp4";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Settings = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { colorMode } = useColorMode();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        ErrorToast("Oops, your data is not found");
        return null;
    }

    const userId = user.id;

    // Define the menu items
    const menu = [
        { name: "Preferences", link: "/preferences", icon: MdChevronRight },
        { name: "Profile", link: "/patient/profile", icon: MdChevronRight },
    ];

    return (
        <>
            <PatientHeader width={{ base: "100%", md: "100%" }} userId={userId} position={"fixed"} />

            <AuthWrapper
                leftChildren={
                    <Box h="90%" margin="auto" w="100%" mt={{ base: "30%", md: "10%" }}>
                        <VStack spacing={4} align="start">
                            <Box h="90%" w={{ base: "100%", md: "50%" }} p={{ base: 2, md: 4 }}>
                                {menu.map((item, index) => (
                                    <Box
                                        key={index}
                                        onClick={() => navigate(item.link)}
                                        cursor="pointer"
                                        p={2}
                                        // margin={"auto"}
                                        mb={4} display="flex"
                                        alignItems="center"
                                        borderRadius="10px"
                                        w="90%"
                                        h="50px"
                                        border="1px solid gray"
                                        bg={location.pathname === item.link ? "teal.500" : "transparent"}
                                        _hover={{ bg: "gray.200", color: "black" }}
                                    >
                                        <Text
                                            color={colorMode === "light" ? "black" : "white"}
                                            fontSize="20px"
                                            fontWeight="bold"
                                        >
                                            {item.name}
                                        </Text>
                                        {item.icon && <Icon as={item.icon} ml="auto" />}
                                    </Box>
                                ))}
                            </Box>
                        </VStack>
                    </Box>
                }
                rightChildren={
                    <Box height="100vh" width="100%">
                        <video
                            src={colorMode === "light" ? log : logo}
                            autoPlay
                            loop
                            muted
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                marginTop: "10%",
                            }}
                        />
                    </Box>
                }
            />
        </>
    );
};

export default Settings;
