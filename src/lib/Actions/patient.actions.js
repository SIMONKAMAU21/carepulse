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
    return newUser;
  } catch (error) {
    if (error?.code === 409) {
      try {
        const userList = await users.list([
          Query.equal("email", user.email),
          Query.equal("phone", user.phone)


        ]);
        if (userList.total > 0) {
          return { error: "A user with the same email or phone number already exists." };
        }
      } catch (listError) {
        return { error: "Error fetching user data." };
      }
    } else {
      return { error: "Error creating user." };
    }
  }
};

export const getUser = async (userId) => {
  try {
    const user = await users.get(userId);
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


    const response = await databases.createDocument(
      VITE_DATABASE_ID,
      VITE_PATIENT_COLLECTION_ID,
      ID.unique(),
      additionalDetails
    );

    return {
      documentId: response.$id,
    };
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
