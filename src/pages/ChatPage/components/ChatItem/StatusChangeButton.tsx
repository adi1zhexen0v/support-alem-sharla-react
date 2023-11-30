import { useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { changeChatIsCompleted } from "../../../../redux/slices/chatSlice";
import { updateCorrespondenceIsCompleted } from "../../../../firebase/database";
import { StatusRusTypes } from "../../../../utils/enums";
import styles from './ChatItem.module.scss';

interface StatusChangeButtonProps {
  id: string;
  isCompleted: boolean;
}

const StatusChangeButton: React.FC<StatusChangeButtonProps> = ({ id, isCompleted}) => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toogleButtonsList = () => {
    setIsOpen(!isOpen);
  };

  const changeStatus = async (isCompleted: boolean) => {
    setIsLoading(true);
    await updateCorrespondenceIsCompleted(id, isCompleted);
    dispatch(changeChatIsCompleted({ id, isCompleted }));
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <div>
      <button className={styles.status__btn} onClick={toogleButtonsList}>
        Переместить
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      {isOpen && (
        <div className={styles.status}>
          {isLoading ? (
            <div className={styles.status__loading}>Загрузка...</div>
          ) : (
            <div
                className={styles.status__item}
                onClick={() => changeStatus(!isCompleted)}>
                {isCompleted ? StatusRusTypes.PROCESS : StatusRusTypes.COMPLETED}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatusChangeButton;
