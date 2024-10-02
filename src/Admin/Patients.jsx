import {
  Box,
  Text,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  useDisclosure,
  HStack,
  Spacer,
  Avatar,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import { deletePatient, getPatients } from "../lib/Actions/patient.actions";
import { LoadingToast, SuccessToast } from "../Components/toaster";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getPatients();
        setPatients(response.documents);
      } catch (error) {
        setError("Failed to fetch patients data");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    onOpen();
  };
  const handleDelete = async (patientId) => {
    try {
      LoadingToast(true);
      await deletePatient(patientId);
      SuccessToast("Patient deleted successfully");
      setPatients(patients.filter((patient) => patient.$id !== patientId));
    } catch (error) {
      ErrorToast("Failed to delete patient");
    } finally {
      LoadingToast(false);
    }
  };

  const spanStyles = {
    fontWeight: "bold",
    color: "grey",
  };
  return (
    <Box h={"100%"} w={"100%"} bg={"#131619"} p={4}>
      <Header
        width={{ base: "90%", md: "99%" }}
        title={"Manage Your Patients"}
        subTitle={"View, update, and track patient details efficiently"}
      />
      <Box padding={4}>
        {loading ? (
          <Spinner size="xl" />
        ) : error ? (
          <Text color="red.500">{error}</Text>
        ) : patients.length > 0 ? (
          <Box
            w={{ base: "100%" }}
            mt={{ base: "60%", md: "0%" }}
            h={"100%"}
            overflowX="auto"
          >
            <Table
              variant={"simple"}
              colorScheme="whiteAlpha"
              h={"100%"}
              size={{ base: "sm", md: "md" }}
            >
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th display={{ base: "none", md: "table-cell" }}>Phone</Th>
                  <Th display={{ base: "none", md: "table-cell" }}>
                    Insurance Provider
                  </Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {patients.map((patient) => (
                  <Tr key={patient.$id}>
                    <Td>
                      <HStack>
                        <Avatar name={patient.name} />
                        <Text> {patient.name}</Text>
                      </HStack>
                    </Td>
                    <Td>{patient.email}</Td>
                    <Td display={{ base: "none", md: "table-cell" }}>
                      {patient.phone}
                    </Td>
                    <Td display={{ base: "none", md: "table-cell" }}>
                      {patient.insuranceProvider}
                    </Td>
                    <Td>
                      <Button
                        w={"100%"}
                        size={"sm"}
                        colorScheme="green"
                        onClick={() => handlePatientSelect(patient)}
                      >
                        View More
                      </Button>
                      <Spacer />
                      <Button
                        mt={"5%"}
                        w={"100%"}
                        size={"sm"}
                        colorScheme={"red"}
                        onClick={() => handleDelete(patient.$id)}
                      >
                        Delete patient
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        ) : (
          <Text
            alignItems={"center"}
            mt={{ base: "30%", md: "0" }}
            color="gray.500"
          >
            No patients found.
          </Text>
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          fontSize={{ base: "sm", md: "lg" }}
          color={"#83B9DC"}
          bg={"#131619"}
          w={{ base: "90%" }}
        >
          <ModalHeader>{selectedPatient?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              <span style={spanStyles}>Email: </span>
              {selectedPatient?.email}
            </Text>
            <Text>
              <span style={spanStyles}>Phone:</span> {selectedPatient?.phone}
            </Text>
            <Text>
              <span style={spanStyles}>Insurance Provider:</span>
              {selectedPatient?.insuranceProvider}
            </Text>
            <Text>
              <span style={spanStyles}> insurancePolicyNumber:</span>
              {selectedPatient?.insurancePolicyNumber}
            </Text>
            <Text>
              <span style={spanStyles}> Allergies:</span>
              {selectedPatient?.allergies}
            </Text>
            <Text>
              <span style={spanStyles}>Birth Date:</span>
              {selectedPatient?.birthDate}
            </Text>
            <Text>
              <span style={spanStyles}>Occupation:</span>
              {selectedPatient?.occupation}
            </Text>
            <Text>
              <span style={spanStyles}>Emergency Contact:</span>{" "}
              {selectedPatient?.emergencyContact}
            </Text>
            <Text>
              <span style={spanStyles}> Emergency Contact Name:</span>{" "}
              {selectedPatient?.emergencyContactName}
            </Text>
            <Text>
              <span style={spanStyles}>currentMedication:</span>{" "}
              {selectedPatient?.currentMedication || " -"}
            </Text>
            <Text>
              <span style={spanStyles}>pastMedicalHistory: </span>
              {selectedPatient?.pastMedicalHistory}
            </Text>
            <Text>
              <span style={spanStyles}>identificationType:</span>{" "}
              {selectedPatient?.identificationType}
            </Text>

            <Text>
              <span style={spanStyles}> familyMedicalHistory:</span>{" "}
              {selectedPatient?.familyMedicalHistory}
            </Text>
            <Text>
              <span style={spanStyles}> identificationNumber:</span>{" "}
              {selectedPatient?.identificationNumber}
            </Text>
            <HStack>
              <Text style={spanStyles}>identificationUrl:</Text>
              <Image
                boxSize={"50px"}
                src={selectedPatient?.identificationUrl}
                alt="Patient Identification"
              />
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Patients;
