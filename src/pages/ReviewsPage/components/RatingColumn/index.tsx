import { useAppSelector } from "../../../../hooks/reduxHooks";
import { RootState } from "../../../../redux/store";
import { AppReview } from "../../../../utils/interfaces";
import { calculatePercentageByRating } from "../../../../utils/utils";
import styles from './RatingColumn.module.scss'

interface RatingColumnProps {
  rating: number;
}

const RatingColumn: React.FC<RatingColumnProps> = ({ rating }) => {
  const reviews: AppReview[] = useAppSelector((state: RootState) => state.reviews.reviewsList);
  const percentageByRating: string = calculatePercentageByRating(reviews, rating);

  return (
    <div className={styles.block}>
      <div className={styles.column} style={{ height: percentageByRating }}>{ percentageByRating }</div>
      <span className={styles.title}>{rating}</span>
    </div>
  )
}

export default RatingColumn;