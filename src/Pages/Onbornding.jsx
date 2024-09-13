import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import AuthWrapper from '../Components/OnboarndingWrapper';
import illustration from '../assets/doc.png';
import logo from '../assets/logo.png';
import CustomInputs from '../Components/CustomInputs';
import { FaPhone, FaUser, FaVoicemail } from 'react-icons/fa';
import { createUser } from '../lib/Actions/patient.actions';

// Utility function to format phone number
const formatPhoneNumber = (number) => {
  // Remove non-numeric characters except '+'
  const cleanNumber = number.replace(/[^\d+]/g, '');
  // Ensure it starts with '+' and is no longer than 15 digits
  if (cleanNumber.length > 15) {
    return cleanNumber.slice(0, 15);
  }
  return cleanNumber.startsWith('+') ? cleanNumber : `+${cleanNumber}`;
};

const Onboarding = () => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const submit = async () => {
    try {
      setLoading(true);
      const { email, name, phone } = form;
      const formattedPhone = formatPhoneNumber(phone); // Format phone number
      const userData = { email, name, phone: formattedPhone };
      const createdUser = await createUser(userData);

      if (createdUser) {
        console.log("User successfully created or fetched:", createdUser);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error in user submission:", error);
      setLoading(false);
    }
  };

  return (
    <AuthWrapper
      leftChildren={
        <Box ml={{ base: "10%", md: "20%" }} h={"100%"}>
          <Image mt={"10%"} src={logo} alt="Logo" />
          <Box mt={"5%"}>
            <Heading>Hi there, ....</Heading>
            <Text>Get started with Appointments</Text>
          </Box>
          <Box mt={"10%"} justifyContent={"space-between"} display={"flex"} flexDirection={"column"} h={"23%"}>
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
