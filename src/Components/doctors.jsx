import React, { useEffect, useState } from "react";
import { deleteDoctor, getDoctors } from "../lib/Actions/doctor.actions";
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
  Input,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import SearchInput from "./Search";
import { FaSearch } from "react-icons/fa";
import { ErrorToast, LoadingToast, SuccessToast } from "./toaster";

const Doctorsdata = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null); 
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const cancelRef = React.useRef();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors();
        setDoctors(response.documents || []);
      } catch (error) {
        setError("Failed to fetch doctors data");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleDelete = async (doctorId) => {
    try {
      LoadingToast(true);
      await deleteDoctor(doctorId);
      SuccessToast("Doctor deleted successfully");
      setDoctors(doctors.filter((doctor) => doctor.$id !== doctorId));
    } catch (error) {
      ErrorToast("Failed to delete the doctor");
    } finally {
      LoadingToast(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredDoctors = doctors.filter((doctor) => {
    return (
      doctor.drname.toLowerCase().includes(searchTerm) ||
      doctor.phone.toLowerCase().includes(searchTerm) ||
      doctor.email.toLowerCase().includes(searchTerm)
    );
  });

  const handleOpenDeleteDialog = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedDoctorId(null);
    setIsDeleteDialogOpen(false);
  };

  return (
    <Box>
      <Box mt="2%" w={{ base: "100%", md: "50%" }}>
        <SearchInput
          value={searchTerm}
          onChange={handleSearch}
          placeholder={"Search doctor by name, phone, or email"}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minH="40vh">
          <Spinner size="xl" color="blue.500" />
        </Box>
      ) : error ? (
        <Text color="red.500" fontSize="lg" textAlign="center">
          {error}
        </Text>
      ) : filteredDoctors.length > 0 ? (
        <Box w="100%" mt="5%" overflowX="auto">
          <Table variant="simple" colorScheme="whiteAlpha" size="md">
            <Thead>
              <Tr>
                <Th>Photo</Th>
                <Th>Doctor Full Name</Th>
                <Th>Phone Number</Th>
                <Th>Email</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredDoctors.map((doctor) => (
                <Tr key={doctor.$id}>
                  <Td>
                    <Image
                      src={doctor.doctorPhotoUrl}
                      alt={doctor.drname}
                      boxSize="50px"
                      objectFit="cover"
                      borderRadius="50%"
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
                  <Td>{doctor.drname}</Td>
                  <Td>{doctor.phone}</Td>
                  <Td>{doctor.email}</Td>
                  <Td>
                    <Button size="sm" colorScheme="red" onClick={() => handleOpenDeleteDialog(doctor.$id)}>
                      Delete Doctor
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ) : (
        <Text>No doctors found.</Text>
      )}

      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleCloseDeleteDialog}
      >
        <AlertDialogOverlay >
          <AlertDialogContent w={{base:"90%"}} color={"white"}  bg={"#131619"}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Doctor
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this doctor? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCloseDeleteDialog}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => {
                handleDelete(selectedDoctorId);
                handleCloseDeleteDialog();
              }} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Doctorsdata;
