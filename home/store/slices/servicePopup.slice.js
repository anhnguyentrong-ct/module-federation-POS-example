import { createSlice } from '@reduxjs/toolkit';
import { removeFromCart } from './clientCart.slice';

const initialState = {
  currentOpenServicePopup: null,
};

const servicePopupSlice = createSlice({
  name: 'servicePopup',
  initialState,
  reducers: {
    setCurrentOpenPopup: (state, action) => {
      state.currentOpenServicePopup = action.payload;
    },
    closeAllPopups: (state) => {
      state.currentOpenServicePopup = null;
    },
  },
});

export const { setCurrentOpenPopup, closeAllPopups } = servicePopupSlice.actions;

export const selectCurrentOpenServicePopup = (state) =>
  state.servicePopup.currentOpenServicePopup;

export const thunkClosePopup =
  (popupId) =>
  (dispatch) => {
    dispatch(closeAllPopups());
    dispatch(removeFromCart(popupId));
  };

export default servicePopupSlice;
