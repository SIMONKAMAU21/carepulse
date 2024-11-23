import React, { useEffect, useState } from "react";
import AuthWrapper from "../Components/OnboarndingWrapper";
import {
  Box,
  Heading,
  Image,
  Text,
  Grid,
  RadioGroup,
  Stack,
  Radio,
  Input,
  Checkbox,
  Select,
  FormControl,
  Button,
  FormLabel,
  Menu,
  MenuButton,
  MenuList,
  Textarea,
  MenuItem,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import doc from "../assets/doc1.png";
import Logo from "../assets/Logo.svg";
import CustomInputs from "../Components/CustomInputs";
import {
  FaAddressBook,
  FaCalendar,
  FaCalendarAlt,
  FaIdCard,
  FaPhone,
  FaUpload,
  FaUser,
  FaVoicemail,
} from "react-icons/fa";
import {
  getPatient,
  getUser,
  registerUser,
} from "../lib/Actions/patient.actions";
import { ErrorToast, LoadingToast, SuccessToast } from "../Components/toaster";
import { useNavigate } from "react-router-dom";
import { getDoctors } from "../lib/Actions/doctor.actions";
import { ChevronDownIcon } from "@chakra-ui/icons";
import logo from "../assets/i (2).mp4";
import log from "../assets/i.mp4";

const Register = () => {
  const { colorMode } = useColorMode();
  const [patientExists, setPatientExists] = useState(false); // Track patient existence
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [doctor, setDoctor] = useState([]);
  const [consents, setConsents] = useState({
    treatment: false,
    disclosure: false,
    privacyPolicy: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors();
        setDoctor(response.documents);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      ErrorToast("your data is required");
      navigate("/");
    }
    if (user) {
      const userID = user.id;
      const fetchUserData = async () => {
        try {
          const fetchedUser = await getUser(userID);
          setForm((prevForm) => ({
            ...prevForm,
            userId: fetchedUser.$id,
            email: fetchedUser.email || "",
            name: fetchedUser.name || "",
            phone: fetchedUser.phone || "",
          }));
        } catch (error) {
          ErrorToast("Error fetching user data");
        }
      };
      fetchUserData();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const handleDoctorSelect = (doctorName) => {
    setForm((prevForm) => ({
      ...prevForm,
      primaryPhysician: doctorName,
    }));
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setForm((prevForm) => ({
      ...prevForm,
      idDocument: e.target.files[0],
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setConsents((privacyConsent) => ({
      ...privacyConsent,
      [name]: checked,
    }));
  };

  const handleGenderChange = (value) => {
    setForm((prevForm) => ({
      ...prevForm,
      gender: value,
    }));
  };
  useEffect(() => {
    const checkPatientExists = async () => {
      if (form.userId) {
        const existingPatient = await getPatient(form.userId);
        setPatientExists(!!existingPatient);
        if (existingPatient) {
          navigate("/login");
        } else {
          return;
        }
      }
    };

    checkPatientExists();
  }, [form.userId, navigate]);

  const handleSubmit = async () => {
    setLoading(true);
    LoadingToast(true);

    if (!form.primaryPhysician || !selectedFile) {
      ErrorToast("Please fill all required fields.");
      setLoading(false);
      LoadingToast(false);
      return;
    }

    try {
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

      if (!cloudinaryRes.ok) {
        throw new Error("Cloudinary upload failed");
      }

      const responseJson = await cloudinaryRes.json();
      const { secure_url } = responseJson;

      // Prepare userData for registration
      const userData = {
        ...form,
        identificationUrl: secure_url,
      };

      const newUser = await registerUser(userData);
      if (!newUser) throw new Error("User registration failed");

      SuccessToast("Registration succeeded");
      navigate("/Appointment");
    } catch (error) {
      console.error("Registration error:", error);
      ErrorToast("Failed to register: " + error.message);
    } finally {
      setLoading(false);
      LoadingToast(false);
    }
  };

  return (
    <AuthWrapper
      leftChildren={
        <>
          <Box p={"2%"} color={colorMode === "light" ? "black" : "gray.100"}>
            <video
              src={colorMode === "light" ? log : logo}
              cursor="pointer"
              autoPlay
              loop
              muted
              style={{
                width: "30%",
                height: "90px",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
            <Heading mt={"2%"}>welcome👋</Heading>
            <Text>Let us know more about yourself</Text>
          </Box>

          <Box
            sx={{
              "::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            h={"80%"}
            overflowY={"auto"}
            p={"4%"}
          >
            <Box>
              <Heading
                as={"h2"}
                color={colorMode === "light" ? "black" : "white"}
                size={{ base: "md", md: "lg" }}
                mt={{ base: "5%", md: "none" }}
              >
                Personal Information
              </Heading>
              <CustomInputs
                icon={FaUser}
                label={"Full Name"}
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder={"Enter your full name"}
              />

              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                <CustomInputs
                  icon={FaVoicemail}
                  label={"Email Address"}
                  name="email"
                  value={form.email || ""}
                  onChange={handleInputChange}
                  placeholder={"Enter your email address"}
                  type="email"
                />
                <CustomInputs
                  icon={FaPhone}
                  label={"Phone Number"}
                  name="phone"
                  value={form.phone || ""}
                  onChange={handleInputChange}
                  placeholder={"Enter your phone number"}
                  type="tel"
                />
                <CustomInputs
                  icon={FaCalendar}
                  label={"Date of Birth"}
                  name="birthDate"
                  value={form.birthDate || ""}
                  onChange={handleInputChange}
                  placeholder={"Select your birth date"}
                  type="date"
                />
                <Box
                  mt={4}
                  color={colorMode === "light" ? "black" : "gray.100"}
                >
                  <Text mb={2}>Gender</Text>
                  <RadioGroup
                    onChange={handleGenderChange}
                    value={form.gender || ""}
                  >
                    <Stack direction="row">
                      <Radio value="male">Male</Radio>
                      <Radio value="female">Female</Radio>
                      <Radio value="other">Other</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
                <CustomInputs
                  icon={FaAddressBook}
                  label={"Address"}
                  name="address"
                  value={form.address || ""}
                  onChange={handleInputChange}
                  placeholder={"Enter your address"}
                  type="text"
                />
                <CustomInputs
                  icon={FaCalendar}
                  label={"Occupation"}
                  name="occupation"
                  value={form.occupation || ""}
                  onChange={handleInputChange}
                  placeholder={"Enter your occupation"}
                  type="text"
                />
                <CustomInputs
                  icon={FaUser}
                  label={"Emergency Contact Name"}
                  name="emergencyContactName"
                  value={form.emergencyContactName || ""}
                  onChange={handleInputChange}
                  placeholder={"Guardian's name"}
                  type="text"
                />
                <CustomInputs
                  icon={FaPhone}
                  label={"Emergency Contact Phone"}
                  name="emergencyContact"
                  value={form.emergencyContact || ""}
                  onChange={handleInputChange}
                  placeholder={"Enter emergency contact phone number"}
                  type="tel"
                />
              </Grid>
            </Box>

            <Box>
              <Heading
                as={"h2"}
                size={{ base: "md", md: "lg" }}
                mt={{ base: "8%", md: "2%" }}
                color={colorMode === "light" ? "black" : "white"}
              >
                Medical Information
              </Heading>
              <Box
                color={colorMode === "light" ? "black" : "gray.100"}
                mt={{ base: "10%", md: "5%" }}
              >
                <FormLabel variant={"outline"}>
                  Select primary Physician
                </FormLabel>
                <Menu>
                  <MenuButton
                    variant={"outline"}
                    w={"100%"}
                    color={colorMode === "light" ? "black" : "gray.100"}
                    border={"1px solid gray"}
                    as={Button}
                    backgroundColor={"none"}
                    colorScheme="none"
                    rightIcon={<ChevronDownIcon />}
                  >
                    {form.primaryPhysician
                      ? form.primaryPhysician
                      : "Select primary Physician"}
                  </MenuButton>
                  <MenuList>
                    {doctor.map((doctor) => (
                      <MenuItem
                        color={"black"}
                        key={doctor.$id}
                        onClick={() =>
                          handleDoctorSelect(doctor.drname, doctor.$id)
                        }
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
              </Box>
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                <CustomInputs
                  icon={FaVoicemail}
                  label={"Insurance Provider"}
                  name="insuranceProvider"
                  value={form.insuranceProvider || ""}
                  onChange={handleInputChange}
                  placeholder={"e.g., NHIF"}
                  type="text"
                />
                <CustomInputs
                  icon={FaPhone}
                  label={"Insurance Policy Number"}
                  name="insurancePolicyNumber"
                  value={form.insurancePolicyNumber || ""}
                  onChange={handleInputChange}
                  placeholder={"e.g., 4233333"}
                  type="number"
                />
                <CustomInputs
                  icon={FaCalendar}
                  label={"Allergies"}
                  name="allergies"
                  value={form.allergies || ""}
                  onChange={handleInputChange}
                  placeholder={"e.g., pollen, penicillin"}
                  type="text"
                />
                <CustomInputs
                  icon={FaAddressBook}
                  label={"Current Medications"}
                  name="currentMedication"
                  value={form.currentMedication || ""}
                  onChange={handleInputChange}
                  placeholder={"e.g., Ibuprofen 200mg"}
                  type="text"
                />
                <CustomInputs
                  icon={FaUser}
                  label={"Family Medical History"}
                  name="familyMedicalHistory"
                  value={form.familyMedicalHistory || ""}
                  onChange={handleInputChange}
                  placeholder={"e.g., heart disease"}
                  type="text"
                />
                <CustomInputs
                  icon={FaPhone}
                  label={"Past Medical History"}
                  name="pastMedicalHistory"
                  value={form.pastMedicalHistory || ""}
                  onChange={handleInputChange}
                  placeholder={"e.g., surgery in 2022"}
                  type="text"
                />
              </Grid>
            </Box>

            <Box>
              <Heading
                as={"h2"}
                size={{ base: "md", md: "lg" }}
                mt={{ base: "8%", md: "2%" }}
                color={colorMode === "light" ? "black" : "white"}
              >
                Identification
              </Heading>
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                <FormControl
                  color={colorMode === "light" ? "black" : "gray.100"}
                >
                  <Text mb={2}>Identification Type</Text>
                  <Select
                    border={"1px solid gray"}
                    name="identificationType"
                    value={
                      form.identificationType || "select identification type"
                    }
                    onChange={handleInputChange}
                  >
                    <option value="passport">Passport</option>
                    <option value="idCard">ID Card</option>
                    <option value="drivingLicense">Driving License</option>
                  </Select>
                </FormControl>
                <CustomInputs
                  icon={FaIdCard}
                  label={"Identification Number"}
                  name="identificationNumber"
                  value={form.identificationNumber || ""}
                  onChange={handleInputChange}
                  placeholder={"e.g., A123456"}
                />
                <FormControl
                  color={colorMode === "light" ? "black" : "gray.100"}
                  mt={4}
                >
                  <Text>Upload Document</Text>
                  <Input
                    type="file"
                    name="idDocument"
                    position={"absolute"}
                    onChange={handleFileChange}
                    accept="image/*"
                    display={"none"}
                    id="fileUpload"
                  />
                  <Button
                    onClick={() =>
                      document.getElementById("fileUpload").click()
                    }
                    position={"relative"}
                    zIndex={"1000"}
                    top={"9%"}
                    justifyContent={"flex-start"}
                    bg={"#131619"}
                    width={{ base: "100%", md: "100%" }}
                    variant="outline"
                    color={"grey"}
                    leftIcon={<FaUpload />}
                  >
                    Upload Document
                  </Button>
                </FormControl>
              </Grid>
            </Box>

            <Box color={colorMode === "light" ? "black" : "gray.100"}>
              <Heading
                as={"h2"}
                size={{ base: "md", md: "lg" }}
                mt={{ base: "8%", md: "2%" }}
              >
                Consent
              </Heading>
              <Checkbox
                name="treatment"
                value={form.prevConsents}
                isChecked={consents.treatment}
                onChange={handleCheckboxChange}
              >
                I consent to receive treatment.
              </Checkbox>
              <Checkbox
                name="disclosure"
                isChecked={consents.disclosure}
                value={form.privacyConsent}
                onChange={handleCheckboxChange}
              >
                I consent to disclose my medical information to authorized
                parties.
              </Checkbox>
              <Checkbox
                name="privacyPolicy"
                isChecked={consents.privacyPolicy}
                value={form.privacyConsent}
                onChange={handleCheckboxChange}
              >
                I have read and agree to the privacy policy.
              </Checkbox>
            </Box>

            <Button
              isLoading={loading}
              onClick={handleSubmit}
              colorScheme="green"
              mt={4}
              w={"100%"}
            >
              Register
            </Button>
          </Box>
        </>
      }
      rightChildren={
        <>
          <Image
            src={doc}
            h={{ base: "40vh", md: "100vh" }}
            w={{ base: "100%", md: "100%" }}
            objectFit={"cover"}
          />
        </>
      }
    />
  );
};

export default Register;
