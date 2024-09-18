import React from "react";
import "./App.css";
import { Box } from "@chakra-ui/react";
import Onboarnding from "./Pages/Onbornding";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToasterContainer } from "./Components/toaster";
import Register from "./Pages/register";
import Appointment from "./Pages/newAppointment";

function App() {
  return (
    <Box color={"white"} w={"100vw"} h={"100vh"}>
      <BrowserRouter>
        <ToasterContainer/>
          <Routes>
            <Route path="/" element={<Onboarnding />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/Appointment" element={<Appointment/>} />


          </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
