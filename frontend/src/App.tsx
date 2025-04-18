// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UpdateInformation from "./pages/UpdateInformation";
import { CssBaseline } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MyResume from "./pages/MyResume"; // Adjust the path if necessary


const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Routes>
     
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/resumes" element={<MyResume />} />
        <Route path="/update" element={<UpdateInformation />} />
        <Route path="my-resumes" element={<MyResume />} />
       
      
      </Routes>
    </>
  );
};

export default App;
