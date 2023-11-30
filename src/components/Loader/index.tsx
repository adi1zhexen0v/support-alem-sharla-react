import styles from './Loader.module.scss';

interface LoaderProps {
  isLarge: boolean;
  isFullPage?: boolean;
  size?: number;
  borderSize?: number;
}

const Loader: React.FC<LoaderProps> = ({ isLarge, isFullPage = false, size, borderSize  }) => {
  const loaderClass: string = isFullPage ? styles.container : styles.wrapper;
  return isLarge ? (
    <div className={loaderClass}>
      <span className={styles.large}></span>
    </div>
  ) : (
    <div className={styles.small} style={{borderWidth: borderSize, width: size, height: size}}></div>
  );
};

export default Loader;