import {
  ref,
  getDownloadURL,
  deleteObject,
  uploadString,
  uploadBytesResumable,
  StorageReference,
  UploadTaskSnapshot,
} from "firebase/storage";
import { storage } from "../config/firebase";

/**
 * Class representing Firebase Storage operations.
 */
class StorageService {
  private initPath: string;

  /**
   * Constructs a new instance of the StorageService class.
   * @param {string} initPath - The initial path for storage operations.
   */
  constructor(initPath: string) {
    this.initPath = initPath;
  }

  /**
   * Uploads a base64-encoded image to Firebase Storage.
   * @param {string} path - The path to store the image.
   * @param {string} imageBase64 - The base64-encoded image data.
   * @returns {Promise<[boolean, string | Error, string]>} A promise containing upload status, error message (if any), and download URL.
   */
  async uploadByte8Array(
    path: string,
    imageBase64: string
  ): Promise<[boolean, string | Error, string | null]> {
    try {
      // Get a reference to the storage location
      const storageRef: StorageReference = ref(
        storage,
        `${this.initPath}/${path}`
      );
      // Upload the base64-encoded image
      await uploadString(storageRef, imageBase64, "base64");
      // Get the download URL of the uploaded image
      const downloadURL: any = await this.getDownloadURL(path);
      return [true, downloadURL, null];
    } catch (error: any) {
      console.error("Error uploading image:", error);
      return [false, error.message, null];
    }
  }

  /**
   * Uploads a file to Firebase Storage.
   * @param {File} file - The file to upload.
   * @param {string} path - The path to store the file.
   * @returns {Promise<[boolean, string | Error]>} A promise containing upload status and download URL (if successful).
   */
  async uploadFile(
    file: File,
    path: string
  ): Promise<[boolean, string | Error]> {
    try {
      // Get a reference to the storage location
      const storageRef: StorageReference = ref(
        storage,
        `${this.initPath}/${path}`
      );
      // Upload the file
      const snapshot: UploadTaskSnapshot = await uploadBytesResumable(
        storageRef,
        file
      );
      // Get the download URL of the uploaded file
      const downloadURL: string = await getDownloadURL(snapshot.ref);
      return [true, downloadURL];
    } catch (error: any) {
      console.error("Error uploading file:", error);
      return [false, error.message];
    }
  }

  /**
   * Retrieves the download URL of a file from Firebase Storage.
   * @param {string} path - The path of the file.
   * @returns {Promise<[boolean, string | Error]>} A promise containing retrieval status and download URL (if successful).
   */
  async getDownloadURL(path: string): Promise<[boolean, string | Error]> {
    try {
      // Get a reference to the storage location
      const storageRef: StorageReference = ref(
        storage,
        `${this.initPath}/${path}`
      );
      // Get the download URL of the file
      const downloadURL: string = await getDownloadURL(storageRef);
      return [true, downloadURL];
    } catch (error: any) {
      console.error("Error getting download URL:", error);
      return [false, error.message];
    }
  }

  /**
   * Deletes a file from Firebase Storage.
   * @param {string} path - The path of the file to delete.
   * @returns {Promise<[boolean, string | Error]>} A promise containing deletion status.
   */
  async deleteFile(path: string): Promise<[boolean, string | null]> {
    try {
      // Get a reference to the storage location
      const storageRef: StorageReference = ref(
        storage,
        `${this.initPath}/${path}`
      );
      // Delete the file
      await deleteObject(storageRef);
      return [true, null];
    } catch (error: any) {
      console.error("Error deleting file:", error);
      return [false, error.message];
    }
  }
}

export default StorageService;
