import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import AuthWrapper from "../Components/OnboarndingWrapper";
import illustration from "../assets/doc.png";
import CustomInputs from "../Components/CustomInputs";
import { FaPhone, FaUser, FaVoicemail } from "react-icons/fa";
import { createUser } from "../lib/Actions/patient.actions";
import { ErrorToast, LoadingToast, SuccessToast } from "../Components/toaster";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/i (2).mp4";
import log from "../assets/i.mp4";
import PasskeyModal from "./passkeyModal";

export const formatPhoneNumber = (number) => {
  const cleanNumber = number.replace(/[^\d+]/g, "");
  if (cleanNumber.length > 15) {
    return cleanNumber.slice(0, 15);
  }
  return cleanNumber.startsWith("+") ? cleanNumber : `+254${cleanNumber}`;
};

const Onboarding = () => {
  const { colorMode } = useColorMode();

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get("admin") === "true";
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      console.log('formattedPhone', formattedPhone)
      const userData = { email, name, phone: formattedPhone };
      const createdUser = await createUser(userData);
      console.log('createdUser', createdUser)
      if (createdUser.error) {
        ErrorToast(createdUser.error);
        LoadingToast(false);
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          email: createdUser.email,
          name: createdUser.name,
          phone: createdUser.phone,
          id: createdUser.$id,
        })
      );

      SuccessToast("User successfully created");
      navigate("/register");
      LoadingToast(false);
    } catch (error) {
      LoadingToast(false);
      ErrorToast("Failed to create user" + error.message);
    }
  };

  React.useEffect(() => {
    if (isAdmin) {
      onOpen();
    }
  }, [isAdmin, onOpen]);

  return (
    <>
      <AuthWrapper
        leftChildren={
          <>
            <Box color={colorMode === "light" ? "gray.700" :"white"} ml={{ base: "9%", md: "20%" }}>
              {/* <Image mt={"10%"} src={Logo} alt="Logo" /> */}
              
              <video
                src={colorMode === "light" ? log : logo}
                cursor="pointer"
                autoPlay
                loop
                muted
                style={{
                  width: "30%",
                  height: "100px",
                  objectFit: "cover",
                  cursor: "pointer",
                  marginTop:"10%"
                }}
              />
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
                  width={{ base: "90%", md: "50%" }}
                />
                <CustomInputs
                  icon={FaVoicemail}
                  label={"Email Address"}
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder={"Enter your email address"}
                  width={{ base: "90%", md: "50%" }}
                  type="email"
                />
                <CustomInputs
                  icon={FaPhone}
                  label={"Phone Number"}
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  placeholder={"Enter your phone number"}
                  width={{ base: "90%", md: "50%" }}
                  type="tel"
                />
              </Box>
              <Button
                mt={{ base: "20%", md: "10%" }}
                bg={"rgb(36,174,124)"}
                width={{ base: "90%", md: "50%" }}
                onClick={submit}
                color={"white"}
                isLoading={loading}
                _hover={{ bg: "rgb(30,140,100)" }}
              >
                Get Started
              </Button>
              <Box
                mt={{base:"10%",md:"5%"}}
                w={"100%"}
                display={"flex"}
                alignItems={"flex-end"}
                color={"rgb(74,201,126)"}
              >
                <NavLink to={"/?admin=true"}>Admin</NavLink>
              </Box>
            </Box>
          </>
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
      <PasskeyModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Onboarding;
