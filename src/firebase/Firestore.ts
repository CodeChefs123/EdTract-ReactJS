import { db } from "../config/firebase";
import {
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  CollectionReference,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { Firestore } from "firebase/firestore";

class FirestoreService {
  private collectionName: string;
  private collectionRef: CollectionReference<DocumentData>;
  private uid: string | null;
  private nestedPaths: string[];

  constructor(
    collectionName: string,
    uid: string | null,
    nestedPaths: string[] = []
  ) {
    this.collectionName = collectionName;
    this.collectionRef = collection(db, collectionName);
    this.uid = uid;
    this.nestedPaths = nestedPaths;
  }

  private _getCollectionRef():
    | CollectionReference<DocumentData>
    | DocumentReference<DocumentData> {
    let collectionRef:
      | CollectionReference<DocumentData>
      | DocumentReference<DocumentData> = this.collectionRef;
    for (let i = 0; i < this.nestedPaths.length; i += 2) {
      if (collectionRef instanceof CollectionReference) {
        if (this.nestedPaths.length > i + 1) {
          collectionRef = collection(
            doc(collectionRef, this.nestedPaths[i]),
            this.nestedPaths[i + 1]
          );
        } else {
          collectionRef = doc(collectionRef, this.nestedPaths[i]);
        }
      } else {
        throw new Error(
          "Expected a CollectionReference but got a DocumentReference."
        );
      }
    }
    return collectionRef;
  }

  async create(data: DocumentData): Promise<[boolean, string]> {
    try {
      const collectionRef = this._getCollectionRef();
      let docRef: DocumentReference<DocumentData>;

      if (this.uid) {
        const firestoreRef = collectionRef as unknown as Firestore;
        docRef = doc(firestoreRef, this.uid);
      } else {
        docRef = doc(collectionRef as CollectionReference<DocumentData>);
      }

      await setDoc(docRef, data);
      return [true, docRef.id];
    } catch (error: any) {
      return [false, error.message];
    }
  }

  async read(): Promise<[boolean, DocumentData | string]> {
    try {
      const collectionRef = this._getCollectionRef();
      if (!(collectionRef instanceof DocumentReference)) {
        throw new Error(
          "Expected a DocumentReference but got a CollectionReference."
        );
      }
      const docRef = doc(collectionRef, this.uid!);
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists()) {
        return [false, "Document does not exist"];
      }
      return [true, docSnapshot.data()!];
    } catch (error: any) {
      return [false, error.message];
    }
  }

  async update(data: Partial<DocumentData>): Promise<[boolean, null]> {
    try {
      const collectionRef = this._getCollectionRef();
      if (!(collectionRef instanceof DocumentReference)) {
        throw new Error(
          "Expected a DocumentReference but got a CollectionReference."
        );
      }
      const docRef = doc(collectionRef, this.uid!);
      await updateDoc(docRef, data);
      return [true, null];
    } catch (error: any) {
      return [false, error.message];
    }
  }

  async delete(): Promise<[boolean, null]> {
    try {
      const collectionRef = this._getCollectionRef();
      if (!(collectionRef instanceof DocumentReference)) {
        throw new Error(
          "Expected a DocumentReference but got a CollectionReference."
        );
      }
      const docRef = doc(collectionRef, this.uid!);
      await deleteDoc(docRef);
      return [true, null];
    } catch (error: any) {
      return [false, error.message];
    }
  }

  async readPaths(): Promise<[boolean, string[] | string]> {
    try {
      const collectionRef = this._getCollectionRef();
      if (!(collectionRef instanceof CollectionReference)) {
        throw new Error(
          "Expected a CollectionReference but got a DocumentReference."
        );
      }
      const docs = await getDocs(collectionRef);
      const paths = docs.docs.map((doc) => doc.id);
      return [true, paths];
    } catch (error: any) {
      return [false, error.message];
    }
  }

  async readAll(): Promise<
    [boolean, { [key: string]: DocumentData } | string]
  > {
    try {
      const [success, paths] = await this.readPaths();
      if (!success) {
        throw new Error(paths as string);
      }
      const allDocs: { [key: string]: DocumentData } = {};
      for (const path of paths as string[]) {
        const iterFirestore = new FirestoreService(
          this.collectionName,
          path,
          this.nestedPaths
        );
        const [success, docData] = await iterFirestore.read();
        if (success) {
          allDocs[path] = docData as DocumentData;
        }
      }
      return [true, allDocs];
    } catch (error: any) {
      return [false, error.message];
    }
  }
}

export default FirestoreService;
