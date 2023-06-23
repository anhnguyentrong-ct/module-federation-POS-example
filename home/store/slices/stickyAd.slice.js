import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  duration: 1,
};

const stickyAdSlice = createSlice({
  name: 'stickyAd',
  initialState,
  reducers: {
    setStickyAdDuration: (state, action) => {
      state.duration = action.payload;
    },
  },
});

export const { setStickyAdDuration } = stickyAdSlice.actions;

export const selectStickyAdDuration = (state) => state.stickyAd.duration;

export default stickyAdSlice;
