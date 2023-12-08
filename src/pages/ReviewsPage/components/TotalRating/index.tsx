import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { calculateAverageRating } from '../../../../utils/utils';
import { AppReview } from "../../../../utils/interfaces";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { RootState } from "../../../../redux/store";
import styles from './TotalRating.module.scss';
import RatingColumn from '../RatingColumn';

const TotalRating: React.FC = () => {
  const reviews: AppReview[] = useAppSelector((state: RootState) => state.reviews.reviewsList);

  return (
    <div className={styles.block}>
      <div className={styles.total}>
        <div className={styles.rating}>
          <FontAwesomeIcon icon={faStar} style={{ fontSize: `${window.outerWidth / 10}px` }}/>
          <h4>{ calculateAverageRating(reviews) }</h4>
        </div>
        <h4>Количество людей, которые оставили отзыв: <span>{reviews.length}</span></h4>
      </div>
      <div className={styles.diagram}>
        <RatingColumn rating={1}/>
        <RatingColumn rating={2}/>
        <RatingColumn rating={3}/>
        <RatingColumn rating={4}/>
        <RatingColumn rating={5}/>
      </div>
    </div>
  )
}

export default TotalRating;