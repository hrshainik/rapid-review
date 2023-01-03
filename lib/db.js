import "@/lib/firebase";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const db = getFirestore();

export async function createUser(uid, data) {
  try {
    const docRef = await setDoc(doc(db, "users", uid), { ...data });
    // return docRef;
  } catch (error) {
    console.log(error);
  }
}
