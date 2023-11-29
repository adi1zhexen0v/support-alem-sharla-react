import { createSlice } from '@reduxjs/toolkit';
import { Correspondence } from '../../utils/interfaces';
import { StatusTypes } from '../../utils/enums';

interface ChatState {
  activeStatus: string;
  chatList: Correspondence[];
  searchText: string;
  selectedCorrespondence: Correspondence | null;
}

const initialState: ChatState = {
  activeStatus: StatusTypes.NEW,
  chatList: [],
  searchText: '',
  selectedCorrespondence: null
};

export const correspondenceSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat(state, action) {
      state.chatList = action.payload;
    },
    setSelectedCorrespondence(state, action) {
      state.selectedCorrespondence = action.payload;
    },
    addMessageToSelectedCorrespondence(state, action) {
      state.selectedCorrespondence?.messages.push(action.payload);
    },
    readAllMessagesIntoSelectedCorrespondence(state, _) {
      const selectedCorrespondence: Correspondence = state.chatList.find(item => item.id === state.selectedCorrespondence?.id)!;
      selectedCorrespondence.messages = selectedCorrespondence.messages.map(message => ({
        ...message,
        isSeen: true,
      }));
    },
    deleteSelectedCorrespondence(state, _) {
      state.selectedCorrespondence = null;
    },
    changeChatActiveStatus(state, action) {
      state.activeStatus = action.payload;
    },
    changeChatSearchText(state, action) {
      state.searchText = action.payload;
    },
    changeChatIsCompleted(state, action) {
      const { id, isCompleted } = action.payload;
      const correspondence = state.chatList.find(item => item.id === id);
      correspondence!.isCompleted = isCompleted;
    }
  },
});

export const { setChat, setSelectedCorrespondence, addMessageToSelectedCorrespondence, readAllMessagesIntoSelectedCorrespondence, deleteSelectedCorrespondence, changeChatActiveStatus, changeChatSearchText, changeChatIsCompleted } = correspondenceSlice.actions;
export default correspondenceSlice.reducer;
