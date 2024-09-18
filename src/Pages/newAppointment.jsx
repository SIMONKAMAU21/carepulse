import { Box, Button, Grid, Heading, Image, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import logo from "../assets/Logo.svg";
import illustration from "../assets/doc2.png";

import AuthWrapper from "../Components/OnboarndingWrapper";
import CustomInputs from "../Components/CustomInputs";
import { FaCalendarAlt, FaPersonBooth, FaPrescription, FaSearch } from "react-icons/fa";

const Appointment = () => {
  return (
    <AuthWrapper
      leftChildren={
        <Box m={{ base: "5%", md: "5%" }} h={"100%"} >
            <Image  src={logo} />
          <Box mt={{base:"10%",md:"9%"}}>
            <Heading>Hey there 👋</Heading>
            <Text>Request a new appointment in 10 seconds</Text>
          </Box>
          <Box mt={{base:"10%",md:"5%"}}>
            <CustomInputs
            label={"doctor"}
            icon={FaSearch}
            placeholder={"ex:doctor simon"}
            
            />
              <Grid mt={"1%"} templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
              <Textarea
            label={"doctor"}
            placeholder={"ex : annual monthly check_up"}
            
            />
            <Textarea
            label={"doctor"}
            placeholder={"prefer afternoon appointments, if possible"}
            
            />
            </Grid>
            <CustomInputs
            label={"expected appointment date"}
            icon={FaCalendarAlt}
            type="date"
            
            />
            <Button  mt={{ base: "20%", md: "10%" }}
            bg={"rgb(36,174,124)"}
            width={{ base: "100%", md: "100%" }}
            // onClick={submit}
            color={"white"}
            // isLoading={loading} // Chakra UI's prop to show a loading spinner
            _hover={{ bg: "rgb(30,140,100)" }}>
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
