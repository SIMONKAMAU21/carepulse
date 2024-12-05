import React from "react";
import "./App.css";
import { Box } from "@chakra-ui/react";
import Onboarnding from "./Pages/Onbornding";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToasterContainer } from "./Components/toaster";
import Register from "./Pages/register";
import Appointment from "./Pages/newAppointment";
import Success from "./Pages/appointmentSuccess";
import Admin from "./Admin/admin";
import Adddoctor from "./Admin/adddoctor";
import Patients from "./Admin/Patients";
import PatientDashboard from "./Patient/patient.dashbord";
import Callcenter from "./Pages/chatwoot/Callcenter";
import Auth from "./Pages/Auth";
import Settings from "./Patient/patientSetting";
import Profile from "./Patient/components/profile";

function App() {
  return (
    <Box color={"white"} w={"100vw"} h={"100vh"}>
      <BrowserRouter>
      {/* <PatientDashboard/> */}
        <ToasterContainer />
        <Routes>
          <Route path="/" element={<Onboarnding />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Auth/>} />
          <Route path="/Appointment" element={<Appointment />} />
          <Route
            path="/success/:userId/appointment/:appointmentId"
            element={<Success />}/>
          <Route path="/admin" element={<Admin />} />
          <Route path="/doctor" element={<Adddoctor />} />
          <Route path="/Patients" element={<Patients />} />
          <Route path="/Patient/:userId" element={<PatientDashboard />} />
          <Route path="/simoCare/callcenter" element={<Callcenter />} />
          <Route path="/callcenter" element={<Callcenter />} />
          <Route path="/patient/setting" element={<Settings/>} />
          <Route path="/patient/profile" element={<Profile/>} />



        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
