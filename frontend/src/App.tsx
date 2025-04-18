// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UpdateInformation from "./pages/UpdateInformation";
import { CssBaseline } from "@mui/material";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Routes>
     
        <Route path="/" element={<Navigate to="/update" />} />
       
        <Route path="/update" element={<UpdateInformation />} />
      
      </Routes>
    </>
  );
};

export default App;
