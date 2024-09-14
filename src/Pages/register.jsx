import React, { useState } from "react";
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
import logo from "../assets/logo.png";
import CustomInputs from "../Components/CustomInputs";
import {
  FaAddressBook,
  FaCalendar,
  FaIdCard,
  FaPhone,
  FaUser,
  FaVoicemail,
} from "react-icons/fa";

const Register = () => {
  const [form, setForm] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [consents, setConsents] = useState({
    treatment: false,
    disclosure: false,
    privacyPolicy: false,
  });

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

  return (
    <AuthWrapper
      leftChildren={
        <>
          <Box p={"4%"}>
            <Image src={logo} />
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
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder={"Enter your email address"}
                  type="email"
                />
                <CustomInputs
                  icon={FaPhone}
                  label={"Phone Number"}
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  placeholder={"Enter your phone number"}
                  type="tel"
                />
                <CustomInputs
                  icon={FaCalendar}
                  label={"Date of Birth"}
                  name="birthDate"
                  value={form.birthDate}
                  onChange={handleInputChange}
                  placeholder={"Select your birth date"}
                  type="date"
                />
                <Box mt={4}>
                  <Text mb={2}>Gender</Text>
                  <RadioGroup onChange={handleGenderChange} value={form.gender}>
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
                  value={form.address}
                  onChange={handleInputChange}
                  placeholder={"Enter your address"}
                  type="text"
                />
                <CustomInputs
                  icon={FaCalendar}
                  label={"Occupation"}
                  name="occupation"
                  value={form.occupation}
                  onChange={handleInputChange}
                  placeholder={"Enter your occupation"}
                  type="text"
                />
                <CustomInputs
                  icon={FaUser}
                  label={"Emergency Contact Name"}
                  name="emergencyContact"
                  value={form.emergencyContact}
                  onChange={handleInputChange}
                  placeholder={"Guardian's name"}
                  type="text"
                />
                <CustomInputs
                  icon={FaPhone}
                  label={"Emergency Contact Phone"}
                  name="emergencyPhone"
                  value={form.emergencyPhone}
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
                value={form.primaryCarePhysician}
                onChange={handleInputChange}
                placeholder={"Enter your physician's name"}
              />
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                <CustomInputs
                  icon={FaVoicemail}
                  label={"Insurance Provider"}
                  name="insuranceProvider"
                  value={form.insuranceProvider}
                  onChange={handleInputChange}
                  placeholder={"e.g., NHIF"}
                  type="text"
                />
                <CustomInputs
                  icon={FaPhone}
                  label={"Insurance Policy Number"}
                  name="insurancePolicyNumber"
                  value={form.insurancePolicyNumber}
                  onChange={handleInputChange}
                  placeholder={"e.g., 4233333"}
                  type="number"
                />
                <CustomInputs
                  icon={FaCalendar}
                  label={"Allergies"}
                  name="allergies"
                  value={form.allergies}
                  onChange={handleInputChange}
                  placeholder={"e.g., pollen, penicillin"}
                  type="text"
                />
                <CustomInputs
                  icon={FaAddressBook}
                  label={"Current Medications"}
                  name="currentMedications"
                  value={form.currentMedications}
                  onChange={handleInputChange}
                  placeholder={"e.g., Ibuprofen 200mg"}
                  type="text"
                />
                <CustomInputs
                  icon={FaUser}
                  label={"Family Medical History"}
                  name="familyMedicalHistory"
                  value={form.familyMedicalHistory}
                  onChange={handleInputChange}
                  placeholder={"e.g., heart disease"}
                  type="text"
                />
                <CustomInputs
                  icon={FaPhone}
                  label={"Past Medical History"}
                  name="pastMedicalHistory"
                  value={form.pastMedicalHistory}
                  onChange={handleInputChange}
                  placeholder={"e.g., asthma"}
                  type="text"
                />
              </Grid>
            </Box>

            <Box>
              <Heading
                as={"h2"}
                size={{ base: "md", md: "xl" }}
                mt={{ base: "5%", md: "2%" }}
              >
                Identification and Verification
              </Heading>
              <Select
                placeholder={"Enter your identification document"}
                name="identificationType"
                value={form.identificationType}
                label="document"
                onChange={handleInputChange}
                mt={5}
              >
                <option value="idCard">ID Card</option>
                <option value="passport">Passport</option>
                <option value="driverLicense">Driver's License</option>
              </Select>
              <CustomInputs
                icon={FaIdCard}
                label={"Identification Number"}
                name="identificationNumber"
                value={form.identificationNumber}
                onChange={handleInputChange}
                placeholder={"e.g., 4233333"}
                type="number"
              />
              <CustomInputs
                icon={FaIdCard}
                label={"Scanned Copy of Identification Document"}
                name="idDocument"
                onChange={handleFileChange}
                type="file"
              />
            </Box>

            <Box mt={{ base: "8%", md: "2%" }}>
              <Heading as={"h2"} size={{ base: "md", md: "xl" }}>
                Consent and Privacy
              </Heading>
              <FormControl>
                <Checkbox
                  name="treatment"
                  isChecked={consents.treatment}
                  onChange={handleCheckboxChange}
                >
                  I consent to receive treatment for my health condition.
                </Checkbox>
                <Checkbox
                  name="disclosure"
                  isChecked={consents.disclosure}
                  onChange={handleCheckboxChange}
                >
                  I consent to the use and disclosure of my health information
                  for treatment purposes.
                </Checkbox>
                <Checkbox
                  name="privacyPolicy"
                  isChecked={consents.privacyPolicy}
                  onChange={handleCheckboxChange}
                >
                  I acknowledge that I have reviewed and agree to the privacy
                  policy.
                </Checkbox>
              </FormControl>
              <Button mt={{ base: "20%", md: "1%" }}
            bg={"rgb(36,174,124)"}
            width={{ base: "100%", md: "90%" }}
            // onClick={submit}
            color={"white"}
            // isLoading={loading} 
            _hover={{ bg: "rgb(30,140,100)" }}>Submit & continue</Button>
            </Box>
          </Box>
        </>
      }
      rightChildren={
        <Box height="100vh" width="100%">
          <Image
            src={doc}
            alt="doc"
            height="100%"
            width="100%"
            objectFit="cover"
          />
        </Box>
      }
    />
  );
};

export default Register;
