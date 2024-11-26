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
} from "@chakra-ui/react";
import PatientHeader from "./components/PatientHeader";
import AuthWrapper from "../Components/OnboarndingWrapper";
import { getPatient, updatePatientDetails } from "../lib/Actions/patient.actions";
import { ErrorToast, LoadingToast, SuccessToast } from "../Components/toaster";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [patientDetails, setPatientDetails] = useState({});
    const [error, setError] = useState("")
    const [confirmPasscode, setConfirmPasscode] = useState("")
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        passcode: "",
        profilePicture: "",
    });
    const { colorMode } = useColorMode();
    const navigate= useNavigate()
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
        }
    };
    const handleConfirmPasscode = async (e) => {
        setConfirmPasscode(e.target.value)
    }
    const handlePasscodeUpdate = async () => {
        if (form.passcode !== confirmPasscode) {
            setError("passcode do not match")
            return
        }
        LoadingToast(true)
        setLoading(true)
        try {
            await updatePatientDetails(userId, { passcode: form.passcode })
            SuccessToast("passcode updated")
            navigate("/login")
        } catch (error) {
            ErrorToast("failed to update password")
        } finally {
            setLoading(false)
            LoadingToast(false)
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
                        boxShadow="dark-lg"
                        color={colorMode === "dark" ? "white" : "black"}
                    >
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <VStack
                                w="100%"
                                fontWeight="bold"
                                border="1px solid"
                                borderRadius="10px"
                                boxShadow="2xl"
                                p={4}
                                spacing={4}
                                mt={{ base: "20%", md: "20%" }}
                                align="stretch"
                            >
                                <Heading size="md">Your Profile</Heading>
                                <Box>
                                    <Text>Name</Text>
                                    <Input
                                        placeholder="Enter your name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        isDisabled={loading}
                                    />
                                </Box>
                                <Box>
                                    <Text>Email</Text>
                                    <Input
                                        placeholder="Enter your email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        isDisabled={loading}
                                    />
                                </Box>
                                <Box>
                                    <Text>Phone</Text>
                                    <Input
                                        placeholder="Enter your phone"
                                        name="phone"
                                        type="tel"
                                        value={form.phone}
                                        onChange={handleChange}
                                        isDisabled={loading}
                                    />
                                </Box>
                                <Box>
                                    <Text>Profile Picture</Text>
                                    <Avatar
                                        src={form.profilePicture || patientDetails.profilePicture}
                                        size="xl"
                                        mb={4}
                                    />
                                    <Input
                                        type="file"
                                        accept="image/*"
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
                                border="1px solid"
                                borderRadius="10px"
                                boxShadow="2xl"
                                p={4}
                                spacing={4}
                                align="stretch"
                                mt={{ base: "0%", md: "20%" }}

                            >
                                <Heading size="md">Update Passcode</Heading>
                                <Box>
                                    <Text>Current Passcode</Text>
                                    <Input
                                        placeholder="Enter your current passcode"
                                        name="passcode"
                                        type="password"
                                        value={form.passcode}
                                        onChange={handleChange}
                                        isDisabled={loading}
                                    />
                                    <Text>confirm passcode</Text>
                                    <Input
                                        placeholder="Enter your current passcode"
                                        name="confirmPasscode"
                                        type="password"
                                        value={confirmPasscode}
                                        onChange={handleConfirmPasscode}
                                        isDisabled={loading}
                                    />
                                </Box>
                                {error && (
                                    <Text fontSize={"10px"} color={"red"}>
                                        {error}
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
                            width="100%"
                            objectFit="cover"
                        />
                    </Box>
                }
            />
        </>
    );
};

export default Profile;
