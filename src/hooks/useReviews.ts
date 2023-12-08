import { useEffect, useState } from "react";
import { AppReview } from "../utils/interfaces";
import { getReviews } from "../firebase/firestore";
import { useAppDispatch } from "./reduxHooks";
import { addReviews } from "../redux/slices/reviewsSlice";

export const useReviews = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      const reviews: AppReview[] = await getReviews();
      dispatch(addReviews(reviews));
      setIsLoading(false);
    }
    fetchReviews();
  }, [dispatch]);

  return { isLoading };
}