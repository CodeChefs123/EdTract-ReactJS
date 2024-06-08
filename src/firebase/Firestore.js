import { db } from "../config/firebase";
import {
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  // query,
  // where,
} from "firebase/firestore";

class FirestoreService {
  constructor(collectionName, uid, nestedPaths = []) {
    this.collectionName = collectionName;
    this.collectionRef = collection(db, collectionName);
    this.uid = uid;
    this.nestedPaths = nestedPaths;
  }

  _getCollectionRef() {
    let collectionRef = this.collectionRef;
    for (let i = 0; i < this.nestedPaths.length; i += 2) {
      if (this.nestedPaths.length > i + 1) {
        collectionRef = collection(
          doc(collectionRef, this.nestedPaths[i]),
          this.nestedPaths[i + 1]
        );
      } else {
        collectionRef = doc(collectionRef, this.nestedPaths[i]);
      }
    }
    return collectionRef;
  }

  async create(data) {
    try {
      let collectionRef = this._getCollectionRef();
      let docRef = this.uid ? doc(collectionRef, this.uid) : doc(collectionRef);
      await setDoc(docRef, data);
      return [true, docRef.id];
    } catch (error) {
      return [false, error.message];
    }
  }

  async read() {
    try {
      let collectionRef = this._getCollectionRef();
      let docRef = doc(collectionRef, this.uid);
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists()) {
        return [false, "Document does not exist"];
      }
      return [true, docSnapshot.data()];
    } catch (error) {
      return [false, error.message];
    }
  }

  async update(data) {
    try {
      let collectionRef = this._getCollectionRef();
      let docRef = doc(collectionRef, this.uid);
      await updateDoc(docRef, data);
      return [true, NaN];
    } catch (error) {
      return [false, error.message];
    }
  }

  async delete() {
    try {
      let collectionRef = this._getCollectionRef();
      let docRef = doc(collectionRef, this.uid);
      await deleteDoc(docRef);
      return [true, NaN];
    } catch (error) {
      return [false, error.message];
    }
  }

  async readPaths() {
    try {
      let collectionRef = this._getCollectionRef();
      const docs = await getDocs(collectionRef);
      const paths = docs.docs.map((doc) => doc.id);
      return [true, paths];
    } catch (error) {
      return [false, error.message];
    }
  }

  async readAll() {
    try {
      let [success, paths] = await this.readPaths();
      if (!success) {
        throw new Error(paths);
      }
      const allDocs = {};
      for (let path of paths) {
        const iterFirestore = new FirestoreService(
          this.collectionName,
          path,
          this.nestedPaths
        );
        const [success, docData] = await iterFirestore.read();
        if (success) {
          allDocs[path] = docData;
        }
      }
      return [true, allDocs];
    } catch (error) {
      return [false, error.message];
    }
  }
}

export default FirestoreService;
