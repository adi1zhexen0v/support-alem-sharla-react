import { useState, useEffect, useRef } from "react";
import { faClose, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { insertNewMessage } from "../../../../firebase/database";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { RootState } from "../../../../redux/store";
import { addMessageToSelectedCorrespondence, deleteSelectedCorrespondence } from "../../../../redux/slices/chatSlice";
import MessageItem from "../MessageItem";
import Loader from "../../../../components/Loader";
import { MessageTypes } from "../../../../utils/enums";
import { Correspondence, Message } from "../../../../utils/interfaces";
import { userDefaultProfile } from "../../../../utils/consts";
import styles from './ChatTyping.module.scss';

const ChatTyping: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);

  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const correspondence: Correspondence = useAppSelector((state: RootState) => state.chat.selectedCorrespondence)!;

  const sendMessage = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const newMessage: Message = await insertNewMessage(correspondence.id, inputText);
    dispatch(addMessageToSelectedCorrespondence(newMessage));
    setInputText("");
    setIsLoading(false);
  };

  const closeCorrespondence = () => {
    dispatch(deleteSelectedCorrespondence(null));
  };

  const scrollToBottom = () => {
    const list = listRef.current;
    if (list) {
      list.scrollTo(0, list.scrollHeight);
    }
  };
  const messages = [...correspondence.messages];
  const sortedMessages = messages.sort((a, b) => a.sentDate - b.sentDate);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  return (
    <div className={styles.typing}>
      <div className={styles.header}>
        <div className={styles.header__part}>
          <img
            src={correspondence.profile?.photoLink ? correspondence.profile?.photoLink : userDefaultProfile}
            alt={correspondence.profile?.userID}
            className={styles.header__img}
          />
        </div>
        <div className={styles.header__part}>
          <h4 className={styles.header__name}>{correspondence.profile ? correspondence.profile!.username : correspondence.id}</h4>
        </div>
        <div className={styles.header__part}>
          <div
            className={styles.header__close}
            onClick={() => closeCorrespondence()}
          >
            <FontAwesomeIcon icon={faClose} />
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.body__list}>
          <div ref={listRef} className={styles.body__wrapper}>
            {sortedMessages.map((message) => (
                <MessageItem
                  key={message.messageId}
                  message={
                    message.imageURL
                      ? message.imageURL!
                      : message.fileURL
                      ? message.fileURL!
                      : message.text!
                  }
                  isManager={message.isManager}
                  date={message.sentDate}
                  type={
                    message.imageURL
                      ? MessageTypes.IMAGE
                      : message.fileURL
                      ? MessageTypes.FILE
                      : MessageTypes.TEXT
                  }
                />
              ))}
          </div>
        </div>
        <form
          className={styles.form}
          onSubmit={(e: React.FormEvent) => sendMessage(e)}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className={styles.input}
            placeholder="Напишите сообщение..."
          />
          <button className={styles.submit} type="submit" disabled={isLoading}>
            { isLoading ? <Loader isLarge={false} size={26} borderSize={4}/> : <FontAwesomeIcon icon={faPaperPlane} /> }
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatTyping;
