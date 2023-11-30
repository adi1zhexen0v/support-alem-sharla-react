export interface AppRoute {
  path: string;
  element: React.FC;
}

export interface Message {
  displayName: string;
  isManager: boolean;
  isSeen: boolean;
  imageURL?: string;
  fileURL?: string;
  messageId: string;
  senderId: string;
  sentDate: number;
  text?: string;
  userDidSee?: boolean
}

export interface Correspondence {
  id: string;
  messages: Message[]; 
  isCompleted: boolean;
  profile?: Profile;
}

export interface Profile {
  address: string;
  apartment: string;
  email: string;
  phoneNumber: string;
  photoLink: string;
  userID: string;
  username: string;
}

export interface Status {
  eng: string;
  rus: string;
}