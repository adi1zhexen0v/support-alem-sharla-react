import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from './config';
import { APP_REVIEWS_COLLECTION, PROFILES_COLLECTION } from "../utils/consts";
import { AppReview, Profile } from "../utils/interfaces";

export const getUser = async (userId: string) => {
  const userRef = doc(firestore, PROFILES_COLLECTION, userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const user = userSnap.data() as Profile;
    return user;
  }
  return null;
}

export const getReviews = async () => {
  const reviewsRef = collection(firestore, APP_REVIEWS_COLLECTION);
  const querySnapshot = await getDocs(reviewsRef);

  const reviews: AppReview[] = [];

  querySnapshot.forEach(doc => {
    const item = doc.data() as AppReview;
    item.id = doc.id;
    reviews.push(item);
  });

  return reviews;
}