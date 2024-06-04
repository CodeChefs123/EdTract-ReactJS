import { useState } from "react";
import "../../styles/ContactUs.css";

function ContactUs() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, name, message);
  };
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Have any questions? We'd love to hear from you.</p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <textarea
          placeholder="Your Message"
          rows="5"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
      <div className="contact-info">
        <p>Or contact us directly:</p>
        <p>Email: contact@myapp.com</p>
        <p>Phone: +1 123-456-7890</p>
      </div>
    </div>
  );
}

export default ContactUs;
