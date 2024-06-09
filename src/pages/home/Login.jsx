import React from "react";
import "../../styles/pages/Login.css";
import FirebaseAuthentication from "../../firebase/Auth.js";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";
import { Navigate } from "react-router-dom";
import LoginForm from "../../components/Forms/LoginForm.jsx";

export default function Login() {
  const dispatch = useDispatch();
  const handleEmailAndPasswordSubmit = ({ email, password }) => {
    const authInstance = new FirebaseAuthentication();
    const [_, uid] = authInstance.signIn(email, password);
    dispatch(login({ uid }));
    return <Navigate to="/user" />;
  };
  const handleGoogleSubmit = async () => {
    const authInstance = new FirebaseAuthentication();
    const result = await authInstance.signInWithGoogle();
    if (result[0]) {
      const uid = result[1];
      dispatch(login({ uid }));
      return <Navigate to="/user" />;
    } else {
      console.error("Error:", result[1]);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-container">
        <div className="login-heading">
          <h1>Login</h1>
        </div>
        <LoginForm
          handleEmailAndPasswordSubmit={handleEmailAndPasswordSubmit}
          handleGoogleSubmit={handleGoogleSubmit}
        />
      </div>
    </div>
  );
}
