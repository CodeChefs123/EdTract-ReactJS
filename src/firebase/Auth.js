import { auth, firebase } from "../config/firebase.js";
import Firestore from "./Firestore.js";

/**
 * Class representing authentication functionalities.
 */
export class Authentication {
  /**
   * Creates a new user with the provided user data.
   * @param {object} userData - The user data to create the user.
   * @returns {Promise<[boolean, string]>} - A tuple indicating success status and the user ID.
   */
  async createUser(userData) {
    try {
      const userRecord = await auth.createUser(userData);
      return [true, userRecord.uid];
      // return userRecord.uid;
    } catch (error) {
      return [false, error.message];
    }
  }

  verificationEmail(email) {
    return auth.generateEmailVerificationLink(email);
  }

  /**
   * Logs in the user with the provided email and password.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<[boolean, string]>} - A tuple indicating success status and the user ID.
   */
  async loginUser(email, password) {
    try {
      const userRecord = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      return [true, userRecord.user.uid];
    } catch (error) {
      return [false, error.message];
    }
  }

  /**
   * Updates the user with the provided user ID and update data.
   * @param {string} uid - The user ID to update.
   * @param {object} updateUserData - The data to update the user with.
   * @returns {Promise<[boolean, object]>} - A tuple indicating success status and the updated user data.
   */
  async updateUser(uid, updateUserData) {
    try {
      const userRecord = await auth.updateUser(uid, updateUserData);
      return [true, userRecord.toJSON()];
    } catch (error) {
      return [false, error.message];
    }
  }

  /**
   * Retrieves the user with the provided user ID.
   * @param {string} uid - The user ID to retrieve.
   * @returns {Promise<[boolean, object]>} - A tuple indicating success status and the retrieved user data.
   */
  async getUser(uid) {
    try {
      const user = await auth.getUser(uid);
      return [true, user];
    } catch (error) {
      return [false, error.message];
    }
  }

  /**
   * Deletes the user with the provided user ID.
   * @param {string} uid - The user ID to delete.
   * @returns {Promise<[boolean, string]>} - A tuple indicating success status and the deleted user ID.
   */
  async deleteUser(uid) {
    try {
      await auth.deleteUser(uid);
      return [true, uid];
    } catch (error) {
      return [false, error.message];
    }
  }

  async createPhoneVerification(phoneNumber) {
    const request = await auth.createSessionCookie(phoneNumber, {
      expiresIn: 3600,
    });
    return request;
  }

  async verityPhoneVerification(verificationId, otp) {
    const userCreds = await auth.verifySessionCookie(verificationId, otp);
    return userCreds;
  }

  async resetPassword(email) {
    const request = await auth.sendPasswordResetEmail(email);
    return request;
  }

  async getUsers() {
    const listUsersResult = await auth.listUsers();
    const users = await Promise.all(
      listUsersResult.users.map(async (userRecord) => {
        // Additional async operation to read user data from Firestore
        let userData;
        try {
          const fs = await Firestore("users", userRecord.uid);
          userData = fs.read();
        } catch {
          userData = { false: "No user data found" };
        }
        return {
          ...userRecord, // Include default user data
          ...userData, // Include additional user data from Firestore
        };
      })
    );

    return users;
  }
  emailVerification(url) {
    return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification - CivicCircle</title>
          <style>
              /* Add your custom CSS styles here */
          </style>
      </head>
      <body>
          <div style="background-color: #f3f4f6; padding: 20px;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                  <h1 style="color: #333333; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Verify Your Email Address</h1>
                  <p style="color: #666666; font-size: 16px; margin-bottom: 30px;">Thank you for signing up for CivicCircle! To complete your registration, please verify your email address by clicking the button below:</p>
                  <a href="${url}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-size: 16px; font-weight: bold;">Verify Email Address</a>
                  <p style="color: #666666; font-size: 14px; margin-top: 30px;">If you did not sign up for an account on CivicCircle, you can safely ignore this email.</p>
              </div>
          </div>
      </body>
      </html>`;
  }
}
