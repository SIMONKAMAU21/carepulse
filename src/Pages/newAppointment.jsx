import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Text,
  Textarea,
  FormLabel,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import logo from "../assets/Logo.svg";
import illustration from "../assets/doc2.png";
import AuthWrapper from "../Components/OnboarndingWrapper";
import CustomInputs from "../Components/CustomInputs";
import { FaCalendarAlt, FaSearch } from "react-icons/fa";
import { getPatient } from "../lib/Actions/patient.actions";
import { addAppointment } from "../lib/Actions/appointment.actions";
import { ErrorToast, LoadingToast, SuccessToast } from "../Components/toaster";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const [form, setForm] = useState({
    doctor: "",
    patientId: "",
    userId: "",
    appointmentReason: "",
    preferences: "",
    appointmentDate: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

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
          console.log("fetchedUser", fetchedUser);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, []);

  const handleSubmit = async () => {
    LoadingToast(true);
    try {
      const appointmentData = {
        doctor: form.doctor || "",
        patientId: form.patientId || "",
        userId: form.userId || "",
        appointmentReason: form.appointmentReason || "",
        preferences: form.preferences || "",
        appointmentDate: form.appointmentDate || "",
      };
      const newAppointment = await addAppointment(appointmentData);
      console.log("newAppointment", newAppointment);
      setForm({});
      SuccessToast("appointment added");
      navigate(
        `/success/${form.userId}/appointment/${newAppointment.documentId}`
      );
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
            <CustomInputs
              label={"Doctor"}
              icon={FaSearch}
              name="doctor"
              value={form.doctor}
              onChange={handleInputChange}
              placeholder={"ex: Doctor Simon"}
            />
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
