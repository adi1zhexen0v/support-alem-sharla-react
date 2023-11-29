import { createSlice } from '@reduxjs/toolkit';

interface SettingsState {
  sidebarIsFull: boolean;
}

const initialState: SettingsState = {
  sidebarIsFull: true
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleSidebar(state, _) {
      state.sidebarIsFull = !state.sidebarIsFull;
    }
  }
});

export const { toggleSidebar } = settingsSlice.actions;
export default settingsSlice.reducer;