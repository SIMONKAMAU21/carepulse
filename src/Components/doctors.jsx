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
} from "@chakra-ui/react";

const Doctorsdata = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors();
        setDoctors(response.documents);
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

  return (
    <Box>
      {doctors.length > 0 ? (
        <Box
          w={{ base: "100%" }}
          mt={{ base: "10%", md: "0%" }}
          h={"50%"}
          overflowX="auto"
        >
          <Table variant={"simple"} colorScheme="gray" size="md">
            <Thead>
              <Tr>
                <Th>Photo</Th>
                <Th>Name</Th>
                <Th>Phone Number</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody color={""}>
              {doctors.map((doctor) => (
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
                        left:"30%",
                        
                        position:"absolute",
                        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                        borderRadius: "10px",
                      }}
                    />
                  </Td>
                  <Td>{doctor.drname}</Td>
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
