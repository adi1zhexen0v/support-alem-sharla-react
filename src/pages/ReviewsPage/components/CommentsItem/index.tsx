import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppReview } from '../../../../utils/interfaces';
import styles from './CommentsItem.module.scss';

interface CommentsItemProps {
  review: AppReview;
}

const CommentsItem: React.FC<CommentsItemProps> = ({ review }) => {
  return (
    <div className={styles.item}>
      <div className={styles.rate}>{[...Array(5)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          style={{ opacity: index >= +review.reviewRating ? 0.3 : 1 }}
        />
      ))}</div>
      <div className={styles.comments}><ul>{
        review.reviewText.map(text => <li>- {text}</li>)  
      }</ul></div>
    </div>
  );
}

export default CommentsItem;