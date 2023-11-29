import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import styles from './Sidebar.module.scss';

interface SidebarLinkProps {
  name: string;
  link?: string;
  icon: IconDefinition;
  func?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ name, link, icon, func }) => {
  const sidebarIsFull = useAppSelector((state: RootState) => state.settings.sidebarIsFull);
  return (
    <li>{
      link ? <Link to={link} className={styles.link}>
      <div className={styles.link__icon}>
        <FontAwesomeIcon icon={icon} />
      </div>
      { sidebarIsFull && <h4 className={styles.link__name}>{name}</h4> }
    </Link> : <div className={`${styles.link} ${styles.arrow}`} onClick={func}>
      <div className={styles.link__icon}>
        <FontAwesomeIcon icon={icon} />
      </div>
      { sidebarIsFull && <h4 className={styles.link__name}>{name}</h4> }
    </div>
    }</li>
  );
};

export default SidebarLink;
