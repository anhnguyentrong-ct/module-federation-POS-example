import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const serverCartSlice = createSlice({
  name: 'serverCart',
  initialState,
  reducers: {
    setServerCartItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setServerCartItems } = serverCartSlice.actions;

export const selectServerCartItems = (state) => state.serverCart.items;

export default serverCartSlice;
