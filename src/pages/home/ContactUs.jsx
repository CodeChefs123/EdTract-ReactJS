import React from "react";
import "../../styles/pages/ContactUs.css";
import FirestoreService from "../../firebase/Firestore";
import { Navigate } from "react-router-dom";
import ContactForm from "../../components/Forms/ContactForm";
function ContactUs() {
  const handleSubmit = ({ name, email, message }) => {
    const data = {
      name: name,
      email: email,
      message: message,
    };
    const firestoreInstance = new FirestoreService("contact", NaN, []);
    firestoreInstance.create(data);
    return <Navigate to="/" />;
  };
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Have any questions? We'd love to hear from you.</p>
      </div>
      <ContactForm onSubmit={handleSubmit} />
      <div className="contact-info">
        <p>Or contact us directly:</p>
        <p>Email: contact@myapp.com</p>
        <p>Phone: +1 123-456-7890</p>
      </div>
    </div>
  );
}

export default ContactUs;
