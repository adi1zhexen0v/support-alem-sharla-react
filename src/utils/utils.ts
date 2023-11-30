import { Message } from "./interfaces";

interface LastMessage {
  isManager: boolean;
  text: string;
}

const getZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};

export const formatDate = (timestamp: number, withYear: boolean = false): string => {
  const date = new Date(timestamp);
  const formattedDate = withYear ? `${getZero(date.getDate())}.${getZero(date.getMonth() + 1,)}.${date.getFullYear()}` 
    : `${getZero(date.getDate())}.${getZero(date.getMonth() + 1,)} ${getZero(date.getHours())}:${getZero(date.getMinutes())}`;
  return formattedDate;
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  const truncatedText = text.substring(0, maxLength);
  const lastSpaceIndex = truncatedText.lastIndexOf(' ');
  return lastSpaceIndex === -1
    ? truncatedText
    : truncatedText.substring(0, lastSpaceIndex) + '...';
};

export const countUnseenMessages = (messages: Message[]): number => {
  return Object.values(messages).filter((message) => !message.isSeen).length;
};

export const getLastMessageText = (messages: Message[]): LastMessage => {
  let lastMessage: Message | null = null;

  for (const message of messages) {
    if (!lastMessage || message.sentDate > lastMessage.sentDate) {
      lastMessage = message;
    }
  }

  const lastMessageIsManager: boolean = lastMessage!.isManager;
  const lastMessageText: string = lastMessage!.text || (lastMessage!.imageURL ? '📷 Изображение' : lastMessage!.fileURL ? '📄 Файл' : '');
  
  return { 
    isManager: lastMessageIsManager,
    text: lastMessageText
  }
};