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
    console.log("New User Created:", newUser);
    return newUser;
  } catch (error) {
    if (error && error?.code === 409) {
      try {
        const userList = await users.list([Query.equal("email", user.email)]);
        if (userList.total > 0) {
          console.log("User already exists:", userList.documents[0]);
          return userList.documents[0];
        }
      } catch (listError) {
        console.log("Error fetching user:", listError);
      }
    } else {
      console.log("Error creating user:", error);
    }
  }
};

export const registerUser = async (userData, documentUrl) => {
  try {
    const newUser = await createUser(userData);
    console.log("User Created:", newUser);

    const additionalDetails = {
      userId: newUser.$id,
      phone: newUser.phone,
      email: newUser.email,
      name: newUser.name,
      gender: userData.gender,
      address: userData.address,
      birthDate: userData.birthDate,
      occupation: userData.occupation,
      privacyConsent: userData.privacyConsent,
      emergencyContact: userData.emergencyContact,
      insuranceProvider: userData.insuranceProvider,
      insurancePolicyNumber: userData.insurancePolicyNumber,
      allergies: userData.allergies,
      currentMedications: userData.currentMedications,
      familyMedicalHistory: userData.familyMedicalHistory,
      pastMedicalHistory: userData.pastMedicalHistory,
      identificationType: userData.identificationType,
      identificationNumber: userData.identificationNumber,
      documentUrl,
    };

    const response = await databases.createDocument(
      VITE_DATABASE_ID,
      VITE_PATIENT_COLLECTION_ID,
      ID.unique(),
      additionalDetails
    );
    console.log("Additional user details stored:", response);

    return {
      user: newUser,
      documentId: response.$id,
    };
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
