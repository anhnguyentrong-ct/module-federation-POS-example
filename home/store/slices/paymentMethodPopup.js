import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const paymentMethodPopupSlice = createSlice({
  name: 'paymentMethodPopup',
  initialState,
  reducers: {
    showPaymentMethodPopup: (state) => {
      state.isOpen = true;
    },
    closePaymentMethodPopup: (state) => {
      state.isOpen = false;
    },
  },
});

export const { showPaymentMethodPopup, closePaymentMethodPopup } = paymentMethodPopupSlice.actions;

export const selectIsPaymentMethodPopupOpen = (state) => state.paymentMethodPopup.isOpen;

export default paymentMethodPopupSlice;
