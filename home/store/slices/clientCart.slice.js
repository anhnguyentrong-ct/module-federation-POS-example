import { createSlice } from '@reduxjs/toolkit';
import { setCurrentOpenPopup } from './servicePopup.slice';

const bumpServiceTypes = ['bump', '3days_bump', '7days_bump'];

const initialState = {
  items: [],
};

const clientCartSlice = createSlice({
  name: 'clientCart',
  initialState,
  reducers: {
    setClientCartItems: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.type !== action.payload);
    },
    replaceItemInCart: (state, action) => {
      const newItems = state.items.filter((item) => item.type !== action.payload.type);
      newItems.push(action.payload);
      state.items = newItems;
    },
    clearAllBumpServicesFromCart: (state) => {
      state.items = state.items.filter((item) => !bumpServiceTypes.includes(item.type));
    },
    syncServerCartToClientCart: (state, action) => {
      const serverCartItems = action.payload;
      const filtered = state.items.filter(
        (i) => !serverCartItems.some((serverItem) => serverItem.type === i.type)
      );
      state.items = [...serverCartItems, ...filtered];
    },
  },
});

export const {
  replaceItemInCart,
  setClientCartItems,
  addToCart,
  removeFromCart,
  clearAllBumpServicesFromCart,
  syncServerCartToClientCart,
  clearCart,
} = clientCartSlice.actions;

export const selectClientCartItems = (state) => state.clientCart.items;

export const thunkAddToCart =
  (item) => (dispatch, getState) => {
    const { items } = getState().clientCart;

    const isBumpService = bumpServiceTypes.includes(item.type);

    const isAlreadyInCart = items.find((i) => i.type === item.type);
    const hasOtherBumpServiceIncart = items.some((i) => bumpServiceTypes.includes(i.type));

    const shoudRemoveFromCart = !!isAlreadyInCart;

    const isSdaService = item.type === 'SpecialDisplay';

    if (shoudRemoveFromCart) {
      if (isSdaService) {
        if (isAlreadyInCart?.params?.duration !== item?.params?.duration) {
          dispatch(removeFromCart(item.type));
          dispatch(addToCart(item));
          dispatch(setCurrentOpenPopup(item.type));
        } else {
          dispatch(removeFromCart(item.type));
        }
      } else {
        dispatch(removeFromCart(item.type));
      }
    } else {
      if (isBumpService && hasOtherBumpServiceIncart) {
        dispatch(clearAllBumpServicesFromCart());
      }
      dispatch(addToCart(item));
      dispatch(setCurrentOpenPopup(item.type));
    }
  };

export const thunkReplaceItemInCart = (item) => (dispatch) => {
  dispatch(replaceItemInCart(item));
};

export default clientCartSlice;
