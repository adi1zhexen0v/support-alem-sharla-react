import Loader from "../../components/Loader";
import TotalRating from "./components/TotalRating";
import { useReviews } from "../../hooks/useReviews";
import CommentsGrid from "./components/CommentsGrid";
import styles from './ReviewsPage.module.scss';

const ReviewsPage: React.FC = () => {
  const { isLoading } = useReviews();

  return (
    <div className={styles.reviews}>
      <h2 className={styles.title}>Рейтинг и отзывы</h2>
      <div className={isLoading ? styles.wrapper__loading : styles.wrapper}>{
        isLoading ? <Loader isLarge={true} /> : <>
          <TotalRating/>
          <CommentsGrid/>
        </>
      }</div>
    </div>
  );
}

export default ReviewsPage;