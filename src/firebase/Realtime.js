import { ref, set, get, update, remove } from "@firebase/database";
import { realtimeDb } from "./config";

/**
 * FirebaseRealtimeDatabase class for performing CRUD operations on Realtime Database.
 */
export default class FirebaseRealtimeDatabase {
  /**
   * Constructor for FirebaseRealtimeDatabase class.
   * @param {string} collectionName - The name of the Realtime Database collection.
   * @param {string} uid - The unique identifier for the document.
   */
  constructor(collectionName, uid, nestedPaths = []) {
    this.collectionName = collectionName;
    this.uid = uid;
    this.nestedPaths = nestedPaths;
  }

  /**
   * Create a new document in the Realtime Database collection.
   * @param {Object} data - The data to be added to the document.
   * @returns {[boolean, string]} - An array indicating success (true/false) and the document ID.
   */
  async create(data) {
    try {
      const docRef = this.buildPath();
      await set(docRef, data);
      return [true, this.uid];
    } catch (error) {
      return [false, error.message];
    }
  }

  /**
   * Read a document from the Realtime Database collection.
   * @returns {[boolean, Object]} - An array indicating success (true/false) and the document data.
   */
  async read() {
    try {
      const docRef = this.buildPath();
      const snapshot = await get(docRef);
      if (!snapshot.exists()) {
        return [false, "Document does not exist"];
      }
      return [true, snapshot.val()];
    } catch (error) {
      return [false, error.message];
    }
  }

  /**
   * Update a document in the Realtime Database collection.
   * @param {Object} data - The data to update the document with.
   * @returns {[boolean, NaN]} - An array indicating success (true/false) and NaN (no data returned).
   */
  async update(data) {
    try {
      const docRef = this.buildPath();
      await update(docRef, data);
      return [true, NaN];
    } catch (error) {
      return [false, error.message];
    }
  }

  /**
   * Delete a document from the Realtime Database collection.
   * @returns {[boolean, NaN]} - An array indicating success (true/false) and NaN (no data returned).
   */
  async delete() {
    try {
      const docRef = this.buildPath();
      await remove(docRef);
      return [true, NaN];
    } catch (error) {
      return [false, error.message];
    }
  }

  /**
   * Build the path to the document in the Realtime Database.
   * @returns {Object} - A reference to the document path.
   */
  buildPath() {
    let path = `${this.collectionName}/${this.uid}`;
    if (this.nestedPaths.length > 0) {
      path = `${this.collectionName}/${this.nestedPaths.join("/")}/${this.uid}`;
    }
    return ref(realtimeDb, path);
  }
}
