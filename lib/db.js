import "@/lib/firebase";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const db = getFirestore();

export async function createUser(uid, data) {
  try {
    const docRef = await addDoc(
      collection(db, "users"),
      { uid, ...data },
      { merge: true }
    );
    console.log(docRef);
    // return docRef;
  } catch (error) {
    console.log(error);
  }
}
