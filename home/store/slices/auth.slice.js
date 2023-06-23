import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticated: false,
  account_id: 0,
  account_oid: '',
  address: '',
  avatar: '',
  create_time: 0,
  deviation: '',
  email: '',
  email_verified: 'f',
  facebook_token: '',
  favorites: [],
  full_name: '',
  gender: '',
  is_active: false,
  is_momo_linked: false,
  is_payoo_linked: false,
  location: [],
  long_term_facebook_token: '',
  momo_phone: '',
  old_phone: '',
  payoo_phone: '',
  phone: '',
  phone_verified: '',
  start_time: 0,
  update_time: 0,
  facebook_id: '',
  first_name: '',
  is_phone_hidden: false,
  last_name: '',
  shop: {
    additionalPhone1: null,
    additionalPhone2: null,
    address: '',
    alias: '',
    allowColumnsEdit: false,
    contactName: null,
    coverImageUrl: '',
    cssId: 1,
    description: '',
    isVerified: false,
    isVerifiedDate: null,
    latitude: 0,
    longitude: 0,
    name: '',
    owners: [],
    phoneNumber: '',
    profileImageUrl: '',
    promotionInfo: null,
    protection_entitlement: false,
    remark: '',
    shopsCategoriesRelationships: [],
    showAbsoluteAddress: true,
    status: '',
    urls: [],
    workingAreas: [],
    createdDate: new Date(),
    expiredDate: new Date(),
    extendedDate: new Date(),
    modifiedDate: new Date(),
    verifiedDate: new Date(),
  },
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      return { ...state, authenticated: true, ...action.payload, accessToken: 'dummy' };
    },
    setShopInfo: (state, action) => {
      const shop =
        (Array.isArray(action.payload) && action.payload.length > 0 && action.payload[0]) || null;
      if (shop) state.shop = shop;
    },
  },
});

export const { setUserInfo, setShopInfo } = authSlice.actions;

export const selectUserPhone = (state) => state.auth.phone;
export const selectAccountId = (state) => state.auth.account_id;
export const selectAuthUser = (state) => state.auth;
export const selectShop = (state) => state.auth.shop;

export default authSlice;
