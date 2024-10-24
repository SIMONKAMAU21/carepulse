import React, { useState } from "react";
import Header from "../Components/header";
import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import AuthWrapper from "../Components/OnboarndingWrapper";
import illustration from "../assets/Illustration1.png";
import CustomInputs from "../Components/CustomInputs";
import { ErrorToast, LoadingToast, SuccessToast } from "../Components/toaster";
import { registerDoctor } from "../lib/Actions/doctor.actions";
import { FaUpload, FaUser } from "react-icons/fa";
import Doctorsdata from "../Components/doctors";
import { formatPhoneNumber } from "../Pages/Onbornding";

const Adddoctor = () => {
  const [form, setForm] = useState({ email: "", drname: "", phone: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [doctors, setDoctors] = useState([]); // Initialize state for doctors

  const handleDoctorUpdate = (newDoctor) => {
    setDoctors((prevDoctors) => [...prevDoctors, newDoctor]); // Add new doctor to the list
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setForm((prevForm) => ({
      ...prevForm,
      doctorPhotoUrl: e.target.files[0],
    }));
  };

  const addDoctor = async () => {
    LoadingToast(true);
    try {
      let doctorName = form.drname.trim();
      if (!doctorName.startsWith("Dr.")) {
        doctorName = `Dr. ${doctorName}`;
      }

      const data = new FormData();
      data.append("file", selectedFile);
      data.append("upload_preset", "wdfjbcug");
      data.append("cloud_name", "diyuy63ue");

      const cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/diyuy63ue/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const responseJson = await cloudinaryRes.json();
      if (cloudinaryRes.ok) {
        const { secure_url } = responseJson;

        const formattedPhone = formatPhoneNumber(form.phone);
        const userData = {
          drname: doctorName,
          phone: formattedPhone,
          email: form.email,
          doctorPhotoUrl: secure_url,
        };

        const newUser = await registerDoctor(userData);
        handleDoctorUpdate(newUser);
        setForm({});
        SuccessToast("Registration succeeded");
        onClose();
      } else {
        throw new Error("Cloudinary upload failed");
      }
    } catch (error) {
      console.log("Error during doctor registration:", error);
      ErrorToast("Failed to register");
    }
    LoadingToast(false);
  };

  return (
    <>
      <AuthWrapper
        leftChildren={
          <>
            <Box
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              // bg={"#131619"}
              color={"white"}
              w={"100%"}
              h={"100%"}
              p={4}
            >
              <Header
                width={{ base: "90%", md: "100%" }}
                title={"Manage your Doctors"}
              />

              <Button
                onClick={onOpen}
                colorScheme="green"
                w={"100%"}
                mt={{ base: "50%", md: "1%" }}
              >
                Add Doctor
              </Button>

              <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent
                  w={{ base: "90%" }}
                  color={"white"}
                  bg={"#131619"}
                >
                  <ModalHeader>Add New Doctor</ModalHeader>
                  <ModalBody>
                    <CustomInputs
                      icon={FaUser}
                      label={"Full Name"}
                      name="drname"
                      value={form.drname}
                      width={{ base: "100%", md: "100%" }}
                      onChange={handleInputChange}
                      placeholder={"Enter your full name"}
                    />
                    <CustomInputs
                      icon={FaUser}
                      label={"Phone number"}
                      name="phone"
                      value={form.phone}
                      width={{ base: "100%", md: "100%" }}
                      onChange={handleInputChange}
                      placeholder={"+254 0000000"}
                    />
                    <CustomInputs
                      icon={FaUser}
                      label={"Email"}
                      name="email"
                      value={form.email}
                      width={{ base: "100%", md: "100%" }}
                      onChange={handleInputChange}
                      placeholder={"example@gmail.com"}
                    />
                    <FormControl mt={4}>
                      <Text mb={2}>Upload Photo</Text>
                      <Input
                        type="file"
                        name="idDocument"
                        position={"absolute"}
                        onChange={handleFileChange}
                        accept="image/*"
                        id="fileUpload"
                      />
                      <Button
                        leftIcon={<FaUpload />}
                        onClick={() =>
                          document.getElementById("fileUpload").click()
                        }
                        position={"relative"}
                        zIndex={"1000"}
                        top={"40%"}
                        justifyContent={"flex-start"}
                        bg={"#131619"}
                        width={{ base: "100%", md: "100%" }}
                        variant="outline"
                        color={"grey"}
                      >
                        Upload Photo
                      </Button>
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      w={{ base: "100%", md: "50%" }}
                      colorScheme="green"
                      onClick={addDoctor}
                    >
                      Register
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <Box mt={"1%"} overflow={"scroll"} h={"70%"}>
                <Doctorsdata />
              </Box>
            </Box>
          </>
        }
        rightChildren={
          <>
            <Box height="100%" width="100%">
              <Image
                src={illustration}
                alt="Illustration"
                height="100%"
                filter={"auto"}
                blur={"1px"}
                width="100%"
                objectFit="cover"
              />
            </Box>
            woow
          </>
        }
      />
    </>
  );
};

export default Adddoctor;
