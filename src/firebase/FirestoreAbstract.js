/**
 * FirestoreAbstract class provides methods to interact with Firestore.
 * It includes methods for creating, reading, updating, and deleting documents.
 */
export default class FirestoreAbstract {
  /**
   * Create a new document in Firestore.
   * @returns {Promise} The promise that resolves with the result of the create operation.
   */
  async create() {
    let res = await this.fs.create(this.createStructure);
    return res;
  }

  /**
   * Read all documents from Firestore.
   * @returns {Promise} The promise that resolves with the result of the read operation.
   */
  read() {
    return this.fs.read();
  }

  /**
   * Update a document in Firestore.
   * @returns {Promise} The promise that resolves with the result of the update operation.
   */
  update() {
    return this.fs.update(this.updateStructure);
  }

  /**
   * Delete a document from Firestore.
   * @returns {Promise} The promise that resolves with the result of the delete operation.
   */
  delete() {
    return this.fs.delete();
  }

  /**
   * Read all documents from Firestore.
   * @returns {Promise} The promise that resolves with the result of the readAll operation.
   */
  readAll() {
    return this.fs.readAll();
  }
}
