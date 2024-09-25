import { ID } from "node-appwrite"
import { databases, VITE_DATABASE_ID, VITE_DOCTOR_COLLECTION_ID } from "../appwriteConfig"



export const registerDoctor = async(doctorData)=>{
    try {
        const doctorDetails={
            drname:doctorData.drname,
            doctorPhotoUrl:doctorData.doctorPhotoUrl
        }
        const doctor = await databases.createDocument(
            VITE_DATABASE_ID,
            VITE_DOCTOR_COLLECTION_ID,
            ID.unique(),
            doctorDetails
        )
        return doctor
    } catch (error) {
        console.log('doctor adding error', error)
    }
}