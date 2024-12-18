import React, { useState } from "react";
import {
  Box,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  Avatar,
  VStack,
  Text,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getRecentAppointmentList,
  updateAppointment,
} from "../lib/Actions/appointment.actions";
import { SuccessToast, ErrorToast } from "../Components/toaster";
import Header from "../Components/header";
import CountBox from "../Components/CountBox";
import { FaCalendarCheck, FaClock, FaExclamationTriangle } from "react-icons/fa";
import SearchInput from "../Components/Search";
import { formatDate } from "../Pages/appointmentSuccess";

const Admin = () => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isScheduleModal, setIsScheduleModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");



  const { data: appointments, isLoading, isError } = useQuery(
    "appointments",
    async () => {
      const response = await getRecentAppointmentList();
      const today = new Date();
      response.documents.forEach((appointment) => {
        if (
          appointment.appointmentDate &&
          new Date(appointment.appointmentDate) < today &&
          appointment.status === "Scheduled"
        ) {
          appointment.status = "Expired";
        }
      });
      return response;
    },
    { staleTime: 1000 * 60 * 5 }
  );

  const mutation = useMutation(
    async ({ userId, appointmentId, data }) =>
      updateAppointment(userId, appointmentId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("appointments");
        SuccessToast(
          isScheduleModal
            ? "Appointment scheduled successfully"
            : "Appointment canceled successfully"
        );
        onClose();
      },
      onError: () => {
        ErrorToast("Error updating appointment");
      },
    }
  );

  const openModal = (appointment, isSchedule) => {
    setSelectedAppointment(appointment);
    setIsScheduleModal(isSchedule);
    onOpen();
  };

  const handleSave = () => {
    if (selectedAppointment) {
      const data = isScheduleModal
        ? {
          status: "Scheduled",
          appointmentDate: selectedAppointment.selectedDate,
        }
        : { status: "Cancelled", cancelReason: selectedAppointment.cancelReason };

      mutation.mutate({
        userId: selectedAppointment.patientId?.$id,
        appointmentId: selectedAppointment.$id,
        data,
      });
    }
  };

  const filteredAppointments = appointments?.documents?.filter(
    (appointment) =>
      appointment?.patientId?.name?.toLowerCase().includes(searchTerm) ||
      appointment?.patientId?.phone?.toLowerCase().includes(searchTerm)
  );

  if (isLoading) return <p>Loading appointments...</p>;
  if (isError) return <p>Error fetching appointments</p>;

  return (
    <Box
      color="white"
      w="100%"
      h="100%"
      overflow="scroll"
      p={{ base: 0, md: 4 }}
      sx={{
        "::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <Header
        width={{ base: "100%", md: "99%" }}
        title="Welcome Admin 😄"
        subTitle="Start day with managing new appointments"
      />

      <SimpleGrid
        mt={{ base: "48%", md: "0%" }}
        columns={{ base: 3, md: 3 }}
        spacing={6}
        ml={{ base: "1%", md: "0" }}
        // p={1}
        w={"100%"}
        // h={"100%"}
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >

        <CountBox
          gradient="linear(to-l, rgb(57,138,116),#1c1e22, #1c1e22)"
          icon={FaCalendarCheck}
          count={appointments?.scheduledCount || 0}
          title="Scheduled Appointments"
        />
        <CountBox
          gradient="linear(to-l, rgb(0,156,224),#1c1e22, #1c1e22)"
          icon={FaClock}
          count={appointments?.pendingCount || 0}
          title="Pending Appointments"
        />
        <CountBox
          gradient="linear(to-l, rgb(245,101,101),#1c1e22, #1c1e22)"
          icon={FaExclamationTriangle}
          count={appointments?.cancelledCount || 0}
          title="Cancelled Appointments"
        />
      </SimpleGrid>

      <Box mt={{ base: "5%", md: "1%" }} p={"4px"} w={{ base: "100%", md: "50%" }}>
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          placeholder={"search appointments by name or phone"}
        />
      </Box>
      <Box p={{ base: 0 }} mt={4} h={"70%"} overflowX="auto">

        <Table
          variant="simple"
          color={colorMode === "dark" ? "black.200" : " black"}
          size={"md"}
        >        <Thead>
            <Tr>
              <Th>Patient</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredAppointments?.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <Tr key={appointment?.$id}>
                  <Td>
                    <HStack>
                      <Avatar name={appointment?.patientId?.name || "Unknown"} src={appointment?.patientId?.profilePicture} />
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
                  <Td>{formatDate(appointment.appointmentDate)}</Td>
                  <Td
                    color={
                      appointment.status === "Scheduled"
                        ? "green.400"
                        : appointment.status === "Cancelled"
                          ? "red.400"
                          : appointment.status === "Expired"
                            ? "teal"
                            : "yellow"
                    }
                    fontWeight="bold"
                  >
                    {appointment?.status || "Pending"}
                  </Td>
                  <Td>
                    {appointment.status === "Expired" ? (
                      <>
                       <Button
                        mt={2}
                        size="sm"
                        color="white"
                        bg={colorMode === "light" ? "red.400" : "none"}
                        border={colorMode === "light" ? "none" : "2px solid red"}
                        w={{ base: "100%", md: "60%" }}
                        onClick={() => openModal(appointment, false)}
                        _hover={{
                          bgColor: "red",
                          color: "white",
                        }}
                      >
                          Delete
                        </Button></>
                    ) : (
                      <><Button
                        bg={colorMode === "light" ? "green" : "none"}
                        border={colorMode === "light" ? "none" : "2px solid green"}
                        size="sm"
                        w={{ base: "100%", md: "60%" }}
                        color="white"
                        _hover={{
                          bgColor: "green",
                          color: "white",
                        }}
                        onClick={() => openModal(appointment, true)}
                      >
                        Schedule
                      </Button>
                      <Button
                        mt={2}
                        size="sm"
                        color="white"
                        bg={colorMode === "light" ? "red.400" : "none"}
                        border={colorMode === "light" ? "none" : "2px solid red"}
                        w={{ base: "100%", md: "60%" }}
                        onClick={() => openModal(appointment, false)}
                        _hover={{
                          bgColor: "red",
                          color: "white",
                        }}
                      >
                          Cancel
                        </Button>
                        </>
                    )}
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={4} textAlign="center">
                  No appointments found.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isScheduleModal ? "Schedule Appointment" : "Cancel Appointment"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isScheduleModal ? (
              <Input
                type="datetime-local"
                value={selectedAppointment?.selectedDate || ""}
                onChange={(e) =>
                  setSelectedAppointment({
                    ...selectedAppointment,
                    selectedDate: e.target.value,
                  })
                }
              />
            ) : (
              <Textarea
                placeholder="Enter cancellation reason"
                value={selectedAppointment?.cancelReason || ""}
                onChange={(e) =>
                  setSelectedAppointment({
                    ...selectedAppointment,
                    cancelReason: e.target.value,
                  })
                }
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Admin;
