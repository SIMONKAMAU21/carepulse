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
} from "@chakra-ui/react";
import logo from "../assets/Logo.svg";
import {
  getRecentAppointmentList,
  updateAppointment,
} from "../lib/Actions/appointment.actions";
import {
  FaCalendarCheck,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import { ErrorToast, SuccessToast } from "../Components/toaster";

const Admin = () => {
  const [appointments, setAppointments] = useState({ documents: [],
    scheduledCount: 0,
    pendingCount: 0,
    cancelledCount: 0,});

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getRecentAppointmentList();
        // console.log('response', response)
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

  const handleSchedule = (index) => {
    setAppointments((prevAppointments) => {
      const newAppointments = {
        ...prevAppointments,
        documents: [...prevAppointments.documents], 
      };
      newAppointments.documents[index].showScheduleInput =
        !newAppointments.documents[index].showScheduleInput;
      return newAppointments;
    });
  };
  
  const handleDateChange = (index, value) => {
    setAppointments((prevAppointments) => {
      const newAppointments = {
        ...prevAppointments, 
        documents: [...prevAppointments.documents], 
      };
      newAppointments.documents[index].selectedDate = value; 
      return newAppointments; 
    });
  };
  
  const handleSaveSchedule = async (index) => {
    const appointment = appointments.documents[index];
    if (appointment.selectedDate) {
      try {
        const userId = appointment.patientId?.$id; // Assuming this is used elsewhere
        const patientPhoneNumber = appointment.patientId?.phone; // Get phone number
        // console.log('first', patientPhoneNumber)
        
        await updateAppointment(userId, appointment.$id, {
          status: "Scheduled",
          appointmentDate: appointment.selectedDate,
          patientId: appointment.patientId // Ensure this is passed for SMS
        });
        
        // Continue with updating state and showing success toast
      } catch (error) {
        ErrorToast("Error scheduling appointment");
      }
    }
  };
  
  const handleSaveCancel = async (index) => {
    const appointment = appointments.documents[index]; 
    if (appointment.cancelReason) {
      try {
        const userId = appointment.patientId?.$id; // Assuming this is used elsewhere
        const patientPhoneNumber = appointment.patientId?.phone; // Get phone number
  
        await updateAppointment(userId, appointment.$id, {
          status: "Cancelled",
          cancelReason: appointment.cancelReason,
          patientId: appointment.patientId // Ensure this is passed for SMS
        });
        
        // Continue with updating state
      } catch (error) {
        console.error("Error cancelling appointment:", error);
      }
    }
  };
  
  const handleCancel = (index) => {
    setAppointments((prevAppointments) => {
      const newAppointments = {
        ...prevAppointments,
        documents: [...prevAppointments.documents],
      };
      newAppointments.documents[index].showCancelInput =
        !newAppointments.documents[index].showCancelInput;
      return newAppointments;
    });
  };
  
  const handleReasonChange = (index, value) => {
    setAppointments((prevAppointments) => {
      const newAppointments = {
        ...prevAppointments,
        documents: [...prevAppointments.documents],
      };
      newAppointments.documents[index].cancelReason = value;
      return newAppointments;
    });
  };
  
//   const handleSaveCancel = async (index) => {
//     const appointment = appointments.documents[index]; 
//     console.log('appointment', appointment)
//     if (appointment.cancelReason) {
//       try {
//         // Assuming userId is part of the appointment data
//         const userId = appointment.patientId?.$id; // Update this line based on your data structure
//         await updateAppointment(userId, appointment.$id, {
//           status: "Cancelled",
//           cancelReason: appointment.cancelReason,
//         });
//         setAppointments((prevAppointments) => {
//           const newAppointments = {
//             ...prevAppointments,
//             documents: [...prevAppointments.documents],
//           };
//           newAppointments.documents[index].status = "Cancelled";
//           newAppointments.documents[index].showCancelInput = false;
//           return newAppointments;
//         });
//       } catch (error) {
//         console.error("Error cancelling appointment:", error);
//       }
//     }
//   };
  

  return (
    <Box bg={"#131619"} color={"white"} w={"100vw"} h={"100vh"} p={4}>
      <HStack p={4} bg={"black"}>
        <Image src={logo} />
        <Spacer />
      </HStack>

      <VStack spacing={4} align="start" p={4}>
        <Heading>Welcome, Admin</Heading>
        <Text>Start your day by managing new appointments</Text>
      </VStack>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
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
          h={{ base: "auto", md: "" }} // Smaller height on mobile
        >
          <VStack align="start">
            <HStack>
              <Icon
                as={FaClock}
                boxSize={{ base: 6, md: 8 }}
                color="blue.200"
              />
              <Heading size={{ base: "md", md: "lg" }}>{appointments.pendingCount}
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
              <Heading size={{ base: "md", md: "lg" }}>{appointments.cancelledCount
              }
              </Heading>
            </HStack>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Total number of cancelled appointments
            </Text>
          </VStack>
        </Box>
      </SimpleGrid>
      <Box p={4} mt={4} h={"50%"} overflowX="auto">
        <Table variant="simple" colorScheme="whiteAlpha" size={"md"}>
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
            {appointments.documents.map((appointment, index) => (
              <Tr key={appointment?.$id}>
                <Td>
                  <HStack>
                    <Avatar name={appointment?.patientId?.name || "Unknown"} />
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
                  {new Date(appointment?.appointmentDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  ) || "No Date"}
                </Td>
                <Td
                  color={
                    appointment.status === "Scheduled"
                      ? "green.400"
                      : appointment.status === "Cancelled"
                      ? "red.400"
                      : "yellow.400"
                  }
                >
                  {appointment?.status || "Pending"}
                </Td>
                <Td>{appointment?.doctor || "No Doctor"}</Td>
                <Td>
                  <Button
                    colorScheme="green"
                    size="sm"
                    onClick={() => handleSchedule(index)}
                  >
                    Schedule
                  </Button>{" "}
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleCancel(index)}
                  >
                    Cancel
                  </Button>
                </Td>
                {appointment.showScheduleInput && (
                  <Td>
                    <Input
                      type="date"
                      value={appointment.selectedDate}
                      onChange={(e) => handleDateChange(index, e.target.value)}
                    />
                    <Button
                      mt={2}
                      colorScheme="green"
                      size="sm"
                      onClick={() => handleSaveSchedule(index)}
                    >
                      Save
                    </Button>
                  </Td>
                )}
                {appointment.showCancelInput && (
                  <Td>
                    <Textarea
                      placeholder="Enter cancellation reason"
                      value={appointment.cancelReason}
                      onChange={(e) =>
                        handleReasonChange(index, e.target.value)
                      }
                    />
                    <Button
                      mt={2}
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleSaveCancel(index)}
                    >
                      Save
                    </Button>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Admin;
