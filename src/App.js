import "./App.css";
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";

import { Routes, Route } from "react-router-dom";
import StudentList from "./components/student/StudentList";
import StudentDetail from "./components/student/StudetnDetail ";
import CreateStudent from "./components/student/CreateStudent";
import EditStudent from "./components/student/EditStudent";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        
          <Route path="/" element={<StudentList />} />
          <Route
            path="/student/detail/:studentId"
            element={<StudentDetail />}
          />
          <Route path="/student/create/" element={<CreateStudent />} />
          <Route path="/student/edit/:studentId" element={<EditStudent />} />
        
      </Routes>
    </>
  );
}

export default App;
