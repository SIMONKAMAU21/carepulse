import { ID } from "node-appwrite";
import {
  databases,
  VITE_APPOINTMENT_COLLECTION_ID,
  VITE_DATABASE_ID,
  VITE_DOCTOR_COLLECTION_ID,
} from "../appwriteConfig";

export const registerDoctor = async (doctorData) => {
  try {
    const doctorDetails = {
      drname: doctorData.drname,
      phone:doctorData.phone,
      email:doctorData.email,
      doctorPhotoUrl: doctorData.doctorPhotoUrl,
    };
    const doctor = await databases.createDocument(
      VITE_DATABASE_ID,
      VITE_DOCTOR_COLLECTION_ID,
      ID.unique(),
      doctorDetails
    );
    return doctor;
  } catch (error) {
    console.log("doctor adding error", error);
  }
};

export const getDoctors = async () => {
  try {
    const appointments = await databases.listDocuments(
      VITE_DATABASE_ID,
      VITE_DOCTOR_COLLECTION_ID
    );
    return appointments;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent appointments:",
      error
    );
  }
};

export const deleteDoctor = async (doctorId)=>{
  try {
    const doctor = await databases.deleteDocument(
      VITE_DATABASE_ID,
      VITE_DOCTOR_COLLECTION_ID,
      doctorId,
    )
    return doctor
  } catch (error) {
    throw error
  }
}