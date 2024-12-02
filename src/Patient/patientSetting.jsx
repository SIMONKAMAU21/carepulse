import React, { useState, useEffect } from "react";
import {
    Box,
    VStack,
    Input,
    Button,
    Heading,
    Text,
    useToast,
    useColorMode,
    SimpleGrid,
    Divider,
    Avatar,
    Image,
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    IconButton,
} from "@chakra-ui/react";
import PatientHeader from "./components/PatientHeader";
import AuthWrapper from "../Components/OnboarndingWrapper";
import { getPatient, updatePatientDetails } from "../lib/Actions/patient.actions";
import { ErrorToast, LoadingToast, SuccessToast } from "../Components/toaster";
import { useNavigate } from "react-router-dom";
import CustomInputs from "../Components/CustomInputs";
import { FaChevronDown, FaEdit } from "react-icons/fa";
import { EditIcon } from "@chakra-ui/icons";

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [patientDetails, setPatientDetails] = useState({

    });
    const [error, setError] = useState("")
    const [passwordStrenth, setPasswordStrenth] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditable, setIsEditable] = useState(false); // State to toggle edit mode
    const [confirmPasscode, setConfirmPasscode] = useState("")
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        passcode: "",
        profilePicture: "",
       
    });
    const { colorMode } = useColorMode();
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        ErrorToast("Oops, your data is not found");
        return null;
    }

    const userId = user.id;

    useEffect(() => {
        const fetchDetails = async () => {
            LoadingToast(true);
            setLoading(true)
            try {
                const response = await getPatient(userId);
                if (response) {
                    setPatientDetails(response);
                    setForm({
                        name: response.name || "",
                        email: response.email || "",
                        phone: response.phone || "",
                        passcode: response.passcode || "",
                        profilePicture: response.profilePicture || "",
                    });
                }
            } catch (error) {
                console.error("Error fetching details:", error);
                ErrorToast("Failed to fetch user details");
            } finally {
                LoadingToast(false)
                setLoading(false);
            }
        };
        fetchDetails();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        setPatientDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (name === 'passcode') {
            if (value.length < 8) {
                setPasswordStrenth("weak passcode")
            } else {
                setPasswordStrenth("Strong password")
            }
        }
    };

    const handleProfilePictureUpload = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        try {
            LoadingToast(true)
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

                setForm((prev) => ({
                    ...prev,
                    profilePicture: secure_url, // Save the uploaded URL
                }));

                SuccessToast("Profile picture uploaded successfully!");
                LoadingToast(false)
            } else {
                ErrorToast("Failed to upload the profile picture");
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            ErrorToast("An error occurred while uploading the profile picture");
        }
    };

    const handleSubmit = async () => {
        LoadingToast(true);
        try {
            await updatePatientDetails(userId, form);
            SuccessToast("Details saved successfully!");
        } catch (error) {
            console.error("Error updating details:", error);
            ErrorToast("Failed to save changes");
        } finally {
            LoadingToast(false);
            setLoading(false)
            setIsModalOpen(false)
        }
    };
    const handleConfirmPasscode = async (e) => {
        setConfirmPasscode(e.target.value)
    }
    const handlePasscodeUpdate = async () => {
        if (form.passcode !== confirmPasscode) {
            setError("passcode do not match")
            setPasswordStrenth("")
            return
        }
        LoadingToast(true)
        setLoading(true)
        try {
            await updatePatientDetails(userId, { passcode: form.passcode, email: form.email })
            SuccessToast("passcode updated")
            navigate("/login")
        } catch (error) {
            ErrorToast("failed to update password")
        } finally {
            setLoading(false)
            LoadingToast(false)
            setPasswordStrenth("")
            setError("")
            setConfirmPasscode("")
        }
    }

    return (
        <>
            <PatientHeader width={{ base: "100%", md: "100%" }} userId={userId} position={"fixed"} />
            <AuthWrapper
                leftChildren={
                    <Box
                        h={"100%"}
                        p={4}
                        zIndex={"1000"}
                        fontSize={{ base: "10px", md: "18px" }}
                        boxShadow="dark-lg"
                        color={colorMode === "dark" ? "white" : "black"}
                        overflowY={"scroll"}
                        sx={{
                            "::-webkit-scrollbar": {
                                display: "none",
                            },
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <VStack
                                w="100%"
                                fontWeight="bold"
                                bg={colorMode === "dark" ? "gray.700" : "gray.200"}
                                borderRadius="10px"
                                boxShadow="2xl"
                                p={4}
                                spacing={{ base: 2, md: 4 }}
                                mt={{ base: "20%", md: "20%" }}
                                align="stretch"
                            >

                                <Box alignItems={"center"} alignContent={"center"} justifyContent={"center"} display={{ base: "flex", md: "block" }} flexDir={"column"}>
                                    <Heading size="md">Your Profile</Heading>
                                    <Avatar
                                        src={form.profilePicture || patientDetails.profilePicture}
                                        size="xl"
                                        mb={4}
                                    />
                                    <Button onClick={() => setIsModalOpen(true)}>see more <Icon as={FaChevronDown} /></Button>
                                </Box>
                                <Box>
                                    <CustomInputs
                                        label={"Name"}
                                        placeholder="Enter your name"
                                        type="text"
                                        isDisabled
                                        variant={"flushed"}
                                        name={"name"}
                                        fontSize={{ base: "13px", md: "18px" }}
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                </Box>
                                <Box>

                                    <CustomInputs
                                        label={"Email"}
                                        placeholder={"Enter your email"}
                                        type="email"
                                        isDisabled
                                        fontSize={{ base: "13px", md: "18px" }}
                                        name={"email"}
                                        variant={"flushed"}
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                </Box>
                                <Box>

                                    <CustomInputs
                                        label={"Phone"}
                                        placeholder="Enter your phone"
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        fontSize={{ base: "13px", md: "18px" }}
                                        variant={"flushed"}
                                        onChange={handleChange}
                                        isDisabled
                                    />
                                </Box>
                                <Box>


                                    <CustomInputs
                                        label={"Profile Picture"}
                                        fontSize={{ base: "13px", md: "18px" }}
                                        type="file"
                                        accept="image/*"
                                        variant={"flushed"}
                                        onChange={handleProfilePictureUpload}
                                    />
                                </Box>
                                <Button
                                    colorScheme="blue"
                                    onClick={handleSubmit}
                                    isLoading={loading}
                                >
                                    Save Changes
                                </Button>
                            </VStack>

                            {/* Passcode Update Section */}
                            <VStack
                                w="100%"
                                bg={colorMode === "dark" ? "gray.700" : "gray.200"}
                                borderRadius="10px"
                                boxShadow="2xl"
                                p={4}
                                spacing={4}
                                align="stretch"
                                mt={{ base: "0%", md: "20%" }}

                            >
                                <Heading size="md">Update Passcode</Heading>
                                <Box>

                                    <CustomInputs
                                        label={"Current Passcode"}
                                        placeholder="Enter your current passcode"
                                        type="password"
                                        fontSize={{ base: "13px", md: "18px" }}
                                        variant={"flushed"}

                                        name="passcode"
                                        value={form.passcode}
                                        onChange={handleChange}
                                        isDisabled={loading}
                                    />

                                    <CustomInputs
                                        label={"confirm passcode"}
                                        placeholder="Enter your current passcode"
                                        type="password"
                                        variant={"flushed"}
                                        fontSize={{ base: "13px", md: "18px" }}
                                        name="confirmPasscode"
                                        value={confirmPasscode}
                                        onChange={handleConfirmPasscode}
                                        isDisabled={loading}
                                    />
                                </Box>
                                {error && (
                                    <Text fontSize={{ base: "10px", md: "18px" }} color={"red.400"}>
                                        {error}
                                    </Text>
                                )}
                                {passwordStrenth !== "weak passcode" && (
                                    <Text fontWeight={"bold"} fontSize={{ base: "10px", md: "14px" }} color={"green.400"}>
                                        {passwordStrenth}
                                    </Text>
                                )}
                                {passwordStrenth === "weak passcode" && (
                                    <Text fontWeight={"bold"} fontSize={{ base: "10px", md: "14px" }} color={"red"}>
                                        {passwordStrenth}
                                    </Text>
                                )}
                                <Button
                                    colorScheme="green"
                                    onClick={handlePasscodeUpdate}
                                    isLoading={loading}
                                >
                                    Update Passcode
                                </Button>
                            </VStack>
                        </SimpleGrid>
                    </Box>
                }
                rightChildren={
                    <Box height="100vh" width="100%">
                        <Image
                            src={patientDetails.profilePicture}
                            alt="profilePicture"
                            height="100%"
                            blur={"10%"}
                            width="100%"
                            objectFit="cover"
                        />
                    </Box>
                }
            />
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalOverlay />
                <ModalContent w={{ base: "95%", md: "100%" }} color={colorMode === "light" ? "black" : "white"}>
                    <ModalHeader >Edit Details
                        <Icon
                            as={FaEdit}
                            onClick={() => setIsEditable(!isEditable)}
                            aria-label="Toggle Edit Mode"
                            variant="ghost"
                            size="sm"
                        />
                    </ModalHeader>

                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            {/* Address */}
                            {isEditable ? (
                                <CustomInputs
                                    label="Address"
                                    placeholder="Enter your address"
                                    type="text"
                                    variant="flushed"
                                    fontSize={{ base: "13px", md: "18px" }}
                                    name="address"
                                    value={patientDetails.address || ""}
                                    onChange={handleChange}
                                />
                            ) : (
                                <CustomInputs
                                    label="Address"
                                    placeholder="Enter your address"
                                    type="text"
                                    variant="flushed"
                                    fontSize={{ base: "13px", md: "18px" }}
                                    name="address"
                                    isDisabled
                                    value={patientDetails.address || ""}
                                    // onChange={(e) => handleChange(e, "address")}
                                />

                            )}


                            {/* Gender */}
                            {isEditable ? (<CustomInputs
                                label="Gender"
                                placeholder="Enter your gender"
                                type="text"
                                variant="flushed"
                                fontSize={{ base: "13px", md: "18px" }}
                                name="gender"
                                value={patientDetails.gender || ""}
                                onChange={(e) => handleChange(e, "gender")}
                            />) : (
                                <CustomInputs
                                    label="Gender"
                                    placeholder="Enter your gender"
                                    type="text"
                                    isDisabled
                                    variant="flushed"
                                    fontSize={{ base: "13px", md: "18px" }}
                                    name="gender"
                                    value={patientDetails.gender || ""}
                                    onChange={(e) => handleChange(e, "gender")}
                                />
                            )}
                            {isEditable ? (<CustomInputs
                                label="Date of Birth"
                                placeholder="Enter your birth date"
                                type="date"
                                variant="flushed"
                                fontSize={{ base: "13px", md: "18px" }}
                                name="birthDate"
                                value={patientDetails.birthDate || ""}
                                onChange={(e) => handleChange(e, "birthDate")}

                            />) : (<CustomInputs
                                label="Date of Birth"
                                placeholder="Enter your birth date"
                                type="date"
                                variant="flushed"
                                isDisabled
                                fontSize={{ base: "13px", md: "18px" }}
                                name="birthDate"
                                value={patientDetails.birthDate || ""}
                                onChange={(e) => handleChange(e, "birthDate")}
                            />)}
                            {isEditable ? (
                                <CustomInputs
                                    label="Allergies"
                                    placeholder="Enter any allergies"
                                    type="text"
                                    variant="flushed"
                                    fontSize={{ base: "13px", md: "18px" }}
                                    name="allergies"
                                    value={patientDetails.allergies || ""}
                                    onChange={(e) => handleChange(e, "allergies")}
                                />
                            ) : (
                                <CustomInputs
                                    label="Allergies"
                                    placeholder="Enter any allergies"
                                    type="text"
                                    isDisabled
                                    variant="flushed"
                                    fontSize={{ base: "13px", md: "18px" }}
                                    name="allergies"
                                    value={patientDetails.allergies || ""}
                                    onChange={(e) => handleChange(e, "allergies")}
                                />
                            )}

                            {/* Birth Date */}


                            {/* Allergies */}


                            {/* Emergency Contact */}
                            {isEditable ? (<CustomInputs
                                label="Emergency Contact Name"
                                placeholder="Enter emergency contact name"
                                type="text"
                                variant="flushed"
                                fontSize={{ base: "13px", md: "18px" }}
                                name="emergencyContactName"
                                value={patientDetails.emergencyContactName || ""}
                                onChange={(e) => handleChange(e, "emergencyContactName")}
                            />) : (<CustomInputs
                                label="Emergency Contact Name"
                                placeholder="Enter emergency contact name"
                                type="text"
                                isDisabled
                                variant="flushed"
                                fontSize={{ base: "13px", md: "18px" }}
                                name="emergencyContactName"
                                value={patientDetails.emergencyContactName || ""}
                                onChange={(e) => handleChange(e, "emergencyContactName")}
                            />)}
                            {isEditable ? (<CustomInputs
                                label="Emergency Contact Number"
                                placeholder="Enter emergency contact number"
                                type="tel"
                                variant="flushed"
                                fontSize={{ base: "13px", md: "18px" }}
                                name="emergencyContact"
                                value={patientDetails.emergencyContact || ""}
                                onChange={(e) => handleChange(e, "emergencyContact")}
                            />) : (<CustomInputs
                                label="Emergency Contact Number"
                                placeholder="Enter emergency contact number"
                                type="tel"
                                variant="flushed"
                                isDisabled
                                fontSize={{ base: "13px", md: "18px" }}
                                name="emergencyContact"
                                value={patientDetails.emergencyContact || ""}
                                onChange={(e) => handleChange(e, "emergencyContact")}
                            />)}


                            {/* Insurance */}
                            {isEditable ? (<CustomInputs
                                label="Insurance Provider"
                                placeholder="Enter insurance provider"
                                type="text"
                                variant="flushed"
                                fontSize={{ base: "13px", md: "18px" }}
                                name="insuranceProvider"
                                value={patientDetails.insuranceProvider || ""}
                                onChange={(e) => handleChange(e, "insuranceProvider")}
                            />) : (
                                <CustomInputs
                                    label="Insurance Provider"
                                    placeholder="Enter insurance provider"
                                    type="text"
                                    variant="flushed"
                                    isDisabled
                                    fontSize={{ base: "13px", md: "18px" }}
                                    name="insuranceProvider"
                                    value={patientDetails.insuranceProvider || ""}
                                    onChange={(e) => handleChange(e, "insuranceProvider")}
                                />
                            )}
                            {isEditable ? (<CustomInputs
                                label="Insurance Policy Number"
                                placeholder="Enter policy number"
                                type="text"
                                variant="flushed"
                                fontSize={{ base: "13px", md: "18px" }}
                                name="insurancePolicyNumber"
                                value={patientDetails.insurancePolicyNumber || ""}
                                onChange={(e) => handleChange(e, "insurancePolicyNumber")}
                            />) : (
                                <CustomInputs
                                    label="Insurance Policy Number"
                                    placeholder="Enter policy number"
                                    type="text"
                                    variant="flushed"
                                    isDisabled
                                    fontSize={{ base: "13px", md: "18px" }}
                                    name="insurancePolicyNumber"
                                    value={patientDetails.insurancePolicyNumber || ""}
                                    onChange={(e) => handleChange(e, "insurancePolicyNumber")}
                                />
                            )}

                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        {isEditable ? (<Button
                            colorScheme="blue"
                            onClick={handleSubmit} // Function to save updated details
                            isDisabled={loading}
                        >
                            Save
                        </Button>) : (
                            <Button
                                isDisabled
                                colorScheme="blue"
                                onClick={handleSubmit} // Function to save updated details

                            >
                                Save
                            </Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    );
};



export default Profile;
