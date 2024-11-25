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
  const [allAppointments, setAllAppointments] = useState([]); // Store the original data
  const [filteredAppointments, setFilteredAppointments] = useState([]); // Store filtered data
  const [selectedStatus, setSelectedStatus] = useState("");
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
          setAllAppointments(response.documents);
          setFilteredAppointments(response.documents); // Initially show all
        } else {
          setError(`No appointments found for you ${user.name}`);
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
      <VStack h="100vh">
        <PatientHeader width={{ base: "100%", md: "100%" }} />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Spinner size="xl" />
        </Box>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack>
        <PatientHeader width={{ base: "100%", md: "100%" }} />
        <VStack textAlign="center" mt={{ base: "25%" }}>
          <Text fontSize={{ base: "10px", md: "20px" }} fontWeight={{ base: "bold" }} color="red.500">{error}</Text>
          <Button colorScheme="blue" onClick={newAppointment}>make appointment</Button>
        </VStack>

      </VStack>
    );
  }


  const handleFilter = (status) => {
    if (status === "All") {
      setFilteredAppointments(allAppointments); // Show all appointments
    } else {
      const filtered = allAppointments.filter(
        (appointment) => appointment.status === status
      );
      setFilteredAppointments(filtered);
    }
    setSelectedStatus(status);
  };

  const pendingCount = allAppointments.filter(
    (appointment) => appointment.status === "pending"
  ).length;
  const scheduledCount = allAppointments.filter(
    (appointment) => appointment.status === "Scheduled"
  ).length;
  const cancelledCount = allAppointments.filter(
    (appointment) => appointment.status === "Cancelled"
  ).length;

  return (
    <VStack fontSize={{ base: "12px", md: "18px" }}>
      <PatientHeader width={{ base: "100%", md: "100%" }} />
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<ChevronDownIcon boxSize={"25px"} />}
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
          <MenuItem >View appointment history</MenuItem>
        </MenuList>
      </Menu>
      <Box p={2} w={"100%"}>
        <SimpleGrid
          mt={{ base: "25%", md: "0%" }}
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
            clickMe={() => handleFilter("Scheduled")}
            title={"scheduled appointments"}
          />
          <CountBox
            gradient={"linear(to-l, rgb(0,156,224),#1c1e22, #1c1e22)"}
            icon={FaClock}
            count={pendingCount}
            clickMe={() => handleFilter("pending")}
            title={"pending appointments"}

          />
          <CountBox
            gradient={"linear(to-l, rgb(245,101,101),#1c1e22, #1c1e22)"}
            icon={FaExclamationTriangle}
            count={cancelledCount}
            clickMe={() => handleFilter("Cancelled")}
            title={"cancelled appointments"}
          />
        </SimpleGrid>
      </Box>
      <Box
        mt={{ base: "0", md: "0" }}
        w={"100%"}
        overflowY={"scroll"}
        color={colorMode === "dark" ? "white" : "black"}
      >
        {filteredAppointments.length > 0 ? (
          <SimpleGrid
            boxShadow={"2xl"}
            p={2}

            columns={{ base: 1, md: 4 }}
            spacing={{ base: 2, md: 6 }}
          >
            {filteredAppointments.map((appointment) => {
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
                  // h={"500px"}
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
                      bgGradient={colorMode === "light" ?
                        "linear(to-l, rgb(148,109,109),#1d1f22, #1c1e22)" : "linear(to-l, rgb(148,109,109),#1c1e22, #1c1e22)"
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
                      bgGradient={colorMode === "light" ?
                        "linear(to-l, rgb(0,156,224),#1c1e22, #1c1e25)" : "none"
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
                        Your appointment has been scheduled for this date:  {appointment.appointmentDate ? new Date(
                          appointment.appointmentDate
                        ).toDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
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
