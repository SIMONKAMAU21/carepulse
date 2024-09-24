import { ID, Query } from "node-appwrite";
import {
  databases,
  messaging,
  VITE_APPOINTMENT_COLLECTION_ID,
  VITE_DATABASE_ID,
} from "../appwriteConfig";

export const addAppointment = async (userData) => {
  try {
    const additionalDetails = {
      userId: userData.userId,
      patientId: userData.patientId,
      doctor: userData.doctor,
      appointmentReason: userData.appointmentReason,
      preferences: userData.preferences,
      appointmentDate: userData.appointmentDate,
      status: userData.status,
    };

    const response = await databases.createDocument(
      VITE_DATABASE_ID,
      VITE_APPOINTMENT_COLLECTION_ID,
      ID.unique(),
      additionalDetails
    );

    return response;
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

    return response;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const updateAppointment = async (userId, appointmentId, data) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      VITE_DATABASE_ID,
      VITE_APPOINTMENT_COLLECTION_ID,
      appointmentId,
      data
    );

    const smsNotification = `Hi, it's carePulse. 
      ${data.status === "Scheduled" ? `Your appointment has been scheduled for ${data.appointmentDate}` : `We regret to inform you that your appointment has been cancelled for the following reason: ${data.cancelReason}`}
    `;
    
    await sendSms(userId, smsNotification);
    return updatedAppointment;
  } catch (error) {
    // console.log('error', error);
    throw new Error("Failed to update appointment");
  }
};

//  GET RECENT APPOINTMENTS
export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      VITE_DATABASE_ID,
      VITE_APPOINTMENT_COLLECTION_ID,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = appointments.documents.reduce((acc, appointment) => {
      const status = appointment.status; // Normalize to lowercase
      console.log("Status found:", status); // Log each status found
      switch (status) {
        case "Scheduled":
          acc.scheduledCount++;
          break;
        case "pending":
          acc.pendingCount++;
          break;
        case "Cancelled":
          acc.cancelledCount++;
          break;
      }
      return acc;
    }, initialCounts);

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return data;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent appointments:",
      error
    );
  }
};
export const sendSms = async (userId, content) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );
    return message;
  } catch (error) {
    // console.log("smserror", error);
  }
};
