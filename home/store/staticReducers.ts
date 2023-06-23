import authSlice from './slices/auth.slice';
import bundleSlice from './slices/bundle.slice';
import clientCartSlice from './slices/clientCart.slice';
import infoPopupSlice from './slices/infoPopup.slice';
import paymentMethodPopupSlice from './slices/paymentMethodPopup';
import serverCartSlice from './slices/serverCart.slice';
import servicePopupSlice from './slices/servicePopup.slice';
import stickyAdSlice from './slices/stickyAd.slice';

export const staticReducers = {
  [authSlice.name]: authSlice.reducer,
  [serverCartSlice.name]: serverCartSlice.reducer,
  [clientCartSlice.name]: clientCartSlice.reducer,
  [bundleSlice.name]: bundleSlice.reducer,
  [servicePopupSlice.name]: servicePopupSlice.reducer,
  [infoPopupSlice.name]: infoPopupSlice.reducer,
  [paymentMethodPopupSlice.name]: paymentMethodPopupSlice.reducer,
  [stickyAdSlice.name]: stickyAdSlice.reducer,
};
