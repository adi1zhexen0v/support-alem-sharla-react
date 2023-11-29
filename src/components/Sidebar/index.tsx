import {
  faComments,
  faAngleLeft,
  faArrowRightFromBracket,
  faAngleRight,
  faSquarePollVertical
} from "@fortawesome/free-solid-svg-icons";
import {
  CHAT_ROUTE, REVIEWS_ROUTE
} from "../../utils/consts";
import { firebaseAuthSignOut } from "../../firebase/auth";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { removeUser } from "../../redux/slices/userSlice";
import { toggleSidebar } from "../../redux/slices/settingsSlice";
import { RootState } from "../../redux/store";
import SidebarLink from "./SidebarLink";
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const sidebarIsFull = useAppSelector((state: RootState) => state.settings.sidebarIsFull);

  const logOut = async () => {
    await firebaseAuthSignOut();
    dispatch(removeUser());
  };
  return (
    <nav className={styles.sidebar}>
      <div className={styles.sidebar__part}>
        <ul>
          <SidebarLink name="Скрыть меню" icon={sidebarIsFull ? faAngleLeft : faAngleRight} func={() => dispatch(toggleSidebar(null))}/>
          <SidebarLink name="Чат" link={CHAT_ROUTE} icon={faComments} />
          <SidebarLink name="Рейтинг и отзывы" link={REVIEWS_ROUTE} icon={faSquarePollVertical} />
        </ul>
      </div>
      <div className={styles.sidebar__part}>
        <SidebarLink name="Выйти" icon={faArrowRightFromBracket} func={logOut}/>
      </div>
    </nav>
  );
};

export default Sidebar;
