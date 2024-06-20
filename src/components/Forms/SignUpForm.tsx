import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import "../../styles/components/Forms/SignUpForm.css";
export default function SignUpForm({
  handleEmailandPasswordSubmit,
  handleGoogleSubmit,
}: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <form
        className="signup-form"
        onSubmit={() => {
          handleEmailandPasswordSubmit({ email, name, password });
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <div className="signup-or">or</div>
      <button
        className="google-signup-button"
        onClick={() => {
          handleGoogleSubmit();
        }}
      >
        <FcGoogle size="20px" style={{ marginRight: "10px" }} />
        Sign Up with Google
      </button>
    </>
  );
}
