import React, { useEffect, useState } from "react";
import { getAppointmentWithDoctor } from "../lib/Actions/appointment.actions";

const AppointmentDetails = ({ appointmentId }) => {
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const details = await getAppointmentWithDoctor("673ef1df0002a4d82754");
        setAppointmentDetails(details);
      } catch (error) {
        console.error("Error fetching appointment details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [appointmentId]);

  if (loading) {
    return <div>Loading appointment details...</div>;
  }

  if (!appointmentDetails) {
    return <div>No appointment details found.</div>;
  }

  const { doctor, appointmentReason, appointmentDate, preferences, status } = appointmentDetails;

  return (
    <div>
      <h2>Appointment Details</h2>
      <h4>Reason: {appointmentReason}</h4>
      <p>Date: {new Date(appointmentDate).toLocaleString()}</p>
      <p>Status: {status}</p>
      <p>Preferences: {preferences}</p>
      <h3>Doctor Information</h3>
      <p>Name: {doctor.drname}</p>
      <p>Email: {doctor.email}</p>
      <p>Phone: {doctor.phone}</p>
    </div>
  );
};

export default AppointmentDetails;
