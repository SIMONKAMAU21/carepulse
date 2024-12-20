import { Query, ID } from "node-appwrite";
import {
  databases,
  users,
  VITE_DATABASE_ID,
  VITE_PATIENT_COLLECTION_ID,
  VITE_SERVICEID,
  VITE_TEMPLATEID,
  VITE_USERID,
} from "../appwriteConfig.js";
import CryptoJS from "crypto-js";
import emailjs from 'emailjs-com';

const sendPasscodeEmail = async (email, passcode) => {

  const serviceID = VITE_SERVICEID; // Your EmailJS service ID
  const templateID = VITE_TEMPLATEID; // Your EmailJS template ID
  const userID =VITE_USERID ; // Your EmailJS user ID
console.log('userID', userID)
  const templateParams = {
    email: email,
    passcode: passcode,
  };

  try {
    const response = await emailjs.send(serviceID, templateID, templateParams, userID);
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
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
          Query.equal("phone", user.phone),
        ]);
        if (userList.total > 0) {
          return {
            error: "A user with the same email or phone number already exists.",
          };
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
    throw error
  }
};
export const registerUser = async (userData) => {
  const generatePasscode = () => {
    return CryptoJS.lib.WordArray.random(6).toString(CryptoJS.enc.Hex);
  };
  const passcode = generatePasscode();
  try {
    const existingUser = await databases.listDocuments(
      VITE_DATABASE_ID,
      VITE_PATIENT_COLLECTION_ID,
      [Query.equal("email", userData.email)]
    );
    if (existingUser.documents.length > 0) {
      throw new Error("Email is already registered.");
    }
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
      primaryPhysician: userData.primaryPhysician,
      emergencyContactName: userData.emergencyContactName,
      insuranceProvider: userData.insuranceProvider,
      insurancePolicyNumber: userData.insurancePolicyNumber,
      allergies: userData.allergies,
      currentMedication: userData.currentMedication,
      familyMedicalHistory: userData.familyMedicalHistory,
      pastMedicalHistory: userData.pastMedicalHistory,
      identificationType: userData.identificationType,
      identificationNumber: userData.identificationNumber,
      identificationUrl: userData.identificationUrl,
      passcode,
    };
    const response = await databases.createDocument(
      VITE_DATABASE_ID,
      VITE_PATIENT_COLLECTION_ID,
      ID.unique(),
      additionalDetails
    );
    await sendPasscodeEmail(userData.email, passcode);

    return {
      documentId: response.$id,
      passcode,
    };
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
export const getPatients = async () => {
  try {
    const patients = await databases.listDocuments(
      VITE_DATABASE_ID,
      VITE_PATIENT_COLLECTION_ID
    );
    return patients;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent patients:",
      error
    );
  }
};

export const deletePatient = async (patientId) => {
  try {
    const patient = await databases.deleteDocument(
      VITE_DATABASE_ID,
      VITE_PATIENT_COLLECTION_ID,
      patientId
    );
    return patient;
  } catch (error) {
    throw error;
  }
};

export const authenticateUser = async (email, inputPasscode) => {
  try {
    const userDocument = await databases.listDocuments(
      VITE_DATABASE_ID,
      VITE_PATIENT_COLLECTION_ID,
      [Query.equal("email", email)]
    );

    if (userDocument.documents.length === 0) {
      throw new Error("User not found.");
    }

    const storedPasscode = userDocument.documents[0].passcode;

    if (storedPasscode !== inputPasscode) {
      throw new Error("Invalid passcode.");
    }

    // Return the user details so that it can be used in the component
    const user = userDocument.documents[0];  // Assuming user has a userId field
    return { success: true, user };  // Return userId for redirection

  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
};





export const updatePatientDetails = async (userId, details) => {
  try {
    // Retrieve the document ID associated with the user
    const documentId = (await getPatient(userId)).$id;
    console.log('documentId', documentId);

    // Update the patient's details in the database
    const updatedDocument = await databases.updateDocument(
      VITE_DATABASE_ID,
      VITE_PATIENT_COLLECTION_ID,
      documentId,
      details
    );
    // After successful update, send the passcode email
    if (details.email && details.passcode) {
      await sendPasscodeEmail(details.email, details.passcode);
      console.log('Passcode email sent successfully.');
    } else {
      console.warn('Email or passcode missing. Email not sent.');
    }

    return updatedDocument;
  } catch (error) {
    console.error('Error updating patient details:', error);
    throw error;
  }
};
