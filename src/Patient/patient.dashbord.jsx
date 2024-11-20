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
  Icon,
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
import { MdApproval } from "react-icons/md";

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
    <VStack  fontSize={{base:"12px",md:"18px"}}>
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
          <SimpleGrid
          boxShadow={"2xl"}
            p={2}
            columns={{ base: 1, md: 4 }}
            spacing={{ base: 2, md: 6 }}
          >
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
                  mt={2}
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
                      boxShadow={"dark-lg"}
                      borderRadius={"10px"}
                      bgGradient={colorMode==="light"?
                        "linear(to-l, rgb(148,109,109),#1d1f22, #1c1e22)":"linear(to-l, rgb(148,109,109),#1c1e22, #1c1e22)"
                      }
                      fontSize={{ base: "10px", md: "15px" }}
                    >
                      <Text
                        color={colorMode === "light" ? "white" : "white"}
                        fontWeight={"bold"}
                      >
                        This appointment has been canceled due to this reason :
                      </Text>
                      <Text fontWeight={"700"} color={"red.500"}>
                        {appointment.cancelReason} 
                        <Icon ml={"2%"} as={FaExclamationTriangle} />
                      </Text>
                    </Box>
                  )}
                  {appointment.status === "pending" && (
                    <Box
                      h={"auto"}
                      w={"auto"}
                      p={1}
                      alignItems={"center"}
                      justifyContent={"center"}
                      borderRadius={"10px"}
                      boxShadow={"dark-lg"}
                       bgGradient={colorMode=== "light"?
                         "linear(to-l, rgb(0,156,224),#1c1e22, #1c1e25)":"none"
                       }
                      fontSize={{ base: "10px", md: "15px" }}
                    >
                      <Text
                        color={colorMode === "light" ? "yellow.300" : "yellow"}
                        fontWeight={"bold"}
                      >
                        Your appointment is still pending contact the admin for
                        scheduling
                        <Icon ml={"2%"} as={FaClock} />
                      </Text>
                    </Box>
                  )}
                         {appointment.status === "Scheduled" && (
                    <Box
                      h={"auto"}
                      w={"auto"}
                      p={1}
                      alignItems={"center"}
                      justifyContent={"center"}
                      borderRadius={"10px"}
                      fontSize={{ base: "10px", md: "15px" }}
                    >
                      <Text
                        color={colorMode === "light" ? "green.300" : "green.300"}
                        fontWeight={"bold"}
                      >
                        Your appointment has been scheduled for this date {appointment.appointmentDate ?new Date(
                          appointment.appointmentDate
                        ).toDateString("en-US",{
                          year:"numeric",
                          month:"short",
                          day:"numeric"
                        }) : ""}
                        <Icon ml={"2%"} as={MdApproval} />
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
