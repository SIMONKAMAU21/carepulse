import React, { useEffect, useState } from "react";
import { getDoctors } from "../lib/Actions/doctor.actions";
import { Box, Spinner, Text, VStack, Image, HStack } from "@chakra-ui/react";

const Doctorsdata = () => {
  const [doctors, setDoctors] = useState([]); // To store doctors data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors();
        setDoctors(response.documents); // Assuming the doctors' data is in the 'documents' key
      } catch (error) {
        setError("Failed to fetch doctors data");
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
        <Text color="red.500" fontSize="lg">
          {error}
        </Text>
      </Box>
    );
  }

  return (
    <VStack spacing={4} p={4}>
      {doctors.length > 0 ? (
        doctors.map((doctor) => (
          <Box key={doctor.$id} p={{base:"1px",md:"3px"}} h={"50%"} borderRadius="md" w="100%">
          <HStack>
          <Image
              src={doctor.doctorPhotoUrl} 
              alt={doctor.drname}
              boxSize="50px"
              objectFit="cover"
              borderRadius="50%"
            //   mt={2}
            />
          <Text fontSize="lg" >{doctor.drname}</Text>
           
          </HStack>
          </Box>
        ))
      ) : (
        <Text>No doctors found.</Text>
      )}
    </VStack>
  );
};

export default Doctorsdata;
