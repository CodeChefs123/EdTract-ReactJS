import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";

/**
 * FirebaseAuthentication class for performing authentication operations.
 */
export default class FirebaseAuthentication {
  /**
   * Register a new user with email and password.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @returns {[boolean, string]} - An array indicating success (true/false) and the user ID or error message.
   */
  async register(email, password, name) {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update user profile with the provided name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // Return success status and user ID
      return [true, userCredential.user.uid];
    } catch (error) {
      // Return error message
      return [false, error.message];
    }
  }
  /**
   * Sign in an existing user with email and password.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @returns {[boolean, string]} - An array indicating success (true/false) and the user ID or error message.
   */
  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return [true, userCredential.user.uid];
    } catch (error) {
      return [false, error.message];
    }
  }

  /**
   * Sign out the currently signed-in user.
   * @returns {[boolean, NaN]} - An array indicating success (true/false) and NaN (no data returned).
   */
  async signOut() {
    try {
      await signOut(auth);
      return [true, NaN];
    } catch (error) {
      return [false, error.message];
    }
  }

  /**
   * Send a password reset email to the user.
   * @param {string} email - The email address of the user.
   * @returns {[boolean, NaN]} - An array indicating success (true/false) and NaN (no data returned).
   */
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return [true, NaN];
    } catch (error) {
      return [false, error.message];
    }
  }

  /**
   * Update the password for the currently signed-in user.
   * @param {string} newPassword - The new password for the user.
   * @returns {[boolean, NaN]} - An array indicating success (true/false) and NaN (no data returned).
   */
  async updatePassword(newPassword) {
    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
        return [true, NaN];
      } else {
        return [false, "No user is signed in"];
      }
    } catch (error) {
      return [false, error.message];
    }
  }

  /**
   * Sign in a user using Google authentication.
   * @returns {[boolean, string]} - An array indicating success (true/false) and the user ID or error message.
   */
  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return [true, result.user.uid];
    } catch (error) {
      return [false, error.message];
    }
  }
}
