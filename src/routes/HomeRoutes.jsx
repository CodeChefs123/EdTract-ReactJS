import { Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import Home from "../pages/home/Home";
import AboutUs from "../pages/home/AboutUs";
import ContactUs from "../pages/home/ContactUs";
import SignUp from "../pages/home/SignUp";
import Login from "../pages/home/Login";

export function HomeRoutes() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="sign/up" element={<SignUp />} />
        <Route path="sign/in" element={<Login />} />
      </Routes>
    </>
  );
}
