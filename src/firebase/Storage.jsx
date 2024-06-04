import {
  ref,
  getDownloadURL,
  deleteObject,
  uploadString,
  storage,
} from "../config/firebase.js";

/**
 * Class representing Firebase Storage operations.
 */
export class Storage {
  constructor(initPath) {
    this.initPath = initPath;
  }
  /**
   * Uploads a base64-encoded image to Firebase Storage.
   * @param {string} path - The path to store the image.
   * @param {string} imageBase64 - The base64-encoded image data.
   * @returns {Promise<[boolean, string | Error, string]>} A promise containing upload status, error message (if any), and download URL.
   */
  async uploadByte8Array(path, imageBase64) {
    try {
      const storageRef = ref(storage, this.initPath + path);
      await uploadString(storageRef, imageBase64, "base64");
      const downloadURL = await this.getDownloadURL(path);
      return [true, downloadURL];
    } catch (error) {
      console.error("Error uploading image:", error);
      return [false, error.message, NaN];
    }
  }

  /**
   * Uploads a file to Firebase Storage.
   * @param {File} file - The file to upload.
   * @param {string} path - The path to store the file.
   * @returns {Promise<[boolean, string | Error]>} A promise containing upload status and download URL (if successful).
   */
  async uploadFile(file, path) {
    try {
      const storageRef = ref(storage, this.initPath + path);
      const snapshot = await storageRef.put(file);
      const downloadURL = await snapshot.ref.getDownloadURL();
      return [true, downloadURL];
    } catch (error) {
      console.error("Error uploading file:", error);
      return [false, error];
    }
  }

  /**
   * Retrieves the download URL of a file from Firebase Storage.
   * @param {string} path - The path of the file.
   * @returns {Promise<[boolean, string | Error]>} A promise containing retrieval status and download URL (if successful).
   */
  async getDownloadURL(path) {
    try {
      const storageRef = ref(storage, this.initPath + path);
      const downloadURL = await getDownloadURL(storageRef);
      return [true, downloadURL];
    } catch (error) {
      console.error("Error getting download URL:", error);
      return [false, error.message];
    }
  }

  /**
   * Deletes a file from Firebase Storage.
   * @param {string} path - The path of the file to delete.
   * @returns {Promise<[boolean, string | Error]>} A promise containing deletion status and download URL (if successful).
   */
  async deleteFile(path) {
    try {
      const storageRef = ref(storage, this.initPath + path);
      await deleteObject(storageRef);
      return [true, NaN];
    } catch (error) {
      console.error("Error deleting file:", error);
      return [false, error.message];
    }
  }
}

export default Storage;
