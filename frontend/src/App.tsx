// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UpdateInformation from "./components/UpdateInformation";
import { CssBaseline } from "@mui/material";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Routes>
        {/* Redirect root to update form */}
        <Route path="/" element={<Navigate to="/update" />} />
        {/* Update Resume Form Page */}
        <Route path="/update" element={<UpdateInformation />} />
        {/* You can add more routes like /preview or /dashboard later */}
      </Routes>
    </>
  );
};

export default App;
