import {
  getDatabase,
  ref,
  push,
  child,
  set,
  get,
  remove,
} from "firebase/database";

/**
 * RealTime class for performing CRUD operations in Firebase Realtime Database.
 */
export default class RealTime {
  /**
   * Creates a new instance of the RealTime class.
   * @param {string} r - The path to the database reference.
   */
  constructor(r) {
    this.database = getDatabase();
    this.itemsRef = ref(this.database, r);
  }

  /**
   * Creates a new item in the database.
   * @param {Object} data - The data to be stored.
   * @returns {Array} An array containing a boolean indicating success and the ID of the newly created item.
   */
  async create(data) {
    try {
      if (Object.values(data).some((value) => value === undefined)) {
        return [false, "Data contains undefined values"];
      }
      const newItemRef = push(this.itemsRef);
      await set(newItemRef, data);
      return [true, newItemRef.key];
    } catch (error) {
      return [false, error.message];
    }
  }

  /**
   * Retrieves all items from the database.
   * @returns {Array} An array containing a boolean indicating success and an array of items.
   */
  async read() {
    try {
      const snapshot = await get(this.itemsRef);
      const items = [];
      snapshot.forEach((childSnapshot) => {
        items.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      return [true, items];
    } catch (error) {
      return [false, error.message];
    }
  }

  /**
   * Updates an item in the database.
   * @param {string} id - The ID of the item to update.
   * @param {Object} newData - The new data to replace the existing data.
   * @returns {Array} An array containing a boolean indicating success and a boolean indicating whether the update was successful.
   */
  async update(id, newData) {
    try {
      const itemRef = child(this.itemsRef, id);
      await set(itemRef, newData);
      return [true, true];
    } catch (error) {
      return [false, error.message];
    }
  }

  /**
   * Deletes an item from the database.
   * @param {string} id - The ID of the item to delete.
   * @returns {Array} An array containing a boolean indicating success and a boolean indicating whether the deletion was successful.
   */
  async delete(id) {
    try {
      const itemRef = child(this.itemsRef, id);
      await remove(itemRef);
      return [true, true];
    } catch (error) {
      return [false, error.message];
    }
  }
}
