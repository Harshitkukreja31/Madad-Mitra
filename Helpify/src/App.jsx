import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Header/Navbar.jsx";
import Home from "./Pages/Home/Home";
import Services from "./Pages/Services/Services.jsx";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Profile from "./Pages/Profile/Profile.jsx";
import WorkerRegistration from "./Components/HiringForm/WorkerRegistration.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import AboutUsPage from "./Pages/AboutUs/AboutUsPage.jsx";
import ContactUsPage from "./Pages/ContactUs/ContactUsPage.jsx";
const App = () => {
  return (
   <>
  
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/services/:serviceType" element={<Services />} />
        <Route path="/login"/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/gethired" element={<WorkerRegistration/>}/>
        <Route path="/aboutus" element={<AboutUsPage/>}/>
        <Route path="/contactus" element={<ContactUsPage/>}/>
      </Routes>
      <Footer/>
    </Router>
    
    </>
  );
};

export default App;