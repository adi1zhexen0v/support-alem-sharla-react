import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useMessages } from "../../hooks/useMessages";
import { RootState } from "../../redux/store";
import { changeChatActiveStatus, changeChatSearchText, deleteSelectedCorrespondence } from "../../redux/slices/chatSlice";
import Loader from "../../components/Loader";
import ChatList from "./components/ChatList";
import SectionHeader from "../../components/SectionHeader";
import { ChatStatuses } from "../../utils/consts";
import { Correspondence } from "../../utils/interfaces";
import ChatTyping from "./components/ChatTyping";
import styles from './ChatPage.module.scss';

const ChatPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useMessages();
  const correspondences: Correspondence[] = useAppSelector((state: RootState) => state.chat.chatList);
  const activeStatus: string = useAppSelector((state: RootState) => state.chat.activeStatus);
  const searchText: string = useAppSelector((state: RootState) => state.chat.searchText);
  const selectedCorrespondence: Correspondence | null = useAppSelector((state: RootState) => state.chat.selectedCorrespondence);

  const newCorrespondences: Correspondence[] = correspondences.filter(item => !item.isCompleted && item.messages.some(msg => !msg.isSeen));
  const seenCorrespondences: Correspondence[] = correspondences.filter(item => !item.isCompleted && item.messages.every(msg => msg.isSeen));
  const completedCorrespondences: Correspondence[] = correspondences.filter(item => item.isCompleted)
  const sortedCorrespondences: Correspondence[] = activeStatus === ChatStatuses[0].eng ? newCorrespondences : activeStatus === ChatStatuses[1].eng ? seenCorrespondences : completedCorrespondences;

  const setActiveStatus = (status: string) => {
    dispatch(changeChatActiveStatus(status));
    dispatch(deleteSelectedCorrespondence(null));
  };

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeChatSearchText(e.target.value));
  };
  
  return (
    <div className={styles.chat}>
      <SectionHeader
        pageTitle="Чат"  
        searchIsNumeric={false}
        searchPlaceholder="Поиск по имени..."
        activeStatus={activeStatus}
        numberOfNewItems={newCorrespondences.length}
        statuses={ChatStatuses}
        setActiveStatus={setActiveStatus}
        handleChangeSearchText={handleChangeSearchText}
      />
      <div className={styles.wrapper}>
        <div className={styles.part}>{
          isLoading && correspondences ? <Loader isLarge={true}/> : <ChatList correspondences={
            !!searchText ? sortedCorrespondences.filter(item => item.profile?.username.includes(searchText)) : sortedCorrespondences
          }/>
        }</div>
        <div className={styles.part}>{
          selectedCorrespondence && <ChatTyping/>
        }</div>
      </div>
    </div>
  );
};

export default ChatPage;
