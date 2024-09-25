import React, { useState } from "react";
import Header from "../Components/header";
import { Box, Button, FormControl, Image, Input, Text } from "@chakra-ui/react";
import AuthWrapper from "../Components/OnboarndingWrapper";
import illustration from "../assets/illustration1.png";
import CustomInputs from "../Components/CustomInputs";
import { ErrorToast, LoadingToast, SuccessToast } from "../Components/toaster";
import { registerDoctor } from "../lib/Actions/doctor.actions";
import { FaUser } from "react-icons/fa";
import Doctorsdata from "../Components/doctors";

const Adddoctor = () => {
  const [form, setForm] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

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

        // Prepare user data
        const userData = {
          drname: doctorName, // Use the name with "Dr." prepended
          doctorPhotoUrl: secure_url,
        };

        // Register doctor in the database
        const newUser = await registerDoctor(userData);
        console.log("newUser", newUser);

        setForm({}); // Clear form
        SuccessToast("Registration succeeded");
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
            <Box bg={"#131619"} color={"white"} w={"100vw"} h={"100%"} p={4}>
              <Header width={{ base: "90%", md: "50%" }} />
              <Box ml={{base:"1%",md:"1%"}} mt={{base:"70%",md:"5%"}} w={{base:"100%",md:"50%"}}>
                <CustomInputs
                  icon={FaUser}
                  label={"Full Name"}
                  name="drname"
                  value={form.drname}
                  width={{base:"80%",md:"50%"}}
                  onChange={handleInputChange}
                  placeholder={"Enter your full name"}
                />
                <FormControl mt={4}>
                  <Text mb={2}>Upload Document</Text>
                  <Input
                    type="file"
                    w={{base:"80%",md:"50%"}}
                    name="idDocument"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </FormControl>
                <Button onClick={addDoctor} w={{base:"80%",md:"50%"}} colorScheme="green" mt={4}>
                  Register
                </Button>
              </Box>
              <Box mt={"1%"}>
                <Doctorsdata/>
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
