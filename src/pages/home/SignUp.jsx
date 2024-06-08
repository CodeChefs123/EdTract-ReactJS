import React, { useState } from "react";
import "../../styles/SignUp.css";
import { FcGoogle } from "react-icons/fc";
import FirebaseAuthentication from "../../firebase/Auth.js";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";
import { Navigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleEmailandPasswordSubmit = () => {
    const authInstance = new FirebaseAuthentication();
    // eslint-disable-next-line
    const [_, uid] = authInstance.register(email, password, name);
    console.log(uid);
    dispatch(login({ uid }));
    return <Navigate to="/user" />;
  };
  const handleGoogleSubmit = async () => {
    const authInstance = new FirebaseAuthentication();
    const result = await authInstance.signInWithGoogle();
    if (result[0]) {
      const uid = result[1];
      console.log(uid);
      dispatch(login({ uid }));
      return <Navigate to="/user" />;
    } else {
      console.error("Error:", result[1]);
      // Handle error condition here
    }
  };
  return (
    <div className="signup-page-container">
      <div className="signup-container">
        <div className="signup-heading">
          <h1>Sign Up</h1>
        </div>
        <form
          className="signup-form"
          onSubmit={() => {
            handleEmailandPasswordSubmit();
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
      </div>
    </div>
  );
}
