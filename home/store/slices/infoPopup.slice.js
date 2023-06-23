import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  popupInfo: {
    title: '',
    status: 'loading',
  },
};

const infoPopupSlice = createSlice({
  name: 'infoPopup',
  initialState,
  reducers: {
    closeInfoPopup: (state) => {
      state.isOpen = false;
    },
    setShowLoadingInfoPopup: (state, action) => {
      state.isOpen = true;
      state.popupInfo.content = action.payload.content ?? 'Đang xử lý, vui lòng đợi...';
      state.popupInfo.status = 'loading';
      state.popupInfo.title = action.payload.title;
    },
    setShowPayNowSuccessPopup: (state, action) => {
      state.isOpen = true;
      state.popupInfo.content = '';
      state.popupInfo.status = 'success';
      state.popupInfo.orderInfo = action.payload.createdOrder;
      state.popupInfo.successServices = action.payload.successServices;
    },
    setShowErrorInfoPopup: (state, action) => {
      const { title = 'Thanh toán không thành công', content = '' } = action.payload;
      state.isOpen = true;
      state.popupInfo.content = content;
      state.popupInfo.status = 'error';
      state.popupInfo.title = title;
    },
  },
});

export const {
  closeInfoPopup,
  setShowLoadingInfoPopup,
  setShowPayNowSuccessPopup,
  setShowErrorInfoPopup,
} = infoPopupSlice.actions;

export const selectProcessPopupInfo = (state) => state.infoPopup.popupInfo;

export const selectIsOpenProcessPopup = (state) => state.infoPopup.isOpen;

export default infoPopupSlice;
