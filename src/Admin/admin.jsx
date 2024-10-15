import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
  Avatar,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Textarea,
  SimpleGrid,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from "@chakra-ui/react";

import {
  getRecentAppointmentList,
  updateAppointment,
} from "../lib/Actions/appointment.actions";
import {
  FaBatteryEmpty,
  FaCalendarCheck,
  FaClock,
  FaExclamationTriangle,
  FaSearch,
} from "react-icons/fa";
import { ErrorToast, SuccessToast } from "../Components/toaster";
import Header from "../Components/header";
import SearchInput from "../Components/Search";

const Admin = () => {
  const [appointments, setAppointments] = useState({
    documents: [],
    scheduledCount: 0,
    pendingCount: 0,
    cancelledCount: 0,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAppointmentIndex, setSelectedAppointmentIndex] =
    useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScheduleModal, setIsScheduleModal] = useState(false);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getRecentAppointmentList();
        if (response) {
          setAppointments(response);
        } else {
          setAppointments([]);
        }
      } catch (error) {
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, []);

  const openModal = (index, schedule = true) => {
    setSelectedAppointmentIndex(index);
    setIsScheduleModal(schedule);
    onOpen();
  };

  const handleDateChange = (value) => {
    setAppointments((prevAppointments) => {
      const newAppointments = {
        ...prevAppointments,
        documents: [...prevAppointments.documents],
      };
      newAppointments.documents[selectedAppointmentIndex].selectedDate = value;
      return newAppointments;
    });
  };

  const handleReasonChange = (value) => {
    setAppointments((prevAppointments) => {
      const newAppointments = {
        ...prevAppointments,
        documents: [...prevAppointments.documents],
      };
      newAppointments.documents[selectedAppointmentIndex].cancelReason = value;
      return newAppointments;
    });
  };

  const handleSaveSchedule = async () => {
    const appointment = appointments.documents[selectedAppointmentIndex];
    if (appointment.selectedDate) {
      try {
        const userId = appointment.patientId?.$id;
        await updateAppointment(userId, appointment.$id, {
          status: "Scheduled",
          appointmentDate: appointment.selectedDate,
          patientId: appointment.patientId,
        });
        SuccessToast("Appointment scheduled successfully");
        onClose();
      } catch (error) {
        ErrorToast("Error scheduling appointment");
      }
    }
  };

  const handleSaveCancel = async () => {
    const appointment = appointments.documents[selectedAppointmentIndex];
    if (appointment.cancelReason) {
      try {
        const userId = appointment.patientId?.$id;
        await updateAppointment(userId, appointment.$id, {
          status: "Cancelled",
          cancelReason: appointment.cancelReason,
          patientId: appointment.patientId,
        });
        SuccessToast("Appointment cancelled successfully");
        onClose();
      } catch (error) {
        ErrorToast("Error cancelling appointment");
      }
    }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredAppointments = appointments.documents.filter((appointment) => {
    return (
      appointment?.patientId?.name?.toLowerCase().includes(searchTerm) ||
      appointment?.patientId?.phone?.toLowerCase().includes(searchTerm)
    );
  });
  return (
    <Box
      color={"white"}
      w={"100%"}
      h={"100%"}
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      overflow={"scroll"}
      p={4}
    >
      <Header
        width={{ base: "90%", md: "99%" }}
        title={"Welcome Admin 😄"}
        subTitle={"Start day with managing new appointments"}
      />
      <SimpleGrid
        mt={{ base: "60%", md: "0%" }}
        columns={{ base: 1, md: 3 }}
        spacing={6}
        h={{ base: "25%", md: "10%" }}
        overflow={"scroll"}
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <Box
          bgGradient="linear(to-l, rgb(255,209,71),#1c1e22, #1c1e22)"
          p={{ base: "4", md: "6" }}
          borderRadius="md"
          shadow="md"
          h={{ base: "auto", md: "" }}
        >
          <VStack align="start">
            <HStack>
              <Icon
                as={FaCalendarCheck}
                boxSize={{ base: 6, md: 8 }}
                color="rgb(255,209,71)"
              />
              <Heading size={{ base: "md", md: "lg" }}>
                {appointments.scheduledCount}
              </Heading>
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
          h={{ base: "auto", md: "" }}
        >
          <VStack align="start">
            <HStack>
              <Icon
                as={FaClock}
                boxSize={{ base: 6, md: 8 }}
                color="blue.200"
              />
              <Heading size={{ base: "md", md: "lg" }}>
                {appointments.pendingCount}
              </Heading>
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
          h={{ base: "auto", md: "" }}
        >
          <VStack align="start">
            <HStack>
              <Icon
                as={FaExclamationTriangle}
                boxSize={{ base: 6, md: 8 }}
                color="red.400"
              />
              <Heading size={{ base: "md", md: "lg" }}>
                {appointments.cancelledCount}
              </Heading>
            </HStack>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Total number of cancelled appointments
            </Text>
          </VStack>
        </Box>
      </SimpleGrid>
      <Box mt={{ base: "none", md: "1%" }} w={{ base: "100%", md: "50%" }}>
        <SearchInput
          value={searchTerm}
          onChange={handleSearch}
          placeholder={"search appointments by name or phone"}
        />
      </Box>
      <Box p={4} mt={4} h={"50%"} overflowX="auto">
        <Table variant="simple" color={colorMode === "dark" ? "black.200" :" black"} size={"md"}>
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
            {filteredAppointments?.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <Tr key={appointment?.$id}>
                  <Td>
                    <HStack>
                      <Avatar
                        name={appointment?.patientId?.name || "Unknown"}
                      />
                      <VStack align="start">
                        <Text>{appointment?.patientId?.name || "No Name"}</Text>
                        <Text fontSize="sm" color="gray.400">
                          {appointment?.patientId?.email || "No Email"}
                        </Text>
                        <Text fontSize="sm" color="gray.400">
                          {appointment?.patientId?.phone || "No Phone"}
                        </Text>
                      </VStack>
                    </HStack>
                  </Td>
                  <Td>
                    {appointment?.appointmentDate
                      ? new Date(
                          appointment?.appointmentDate
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "No Date"}
                  </Td>
                  <Td
                    color={
                      appointment.status === "Scheduled"
                        ? "green.400"
                        : appointment.status === "Cancelled"
                        ? "red.400"
                        : "yellow.400"
                    }
                    fontWeight={colorMode === "light" ? "bold" : "none"}
                  
                  >
                    {appointment?.status || "Pending"}
                  </Td>
                  <Td>{appointment?.doctor || "No Doctor"}</Td>
                  <Td>
                    <Button
                      bg={colorMode === "light" ? "green" :"none"}
                      border={colorMode === "light" ? "none" :"2px solid green"}
                      size="sm"
                      w={{base:"100%",md:"60%"}}
                      color={"white"}
                      _hover={{
                        bgColor:"green",
                        color:"white"
                      }}
                      onClick={() => openModal(index, true)}
                    >
                      Schedule
                    </Button>
                    <Button
                      mt={2}
                      size="sm"
                      color={"white"}
                      bg={colorMode === "light" ? "red.400" :"none"}
                      border={colorMode === "light" ? "none" :"2px solid red"}
                      w={{base:"100%",md:"60%"}}
                      onClick={() => openModal(index, false)}
                      _hover={{
                        bgColor:"red",
                        color:"white"
                      }}
                    >
                      Cancel
                    </Button>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={5} textAlign="center">
                  <Icon mr={"1%"} as={FaClock} />
                  No appointments found.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          width={{ base: "90%", md: "60%" }}
          bg={"#131619"}
          color={"white"}
          opacity={"0.9"}
        >
          <ModalHeader>
            {isScheduleModal ? "Schedule Appointment" : "Cancel Appointment"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {isScheduleModal ? (
              <Input
                type="date"
                placeholder="enter date"
                value={
                  appointments.documents[selectedAppointmentIndex]
                    ?.selectedDate || ""
                }
                onChange={(e) => handleDateChange(e.target.value)}
              />
            ) : (
              <Textarea
                placeholder="Enter cancellation reason"
                value={
                  appointments.documents[selectedAppointmentIndex]
                    ?.cancelReason || ""
                }
                onChange={(e) => handleReasonChange(e.target.value)}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              w={"100%"}
              colorScheme={isScheduleModal ? "green" : "red"}
              onClick={isScheduleModal ? handleSaveSchedule : handleSaveCancel}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Admin;
