import React, { useState, useEffect } from "react";
import AuthWrapper from "../Components/OnboarndingWrapper";
import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
// import logo from "../assets/Logo.svg";
import check from "../assets/check.svg";
import illustration from "../assets/doc.png";
import { NavLink, useParams } from "react-router-dom";
import { getAppointment } from "../lib/Actions/appointment.actions";
import calender from "../assets/calendar.png";
import logo from "../assets/i.mp4";
import log from "../assets/i (2).mp4";

const Success = () => {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const fetchedAppointment = await getAppointment(appointmentId);
        setAppointment(fetchedAppointment);
      } catch (error) {
        setError("Error fetching appointment");
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
          <Box>
            <NavLink to={"/"}>
              <video
                src={colorMode === "dark" ? log : logo}
                cursor="pointer"
                autoPlay
                loop
                muted
                style={{
                  width: "150px",
                  height: "50px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
            </NavLink>
            <Box
              color={colorMode === "light" ? "black" : ""}
              alignItems={"center"}
              justifyContent={"center"}
              h={"100%"}
              pl={{base:"5%",md:"10%"}}
              w={"100%"}
            >
              <Box
                // w={{ base: "100%", md: "50%" }}
                display={"flex"}
        
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
              <Box mt={"5%"} alignItems={"center"}>
                <Heading as={"h4"} size={{ base: "sm", md: "lg" }}>
                  Requested appointment details:
                </Heading>

                {appointment && (
                  <Box
                    fontSize={{ base: "14px", md: "18px" }}
                    alignItems={"center"}
                    color={colorMode === "light" ? "black" : ""}
                  >
                    <Text w={"50%"}>
                      <span
                        style={{ color: "rgb(74,201,126)", fontWeight: "bold" }}
                      >
                        Doctor:{" "}
                      </span>
                      {appointment.doctor}
                    </Text>
                    <Text>You are expect at this date:</Text>

                    <Box
                      color={"rgb(74,201,126)"}
                      fontWeight={"bold"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Image
                        boxSize={{ base: "20px", md: "30px" }}
                        src={calender}
                      />
                      {formatDate(appointment.appointmentDate)}
                    </Box>
                  </Box>
                )}
              </Box>
             <SimpleGrid mt={"10%"} columns={2}>
             <NavLink to={"/appointment"}>
                <Button
                  // mt={"10%"}
                  color={"white"}
                  w={"auto"}
                  bgColor={"rgb(74,201,126)"}
                >
                  New Appointment
                </Button>
              </NavLink>
              {/* <Spacer /> */}
              <NavLink to={"/patient/dashbord"}>
                <Button
                  // mt={"5%"}
                  color={"white"}
                  w={"auto"}
                  bgColor={"rgb(74,201,126)"}
                >
                  Go to profile
                </Button>
              </NavLink>
             </SimpleGrid>
            </Box>
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
