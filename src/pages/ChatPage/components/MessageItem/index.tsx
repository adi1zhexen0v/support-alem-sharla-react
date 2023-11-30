import { useState } from "react";
import { Link } from "react-router-dom";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageWithSkeleton from "./ImageWithSkeleton";
import { formatDate } from "../../../../utils/utils";
import { MessageTypes } from "../../../../utils/enums";
import styles from './MessageItem.module.scss';

interface MessageItemProps {
  message: string;
  isManager: boolean;
  date: number;
  type: MessageTypes;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  isManager,
  date,
  type,
}) => {
  const [imageIsOpen, setImageIsOpen] = useState<boolean>(false);

  const getClassNames = (primaryClass: string, secondaryClass: string) : string => {
    return isManager ? `${primaryClass} ${secondaryClass}` : primaryClass;
  }


  return (
    <div className={getClassNames(styles.message, styles.message__self)}>
      {type === MessageTypes.IMAGE ? (
        <ImageWithSkeleton imageUrl={message} setValue={setImageIsOpen} />
      ) : type === MessageTypes.FILE ? (
        <div className={getClassNames(styles.box, styles.box__self)}>
          <Link
            to={message}
            className={getClassNames(styles.file, styles.file__self)}
            target="_blank"
          >
            <span>
              <FontAwesomeIcon icon={faFile} />
            </span>
            Файл
          </Link>
        </div>
      ) : (
        <div className={styles.box}>{message}</div>
      )}
      <div className={styles.date}>{formatDate(date)}</div>
      {imageIsOpen && (
        <div className={styles.picture} onClick={() => setImageIsOpen(false)}>
          <img src={message} alt="Изображение" className={styles.picture__img} />
        </div>
      )}
    </div>
  );
};

export default MessageItem;
