import React, { useState } from "react";
import "../../styles/Login.css";
import { FcGoogle } from "react-icons/fc";
import FirebaseAuthentication from "../../firebase/Auth.js";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleEmailAndPasswordSubmit = () => {
    const authInstance = new FirebaseAuthentication();
    const [_, uid] = authInstance.signIn(email, password);
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
    <div className="login-page-container">
      <div className="login-container">
        <div className="login-heading">
          <h1>Login</h1>
        </div>
        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleEmailAndPasswordSubmit();
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
      </div>
    </div>
  );
}
