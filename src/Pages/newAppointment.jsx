import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Text,
  Textarea,
  FormLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import logo from "../assets/Logo.svg";
import illustration from "../assets/doc2.png";
import AuthWrapper from "../Components/OnboarndingWrapper";
import CustomInputs from "../Components/CustomInputs";
import { FaCalendarAlt } from "react-icons/fa";
import { getPatient } from "../lib/Actions/patient.actions";
import { addAppointment } from "../lib/Actions/appointment.actions";
import { getDoctors } from "../lib/Actions/doctor.actions";
import { ErrorToast, LoadingToast, SuccessToast } from "../Components/toaster";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const [form, setForm] = useState({
    doctor: "",
    patientId: "",
    doctorId:"",
    userId: "",
    appointmentReason: "",
    preferences: "",
    appointmentDate: "",
    status: "pending", 
  });

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userID = user.id;
      const fetchUserData = async () => {
        try {
          const fetchedUser = await getPatient(userID);
          setForm((prevForm) => ({
            ...prevForm,
            userId: fetchedUser.userId,
            patientId: fetchedUser.$id,
          }));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors();
        setDoctors(response.documents);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleDoctorSelect = (doctorName, doctorId) => {
    setForm((prevForm) => ({
      ...prevForm,
      doctor: doctorName, 
      doctorId: doctorId,  
    }));
  };
  

  const handleSubmit = async () => {
    LoadingToast(true);
    try {
      const appointmentData = {
        doctor: form.doctor || "-",
        doctorId: form.doctorId || "-",
        patientId: form.patientId || "-",
        userId: form.userId || "-",
        appointmentReason: form.appointmentReason || "-",
        preferences: form.preferences || "-",
        appointmentDate: form.appointmentDate || "-",
        status: form.status || "pending",
      };
      const newAppointment = await addAppointment(appointmentData);
      setForm({});
      SuccessToast("Appointment added");
      navigate(`/success/${form.userId}/appointment/${newAppointment.$id}`);
      LoadingToast(false);
    } catch (error) {
      ErrorToast(error);
    }
    LoadingToast(false);
  };

  return (
    <AuthWrapper
      leftChildren={
        <Box m={{ base: "5%", md: "5%" }} h={"100%"}>
          <Image src={logo} />
          <Box mt={{ base: "10%", md: "9%" }}>
            <Heading>Hey there 👋</Heading>
            <Text>Request a new appointment in 10 seconds</Text>
          </Box>
          <Box mt={{ base: "10%", md: "5%" }}>
            <FormLabel variant={"outline"}>Select Doctor</FormLabel>
            <Menu>
              <MenuButton
                variant={"outline"}
                w={"100%"}
                color={"white"}
                as={Button}
                backgroundColor={"none"}
                colorScheme="none"
                rightIcon={<ChevronDownIcon />}
              >
                {form.doctor ? form.doctor : "Select Doctor"}
              </MenuButton>
              <MenuList>
                {doctors.map((doctor) => (
                  <MenuItem
                    color={"black"}
                    key={doctor.$id}
                    onClick={() => handleDoctorSelect(doctor.drname,doctor.$id)}
                  >
                    <Flex align="center">
                      <Image
                        src={doctor.doctorPhotoUrl}
                        alt={doctor.drname}
                        boxSize="30px"
                        borderRadius="full"
                        mr={3}
                      />
                      <Text>{doctor.drname}</Text>
                    </Flex>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            <Grid
              mt={"1%"}
              templateColumns={{ base: "1fr", md: "1fr 1fr" }}
              gap={4}
            >
              <Box>
                <FormLabel htmlFor="appointmentReason">
                  Reason for Appointment
                </FormLabel>
                <Textarea
                  id="appointmentReason"
                  name="appointmentReason"
                  value={form.appointmentReason}
                  onChange={handleInputChange}
                  placeholder={"ex: Annual check-up, medical review, etc."}
                  resize="none"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="preferences">
                  Appointment Preferences/notes
                </FormLabel>
                <Textarea
                  id="preferences"
                  name="preferences"
                  value={form.preferences}
                  onChange={handleInputChange}
                  placeholder={"ex: Prefer afternoon appointments, if possible"}
                  resize="none"
                />
              </Box>
            </Grid>

            <CustomInputs
              label={"Expected appointment date"}
              icon={FaCalendarAlt}
              name="appointmentDate"
              type="datetime-local"
              value={form.appointmentDate}
              onChange={handleInputChange}
            />

            <Button
              mt={{ base: "20%", md: "10%" }}
              bg={"rgb(36,174,124)"}
              width={{ base: "100%", md: "100%" }}
              onClick={handleSubmit}
              color={"white"}
              _hover={{ bg: "rgb(30,140,100)" }}
            >
              Submit & Continue
            </Button>
          </Box>
        </Box>
      }
      rightChildren={
        <>
          <Image
            src={illustration}
            h={"100vh"}
            w={"100%"}
            objectFit={"cover"}
          />
        </>
      }
    />
  );
};

export default Appointment;
