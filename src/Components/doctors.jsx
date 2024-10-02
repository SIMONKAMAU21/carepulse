import React, { useEffect, useState } from "react";
import { getDoctors } from "../lib/Actions/doctor.actions";
import {
  Box,
  Spinner,
  Text,
  VStack,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Input,
  InputGroup,
  Icon,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import SearchInput from "./Search";

const Doctorsdata = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors();
        setDoctors(response);
      } catch (error) {
        setError("Failed to fetch doctors data");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
      >
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
      >
        <Text color="red.500" fontSize="lg">
          {error}
        </Text>
      </Box>
    );
  }
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const filteredDoctor = doctors?.documents?.filter((doctor) => {
    return doctor?.drname?.toLowerCase().includes(searchTerm)||  doctor?.phone?.toLowerCase().includes(searchTerm)||  doctor?.email?.toLowerCase().includes(searchTerm)
  });

  return (
    <Box>
      <Box mt={{ base: "1%", md: "1%" }} w={{ base: "100%", md: "50%" }}>
        <SearchInput
          value={searchTerm}
          onChange={handleSearch}
          placeholder={"search doctor by phone or name"}
        />
      </Box>{" "}
      {filteredDoctor?.length > 0 ? (
        <Box
          w={{ base: "100%" }}
          mt={{ base: "10%", md: "0%" }}
          h={"80%"}
          overflowX="auto"
        >
          <Table
            variant={"simple"}
            colorScheme="whiteAlpha"
            size={{ base: "sm", md: "md" }}
          >
            <Thead>
              <Tr>
                <Th>Photo</Th>
                <Th> DoctorFullName</Th>
                <Th>Phone Number</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody color={""}>
              {filteredDoctor.map((doctor) => (
                <Tr key={doctor.$id}>
                  <Td>
                    <Image
                      src={doctor.doctorPhotoUrl}
                      alt={doctor.drname}
                      boxSize="50px"
                      objectFit="cover"
                      borderRadius="50%"
                      position="relative"
                      zIndex="1"
                      transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
                      _hover={{
                        transform: "scale(3)",
                        zIndex: "1000",
                        position: "absolute",
                        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                        borderRadius: "10px",
                      }}
                    />
                  </Td>
                  <Td w={"10%"}>{doctor.drname}</Td>
                  <Td>{doctor.phone}</Td>
                  <Td>{doctor.email}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ) : (
        <Text>No doctors found.</Text>
      )}
    </Box>
  );
};

export default Doctorsdata;
