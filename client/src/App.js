// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import DashboardLayout from "./Pages/Dashboard/DashboardLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Inbox from "./Pages/Dashboard/Inbox";
import Sent from "./Pages/Dashboard/Sent";
import Compose from "./Pages/Dashboard/Compose";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="sent" element={<Sent />} />
          <Route path="compose" element={<Compose />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
