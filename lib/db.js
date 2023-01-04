import "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

const db = getFirestore();

export async function createUser(uid, data) {
  try {
    const docRef = await setDoc(doc(db, "users", uid), { ...data });
    // return docRef;
  } catch (error) {
    console.log(error);
  }
}

export async function createSite(data) {
  try {
    const docRef = await addDoc(collection(db, "sites"), { ...data });
    // return docRef;
  } catch (error) {
    console.log("Error", error);
  }
}
