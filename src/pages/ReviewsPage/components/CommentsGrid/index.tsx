import { useAppSelector } from "../../../../hooks/reduxHooks";
import { RootState } from "../../../../redux/store";
import { AppReview } from "../../../../utils/interfaces";
import CommentsItem from "../CommentsItem";
import styles from './CommentsGrid.module.scss';

const CommentsGrid: React.FC = () => {
  const reviews: AppReview[] = useAppSelector((state: RootState) => state.reviews.reviewsList);

  return (
    <div className={styles.grid}>{
      reviews.map(item => <CommentsItem review={item}/>)
    }</div>
  )
}

export default CommentsGrid;