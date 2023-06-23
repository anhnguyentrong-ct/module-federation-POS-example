import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedBundleItem: null,
};

const bundleSlice = createSlice({
  name: 'bundle',
  initialState,
  reducers: {
    setSelectedBundleItem: (state, action) => {
      state.selectedBundleItem = action.payload;
    },
  },
});

export const { setSelectedBundleItem } = bundleSlice.actions;

export const selectSelectedBundleItem = (state) => state.bundle.selectedBundleItem;

export default bundleSlice;
