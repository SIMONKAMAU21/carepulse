import { ID } from "node-appwrite";
import { databases, VITE_APPOINTMENT_COLLECTION_ID, VITE_DATABASE_ID } from "../appwriteConfig";

export const addAppointment = async (userData) => {
    try {
      const additionalDetails = {
        userId: userData.userId,
        patientId: userData.patientId,
        doctor: userData.doctor,
        appointmentReason: userData.appointmentReason,
        preferences: userData.preferences,
        appointmentDate: userData.appointmentDate,
        
      };
      console.log("Additional Details:", additionalDetails);

      const response = await databases.createDocument(
        VITE_DATABASE_ID,
        VITE_APPOINTMENT_COLLECTION_ID,
        ID.unique(),
        additionalDetails
      );
      console.log("Additional user details stored:", response);
  
      return {
        documentId: response.$id,
      };
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  };

  export const getAppointment = async (appointmentId) => {
    try {
      const response = await databases.getDocument(
        VITE_DATABASE_ID,
        VITE_APPOINTMENT_COLLECTION_ID,
        appointmentId
      );
  
      return (response)
       
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  };

