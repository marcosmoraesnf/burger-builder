import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  tokenId: null,
  error: null,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    getUserInfo: (state, action) => {
      state.userId = action.payload.localId;
      state.tokenId = action.payload.idToken;
    },
    cleanUserInfo: (state, action) => {
      state.userId = null;
      state.tokenId = null;
    },
  },
  extraReducers: (builder) => {},
});

export const { getUserInfo, cleanUserInfo } = tokenSlice.actions;

export default tokenSlice.reducer;
