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
} from "@chakra-ui/react";
import doc from "../assets/doc1.png";
import Logo from "../assets/Logo.svg";
import CustomInputs from "../Components/CustomInputs";
import {
  FaAddressBook,
  FaCalendar,
  FaIdCard,
  FaPhone,
  FaUser,
  FaVoicemail,
} from "react-icons/fa";
import { getUser, registerUser } from "../lib/Actions/patient.actions";
import { ErrorToast, LoadingToast, SuccessToast } from "../Components/toaster";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [consents, setConsents] = useState({
    treatment: false,
    disclosure: false,
    privacyPolicy: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user", user);
    if (!user) {
      ErrorToast("your data is required")
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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setForm((prevForm) => ({
      ...prevForm,
      idDocument: e.target.files[0],
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setConsents((prevConsents) => ({
      ...prevConsents,
      [name]: checked,
    }));
  };

  const handleGenderChange = (value) => {
    setForm((prevForm) => ({
      ...prevForm,
      gender: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    LoadingToast(true);
    try {
      const userData = {
        email: form.email,
        phone: form.phone,
        userId: form.userId,
        name: form.name,
        gender: form.gender,
        address: form.address,
        birthDate: form.birthDate,
        occupation: form.occupation,
        privacyConsent: form.privacyConsent,
        emergencyContact: form.emergencyContact,
        insuranceProvider: form.insuranceProvider,
        insurancePolicyNumber: form.insurancePolicyNumber,
        allergies: form.allergies,
        currentMedication: form.currentMedication,
        familyMedicalHistory: form.familyMedicalHistory,
        pastMedicalHistory: form.pastMedicalHistory,
        identificationType: form.identificationType,
        identificationNumber: form.identificationNumber,
        identificationUrl: selectedFile,
      };
      // console.log("userData", userData);

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
        userData.identificationUrl = secure_url;
      } else {
        throw new Error("Cloudinary upload failed");
      }
      const newUser = await registerUser(userData);

      setForm({});
      SuccessToast("registration succeeded");
      navigate("/Appointment");
      setConsents({
        treatment: true,
        disclosure: true,
        privacyPolicy: true,
      });
    } catch (error) {
      ErrorToast("failed to register");
    }
    setLoading(false);
    LoadingToast(false);
  };

  return (
    <AuthWrapper
      leftChildren={
        <>
          <Box p={"4%"}>
            <Image src={Logo} />
            <Heading mt={"4%"}>welcome👋</Heading>
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
                <Box mt={4}>
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
                  name="emergencyContact"
                  value={form.emergencyContact || ""}
                  onChange={handleInputChange}
                  placeholder={"Guardian's name"}
                  type="text"
                />
                <CustomInputs
                  icon={FaPhone}
                  label={"Emergency Contact Phone"}
                  name="emergencyPhone"
                  value={form.emergencyPhone || ""}
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
              >
                Medical Information
              </Heading>
              <CustomInputs
                icon={FaUser}
                label={"Primary Care Physician"}
                name="primaryCarePhysician"
                value={form.primaryCarePhysician || ""}
                onChange={handleInputChange}
                placeholder={"Enter your physician's name"}
              />
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
                  name="currentMedications"
                  value={form.currentMedications || ""}
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
              >
                Identification
              </Heading>
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                <FormControl>
                  <Text mb={2}>Identification Type</Text>
                  <Select
                    name="identificationType"
                    value={form.identificationType || ""}
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
                <FormControl mt={4}>
                  <Text mb={2}>Upload Document</Text>
                  <Input
                    type="file"
                    name="idDocument"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </FormControl>
              </Grid>
            </Box>

            <Box>
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
                value={form.prevConsents}
                onChange={handleCheckboxChange}
              >
                I consent to disclose my medical information to authorized
                parties.
              </Checkbox>
              <Checkbox
                name="privacyPolicy"
                isChecked={consents.privacyPolicy}
                value={form.prevConsents}
                onChange={handleCheckboxChange}
              >
                I have read and agree to the privacy policy.
              </Checkbox>
            </Box>

            <Button
              isLoading={loading}
              onClick={handleSubmit}
              colorScheme="blue"
              mt={4}
            >
              Register
            </Button>
          </Box>
        </>
      }
      rightChildren={
        <>
          <Image src={doc} h={"100vh"} w={"100%"} objectFit={"cover"} />
        </>
      }
    />
  );
};

export default Register;
