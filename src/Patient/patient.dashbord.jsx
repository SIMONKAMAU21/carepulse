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
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { getAppointmentByUserId } from "../lib/Actions/appointment.actions";
import PatientHeader from "./components/PatientHeader";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Callcenter from "../Pages/chatwoot/Callcenter";
import Header from "../Components/header";
import CountBox from "../Components/CountBox";
import {
  FaAccessibleIcon,
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

  return (
    <VStack>
      <PatientHeader width={{ base: "100%", md: "99%" }} />

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
      <Box  p={2} w={"100%"}>
        <SimpleGrid
          mt={{ base: "35%", md: "0%" }}
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
            count={"7"}
            title={"scheduled appointments"}
          />
          <CountBox
            gradient={"linear(to-l, rgb(0,156,224),#1c1e22, #1c1e22)"}
            icon={FaClock}
            count={"7"}
            title={"pending appointments"}
          />
          <CountBox
            gradient={"linear(to-l, rgb(245,101,101),#1c1e22, #1c1e22)"}
            icon={FaExclamationTriangle}
            count={"7"}
            title={"cancelled appointments"}
          />
        </SimpleGrid>
      </Box>
      <Box
        mt={{ base: "1%", md: "0" }}
        w={"100%"}
        // h={"90vh"}
        overflowY={"scroll"}
        color={colorMode === "dark" ? "white" : "black"}
      >
        {appointmentData.length > 0 ? (
          appointmentData.map((appointment) => {
            const patient = appointment.patientId;
            return (
              <Box
                key={appointment.$id}
                mt={4}
                p={4}
                borderWidth={1}
                borderRadius="md"
              >
                {/* <Text fontSize="2xl">Welcome, {patient.name}</Text>
                <Text>
                  <strong>Email:</strong> {patient.email}
                </Text>
                <Text>
                  <strong>Phone:</strong> {patient.phone}
                </Text>
                <Text>
                  <strong>Date of Birth:</strong> {patient.birthDate}
                </Text>
                <Text>
                  <strong>Primary Physician:</strong> {patient.primaryPhysician}
                </Text> */}
                <Text>
                  <strong>Doctor:</strong> {appointment.doctor}
                </Text>
                <Text>
                  <strong>Appointment Reason:</strong>
                  {appointment.appointmentReason}
                </Text>
                <Text>
                  <strong>Status:</strong> {appointment.status}
                </Text>
              </Box>
            );
          })
        ) : (
          <Text>No patient data available</Text>
        )}
      </Box>
    </VStack>
  );
};

export default PatientDashboard;
