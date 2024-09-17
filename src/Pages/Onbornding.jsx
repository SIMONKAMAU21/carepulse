import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import AuthWrapper from "../Components/OnboarndingWrapper";
import illustration from "../assets/doc.png";
import CustomInputs from "../Components/CustomInputs";
import { FaPhone, FaUser, FaVoicemail } from "react-icons/fa";
import { createUser } from "../lib/Actions/patient.actions";
import { ErrorToast, LoadingToast, SuccessToast } from "../Components/toaster";
import { useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";

const formatPhoneNumber = (number) => {
  const cleanNumber = number.replace(/[^\d+]/g, "");
  if (cleanNumber.length > 15) {
    return cleanNumber.slice(0, 15);
  }
  return cleanNumber.startsWith("+") ? cleanNumber : `+${cleanNumber}`;
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const submit = async () => {
    try {
      LoadingToast(true);
      const { email, name, phone } = form;
  
      if (!email || !name || !phone) {
        ErrorToast("All fields are required");
        LoadingToast(false);
        return;
      }
  
      const formattedPhone = formatPhoneNumber(phone);
      const userData = { email, name, phone: formattedPhone };
  
      const createdUser = await createUser(userData);
  
      if (createdUser) {
        // Store the user data in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: createdUser.email,
            name: createdUser.name,
            phone: createdUser.phone,
            id: createdUser.$id,
          })
        );
  
        // Display success toast and navigate to the next page
        SuccessToast("User successfully created");
        navigate(`/register`);
      }
  
      LoadingToast(false);
    } catch (error) {
      ErrorToast("Failed to create user");
      LoadingToast(false);
    }
  };
  
  

  return (
    <AuthWrapper
      leftChildren={
        <Box ml={{ base: "10%", md: "20%" }} h={"100%"}>
          <Image mt={"10%"} src={""} alt="Logo" />
          <Box mt={"5%"}>
            <Heading>Hi there, ....</Heading>
            <Text>Get started with Appointments</Text>
          </Box>
          <Box
            mt={"10%"}
            justifyContent={"space-between"}
            display={"flex"}
            flexDirection={"column"}
            h={"23%"}
          >
            <CustomInputs
              icon={FaUser}
              label={"Full Name"}
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder={"Enter your full name"}
              width={{ base: "80%", md: "50%" }}
            />
            <CustomInputs
              icon={FaVoicemail}
              label={"Email Address"}
              name="email"
              value={form.email}
              onChange={handleInputChange}
              placeholder={"Enter your email address"}
              width={{ base: "80%", md: "50%" }}
              type="email"
            />
            <CustomInputs
              icon={FaPhone}
              label={"Phone Number"}
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
              placeholder={"Enter your phone number"}
              width={{ base: "80%", md: "50%" }}
              type="tel"
            />
          </Box>
          <Button
            mt={{ base: "20%", md: "10%" }}
            bg={"rgb(36,174,124)"}
            width={{ base: "80%", md: "50%" }}
            onClick={submit}
            color={"white"}
            isLoading={loading} // Chakra UI's prop to show a loading spinner
            _hover={{ bg: "rgb(30,140,100)" }}
          >
            Get Started
          </Button>
        </Box>
      }
      rightChildren={
        <Box height="100vh" width="100%">
          <Image
            src={illustration}
            alt="Illustration"
            height="100%"
            width="100%"
            objectFit="cover"
          />
        </Box>
      }
    />
  );
};

export default Onboarding;
