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
  useColorMode,
} from "@chakra-ui/react";
import SearchInput from "./Search";
import { ErrorToast, LoadingToast, SuccessToast } from "./toaster";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Doctorsdata = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null); 
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const cancelRef = React.useRef();
  const { colorMode } = useColorMode();
const queryClient = useQueryClient()

const { data: doctorsData = [], isLoading, error } = useQuery("doctors", getDoctors);
const doctors = doctorsData?.documents || [];

const deleteMutation = useMutation(deleteDoctor,{
  onSuccess:()=>{
    queryClient.invalidateQueries('doctors')
      SuccessToast("Doctor deleted successfully");
},
onError:() =>{
  ErrorToast("Failed to delete the doctor");
}})


  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredDoctors = doctors?.filter((doctor) =>
    ["drname", "phone", "email"].some((key) =>
      doctor[key]?.toLowerCase().includes(searchTerm)
    )
  );

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
        <SearchInput
          value={searchTerm}
          onChange={handleSearch}
          placeholder={"Search doctor by name, phone, or email"}
        />

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minH="40vh">
          <Spinner size="xl" color="blue.500" />
        </Box>
      ) : error ? (
        <Text color="red.500" fontSize="lg" textAlign="center">
          {error}
        </Text>
      ) : filteredDoctors.length > 0 ? (
        <Box w="100%" mt="5%" overflowX="auto">
          <Table variant="simple" color={colorMode === "dark" ? "white" :"black"} size={{base:"sm",md:"md"}}>
            <Thead fontSize={{base:"10px"}}>
              <Tr>
                <Th>Photo</Th>
                <Th>DoctorFullName</Th>
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
                        transform: "scale(4)",
                        zIndex: "1000",
                        left:"20%",
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
                deleteMutation.mutate(selectedDoctorId)
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
