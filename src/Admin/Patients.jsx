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
  useColorMode,
  Card,
  CardHeader,
  VStack,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import { deletePatient, getPatients } from "../lib/Actions/patient.actions";
import { LoadingToast, SuccessToast } from "../Components/toaster";
import SearchInput from "../Components/Search";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getPatients();
        console.log('response', response)
        setPatients(response?.documents);
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
      onClose()
    }
  };

  const spanStyles = {
    fontWeight: "bold",
    color: "grey",
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const filteredPatients = patients?.filter(
    (patient) => {
      return (
        patient.name.toLowerCase().includes(searchTerm) ||
        patient.email.toLowerCase().includes(searchTerm) ||
        patient.identificationNumber
          .toLowerCase().includes(searchTerm)
      )
    }
  )

  return (
    <Box h={"100%"} w={"100%"} p={{ base: 1, md: 4 }}  >
      <Header

        width={{ base: "100%", md: "99%" }}
        title={"Manage Your Patients"}
        subTitle={"View, update, and track patient details efficiently"}
      />
      <Box w={
        { base: "90%", md: "50%" }
      }
        mt={{ base: "49%", md: "0%" }}>
        <SearchInput value={searchTerm} onChange={handleSearch} placeholder={"serach patient by name,email,id number"} />

      </Box>
      <Box >
        {loading ? (
          <Text>loading....</Text>
        ) : error ? (
          <Text color="red.500">{error}</Text>
        ) : patients?.length > 0 ? (
          <Box
            mt={{ base: "2%", md: "0%" }}
            h={"100%"}
            p={"0px"}
            overflowX="auto"
            color={colorMode === "dark" ? "white" : "black"}

          >
            <Table
              color={colorMode === "dark" ? "white" : "black"}
              variant={"simple"}
              h={"100%"}
              w={"100%"}
              size={{ base: "sm", md: "md" }}
            >
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th display={{ base: "none", md: "table-cell" }}>
                    Insurance Provider
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredPatients?.length > 0 ? (

                  filteredPatients?.map((patient) => (
                    <Tr key={patient.$id} _hover={{
                      bg: "yellow.100",
                      cursor: "pointer",
                      color:"black"
                    }} onClick={() => handlePatientSelect(patient)}
                    >
                      <Td >
                        <HStack>
                          <Avatar src={patient?.profilePicture} name={patient?.name} />
                          <Text> {patient.name}</Text>
                        </HStack>
                      </Td>
                      <Td>{patient.email}</Td>
                      <Td>
                        {patient.phone}
                      </Td>
                      <Td display={{ base: "none", md: "table-cell" }}>
                        {patient.insuranceProvider}
                      </Td>
                    
                    </Tr>
                  ))) : (<Text>
                    no patient found
                  </Text>)}
              </Tbody>
            </Table>
          </Box>
        ) : (
          <Text
            alignItems={"center"}
            textAlign={"center"}
            mt={{ base: "70%", md: "0" }}
            color="gray.500"
          >
            No patients found.
          </Text>
        )}
      </Box>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          fontSize={{ base: "sm", md: "lg" }}
          // color={"#83B9DC"}
          // bg={"#131619"}
          w={{ base: "95%" }}
        >
          <ModalHeader>{selectedPatient?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Card w={"100%"}>
              <CardHeader>
                <HStack>
                  <Avatar size={"lg"} src={selectedPatient?.profilePicture} name={selectedPatient?.name} />
                  <VStack>
                    <Text>
                      {selectedPatient?.phone}
                    </Text>
                    <Text>
                      {selectedPatient?.email}
                    </Text>
                  </VStack>
                </HStack>
              </CardHeader>
              <CardBody>

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
              </CardBody>
              <CardFooter>
                <Button
                  mt={"5%"}
                  size={"sm"}
                  bg={"transparent"}
                  border={"2px solid red"}
                  // color={colorMode === "dark" ? "white" : "gray.700"}
                  _hover={{
                    bg: "red.500",
                  }}
                  onClick={() => handleDelete(selectedPatient.$id)}
                >
                  Delete patient
                </Button>
              </CardFooter>
            </Card>

          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Patients;
