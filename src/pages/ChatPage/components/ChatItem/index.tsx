import { MouseEvent } from "react";
import { updateAllMessagesAsSeen } from "../../../../firebase/database";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { readAllMessagesIntoSelectedCorrespondence, setSelectedCorrespondence } from "../../../../redux/slices/chatSlice";
import { userDefaultProfile } from "../../../../utils/consts";
import { Correspondence } from "../../../../utils/interfaces";
import { countUnseenMessages, getLastMessageText, truncateText } from "../../../../utils/utils";
import StatusChangeButton from "./StatusChangeButton";
import styles from './ChatItem.module.scss';

interface ChatItemProps {
	correspondence: Correspondence;
}

const ChatItem: React.FC<ChatItemProps> = ({ correspondence }) => {
  const dispatch = useAppDispatch();

  const { profile, messages } = correspondence;
  const lastMessage = getLastMessageText(messages);
  const unseenMessageCount = countUnseenMessages(messages);

  const selectCorrespondence = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const targetClassName = (e.target as Element)?.className;
    const excludedClassNames = [styles.status__btn, styles.status__btn, styles.status__item, styles.status__loading];
  
    if (!excludedClassNames.some(className => targetClassName.includes(className))) {
      dispatch(setSelectedCorrespondence(correspondence));
      dispatch(readAllMessagesIntoSelectedCorrespondence(null));
      updateAllMessagesAsSeen(correspondence);
    }
  }
  
	return (
		<div className={styles.item} onClick={(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => selectCorrespondence(e)}>
      <div className={styles.part}>
        <div className={styles.img}>
          <img src={profile && profile.photoLink ? profile.photoLink : userDefaultProfile} alt={correspondence.id} />
          {unseenMessageCount > 0 && (
            <div className={styles.unseen}>{unseenMessageCount}</div>
          )}
        </div>
        <div>
          <h4 className={styles.name}>{profile && profile.username ? profile.username : correspondence.id.substring(0, 20) + "..."}</h4>
          <p className={styles.message}>{lastMessage.isManager && <span>Вы:</span>} {truncateText(lastMessage.text, 22)}</p>
        </div>
      </div>
      <div className={styles.part}>
        <StatusChangeButton id={correspondence.id} isCompleted={correspondence.isCompleted}/>
      </div>  
    </div>
	);
}

export default ChatItem;