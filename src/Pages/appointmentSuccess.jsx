import React, { useState, useEffect } from "react";
import AuthWrapper from "../Components/OnboarndingWrapper";
import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import logo from "../assets/Logo.svg";
import check from "../assets/check.svg";
import illustration from "../assets/doc.png";
import { NavLink, useParams } from "react-router-dom";
import { getAppointment } from "../lib/Actions/appointment.actions";
import calender from "../assets/calendar.png";
const Success = () => {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const fetchedAppointment = await getAppointment(appointmentId);
        setAppointment(fetchedAppointment);
      } catch (error) {
        setError("Error fetching appointment");
        // console.error("Error fetching appointment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [appointmentId]);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return (
      date.toLocaleDateString(undefined, options) +
      "- " +
      date.toLocaleTimeString()
    );
  };

  if (loading) {
    return <Text>Loading appointment details...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <AuthWrapper
      leftChildren={
        <>
          <Box ml={{ base: "10%", md: "20%" }} h={"100%"}>
            <NavLink to={"/"}>
              <Image mt={{ base: "5%" }} src={logo} />
            </NavLink>
            <Box
              w={{ base: "100%", md: "50%" }}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Image mt={{ base: "5%" }} src={check} />
            </Box>
            <Box w={{ base: "100%", md: "50%" }}>
              <Heading>
                Your{" "}
                <span style={{ color: "rgb(74,201,126)" }}>
                  Appointment request
                </span>{" "}
                has been successfully submitted
              </Heading>
              <Text mt={"5%"}>We'll be in touch shortly to confirm.</Text>
            </Box>
            <Box display={"flex"} mt={"5%"} alignItems={"center"}>
              <Heading as={"h4"} size={{ base: "sm", md: "lg" }}>
                Requested appointment details:
              </Heading>
              {appointment && (
                <Box display={"flex"} alignItems={"center"}>
                  <Text w={"50%"}>
                    <span style={{ color: "rgb(74,201,126)" }}>Doctor</span>{" "}
                    {appointment.doctor}
                  </Text>
                  <Box display={"flex"} alignItems={"center"}>
                    <Image h={"30px"} w={"30px"} src={calender} />
                    {formatDate(appointment.appointmentDate)}
                  </Box>
                </Box>
              )}
            </Box>
            <NavLink to={"/appointment"}>
              <Button
                mt={"10%"}
                color={"white"}
                w={"50%"}
                bgColor={"rgb(74,201,126)"}
              >
                New Appointment
              </Button>
            </NavLink>
          </Box>
        </>
      }
      rightChildren={
        <>
          <Box height="100vh" width="100%">
            <Image
              src={illustration}
              alt="Illustration"
              height="100%"
              //   position={"relative"}
              width="100%"
              objectFit="cover"
            />
          </Box>
        </>
      }
    />
  );
};

export default Success;
