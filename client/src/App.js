import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import RootRegister from "./Pages/RootRegister";
import SchoolRegister from "./Pages/SchoolRegister";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SchoolRegister" element={<SchoolRegister />} />
        <Route path="/RootRegister" element={<RootRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
