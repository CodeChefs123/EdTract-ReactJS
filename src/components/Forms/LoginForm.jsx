import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import "../../styles/components/Forms/LoginForm.css";
export default function LoginForm({
  handleEmailAndPasswordSubmit,
  handleGoogleSubmit,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleEmailAndPasswordSubmit({ email, password });
        }}
      >
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
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="login-or">or</div>
      <button
        className="google-login-button"
        onClick={() => {
          handleGoogleSubmit();
        }}
      >
        <FcGoogle size="20px" style={{ marginRight: "10px" }} />
        Login with Google
      </button>
    </>
  );
}
