import React from "react";
import "../../styles/pages/SignUp.css";
import FirebaseAuthentication from "../../firebase/Auth";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";
import { Navigate } from "react-router-dom";
import SignUpForm from "../../components/Forms/SignUpForm";

export default function SignUp() {
  const dispatch = useDispatch();
  const handleEmailandPasswordSubmit = async ({
    email,
    name,
    password,
  }: any) => {
    const authInstance = new FirebaseAuthentication();
    // eslint-disable-next-line
    const [_, uid] = await authInstance.register(email, password, name);
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
      // Handle error condition here
    }
  };
  return (
    <div className="signup-page-container">
      <div className="signup-container">
        <div className="signup-heading">
          <h1>Sign Up</h1>
        </div>
        <SignUpForm
          handleEmailandPasswordSubmit={handleEmailandPasswordSubmit}
          handleGoogleSubmit={handleGoogleSubmit}
        />
      </div>
    </div>
  );
}
