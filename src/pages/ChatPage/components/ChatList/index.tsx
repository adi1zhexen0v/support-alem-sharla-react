import LottieViewer from "../../../../components/LottieViewer";
import ChatItem from "../ChatItem";
import { Correspondence } from "../../../../utils/interfaces";
import NotFoundAnimation from '../../../../assets/img/notFound.json';
import styles from './ChatList.module.scss';

interface ChatListProps {
	correspondences: Correspondence[];
}

const ChatList: React.FC<ChatListProps> = ({ correspondences }) => {
	return (
		<div className={styles.list}>{
			correspondences.length > 0 ? correspondences.map(correspondence => (
        <ChatItem correspondence={correspondence}/>
			)) : <LottieViewer data={NotFoundAnimation} />
		}</div>
	);
}

export default ChatList;