import React, { useEffect, useState } from "react";
import { getDoctors } from "../lib/Actions/doctor.actions";
import { Box, Spinner, Text, VStack, Image } from "@chakra-ui/react";

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
          <Box key={doctor.$id} p={4} borderWidth="1px" borderRadius="md" w="100%">
            <Text fontSize="lg" fontWeight="bold">{doctor.drname}</Text>
            <Image
              src={doctor.doctorPhotoUrl} // Display the doctor's photo
              alt={doctor.drname}
              boxSize="150px"
              objectFit="cover"
              borderRadius="md"
              mt={2}
            />
          </Box>
        ))
      ) : (
        <Text>No doctors found.</Text>
      )}
    </VStack>
  );
};

export default Doctorsdata;
