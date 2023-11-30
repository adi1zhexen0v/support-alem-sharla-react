import Lottie from "lottie-react";
import styles from './LottieViewer.module.scss';

interface LottieViewerProps {
  data: any;
  loop?: boolean;
}

const LottieViewer: React.FC<LottieViewerProps> = ({ data, loop = false }) => {
  return (
    <div className={styles.block}>
      <Lottie animationData={data} loop={loop} className={styles.image}/>
      <h4 className={styles.text}>Ничего не найдено</h4>
    </div>
  );
}

export default LottieViewer;