import React, { useState } from "react";
import "../../styles/components/Forms/ContactForm.css";
type contactFormSubmit = {
  name: string;
  email: string;
  message: string;
};
type contactFormProps = {
  onSubmit: ({ name, email, message }: contactFormSubmit) => any;
};
const ContactForm = ({ onSubmit }: contactFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit({ name, email, message });
    setName("");
    setEmail("");
    setMessage("");
  };
  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <textarea
        placeholder="Your Message"
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit">Send Message</button>
    </form>
  );
};

export default ContactForm;
