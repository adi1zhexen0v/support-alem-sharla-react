import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import reviewsReducer from './slices/reviewsSlice';
import settingsReducer from './slices/settingsSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
    chat: chatReducer,
    reviews: reviewsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;