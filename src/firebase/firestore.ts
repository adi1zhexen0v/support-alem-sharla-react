import { doc, getDoc } from "firebase/firestore";
import { firestore } from './config';
import { PROFILES_COLLECTION } from "../utils/consts";
import { Profile } from "../utils/interfaces";

export const getUser = async (userId: string) => {
  const userRef = doc(firestore, PROFILES_COLLECTION, userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const user = userSnap.data() as Profile;
    return user;
  }
  return null;
}