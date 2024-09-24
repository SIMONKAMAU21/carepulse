import { Query, ID } from "node-appwrite";
import {
  databases,
  users,
  VITE_DATABASE_ID,
  VITE_PATIENT_COLLECTION_ID,
} from "../appwriteConfig.js";

export const createUser = async (user) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    // console.log("New User Created:", newUser);
    return newUser;
  } catch (error) {
    if (error && error?.code === 409) {
      try {
        const userList = await users.list([Query.equal("email", user.email)]);
        if (userList.total > 0) {
          // console.log("User already exists:", userList.documents[0]);
          return userList.documents[0];
        }
      } catch (listError) {
        return "Error fetching user:", listError;
      }
    } else {
      return "Error creating user:", error;
    }
  }
};
export const getUser = async (userId) => {
  try {
    const user = await users.get(userId);
    // console.log("user", user);
    return user;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

export const getPatient = async (userId) => {
  try {
    const patient = await databases.listDocuments(
      VITE_DATABASE_ID,
      VITE_PATIENT_COLLECTION_ID,
      [Query.equal("userId", userId)]
    );
    return patient.documents[0];
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};
export const registerUser = async (userData, documentUrl) => {
  try {
    const additionalDetails = {
      userId: userData.userId,
      phone: userData.phone,
      email: userData.email,
      name: userData.name,
      gender: userData.gender,
      address: userData.address,
      birthDate: userData.birthDate,
      occupation: userData.occupation,
      privacyConsent: userData.privacyConsent,
      emergencyContact: userData.emergencyContact,
      insuranceProvider: userData.insuranceProvider,
      insurancePolicyNumber: userData.insurancePolicyNumber,
      allergies: userData.allergies,
      currentMedication: userData.currentMedication,
      familyMedicalHistory: userData.familyMedicalHistory,
      pastMedicalHistory: userData.pastMedicalHistory,
      identificationType: userData.identificationType,
      identificationNumber: userData.identificationNumber,
      identificationUrl: userData.identificationUrl,
    };

    // console.log("Additional Details:", additionalDetails);

    const response = await databases.createDocument(
      VITE_DATABASE_ID,
      VITE_PATIENT_COLLECTION_ID,
      ID.unique(),
      additionalDetails
    );
    // console.log("Additional user details stored:", response);

    return {
      // user: newUser,
      documentId: response.$id,
    };
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
