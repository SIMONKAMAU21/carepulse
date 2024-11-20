import {
  Box,
  Spinner,
  useColorMode,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  IconButton,
  Button,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { getAppointmentByUserId } from "../lib/Actions/appointment.actions";
import PatientHeader from "./components/PatientHeader";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CountBox from "../Components/CountBox";
import {
  FaCalendarCheck,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

const PatientDashboard = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("User not found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const userId = user.id;
        const response = await getAppointmentByUserId(userId);

        if (response && response.documents && response.documents.length > 0) {
          setAppointmentData(response.documents);
        } else {
          setError("No appointments found for this user");
        }
      } catch (err) {
        setError("Error fetching patient details or appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, []);

  const newAppointment = () => {
    navigate("/Appointment");
  };
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p={4}>
        <Text color="red.500">{error}</Text>
        <Button onClick={newAppointment}>make appointment</Button>
      </Box>
    );
  }

  const viewHistory = () => {
    // Add logic to view appointment history
    navigate("/AppointmentHistory");
  };
  const pendingCount = appointmentData.filter(
    (appointment) => appointment.status === "pending"
  ).length;
  const scheduledCount = appointmentData.filter(
    (appointment) => appointment.status === "Scheduled"
  ).length;
  const cancelledCount = appointmentData.filter(
    (appointment) => appointment.status === "Cancelled"
  ).length;
  return (
    <VStack>
      <PatientHeader width={{ base: "100%", md: "100%" }} />
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<ChevronDownIcon />}
          variant="outline"
          position="fixed"
          top={{ base: "8%", md: "1%" }}
          right={{ base: "-1%", md: "10%" }}
          zIndex={1}
          border={"none"}
          size={{ base: "md", md: "lg" }}
        />
        <MenuList
          boxShadow={"dark-lg"}
          color={colorMode === "dark" ? "white" : "black"}
        >
          <MenuItem onClick={newAppointment}>Make new appointment</MenuItem>
          <MenuItem onClick={viewHistory}>View appointment history</MenuItem>
        </MenuList>
      </Menu>
      <Box p={2} w={"100%"}>
        <SimpleGrid
          mt={{ base: "29%", md: "0%" }}
          columns={{ base: 3, md: 3 }}
          spacing={6}
          w={"100%"}
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <CountBox
            gradient={"linear(to-l, rgb(57,138,116),#1c1e22, #1c1e22)"}
            icon={FaCalendarCheck}
            count={scheduledCount}
            title={"scheduled appointments"}
          />
          <CountBox
            gradient={"linear(to-l, rgb(0,156,224),#1c1e22, #1c1e22)"}
            icon={FaClock}
            count={pendingCount}
            title={"pending appointments"}
          />
          <CountBox
            gradient={"linear(to-l, rgb(245,101,101),#1c1e22, #1c1e22)"}
            icon={FaExclamationTriangle}
            count={cancelledCount}
            title={"cancelled appointments"}
          />
        </SimpleGrid>
      </Box>
      <Box
        mt={{ base: "1%", md: "0" }}
        w={"100%"}
        overflowY={"scroll"}
        color={colorMode === "dark" ? "white" : "black"}
      >
        {appointmentData.length > 0 ? (
          <SimpleGrid p={2} columns={{ base: 1, md: 4 }} spacing={{base:2,md:6}}>
            {appointmentData.map((appointment) => {
              const statusColor = (status) => {
                switch (status) {
                  case "Cancelled":
                    return "red.400";
                  case "Scheduled":
                    return "green.400";
                  case "pending":
                    return "yellow.400";
                  default:
                    return "gray.400";
                }
              };
              return (
                <Box
                  key={appointment.$id}
                  mt={4}
                  p={4}
                  borderWidth={1}
                  borderRadius="md"
                  bg={colorMode === "dark" ? "gray.700" : "gray.100"}
                  boxShadow="md"
                >
                  <Text>
                    <strong>Doctor:</strong> {appointment.doctor}
                  </Text>
                  <Text>
                    <strong>Appointment Reason:</strong>{" "}
                    {appointment.appointmentReason}
                  </Text>

                  <HStack>
                    <Text fontWeight={"bold"}>Status:</Text>
                    <Text
                      fontWeight={"bold"}
                      fontSize={{ base: "15px", md: "18px" }}
                      color={statusColor(appointment.status)}
                    >
                      {appointment.status}
                    </Text>
                  </HStack>
                  {appointment.status === "Cancelled" && (
                    <Box
                      h={"auto"}
                      w={"auto"}
                      p={1}
                      borderRadius={"10px"}
                      bgGradient={
                        "linear(to-l, rgb(245,101,101),#1c1e22, #1c1e22)"
                      }
                      fontSize={{ base: "10px", md: "15px" }}
                    >
                      <Text
                        color={colorMode === "light" ? "white" : "white"}
                        fontWeight={"bold"}
                      >
                        This appointment has been canceled due to this reason :
                      </Text>
                      <Text fontWeight={"700"} color={"green"}>
                        {appointment.cancelReason}
                      </Text>
                    </Box>
                  )}
                </Box>
              );
            })}
          </SimpleGrid>
        ) : (
          <Text>No patient data available</Text>
        )}
      </Box>
    </VStack>
  );
};

export default PatientDashboard;
