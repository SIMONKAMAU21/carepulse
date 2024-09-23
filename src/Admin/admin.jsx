import React from "react";
import {
  Box,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  Avatar,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import {
  FaCalendarCheck,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import logo from "../assets/Logo.svg";
// import avatarImg from '../assets/avatar.png';

const Admin = () => {
  return (
    <Box bg={"#131619"} color={"white"} w={"100vw"} h={"100vh"} p={4}>
      <HStack p={4} bg={"black"}>
        <Image src={logo} />
        <Spacer />
        {/* <Avatar size="md" name="Admin" src={avatarImg} /> */}
      </HStack>

      <VStack spacing={4} align="start" p={4}>
        <Heading>Welcome, Admin</Heading>
        <Text>Start your day by managing new appointments</Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Box
          bgGradient="linear(to-l, rgb(255,209,71),#1c1e22, #1c1e22)"
          p={{ base: "4", md: "6" }} // Adjust padding for mobile and larger screens
          borderRadius="md"
          shadow="md"
          h={{ base: "auto", md: "" }} // Smaller height on mobile
        >
          <VStack align="start">
            <HStack>
              <Icon
                as={FaCalendarCheck}
                boxSize={{ base: 6, md: 8 }}
                color="rgb(255,209,71)"
              />
              <Heading size={{ base: "md", md: "lg" }}>94</Heading>
            </HStack>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Total number of scheduled appointments
            </Text>
          </VStack>
        </Box>
        <Box
          bgGradient="linear(to-l, blue.200,#1c1e22, #1c1e22)"
          p={{ base: "4", md: "6" }}
          borderRadius="md"
          shadow="md"
          h={{ base: "auto", md: "" }} // Smaller height on mobile
        >
          <VStack align="start">
            <HStack>
              <Icon
                as={FaClock}
                boxSize={{ base: 6, md: 8 }}
                color="blue.200"
              />
              <Heading size={{ base: "md", md: "lg" }}>32</Heading>
            </HStack>
            <Text
              mt={{ base: "none", md: "1%" }}
              fontSize={{ base: "sm", md: "md" }}
            >
              Total number of pending appointments
            </Text>
          </VStack>
        </Box>
        <Box
          bgGradient="linear(to-l, red.300,#1c1e22, #1c1e22)"
          p={{ base: "4", md: "6" }}
          borderRadius="md"
          shadow="md"
          h={{ base: "auto", md: "" }} // Smaller height on mobile
        >
          <VStack align="start">
            <HStack>
              <Icon
                as={FaExclamationTriangle}
                boxSize={{ base: 6, md: 8 }}
                color="red.400"
              />
              <Heading size={{ base: "md", md: "lg" }}>56</Heading>
            </HStack>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Total number of cancelled appointments
            </Text>
          </VStack>
        </Box>
      </SimpleGrid>

      <Box p={4} mt={{ base: "2%", md: "5%" }} h={{base:"40%",md:"50%"}} overflowX="auto">
        <Table
          variant="simple"
          colorScheme="whiteAlpha"
          size={{ base: "sm", md: "md" }}
        >
          <Thead>
            <Tr>
              <Th>Patient</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Doctor</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <HStack>
                  <Avatar
                    name="Phoenix Baker"
                    size={{ base: "sm", md: "md" }}
                  />
                  <Text fontSize={{ base: "sm", md: "md" }}>Phoenix Baker</Text>
                </HStack>
              </Td>
              <Td fontSize={{ base: "sm", md: "md" }}>Jan 4, 2022</Td>
              <Td color="green.400" fontSize={{ base: "sm", md: "md" }}>
                Scheduled
              </Td>
              <Td fontSize={{ base: "sm", md: "md" }}>Dr. Alex Ramirez</Td>
              <Td>
                <Button
                  colorScheme="green"
                  size={{ base: "xs", md: "sm" }}
                  mb={{ base: 2, md: 0 }}
                >
                  Schedule
                </Button>{" "}
                <Button colorScheme="red" size={{ base: "xs", md: "sm" }}>
                  Cancel
                </Button>
              </Td>
            </Tr>{" "}
            <Tr>
              <Td>
                <HStack>
                  <Avatar
                    name="Phoenix Baker"
                    size={{ base: "sm", md: "md" }}
                  />
                  <Text fontSize={{ base: "sm", md: "md" }}>Phoenix Baker</Text>
                </HStack>
              </Td>
              <Td fontSize={{ base: "sm", md: "md" }}>Jan 4, 2022</Td>
              <Td color="green.400" fontSize={{ base: "sm", md: "md" }}>
                Scheduled
              </Td>
              <Td fontSize={{ base: "sm", md: "md" }}>Dr. Alex Ramirez</Td>
              <Td>
                <Button
                  colorScheme="green"
                  size={{ base: "xs", md: "sm" }}
                  mb={{ base: 2, md: 0 }}
                >
                  Schedule
                </Button>{" "}
                <Button colorScheme="red" size={{ base: "xs", md: "sm" }}>
                  Cancel
                </Button>
              </Td>
            </Tr>{" "}
            <Tr>
              <Td>
                <HStack>
                  <Avatar
                    name="Phoenix Baker"
                    size={{ base: "sm", md: "md" }}
                  />
                  <Text fontSize={{ base: "sm", md: "md" }}>Phoenix Baker</Text>
                </HStack>
              </Td>
              <Td fontSize={{ base: "sm", md: "md" }}>Jan 4, 2022</Td>
              <Td color="green.400" fontSize={{ base: "sm", md: "md" }}>
                Scheduled
              </Td>
              <Td fontSize={{ base: "sm", md: "md" }}>Dr. Alex Ramirez</Td>
              <Td>
                <Button
                  colorScheme="green"
                  size={{ base: "xs", md: "sm" }}
                  mb={{ base: 2, md: 0 }}
                >
                  Schedule
                </Button>{" "}
                <Button colorScheme="red" size={{ base: "xs", md: "sm" }}>
                  Cancel
                </Button>
              </Td>
            </Tr>{" "}
            <Tr>
              <Td>
                <HStack>
                  <Avatar
                    name="Phoenix Baker"
                    size={{ base: "sm", md: "md" }}
                  />
                  <Text fontSize={{ base: "sm", md: "md" }}>Phoenix Baker</Text>
                </HStack>
              </Td>
              <Td fontSize={{ base: "sm", md: "md" }}>Jan 4, 2022</Td>
              <Td color="green.400" fontSize={{ base: "sm", md: "md" }}>
                Scheduled
              </Td>
              <Td fontSize={{ base: "sm", md: "md" }}>Dr. Alex Ramirez</Td>
              <Td>
                <Button
                  colorScheme="green"
                  size={{ base: "xs", md: "sm" }}
                  mb={{ base: 2, md: 0 }}
                >
                  Schedule
                </Button>{" "}
                <Button colorScheme="red" size={{ base: "xs", md: "sm" }}>
                  Cancel
                </Button>
              </Td>
            </Tr>{" "}
            <Tr>
              <Td>
                <HStack>
                  <Avatar
                    name="Phoenix Baker"
                    size={{ base: "sm", md: "md" }}
                  />
                  <Text fontSize={{ base: "sm", md: "md" }}>Phoenix Baker</Text>
                </HStack>
              </Td>
              <Td fontSize={{ base: "sm", md: "md" }}>Jan 4, 2022</Td>
              <Td color="green.400" fontSize={{ base: "sm", md: "md" }}>
                Scheduled
              </Td>
              <Td fontSize={{ base: "sm", md: "md" }}>Dr. Alex Ramirez</Td>
              <Td>
                <Button
                  colorScheme="green"
                  size={{ base: "xs", md: "sm" }}
                  mb={{ base: 2, md: 0 }}
                >
                  Schedule
                </Button>{" "}
                <Button colorScheme="red" size={{ base: "xs", md: "sm" }}>
                  Cancel
                </Button>
              </Td>
            </Tr>{" "}
            <Tr>
              <Td>
                <HStack>
                  <Avatar
                    name="Phoenix Baker"
                    size={{ base: "sm", md: "md" }}
                  />
                  <Text fontSize={{ base: "sm", md: "md" }}>Phoenix Baker</Text>
                </HStack>
              </Td>
              <Td fontSize={{ base: "sm", md: "md" }}>Jan 4, 2022</Td>
              <Td color="green.400" fontSize={{ base: "sm", md: "md" }}>
                Scheduled
              </Td>
              <Td fontSize={{ base: "sm", md: "md" }}>Dr. Alex Ramirez</Td>
              <Td>
                <Button
                  colorScheme="green"
                  size={{ base: "xs", md: "sm" }}
                  mb={{ base: 2, md: 0 }}
                >
                  Schedule
                </Button>{" "}
                <Button colorScheme="red" size={{ base: "xs", md: "sm" }}>
                  Cancel
                </Button>
              </Td>
            </Tr>{" "}
            <Tr>
              <Td>
                <HStack>
                  <Avatar
                    name="Phoenix Baker"
                    size={{ base: "sm", md: "md" }}
                  />
                  <Text fontSize={{ base: "sm", md: "md" }}>Phoenix Baker</Text>
                </HStack>
              </Td>
              <Td fontSize={{ base: "sm", md: "md" }}>Jan 4, 2022</Td>
              <Td color="green.400" fontSize={{ base: "sm", md: "md" }}>
                Scheduled
              </Td>
              <Td fontSize={{ base: "sm", md: "md" }}>Dr. Alex Ramirez</Td>
              <Td>
                <Button
                  colorScheme="green"
                  size={{ base: "xs", md: "sm" }}
                  mb={{ base: 2, md: 0 }}
                >
                  Schedule
                </Button>{" "}
                <Button colorScheme="red" size={{ base: "xs", md: "sm" }}>
                  Cancel
                </Button>
              </Td>
            </Tr>{" "}
            <Tr>
              <Td>
                <HStack>
                  <Avatar
                    name="Phoenix Baker"
                    size={{ base: "sm", md: "md" }}
                  />
                  <Text fontSize={{ base: "sm", md: "md" }}>Phoenix Baker</Text>
                </HStack>
              </Td>
              <Td fontSize={{ base: "sm", md: "md" }}>Jan 4, 2022</Td>
              <Td color="green.400" fontSize={{ base: "sm", md: "md" }}>
                Scheduled
              </Td>
              <Td fontSize={{ base: "sm", md: "md" }}>Dr. Alex Ramirez</Td>
              <Td>
                <Button
                  colorScheme="green"
                  size={{ base: "xs", md: "sm" }}
                  mb={{ base: 2, md: 0 }}
                >
                  Schedule
                </Button>{" "}
                <Button colorScheme="red" size={{ base: "xs", md: "sm" }}>
                  Cancel
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <HStack>
                  <Avatar name="Candice Wu" size={{ base: "sm", md: "md" }} />
                  <Text fontSize={{ base: "sm", md: "md" }}>Candice Wu</Text>
                </HStack>
              </Td>
              <Td fontSize={{ base: "sm", md: "md" }}>Jan 2, 2022</Td>
              <Td color="yellow.400" fontSize={{ base: "sm", md: "md" }}>
                Pending
              </Td>
              <Td fontSize={{ base: "sm", md: "md" }}>Dr. Michael May</Td>
              <Td>
                <Button
                  colorScheme="green"
                  size={{ base: "xs", md: "sm" }}
                  mb={{ base: 2, md: 0 }}
                >
                  Schedule
                </Button>
                <Button colorScheme="red" size={{ base: "xs", md: "sm" }}>
                  Cancel
                </Button>
              </Td>
            </Tr>
            {/* Repeat rows as needed */}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Admin;
