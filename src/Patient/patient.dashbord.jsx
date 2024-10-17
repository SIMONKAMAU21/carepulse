import React, { useEffect, useState } from "react";
import {
  Box,
  Spinner,
  useColorMode,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import { getAppointmentByUserId } from "../lib/Actions/appointment.actions";
import PatientHeader from "./components/PatientHeader";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const [appointmentData, setAppointmentData] = useState([]); // Store appointment data as an array
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
        console.log("response", response);

        if (response && response.documents && response.documents.length > 0) {
          setAppointmentData(response.documents); // Store the array of appointments
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
      </Box>
    );
  }

  const newAppointment = () => {
    navigate("/Appointment");
  };

  return (
    <VStack>
      <PatientHeader width={{ base: "90%", md: "99%" }} />
      
    {/* <Box h={"4vh"} w={"100%"} > */}
    <Button
        position="fixed"
        top="5%" // Adjust this value as needed
        right={{ base: "5%", md: "0%" }}
        bg={"#24AE7C"}
        onClick={newAppointment}
        zIndex={1}
      >
        Make new appointment
      </Button>
    {/* </Box> */}
      
      <Box
        mt={{ base: "25%", md: "0" }}
        w={"100%"}
        h={"90vh"} 
        overflowY={"scroll"} 
        color={colorMode === "dark" ? "white" : "black"}
      >
        {appointmentData.length > 0 ? (
          appointmentData.map((appointment) => {
            const patient = appointment.patientId; // Access patient details from appointment
            return (
              <Box
                key={appointment.$id}
                mt={4}
                p={4}
                borderWidth={1}
                borderRadius="md"
              >
                <Text fontSize="2xl">Welcome, {patient.name}</Text>
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
                </Text>
                <Text>
                  <strong>Doctor:</strong> {appointment.doctor}
                </Text>
                <Text>
                  <strong>Appointment Reason:</strong>{" "}
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
